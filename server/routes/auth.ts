import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import mongoose from "mongoose";
import { authenticate } from "../middleware/authenticate";
import { authorizeUser } from "../middleware/authorizeUser";
import "@dotenvx/dotenvx/config";
import { sendEmail } from "../utils/sendEmail";

interface MyPayload extends JwtPayload {
  id: string;
}

const router: Router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL;
const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

router.post("/register", async (req, res) => {
    try {
        const { email, password, name, description, avatar } = req.body;

        const existingUser = await User.findOne({email: email.trim()});
        if (existingUser) {
            res.status(400).json({ error: "User already exists"});
            return;
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const finalAvatar =
        avatar && avatar.trim() !== ""
            ? avatar.trim()
            : `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()
                .toString(36)
                .substring(7)}`;


        const newUser = new User({ email: email.trim(), password: hashedPassword, name: name.trim(), description: description?.trim().slice(0, 250), avatar: finalAvatar});
        await newUser.save();const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: newUser._id }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: accessToken,
    });
    } catch (error: any) {
        console.error("Registration Error:", error);
  res.status(500).json({ error: error.message || "Registration failed" });
    }
});

router.post("/login", async (req, res): Promise<void> => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return; 
        };
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials"});
            return; 
        };

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        
        res.status(200).json({ token: accessToken });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

router.put("/update/:id", authenticate, authorizeUser, async (req, res): Promise<void> => {
    try {
        const { email, password, name, description, avatar } = req.body;
        const updateFields: any = {};
        if (email) updateFields.email = email.trim();
        if (name) updateFields.name = name.trim();
        if (description) updateFields.description = description.trim().slice(0, 250);
        if (avatar) updateFields.avatar = avatar.trim();

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid user ID format"});
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );
        if (!updatedUser) {
            res.status(404).json({ error: "User not found"});
            return;
        };

        res.json({ message: "User updated", user: updatedUser });
    } catch (error) {
        console.error("err", error);
        res.status(500).json({ error: "Failed to update"});
    }
})

router.delete("/delete/:id", authenticate, authorizeUser, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({ error: "Deletion failed"});
    }
});

router.get("/me", authenticate, authorizeUser, async (req, res): Promise<void> => {
    const userId = (req.user as {id: string}).id;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found"});
            return;
        };
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile"});
    }
});

router.post("/forgot-password", async (req, res): Promise<void> => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email: email.trim() });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "15m",
        });

        const resetLink = `${CLIENT_URL}/reset-password/${resetToken}`;

        await sendEmail({
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
        });
        
        res.json({ message: "Password reset link sent to email"});
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
});

router.post("/reset-password/:token", async (req, res): Promise<void> => {
    const {token} = req.params;
    const {password} = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(400).json({ error: "Invalid user"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful"});
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token"});
    }
});

router.post("/refresh-token", async(req, res): Promise<void> => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        res.status(401).json({ error: "No refresh token"});;
        return;
    }

    try {
        const decoded = jwt.verify(token, REFRESH_SECRET) as MyPayload;
        const newAccessToken = jwt.sign({ id: decoded.id}, ACCESS_SECRET, {expiresIn: "15m"});
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: "Invalid refresh token"});
    }
})

export default router;
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "@dotenvx/dotenvx/config";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

mongoose.connect(mongoURI).then(() => console.log(`Connected to Mongo DB`))
.catch((err) => console.error("Error connecting Mongo DB", err));


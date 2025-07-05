import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "@dotenvx/dotenvx/config";
import authRoutes from "./routes/auth";

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

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
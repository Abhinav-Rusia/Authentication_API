import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
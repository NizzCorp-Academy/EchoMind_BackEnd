import "dotenv/config";
import express from "express";
import { PORT } from "./utils/env";
import { errorHandler } from "./middlewares/errorMiddleware";
import DbConnection from "./configs/connectDb";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoutes";
import authRoute from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoute from "./routes/chatRoute";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // if you're using cookies or auth headers
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.ip, req.method, req.host, req.path);
    next();
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
console.log("server");
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.get("/ok", async (req, res, next) => {
    res.status(500).json({ message: "okay" });
});

app.get("/not", async (req, res, next) => {
    throw new Error("an async error");
});

app.use((req, res, next) => {
    try {
    } catch (err: any) {
        next(err);
    }
});
app.use(errorHandler);
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    // Perform cleanup and exit process if necessary
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Perform cleanup and exit process if necessary
});

app.listen(5000, () => {
    const { connectDB } = new DbConnection();
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});

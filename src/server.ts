import "dotenv/config";
import express from "express";
import { FRONTEND_ENDPOINT, PORT } from "./utils/env.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import DbConnection from "./configs/connectDb.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();

app.use(
    cors({
        origin: FRONTEND_ENDPOINT,
        credentials: true, // if you're using cookies or auth headers
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

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

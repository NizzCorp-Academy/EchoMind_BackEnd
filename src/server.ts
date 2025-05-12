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
import { rateLimit } from "express-rate-limit";

const app = express();

const customlimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});

// const limiter = rateLimit({
//     windowMs: 30 * 1000, // 15 minutes
//     limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Redis, Memcached, etc. See below.
// });

app.use(
    cors({
        origin: FRONTEND_ENDPOINT,
        credentials: true, // if you're using cookies or auth headers
    })
);

// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api/auth", customlimiter, authRoute);
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

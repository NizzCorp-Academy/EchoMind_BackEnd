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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.use(errorHandler);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Perform cleanup and exit process if necessary
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Perform cleanup and exit process if necessary
});

app.listen(PORT, () => {
  const { connectDB } = new DbConnection();
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});

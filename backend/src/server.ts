import "dotenv/config";
import express from "express";
import { PORT } from "./utils/env";
import { errorHandler } from "./middlewares/errorMiddleware";
import DbConnection from "./configs/connectDb";
import authRoute from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoute from "./routes/chatRoute";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoutes";

const { connectDB } = new DbConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});

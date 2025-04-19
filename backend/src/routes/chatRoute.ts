import { Router } from "express";
import ChatController from "../controllers/chatController";
import AuthMiddlewares from "../middlewares/authMiddleware";

const { chatCompleation, editChat, deleteChat, getAllChats } =
  new ChatController();

const { authenticatedRoute } = new AuthMiddlewares();

const chatRoute = Router();

chatRoute.post("/completion", authenticatedRoute, chatCompleation);
chatRoute.put("/edit/:id", authenticatedRoute, editChat);
chatRoute.delete("/delete/:id", authenticatedRoute, deleteChat);
chatRoute.get("/getchat", authenticatedRoute, getAllChats);

export default chatRoute;

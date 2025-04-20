import { Router } from "express";
import AuthMiddlewares from "../middlewares/authMiddleware";
import MessageController from "../controllers/messageController";

const { deleteMessage, getAllMessages } = new MessageController();
const { authenticatedRoute } = new AuthMiddlewares();
const messageRoute = Router();

messageRoute.delete("/delete", authenticatedRoute, deleteMessage);
messageRoute.get("/getall", authenticatedRoute, getAllMessages);

export default messageRoute;

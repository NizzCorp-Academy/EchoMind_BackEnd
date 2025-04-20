import { Router } from "express";
import AuthMiddlewares from "../middlewares/authMiddleware";

const { getMessagesByChatId, deleteMessage } = new Message();
const { authenticatedRoute } = new AuthMiddlewares();
const messageRoute = Router();

messageRoute.delete("/:id", authenticatedRoute, deleteMessage);
messageRoute.post("/login", authenticatedRoute, getMessagesByChatId);

export default messageRoute;

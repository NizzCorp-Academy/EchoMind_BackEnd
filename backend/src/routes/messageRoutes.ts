import { Router } from "express";
import AuthMiddlewares from "../middlewares/authMiddleware";
import MessageController from "../controllers/messageController";
import ValidationMiddleware from "../middlewares/validationMiddleware";

const { deleteMessage, getAllMessages } = new MessageController();
const { authenticatedRoute } = new AuthMiddlewares();
const { getmessagevalidation, messageidvalidation } =
  new ValidationMiddleware();
const messageRoute = Router();

messageRoute.delete(
  "/delete",
  messageidvalidation,
  authenticatedRoute,
  deleteMessage
);
messageRoute.get(
  "/getall",
  getmessagevalidation,
  authenticatedRoute,
  getAllMessages
);

export default messageRoute;

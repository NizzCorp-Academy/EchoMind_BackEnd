import { Router } from "express";
import AuthMiddlewares from "../middlewares/authMiddleware";
import MessageController from "../controllers/messageController";
import ValidationMiddleware from "../middlewares/validationMiddleware";
import { Request, Response, NextFunction } from "express";

const { authenticatedRoute } = new AuthMiddlewares();
const { getmessagevalidation, messageidvalidation } =
  new ValidationMiddleware();
const messageRoute = Router();

messageRoute.delete(
  "/delete",
  messageidvalidation,
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const { deleteMessage } = new MessageController();
    const { messageId } = req.body;
    const message = await deleteMessage(messageId);
    res.status(200).json({ status: "success", message });
    next();
  }
);
messageRoute.get(
  "/getall",
  getmessagevalidation,
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const { getAllMessages } = new MessageController();
    const { chatId } = req.body;
    const messages = await getAllMessages(chatId);
    res.status(200).json({ status: "success", messages });
    next();
  }
);

export default messageRoute;

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
    try {
      const { deleteMessage } = new MessageController();
      const { messageId } = req.body;
      const message = await deleteMessage(messageId);
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
);
messageRoute.get(
  "/getall",
  getmessagevalidation,
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { getAllMessages } = new MessageController();
      const { chatId } = req.body;
      const messages = await getAllMessages(chatId);
      res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  }
);

export default messageRoute;

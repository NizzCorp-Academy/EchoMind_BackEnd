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
    "/:id",
    messageidvalidation,
    authenticatedRoute,
    async (req: Request, res: Response, next: NextFunction) => {
        const { deleteMessage } = new MessageController();
        const { id } = req.params;
        const message = await deleteMessage(id);
        res.status(200).json({ status: "success", message });
        next();
    }
);
messageRoute.get(
    "/:id",
    getmessagevalidation,
    authenticatedRoute,
    async (req: Request, res: Response, next: NextFunction) => {
        const { getAllMessages } = new MessageController();
        const { id } = req.params;
        const messages = await getAllMessages(id);
        res.status(200).json({ status: "success", messages });
        next();
    }
);

export default messageRoute;

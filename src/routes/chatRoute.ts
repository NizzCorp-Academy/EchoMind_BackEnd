/**
 * @file chatRoute.ts
 * @author Jaseem
 * @brief Defines chat-related routes and their associated middlewares and controllers.
 *
 * This file handles the routing for chat operations such as chat completion,
 * editing, deleting, and retrieving all chats. It applies both authentication
 * and validation middleware to ensure requests are secure and well-formed.
 */

import { Router } from "express";
import ChatController from "../controllers/chatController";
import AuthMiddlewares from "../middlewares/authMiddleware";
import ValidationMiddleware from "../middlewares/validationMiddleware";
import { Request, Response, NextFunction } from "express";

const { chatvalidation, updatechatvalidation, delchatvalidation } =
  new ValidationMiddleware();
const { authenticatedRoute } = new AuthMiddlewares();

const chatRoute = Router();

/**
 * @route POST /completion
 * @description Handles chat completion logic (e.g., AI-generated response).
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller chatCompleation - Controller method to handle the request.
 */
chatRoute.post(
  "/completion/:id",
  chatvalidation,
  authenticatedRoute,

  async (req: Request, res: Response, next: NextFunction) => {
    const { chatCompleation } = new ChatController();
    const { id } = req.params;
    const { prompt } = req.body;
    const userId = req.userId;
    const response = await chatCompleation(prompt, id, userId);
    res.status(200).json({ status: "success", response });
    next();
  }
);

/**
 * @route PUT /edit/:id
 * @description Allows editing of an existing chat message by ID.
 * @middleware updatechatvalidation - Validates the request body for editing.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller editChat - Controller method to update a chat message.
 */
chatRoute.put(
  "/edit/:id",
  updatechatvalidation,
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const { editChat } = new ChatController();
    const { id } = req.params;
    const { title } = req.body;
    const chat = await editChat(id, title);
    res.status(200).json({ status: "success", chat });
    next();
  }
);

/**
 * @route DELETE /delete/:id
 * @description Deletes a specific chat message by ID.
 * @middleware delchatvalidation - Validates the request for deletion.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller deleteChat - Controller method to delete a chat message.
 */
chatRoute.delete(
  "/:id",
  delchatvalidation,
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const { deleteChat } = new ChatController();
    const { id } = req.params;
    const userId = req.userId;
    const chat = await deleteChat(userId, id);
    res.status(200).json({ status: "success", chat });
    next();
  }
);

/**
 * @route GET /getchat
 * @description Retrieves all chats for the authenticated user.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller getAllChats - Controller method to fetch all chat records.
 */
chatRoute.get(
  "/getchat",
  authenticatedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const { getAllChats } = new ChatController();
    const userId = req.userId;
    const chats = await getAllChats(userId);
    res.status(200).json({ status: "success", chats });
    next();
  }
);

export default chatRoute;

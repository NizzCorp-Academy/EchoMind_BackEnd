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

const { chatCompleation, editChat, deleteChat, getAllChats } =
  new ChatController();
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
  "/completion",
  chatCompleation, // Note: Seems like this might be mistakenly duplicated
  authenticatedRoute,
  chatCompleation
);

/**
 * @route PUT /edit/:id
 * @description Allows editing of an existing chat message by ID.
 * @middleware updatechatvalidation - Validates the request body for editing.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller editChat - Controller method to update a chat message.
 */
chatRoute.put("/edit/:id", updatechatvalidation, authenticatedRoute, editChat);

/**
 * @route DELETE /delete/:id
 * @description Deletes a specific chat message by ID.
 * @middleware delchatvalidation - Validates the request for deletion.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller deleteChat - Controller method to delete a chat message.
 */
chatRoute.delete(
  "/delete/:id",
  delchatvalidation,
  authenticatedRoute,
  deleteChat
);

/**
 * @route GET /getchat
 * @description Retrieves all chats for the authenticated user.
 * @middleware authenticatedRoute - Ensures the user is authenticated.
 * @controller getAllChats - Controller method to fetch all chat records.
 */
chatRoute.get("/getchat", authenticatedRoute, getAllChats);

export default chatRoute;

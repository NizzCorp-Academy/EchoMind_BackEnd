import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chatService";
import { ErrorMessage } from "../utils/errorMessasge";

/**
 * @class ChatController
 * @file chatController.ts
 * @date 2025-04-19
 * @author Muhammad Haseen
 * @brief Controller class for handling chat-related operations.
 *
 * This class contains methods for retrieving, editing, and deleting chats.
 */
class ChatController {
  /**
   * @brief Retrieves all chats for a specific user.
   *
   * This method fetches all chats associated with the authenticated user.
   *
   * @param req The HTTP request object containing the user's ID.
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * @throws ErrorMessage If no chats are found for the user.
   */
  async getAllChats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const chatService = new ChatService();
      const chats = await chatService.getUserChatsByUserId(userId);
      if (!chats) {
        throw new ErrorMessage("No chats found", 404);
      }
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Edits the title of a specific chat.
   *
   * This method updates the title of a chat based on the provided chat ID and title.
   *
   * @param req The HTTP request object containing the chat ID and new title in the body.
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * @throws ErrorMessage If the chat ID or title is missing, or if the update fails.
   */
  async editChat(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.body.chatId;
      const title = req.body.title;
      if (!chatId || !title) {
        throw new ErrorMessage("Chat ID and title are required", 400);
      }
      const chatService = new ChatService();
      const updatedChat = await chatService.editTitle(chatId, title);
      if (!updatedChat) {
        throw new ErrorMessage("Chat not updated", 404);
      }
      res.status(200).json(updatedChat);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Deletes a specific chat.
   *
   * This method deletes a chat based on the provided chat ID and user ID.
   *
   * @param req The HTTP request object containing the chat ID in the body and user ID in the request.
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * @throws ErrorMessage If the chat ID is missing or the deletion fails.
   */
  async deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.body.chatId;
      const userId = req.userId;
      if (!chatId) {
        throw new ErrorMessage("Chat ID is required", 400);
      }
      const chatService = new ChatService();
      const deletedChat = await chatService.deleteChat(chatId, userId);
      if (!deletedChat) {
        throw new ErrorMessage("Chat not deleted", 404);
      }
      res.status(200).json(deletedChat);
    } catch (error) {
      next(error);
    }
  }
}

export default ChatController;
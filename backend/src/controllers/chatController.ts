import { Request, Response, NextFunction } from "express";
import MessageService from "../services/messageService";
import PromptService from "../services/promptService";
import ChatService from "../services/chatService";

/**
 * @file chatController.ts
 * @brief Controller handling all chat-related operations in the EchoMind application
 * @author Jaseem
 * @date April 19, 2025
 */

/**
 * @class ChatController
 * @brief Handles all chat-related HTTP requests and orchestrates the communication between services
 *
 * This controller is responsible for managing chat operations including:
 * - Creating new chat conversations
 * - Handling message exchanges with AI
 * - Managing existing chat sessions
 * - Deleting chats
 * - Editing chat titles
 * - Retrieving user's chat history
 */
class ChatController {
  /**
   * @brief Handles chat completion requests and AI responses
   * @param req Express Request object containing prompt and optional chatId
   * @param res Express Response object
   * @param next Express NextFunction for error handling
   *
   * @details This method handles two scenarios:
   * 1. Continuing an existing chat (when chatId is provided)
   * 2. Creating a new chat (when no chatId is provided)
   *
   * @throws Forwards any errors to the error handling middleware
   *
   * @note Request body should contain:
   * - prompt: string (required) - The user's message
   * - chatId: string (optional) - Existing chat identifier
   */
  async chatCompleation(req: Request, res: Response, next: NextFunction) {
    const messageService = new MessageService();
    const promptService = new PromptService();
    const chatService = new ChatService();
    try {
      const { prompt, chatId }: { prompt: string; chatId?: string } = req.body;
      if (chatId) {
        await messageService.createMessage(true, prompt, chatId);
        const Response = await promptService.chatCompletion(chatId);
        await messageService.createMessage(false, Response, chatId);
        res.status(200).json({ isFromUer: false, message: Response, chatId });
      }

      const response = await promptService.promptCompletion(prompt);
      const title = await promptService.createTitle([
        { isFromUser: true, message: prompt },
        { isFromUser: false, message: response },
      ]);
      const chat = await chatService.createChat(req.userId, title);
      await messageService.createMessage(true, prompt, chat._id.toString());
      await messageService.createMessage(false, response, chat._id.toString());
      res
        .status(200)
        .json({ isFromUer: false, message: response, chatId: chat._id });
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Deletes a specific chat
   * @param req Express Request object containing chat ID in params
   * @param res Express Response object
   * @param next Express NextFunction for error handling
   *
   * @details Verifies user ownership before deletion
   * Returns 204 status code on successful deletion
   *
   * @throws Forwards errors if chat doesn't exist or user is unauthorized
   *
   * @note Requires authentication middleware
   * @note Requires chatId as URL parameter
   */
  async deleteChat(req: Request, res: Response, next: NextFunction) {
    const chatService = new ChatService();
    try {
      const chatId = req.params.id;
      const userId = req.userId;
      const chat = chatService.deleteChat(chatId, userId);
      res.status(204).json({ chat });
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Updates the title of a chat
   * @param req Express Request object containing new title in body
   * @param res Express Response object
   * @param next Express NextFunction for error handling
   *
   * @details Updates chat title after verifying user ownership
   * Returns updated chat object
   *
   * @throws Forwards errors if chat doesn't exist or user is unauthorized
   *
   * @note Request body should contain:
   * - title: string (required) - New title for the chat
   */
  async editChat(req: Request, res: Response, next: NextFunction) {
    const chatService = new ChatService();
    try {
      // const userId = req.userId;
      const chatId = req.params.id;
      const { title }: { title: string } = req.body;
      const chat = await chatService.editTitle(chatId, title);
      res.status(200).json({ chat });
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Retrieves all chats for the authenticated user
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express NextFunction for error handling
   *
   * @details Returns an array of chat objects associated with the user
   * Each chat object contains title and messages
   *
   * @throws Forwards any database errors to error handling middleware
   *
   * @note Requires authentication middleware
   * @returns Array of chat objects
   */
  async getAllChats(req: Request, res: Response, next: NextFunction) {
    const chatService = new ChatService();
    try {
      const userId = req.userId;
      console.log(userId);
      const chats = await chatService.getUserChatsByUserId(userId);
      console.log(chats);
      res.status(200).json({ chats });
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default ChatController;

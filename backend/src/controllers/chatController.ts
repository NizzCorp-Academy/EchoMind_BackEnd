import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chatService";
import { ErrorMessage } from "../utils/errorMessasge";
import MessageService from "../services/messageService";
import PromptService from "../services/promptService";

/**
 * @class ChatController
 * @file chatController.ts
 * @date 2025-04-19
 * @author Muhammad Haseen
 * @author Jaseem
 * @brief Controller class for handling chat-related operations.
 *
 * This class contains methods for retrieving, editing, and deleting and creating chats.
 */
class ChatController {
  /**
   * @author Jaseem
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
  async chatCompleationController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

  async chatCompleation(prompt: string, chatId?: string, userId?: string) {
    const messageService = new MessageService();
    const promptService = new PromptService();
    const chatService = new ChatService();
    if (chatId) {
      await messageService.createMessage(true, prompt, chatId);
      const Response = await promptService.chatCompletion(chatId);
      await messageService.createMessage(false, Response, chatId);
      return { isFromUer: false, message: Response, chatId };
    }

    const response = await promptService.promptCompletion(prompt);
    const title = await promptService.createTitle([
      { isFromUser: true, message: prompt },
      { isFromUser: false, message: response },
    ]);
    if (!chatId && !userId) {
      throw new ErrorMessage("user is not provided", 400, "c-ctrl-02");
    }
    const chat = await chatService.createChat(userId ?? "", title);
    await messageService.createMessage(true, prompt, chat._id.toString());
    await messageService.createMessage(false, response, chat._id.toString());
    return { isFromUer: false, message: response, chatId: chat._id };
  }

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

  async getAllChatsController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const chatService = new ChatService();
      const chats = await chatService.getUserChatsByUserId(userId);
      if (!chats) {
        throw new ErrorMessage("No chats found", 404, "c-ctrl-03");
      }
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  async getAllChats(userId: string) {
    const chatService = new ChatService();
    const chats = await chatService.getUserChatsByUserId(userId);
    if (!chats) {
      throw new ErrorMessage("No chats found", 404, "c-ctrl-04");
    }
    return { chats };
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
  async editChatController(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.body.chatId;
      const title = req.body.title;
      if (!chatId || !title) {
        throw new ErrorMessage(
          "Chat ID and title are required",
          400,
          "c-ctrl-05a"
        );
      }
      const chatService = new ChatService();
      const updatedChat = await chatService.editTitle(chatId, title);
      if (!updatedChat) {
        throw new ErrorMessage("Chat not updated", 404, "c-ctrl-05b");
      }
      res.status(200).json(updatedChat);
    } catch (error) {
      next(error);
    }
  }

  async editChat(chatId: string, title: string) {
    if (!chatId || !title) {
      throw new ErrorMessage(
        "Chat ID and title are required",
        400,
        "c-ctrl-06a"
      );
    }
    const chatService = new ChatService();
    const updatedChat = await chatService.editTitle(chatId, title);
    if (!updatedChat) {
      throw new ErrorMessage("Chat not updated", 404, "c-ctrl-06b");
    }
    return { updatedChat };
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
  async deleteChatController(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.body.chatId;
      const userId = req.userId;
      if (!chatId) {
        throw new ErrorMessage("Chat ID is required", 400, "c-ctrl-07a");
      }
      const chatService = new ChatService();
      const deletedChat = await chatService.deleteChat(chatId, userId);
      if (!deletedChat) {
        throw new ErrorMessage("Chat not deleted", 404, "c-ctrl-07b");
      }
      res.status(200).json(deletedChat);
    } catch (error) {
      next(error);
    }
  }

  async deleteChat(userId: string, chatId: string) {
    if (!chatId) {
      throw new ErrorMessage("Chat ID is required", 400, "c-ctrl-08a");
    }
    const chatService = new ChatService();
    const deletedChat = await chatService.deleteChat(chatId, userId);
    if (!deletedChat) {
      throw new ErrorMessage("Chat not deleted", 404, "c-ctrl-08b");
    }
    return { deletedChat };
  }
}

export default ChatController;

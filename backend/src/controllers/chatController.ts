import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chatService";
import { ErrorMessage } from "../utils/errorMessasge";
import MessageService from "../services/messageService";
import PromptService from "../services/promptService";

/**
 * @class ChatController
 * @file chatController.ts
 * @date 2025-04-19
 * @brief Controller class for handling chat-related operations.
 *
 * This controller handles chat creation, message handling, AI prompt processing,
 * and CRUD operations related to user chats.
 */
class ChatController {
  /**
   * @function chatCompleation
   * @brief Handles AI prompt completions and chat session creation or continuation.
   * @author Jaseem
   *
   * @param prompt The message input from the user.
   * @param chatId Optional chat identifier for continuing an existing chat.
   * @param userId Optional user identifier for associating new chats.
   *
   * @return A response object containing the AI-generated message and associated chat ID.
   *
   * @throws ErrorMessage if userId is missing while creating a new chat.
   *
   * @details
   * This method handles the following scenarios:
   * - Continues an existing chat if `chatId` is provided by:
   *   - Saving the user's message
   *   - Generating an AI response
   *   - Saving the AI's response
   * - Starts a new chat if `chatId` is not provided by:
   *   - Generating an AI response
   *   - Creating a chat title
   *   - Creating a new chat session
   *   - Saving both the user's message and AI's response
   *
   * @note This method integrates with MessageService, PromptService, and ChatService.
   */

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
   * @author Muhammad Haseen
   * @function getAllChats
   * @brief Retrieves all chats for a specific user.
   *
   * @param userId The ID of the user whose chats should be retrieved.
   * @return An object containing the user's chats.
   *
   * @throws ErrorMessage if no chats are found.
   *
   * @details
   * Utilizes ChatService to fetch all chat documents associated with the user.
   */

  async getAllChats(userId: string) {
    const chatService = new ChatService();
    const chats = await chatService.getUserChatsByUserId(userId);
    if (!chats) {
      throw new ErrorMessage("No chats found", 404, "c-ctrl-04");
    }
    return { chats };
  }

  /**
   * @author Muhammad Hasen
   * @function editChat
   * @brief Updates the title of a specific chat.
   *
   * @param chatId The ID of the chat to be updated.
   * @param title The new title to assign to the chat.
   * @return An object containing the updated chat.
   *
   * @throws ErrorMessage if chatId or title is missing, or if the update operation fails.
   *
   * @details
   * Uses ChatService to locate and update the chat title by ID.
   */

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
   * @author Muhammad Haseen
   * @function deleteChat
   * @brief Deletes a chat for a given user.
   *
   * @param userId The ID of the user who owns the chat.
   * @param chatId The ID of the chat to delete.
   * @return An object confirming deletion of the chat.
   *
   * @throws ErrorMessage if chatId is missing or the deletion fails.
   *
   * @details
   * Relies on ChatService to delete the specified chat and verify ownership by userId.
   */

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

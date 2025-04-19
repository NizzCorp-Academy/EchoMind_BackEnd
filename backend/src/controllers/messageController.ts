import { NextFunction, Request, Response } from "express";
import MessageService from "../services/messageService";
import { ErrorMessage } from "../utils/errorMessasge";

/**
 * @class MessageController
 * @file messageController.ts
 * 
 * @date 2025-04-19
 * @author Muhammad Haseen
 * @brief Controller class for handling message-related operations.
 *
 * This class contains methods for retrieving and deleting messages.
 */
class MessageController {
  /**
   * @brief Retrieves all messages for a specific chat.
   *
   * This method fetches all messages associated with a given chat ID.
   *
   * @param req The HTTP request object containing the chat ID in the body.
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * @throws ErrorMessage If the chat ID is missing or no messages are found.
   */
  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.body;
      if (!chatId) {
        throw new ErrorMessage("Chat ID is required", 400);
      }

      const messageService = new MessageService();
      const messages = await messageService.getMessagesByChatId(chatId);
      if (!messages) {
        throw new ErrorMessage("No messages found for this chatId", 404);
      }
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @brief Deletes a specific message.
   *
   * This method deletes a message based on the provided message ID.
   *
   * @param req The HTTP request object containing the message ID in the body.
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * @throws ErrorMessage If the message ID is missing or the deletion fails.
   */
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.body;
      if (!messageId) {
        throw new ErrorMessage("Message ID is required", 400);
      }
      const messageService = new MessageService();
      const deletedMessage = await messageService.deleteMessage(messageId);
      if (!deletedMessage) {
        throw new ErrorMessage("Message deletion failed", 404);
      }
      res.status(200).json(deletedMessage);
    } catch (error) {
      next(error);
    }
  }
}

export default MessageController;
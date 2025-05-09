/**
 * @author Jaseem
 * @file messageService.ts
 * @brief MessageService - Service class for handling message-related operations.
 * @class MessageService
 */

import mongoose from "mongoose";
import MessageModle from "../models/messageModel.js";
import { ErrorMessage } from "../utils/errorMessasge.js";

class MessageService {
    /**
     * @method createMessage
     * @brief createMessage - Creates a new message in the database.
     * @param isFromUser boolean - Indicates if the message is from the user or not.
     * @param message string the content of the message
     * @param chatId  string the chat id
     * @returns the message obj
     */
    async createMessage(isFromUser: boolean, message: string, chatId: string) {
        const messageobj = await MessageModle.create({
            isFromUser,
            message,
            chatId,
        });
        return messageobj;
    }

    /**
     * @method dleeteMessage
     * @biref delete message bassed on the give messageId
     * @param messageId string the message id to be deleted
     * @returns the message object that was deleted
     * @throws Error if there was no message found with the give id
     */
    async deleteMessage(messageId: string) {
        if (mongoose.isValidObjectId(messageId) === false) {
            throw new ErrorMessage("Invalid chatId format", 400, "ms02a");
        }
        const message = await MessageModle.findByIdAndDelete(messageId);
        if (!message) {
            throw new ErrorMessage("Message not found", 404, "ms02b");
        }
        return message;
    }

    /**
     * @method getMessagesByChatId
     * @brief getMessagesByChatId - Retrieves messages from the database based on the chat ID.
     * @param chatId string the chat id to get the messages for
     * @returns an array of messages associated with the given chat ID
     * @throws Error if no messages are found for the given chat ID
     */
    async getMessagesByChatId(chatId: string) {
        if (mongoose.isValidObjectId(chatId) === false) {
            throw new ErrorMessage("Invalid chatId format", 400, "ms03a");
        }
        const messages = await MessageModle.find({ chatId }).sort({
            createdAt: 1,
        });
        if (!messages) {
            throw new ErrorMessage(
                "No messages found for this chatId",
                400,
                "ms03b"
            );
        }
        return messages;
    }
}

export default MessageService;

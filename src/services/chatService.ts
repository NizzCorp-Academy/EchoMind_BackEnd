import ChatModel from "../models/chatModel.js";
import { ErrorMessage } from "../utils/errorMessasge.js";

/**
 * @class ChatService
 * @author Muhamamd Haseen
 * @brief Service class for managing chat-related operations.
 *
 * This class provides methods for creating, retrieving, updating, and deleting chats.
 * It interacts with the ChatModel to perform database operations.
 */
class ChatService {
    /**
     * @brief Creates a new chat.
     *
     * @param userId The ID of the user creating the chat.
     * @param title The title of the chat.
     * @return The created chat object.
     * @throws Error If the chat creation fails.
     */
    async createChat(userId: string, title: string) {
        const objChat = await ChatModel.create({
            title: title,
            userId: userId,
        });
        return objChat;
    }

    /**
     * @brief Retrieves all chats for a specific user.
     *
     * @param userId The ID of the user whose chats are to be retrieved.
     * @return An array of chat objects.
     * @throws Error If no chats are found for the user.
     */
    async getUserChatsByUserId(userId: string) {
        const objChats = await ChatModel.find({ userId }).sort({
            createdAt: 1,
        });
        return objChats;
    }

    /**
     * @brief Updates the title of a chat.
     *
     * @param chatId The ID of the chat to be updated.
     * @param title The new title for the chat.
     * @return The updated chat object.
     * @throws ErrorMessage If the chat ID is invalid or the title update fails.
     */
    async editTitle(chatId: string, title: string) {
        await this.isValidChatId(chatId);
        const objChat = await ChatModel.findByIdAndUpdate(
            chatId,
            { title },
            { new: true }
        );

        console.log(objChat);
        if (!objChat) {
            throw new ErrorMessage("title not updated", 400, "cs03");
        }

        return objChat;
    }

    /**
     * @brief Deletes a chat for a specific user.
     *
     * @param chatId The ID of the chat to be deleted.
     * @param userId The ID of the user requesting the deletion.
     * @return The deleted chat object.
     * @throws ErrorMessage If the user or chat is not found, or if the deletion fails.
     */
    async deleteChat(chatId: string, userId: string) {
        await this.isValidChatId(chatId);
        const userMatchChat = await ChatModel.findOne({
            userId: userId,
            _id: chatId,
        });
        if (!userMatchChat) {
            throw new ErrorMessage("User not found in this chat", 404, "cs04a");
        }
        const objChat = await ChatModel.findByIdAndDelete(chatId);
        if (!objChat) {
            throw new ErrorMessage("failed to delete chat", 400, "cs04b");
        }
        return objChat;
    }

    /**
     * @brief Validates if a chat ID exists.
     *
     * @param chatId The ID of the chat to validate.
     * @return True if the chat ID is valid.
     * @throws ErrorMessage If the chat is not found.
     */
    async isValidChatId(chatId: string) {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            throw new ErrorMessage("Chat not found", 404, "cs05");
        }
        return true;
    }
}

export default ChatService;

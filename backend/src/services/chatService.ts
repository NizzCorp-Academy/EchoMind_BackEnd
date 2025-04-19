
import ChatModel from "../models/chatModel";

/**
 * @class ChatService
 * @brief Service class for managing chat-related operations.
 */
class ChatService {
  /**
   * @brief Creates a new chat.
   * @param userId The ID of the user creating the chat.
   * @param title The title of the chat.
   * @return The created chat object.
   * @throws Error if the chat creation fails.
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
   * @param userId The ID of the user whose chats are to be retrieved.
   * @return An array of chat objects.
   * @throws Error if the user is not found.
   */
  async getUserChatsByUserId(userId: string) {
    const objChats = await ChatModel.find({ userId: userId });
   
    return objChats;
  }

  /**
   * @brief Updates the title of a chat.
   * @param chatId The ID of the chat to be updated.
   * @param title The new title for the chat.
   * @return The updated chat object.
   * @throws Error if the chat ID is invalid or the title update fails.
   */
  async editTitle(chatId: string, title: string) {
    await this.isValidChatId(chatId);
    const objChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { title },
      { new: true }
    );
    if (!objChat) {
      throw new Error("title not updated");
    }
    console.log("Chat title updated successfully:", objChat);
    return objChat;
  }

  /**
   * @brief Deletes a chat for a specific user.
   * @param chatId The ID of the chat to be deleted.
   * @param userId The ID of the user requesting the deletion.
   * @return The deleted chat object.
   * @throws Error if the user or chat is not found, or if the deletion fails.
   */
  async deleteChat(chatId: string, userId: string) {
    

    await this.isValidChatId(chatId);
    const userMatchChat = await ChatModel.findOne({ userId: userId, _id: chatId });
    if (!userMatchChat) {
      throw new Error("User not found in this chat");
    }
    const objChat = await ChatModel.findByIdAndDelete(chatId);
    if (!objChat) {
      throw new Error("failed to delete chat");
    }
    return objChat;
  }

  /**
   * @brief Validates if a chat ID exists.
   * @param chatId The ID of the chat to validate.
   * @return True if the chat ID is valid.
   * @throws Error if the chat is not found.
   */
  async isValidChatId(chatId: string) {
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }
    return true;
  }
}

export default ChatService;
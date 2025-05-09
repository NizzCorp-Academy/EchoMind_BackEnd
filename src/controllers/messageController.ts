import MessageService from "../services/messageService.js";
import { ErrorMessage } from "../utils/errorMessasge.js";

/**
 * @class MessageController
 * @file messageController.ts
 * @date 2025-04-19
 * @brief Controller class for handling message-related operations.
 *
 * This controller manages operations related to retrieving and deleting messages
 * within a specific chat.
 *
 * @author Muhammad Haseen
 */
class MessageController {
    /**
     * @function getAllMessages
     * @brief Retrieves all messages for a specific chat.
     *
     * @param chatId The unique identifier of the chat.
     * @return An object containing the list of messages in the chat.
     *
     * @throws ErrorMessage if the chatId is not provided or no messages are found.
     *
     * @details
     * This method uses the MessageService to fetch all messages that belong to the
     * provided chatId. It ensures the chatId is provided and that messages exist
     * for that chat.
     */

    async getAllMessages(chatId: string) {
        if (!chatId) {
            throw new ErrorMessage("Chat ID is required", 400, "m-ctrl-02a");
        }

        const messageService = new MessageService();
        const messages = await messageService.getMessagesByChatId(chatId);
        if (!messages) {
            throw new ErrorMessage(
                "No messages found for this chatId",
                404,
                "m-ctrl-02b"
            );
        }
        return messages;
    }

    /**
     * @function deleteMessage
     * @brief Deletes a specific message by its ID.
     *
     * @param messageId The unique identifier of the message to be deleted.
     * @return An object confirming the deletion of the message.
     *
     * @throws ErrorMessage if the messageId is not provided or deletion fails.
     *
     * @details
     * This method delegates to MessageService to remove the specified message
     * from the data source.
     */

    async deleteMessage(messageId: string) {
        if (!messageId) {
            throw new ErrorMessage("Message ID is required", 400, "m-ctrl-04a");
        }
        const messageService = new MessageService();
        const deletedMessage = await messageService.deleteMessage(messageId);
        if (!deletedMessage) {
            throw new ErrorMessage(
                "Message deletion failed",
                404,
                "m-ctrl-03b"
            );
        }
        return { deletedMessage };
    }
}

export default MessageController;

import { AI_ENDPOIND, AI_MODEL } from "../utils/env.js";
import { ErrorMessage } from "../utils/errorMessasge.js";
import MessageService from "./messageService.js";

/**
 * @author Jaseem
 * @file promptService.ts
 * @brief PromptService - Service class for handling AI prompt-related operations.
 * @class PromptService
 *
 */

class PromptService {
    /**
     * @method promptCompletion
     * @brief promptCompletion - Sends a prompt to the AI model and retrieves the completion.
     * @param prompt string - The prompt to be sent to the AI model.
     * @returns return the ai repose of the prompt given
     */
    async promptCompletion(prompt: string) {
        const response = await fetch(`${AI_ENDPOIND}/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ model: AI_MODEL, prompt }),
        });
        if (!response.ok) {
            throw new ErrorMessage("Network response was not ok", 400, "ps01");
        }
        const data = await response.json();
        return data.choices[0].text;
    }

    /**
     * @method createTitle
     * @brief this method will retun a title for the chat model based on the conversation given
     * @param messages Array<{isfromUser:boolean , messagese:string }> the first convo to create the title based on .
     * @returns response which will be the title for the chat model
     */
    async createTitle(messages: { isFromUser: boolean; message: string }[]) {
        const titlePrompt = {
            isFromUser: true,
            message:
                "Create a short and relevant title for the following conversation. Only return the title and nothing else.",
        };

        const chats = [...messages, titlePrompt].map((chat) => {
            return {
                role: chat.isFromUser ? "user" : "assistant",
                content: chat.message,
            };
        });

        const response = await fetch(`${AI_ENDPOIND}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: chats,
            }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data.choices[0].message.content);
        return data.choices[0].message.content;
    }

    /**
     * @method chatCompletion
     * @brief method will return the response after getting the ai response based on the messages form the chat
     * @param chatId string the chatId which is for getting all the messages from the chats
     * @returns the ai response
     */
    async chatCompletion(chatId: string) {
        const messageService = new MessageService();
        const messages = await messageService.getMessagesByChatId(chatId);
        const chats = messages.map((chat) => {
            return {
                role: chat.isFromUser ? "user" : "assistant",
                content: chat.message,
            };
        });

        console.log("chats from chatcompletion ", chats);
        const response = await fetch(`${AI_ENDPOIND}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: chats,
            }),
        });
        if (!response.ok) {
            throw new ErrorMessage("Network response was not ok", 400, "ps02");
        }
        const data = await response.json();
        return data.choices[0].message.content;
    }
}

export default PromptService;

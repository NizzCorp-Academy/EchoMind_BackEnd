import e from "express";
import ChatModel from "../models/chatModel";
import UserModel from "../models/userModel";
import { log } from "console";

class ChatService {
  async createChat(userId: string, title: string) {
    const objChat = await ChatModel.create({
      title: title,
      userId: userId,
    });
    return objChat;
  }
  async getUserChatsByUserId(userId: string) {
    const objChats = await ChatModel.find({ userId: userId });
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return objChats;
  }
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

  async deleteChat(chatId: string, userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
      await this.isValidChatId(chatId);
    const userMatchChat = await ChatModel.findOne({ userId: userId , _id: chatId });
    if(!userMatchChat) {
      throw new Error("User not found in this chat");
    }
    const objChat = await ChatModel.findByIdAndDelete(chatId);
    if (!objChat) {
      throw new Error("failed to delete chat");
    }
    return objChat;
  }

  async isValidChatId(chatId: string) {
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }
    return true;
  }
}
export default ChatService;

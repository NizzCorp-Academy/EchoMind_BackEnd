import mongoose from "mongoose";
import ChatModel from "../models/chatModel";
import ChatService from "../services/chatService";
import UserModel from "../models/userModel";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-user-service");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  jest.clearAllMocks();
});

describe("Chat Services", () => {
  beforeEach(async () => {
    await ChatModel.deleteMany({});
    jest.clearAllMocks();
  });
  it("should create a chat", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const title = "My Chat";

    const chatService = new ChatService();
    const chatObj = await chatService.createChat(userId, title);

    expect(chatObj).toBeDefined();
    expect(chatObj.title).toBe(title);
    expect(chatObj.userId.toString()).toBe(userId);
  });
  it("should return chats by userId", async () => {
    const userId = "64bfe0c2e6f2f9bda2f99a3e";
    const title = "My Chat";

    const user = await UserModel.create({
      username: "Test User",
      email: "sample@gmail.com",
      password: "123",
    });
    await ChatModel.create({
      title: title,
      userId: user._id.toString(),
    });

    const chatService = new ChatService();
    const chats = await chatService.getUserChatsByUserId(user._id.toString());

    expect(chats).toBeDefined();
    expect(chats.length).toBe(1);
    expect(chats[0].title).toBe(title);
  });
  it("should edit chat title", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const title = "My Chat";
    const newTitle = "Updated Chat Title";

    const chatService = new ChatService();
    const chatObj = await chatService.createChat(userId, title);
    const updatedChat = await chatService.editTitle(
      chatObj._id.toString(),
      newTitle
    );

    expect(updatedChat).toBeDefined();
    expect(updatedChat.title).toBe(newTitle);
  });
  it("should delete a chat when user and chat are valid", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const chatService = new ChatService();

    // Create user
    await UserModel.create({
      _id: userId,
      username: "Test User",
      email: "test@example.com",
      password: "samplw",
    });

    // Create chat
    const chat = await ChatModel.create({ userId, title: "My Chat" });

    // Call deleteChat
    const deletedChat = await chatService.deleteChat(
      chat._id.toString(),
      userId
    );

    // Assertions
    expect(deletedChat).toBeDefined();
    expect(deletedChat._id.toString()).toBe(chat._id.toString());

    // Confirm chat is deleted from DB
    const foundChat = await ChatModel.findById(chat._id);
    expect(foundChat).toBeNull();
  });

  it("should throw if userId not matched with chatId", async () => {
    const actualUserId = new mongoose.Types.ObjectId().toString();
    const wrongUserId = new mongoose.Types.ObjectId().toString();
    const chatService = new ChatService();

    await UserModel.create({
      _id: actualUserId,
      username: "Actual User",
      email: "actual@example.com",
      password: "password",
    });

    const chat = await ChatModel.create({
      userId: actualUserId,
      title: "My Chat",
    });

    await UserModel.create({
      _id: wrongUserId,
      username: "Wrong User",
      email: "wrong@example.com",
      password: "password",
    });

    // Try to delete chat with a user that doesn't own it
    await expect(
      chatService.deleteChat(chat._id.toString(), wrongUserId)
    ).rejects.toThrow("User not found in this chat");
  });

  it("should return true if chatId valid", async () => {
    const userId = new mongoose.Types.ObjectId().toString();

    const chat = await ChatModel.create({
      userId: userId,
      title: "My Chat",
    });

    const chatService = new ChatService();
    const checkChatId = await chatService.isValidChatId(chat._id.toString());
    expect(checkChatId).toBe(true);
  });
  it("should return throw if chatId invalid", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const chatId = new mongoose.Types.ObjectId().toString();

    const chat = await ChatModel.create({
      _id: chatId,
      userId: userId,
      title: "My Chat",
    });

    const chatService = new ChatService();
    await expect(() => chatService.isValidChatId(userId)).rejects.toThrow(
      "Chat not found"
    );
  });
});

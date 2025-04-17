import "dotenv/config";
import PromptService from "../services/promptService";
import MessageModle from "../models/messageModel";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-user-service");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  jest.clearAllMocks();
});

describe("Prompt Service ", () => {
  beforeEach(async () => {
    await MessageModle.deleteMany({});
    jest.clearAllMocks();
  });
  it("should return a title for the chat model", async () => {
    const messages = [
      { isFromUser: false, message: "I'm fine, thank you!" },
      { isFromUser: true, message: "Hello, how are you?" },
    ];
    const promptService = new PromptService();
    const response = await promptService.createTitle(messages);
    console.log("Response ", response);
    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
  });
  it("should return a prompt completion", async () => {
    const prompt = "What is the capital of France?";
    const promptService = new PromptService();
    const response = await promptService.promptCompletion(prompt);
    console.log(response);
    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
  });
  it("shoud return a respose for the entire chat ", async () => {
    const chatId = new mongoose.Types.ObjectId().toString();
    await MessageModle.create({
      isFromUser: true,
      message: "Hello,how are you?",
      chatId,
    });
    await MessageModle.create({
      isFromUser: false,
      message: "i'm fine, thank you!",
      chatId,
    });
    await MessageModle.create({
      isFromUser: true,
      message: "apples?",
      chatId,
    });
    const promptService = new PromptService();
    const response = await promptService.chatCompletion(chatId);
    console.log(response);
    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
  });
});

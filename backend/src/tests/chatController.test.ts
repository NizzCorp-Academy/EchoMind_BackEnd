import "dotenv/config";
// import mongoose from "mongoose";
// import express, { Request, Response, NextFunction } from "express";
// import cookieParser from "cookie-parser";
// import request from "supertest";
// import ChatController from "../controllers/chatController";
// import AuthUtils from "../utils/authUtil";
// import ChatModel from "../models/chatModel";
// import UserModel from "../models/userModel";
// import MessageModel from "../models/messageModel";
// import AuthMiddlewares from "../middlewares/authMiddleware";
// import MessageService from "../services/messageService";
// import ChatService from "../services/chatService";
// import PromptService from "../services/promptService";

import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import ChatController from "../controllers/chatController";
import MessageService from "../services/messageService";
import PromptService from "../services/promptService";
import ChatService from "../services/chatService";

jest.mock("../services/MessageService");
jest.mock("../services/PromptService");
jest.mock("../services/ChatService");

// Setup Express app
const app = express();
app.use(express.json());

// Simulate req.userId middleware
app.use(
  (req: Request & { userId?: string }, _res: Response, next: NextFunction) => {
    req.userId = "mockUserId123";
    next();
  }
);

const controller = new ChatController();

// Attach the route
app.post("/chat", (req: Request, res: Response, next: NextFunction) =>
  controller.chatCompleation(req, res, next)
);

describe("chatCompleation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle chatId flow correctly", async () => {
    const mockResponse = "AI response for existing chat";
    const mockChatId = "chat123";

    (MessageService.prototype.createMessage as jest.Mock).mockResolvedValue(
      undefined
    );
    (PromptService.prototype.chatCompletion as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const res = await request(app)
      .post("/chat")
      .send({ prompt: "Hello", chatId: mockChatId });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      isFromUer: false,
      message: mockResponse,
      chatId: mockChatId,
    });

    expect(PromptService.prototype.chatCompletion).toHaveBeenCalledWith(
      mockChatId
    );
    expect(MessageService.prototype.createMessage).toHaveBeenCalledTimes(2);
  });

  it("should handle prompt-only flow (no chatId)", async () => {
    const prompt = "What is AI?";
    const response = "AI is artificial intelligence.";
    const title = "AI Explained";
    const newChat = { _id: "newChatId123" };

    (PromptService.prototype.promptCompletion as jest.Mock).mockResolvedValue(
      response
    );
    (PromptService.prototype.createTitle as jest.Mock).mockResolvedValue(title);
    (ChatService.prototype.createChat as jest.Mock).mockResolvedValue(newChat);
    (MessageService.prototype.createMessage as jest.Mock).mockResolvedValue(
      undefined
    );

    const res = await request(app).post("/chat").send({ prompt });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      isFromUer: false,
      message: response,
      chatId: newChat._id,
    });

    expect(PromptService.prototype.promptCompletion).toHaveBeenCalledWith(
      prompt
    );
    expect(PromptService.prototype.createTitle).toHaveBeenCalled();
    expect(ChatService.prototype.createChat).toHaveBeenCalledWith(
      "mockUserId123",
      title
    );
    expect(MessageService.prototype.createMessage).toHaveBeenCalledTimes(2);
  });
});

// const { authenticatedRoute } = new AuthMiddlewares();

// let app: express.Application;
// let authToken: string;

// // Setup test application
// beforeAll(async () => {
//   // Connect to test database
//   await mongoose.connect("mongodb://localhost:27017/chat-controller-testing");

//   // Setup express app
//   app = express();
//   app.use(cookieParser());
//   app.use(express.json());

//   const chatController = new ChatController();
//   app.post(
//     "/chat/complete",
//     authenticatedRoute,
//     chatController.chatCompleation
//   );

//   app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({ error: error.message });
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

// describe("Chat Completion", () => {
//   beforeEach(async () => {
//     // Clean up collections before each test
//     await ChatModel.deleteMany({});
//     await MessageModel.deleteMany({});
//   });
//   it("should create new chat with AI response", async () => {
//     const testUser = await UserModel.create({
//       username: "testUser2",
//       email: "test2@example.com",
//       password: "testPassword123",
//     });

//     // Generate auth token
//     const authUtil = new AuthUtils();
//     authToken = authUtil.createToken(testUser._id.toString());
//     const response = await request(app)
//       .post("/chat/complete")
//       .set("Cookie", [`jwt=${authToken}`])
//       .send({ prompt: "Test prompt" });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("chatId");
//     expect(response.body).toHaveProperty("message");

//     // Verify messages were created
//     const messages = await MessageModel.find({
//       chatId: response.body.chatId,
//     });
//     expect(messages).toHaveLength(2); // User message + AI response
//   }, 100000);

//   it("should continue existing chat conversation", async () => {
//     const testUser = await UserModel.create({
//       username: "testUser",
//       email: "test@example.com",
//       password: "testPassword123",
//     });

//     // Generate auth token
//     const authUtil = new AuthUtils();
//     authToken = authUtil.createToken(testUser._id.toString());
//     const chat = await ChatModel.create({
//       userId: testUser._id,
//       title: "Existing Chat",
//     });

//     const response = await request(app)
//       .post("/chat/complete")
//       .set("Cookie", [`jwt=${authToken}`])
//       .send({
//         prompt: "Follow-up message",
//         chatId: chat._id,
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.chatId).toBe(chat._id.toString());
//   }, 100000);
// });

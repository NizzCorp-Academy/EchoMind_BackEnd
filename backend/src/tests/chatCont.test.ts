import "dotenv/config";
import ChatController from "../controllers/chatController";
import ChatService from "../services/chatService";
import MessageService from "../services/messageService";
import PromptService from "../services/promptService";

jest.mock("../services/chatService");
jest.mock("../services/messageService");
jest.mock("../services/promptService");

describe("MessageController", () => {
  const mockMessage = {
    _id:"msg123",
    isFromUser: true,
    chatId: "chat123",
    message: "hello Promopt"
  }

  const mockChat = {
    _id: "123dfffffffffr56",
    userId: "1234567890",
    title: "old title",
  };
  const mockUpdatedChat = {
    _id: "123dfffffffffr56",
    userId: "1234567890",
    title: "new title",
  };
  beforeEach(() => {
    jest.clearAllMocks();

    ChatService.prototype.editTitle = jest
      .fn()
      .mockResolvedValue({
        
      });
    ChatService.prototype.editTitle = jest
      .fn()
      .mockResolvedValue(mockUpdatedChat);

    ChatService.prototype.getUserChatsByUserId = jest
      .fn()
      .mockResolvedValue(mockChat);
    ChatService.prototype.deleteChat = jest.fn().mockResolvedValue(mockChat);
  });
  
  it("should handle chatCompletion when chatId is provided", async () => {
    const chatController = new ChatController();
  
    const chatId = "chat123";
    const prompt = "What is AI?";
    const mockResponse = "AI stands for Artificial Intelligence.";
  
    // Mock methods
    MessageService.prototype.createMessage = jest.fn().mockResolvedValue({});
    PromptService.prototype.chatCompletion = jest.fn().mockResolvedValue(mockResponse);
  
    const result = await chatController.chatCompleation(prompt, chatId);
  
    expect(MessageService.prototype.createMessage).toHaveBeenCalledTimes(2);
    expect(PromptService.prototype.chatCompletion).toHaveBeenCalledWith(chatId);
    expect(result).toEqual({ isFromUer: false, message: mockResponse, chatId });
  });
  
  it("should handle chatCompletion when chatId is not provided but userId is", async () => {
    const chatController = new ChatController();
  
    const prompt = "Tell me a joke.";
    const userId = "user123";
    const generatedResponse = "Why did the scarecrow win an award? Because he was outstanding in his field.";
    const title = "Tell me a joke.";
    const mockChat = { _id: "newChatId" };
  
    PromptService.prototype.promptCompletion = jest.fn().mockResolvedValue(generatedResponse);
    PromptService.prototype.createTitle = jest.fn().mockResolvedValue(title);
    ChatService.prototype.createChat = jest.fn().mockResolvedValue(mockChat);
    MessageService.prototype.createMessage = jest.fn().mockResolvedValue({});
  
    const result = await chatController.chatCompleation(prompt, undefined, userId);
  
    expect(PromptService.prototype.promptCompletion).toHaveBeenCalledWith(prompt);
    expect(PromptService.prototype.createTitle).toHaveBeenCalledWith([
      { isFromUser: true, message: prompt },
      { isFromUser: false, message: generatedResponse },
    ]);
    expect(ChatService.prototype.createChat).toHaveBeenCalledWith(userId, title);
    expect(MessageService.prototype.createMessage).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      isFromUer: false,
      message: generatedResponse,
      chatId: mockChat._id,
    });
  });
  
  it("should throw an error if neither chatId nor userId is provided", async () => {
    const chatController = new ChatController();
    const prompt = "Some prompt";
  
    await expect(chatController.chatCompleation(prompt)).rejects.toThrow(
      "user is not provided"
    );
  });
  
  it("should show all chats for a user", async () => {
    const chatController = new ChatController();
    const allChats = await chatController.getAllChats(mockChat.userId);
    expect(ChatService.prototype.getUserChatsByUserId).toHaveBeenCalledWith(
      mockChat.userId
    );
    expect(allChats).toBeDefined();
  });
  it("should edit chat title", async () => {
    const chatController = new ChatController();
    const updatedChat = await chatController.editChat(
      mockUpdatedChat._id,
      mockUpdatedChat.title
    );
    expect(ChatService.prototype.editTitle).toHaveBeenCalledWith(
      mockChat._id,
      mockUpdatedChat.title
    );
    expect(updatedChat).toBeDefined();
  });

  it("should delete a chat", async () => {
    const chatController = new ChatController();
    const deletedChat = await chatController.deleteChat(
      mockChat.userId,
      mockChat._id
    );
    expect(ChatService.prototype.deleteChat).toHaveBeenCalledWith(
      mockChat._id,
      mockChat.userId
    );
    expect(deletedChat).toBeDefined;
  });
 
});
// describe("MessageController", () => {
//   let req: any;
//   let res: any;
//   let next: any;

//   const mockChat = {
//     _id: "123dfffffffffr56",
//     userId: "1234567890",
//     title: "old title",
//   };
//   const mockUpdatedChat = {
//     _id: "123dfffffffffr56",
//     userId: "1234567890",
//     title: "new title",
//   };
//   beforeEach(() => {
//     req = {
//       body: {
//         chatId: mockChat._id,
//         title: "new title",
//       },
//       userId: mockChat.userId,
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     next = jest.fn();

//     jest.clearAllMocks();

//     ChatService.prototype.editTitle = jest
//       .fn()
//       .mockResolvedValue(mockUpdatedChat);

//     ChatService.prototype.getUserChatsByUserId = jest.fn().mockResolvedValue(mockChat);
//     ChatService.prototype.deleteChat = jest.fn().mockResolvedValue(mockChat);
//   });
//   it("should show all chats for a user", async () => {
//     const chatController = new ChatController();
//     await chatController.getAllChats(req, res, next);
//     expect(ChatService.prototype.getUserChatsByUserId).toHaveBeenCalledWith(
//       req.userId
//     );
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockChat);
//   });
//   it("should edit chat title", async () => {
//     const chatController = new ChatController();
//     await chatController.editChat(req, res, next);
//     expect(ChatService.prototype.editTitle).toHaveBeenCalledWith(
//       mockChat._id,
//       "new title"
//     );
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockUpdatedChat);
//   });

//   it("should delete a chat", async () => {
//     const chatController = new ChatController();
//     await chatController.deleteChat(req, res, next);
//     expect(ChatService.prototype.deleteChat).toHaveBeenCalledWith(
//       mockChat._id,
//       mockChat.userId
//     );
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockChat);
//   });
//   it("shoiuld throw an error if chatId is not provided", async () => {
//     req.body.chatId = undefined;
//     const chatController = new ChatController();
//     await chatController.deleteChat(req, res, next);
//     expect(next).toHaveBeenCalledWith(new Error("Chat ID is required"));
//   });
// });

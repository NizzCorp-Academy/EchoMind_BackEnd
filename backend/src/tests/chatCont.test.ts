import ChatController from "../controllers/chatController";
import ChatService from "../services/chatService";

jest.mock("../services/chatService");

describe("MessageController", () => {
  let req: any;
  let res: any;
  let next: any;

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
    req = {
      body: {
        chatId: mockChat._id,
        title: "new title",
      },
      userId: mockChat.userId,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

    ChatService.prototype.editTitle = jest
      .fn()
      .mockResolvedValue(mockUpdatedChat);

    ChatService.prototype.getUserChatsByUserId = jest.fn().mockResolvedValue(mockChat);
    ChatService.prototype.deleteChat = jest.fn().mockResolvedValue(mockChat);
  });
  it("should show all chats for a user", async () => {
    const chatController = new ChatController();
    await chatController.getAllChats(req, res, next);
    expect(ChatService.prototype.getUserChatsByUserId).toHaveBeenCalledWith(
      req.userId
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockChat);
  });
  it("should edit chat title", async () => {
    const chatController = new ChatController();
    await chatController.editChat(req, res, next);
    expect(ChatService.prototype.editTitle).toHaveBeenCalledWith(
      mockChat._id,
      "new title"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedChat);
  });

  it("should delete a chat", async () => {
    const chatController = new ChatController();
    await chatController.deleteChat(req, res, next);
    expect(ChatService.prototype.deleteChat).toHaveBeenCalledWith(
      mockChat._id,
      mockChat.userId
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockChat);
  });
  it("shoiuld throw an error if chatId is not provided", async () => {
    req.body.chatId = undefined;
    const chatController = new ChatController();
    await chatController.deleteChat(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error("Chat ID is required"));
  });
});

import MessageController from "../controllers/messageController";
import MessageService from "../services/messageService";

jest.mock("../services/messageService");
describe("MessageController", () => {
  const mockMessage = {
    _id: "123dfffffffffr56",
    chatId: "1234567890",
    message: "Hello",
    isFromUser: true,
  };
  beforeEach(() => {
    jest.clearAllMocks();

    MessageService.prototype.getMessagesByChatId = jest
      .fn()
      .mockResolvedValue(mockMessage);

    MessageService.prototype.deleteMessage = jest
      .fn()
      .mockResolvedValue(mockMessage);
  });
  it("should get all messages for a it's chatId", async () => {
    const messageController = new MessageController();
    const messages = await messageController.getAllMessages(mockMessage.chatId);
    expect(MessageService.prototype.getMessagesByChatId).toHaveBeenCalledWith(
      "1234567890"
    );
    expect(messages).toBeDefined();
  });
  it("should delete a message", async () => {
    const messageController = new MessageController();
   const deletedMessage=  await messageController.deleteMessage(mockMessage._id);
    expect(MessageService.prototype.deleteMessage).toHaveBeenCalledWith(
      "123dfffffffffr56"
    );
    expect(deletedMessage).toBeDefined()
    
  });
 
});
// describe("MessageController", () => {
//   let req: any;
//   let res: any;
//   let next: any;

//   const mockMessage = {
//     _id: "123dfffffffffr56",
//     chatId: "1234567890",
//     message: "Hello",
//     isFromUser: true,
//   };
//   beforeEach(() => {
//     req = {
//       body: {
//         chatId: "1234567890",
//         messageId: "123dfffffffffr56",
//       },
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     next = jest.fn();

//     jest.clearAllMocks();

//     MessageService.prototype.getMessagesByChatId = jest
//       .fn()
//       .mockResolvedValue(mockMessage);

//     MessageService.prototype.deleteMessage = jest
//       .fn()
//       .mockResolvedValue(mockMessage);
//   });
//   it("should get all messages for a it's chatId", async () => {
//     const messageController = new MessageController();
//     await messageController.getAllMessages(req, res, next);
//     expect(MessageService.prototype.getMessagesByChatId).toHaveBeenCalledWith(
//       "1234567890"
//     );
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockMessage);
//   });
//   it("should delete a message", async () => {
//     const messageController = new MessageController();
//     await messageController.deleteMessage(req, res, next);
//     expect(MessageService.prototype.deleteMessage).toHaveBeenCalledWith(
//       "123dfffffffffr56"
//     );
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockMessage);
//   });
//   it("should throw an error if messageId is not provided", async () => {
//     req.body.messageId = undefined;
//     const messageController = new MessageController();
//     await messageController.deleteMessage(req, res, next);
//     expect(next).toHaveBeenCalledWith(new Error("Message ID is required"));
//   });
// });

import mongoose from "mongoose";
import MessageModle from "../models/messageModel";
import MessageService from "../services/messageService";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-user-service");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  jest.clearAllMocks();
});
describe("Message Services", () => {
  beforeEach(async () => {
    await MessageModle.deleteMany({});
    jest.clearAllMocks();
  });
  it("should create a message", async () => {
    const isFromUser = true;
    const message = "Hello, how are you?";
    const chatId = new mongoose.Types.ObjectId().toString();

    const messaageService = new MessageService();
    const messageobj = await messaageService.createMessage(
      isFromUser,
      message,
      chatId
    );
    console.log(messageobj);
    expect(messageobj).toBeDefined();
    expect(messageobj.isFromUser).toBe(isFromUser);
    expect(messageobj.message).toBe(message);
    expect(messageobj.chatId.toString()).toBe(chatId);
  });
  it("should delete a message", async () => {
    const isFromUser = true;
    const message = "Hello, how are you?";
    const chatId = new mongoose.Types.ObjectId().toString();
    const messageObj = await MessageModle.create({
      isFromUser,
      message,
      chatId,
    });

    const messageId = messageObj._id.toString();
    const messageService = new MessageService();
    const deletedMessage = await messageService.deleteMessage(messageId);
    expect(deletedMessage).toBeDefined();
    expect(deletedMessage._id.toString()).toBe(messageId);
    expect(deletedMessage.isFromUser).toBe(isFromUser);
    expect(deletedMessage.message).toBe(message);
    const messageAfterDeletion = await MessageModle.findById(messageId);
    expect(messageAfterDeletion).toBeNull();
  });
  it("should return all messages with the same chatId", async () => {
    const chatId = new mongoose.Types.ObjectId().toString();
    await MessageModle.create({
      isFromUser: true,
      message: "hai hellow",
      chatId,
    });
    await MessageModle.create({
      isFromUser: false,
      message: "what do you wnat ",
      chatId,
    });
    const messageService = new MessageService();
    const messages = await messageService.getMessagesByChatId(chatId);
    expect(messages).toBeDefined();
    expect(messages.length).toBe(2);
    expect(messages[0].message).toBe("hai hellow");
    expect(messages[1].message).toBe("what do you wnat ");
  });

  it("should handle edge case for deleteChats ", async () => {
    const messageService = new MessageService();
    await expect(messageService.deleteMessage(" ")).rejects.toThrow(
      "Invalid chatId format"
    );
  });
  it("should handle edge case for getmessagesByChatID", async () => {
    const messageService = new MessageService();
    await expect(messageService.getMessagesByChatId(" ")).rejects.toThrow(
      "Invalid chatId format"
    );
  });
});

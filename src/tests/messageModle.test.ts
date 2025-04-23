import mongoose from "mongoose";
import MessageModle from "../models/messageModel";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-db-message");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Message Model", () => {
  it("Should create a new user", async () => {
    const message = await MessageModle.create({
      isFromUser: true,
      chatId: new mongoose.Types.ObjectId(),
      message: "test message",
    });

    expect(message._id).toBeDefined();
    expect(message.isFromUser).toBe(true);
    expect(message.chatId).toBeDefined();
    expect(message.message).toBe("test message");
  });

  it("should  throw validation schema errors", async () => {
    const message = new MessageModle({});

    try {
      await message.validate();
    } catch (err: any) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.isFromUser).toBeDefined();
      expect(err.errors.chatId).toBeDefined();
      expect(err.errors.message).toBeDefined();
    }
  });

  it("should retun error if username is not provided", async () => {
    await expect(
      MessageModle.create({
        password: "testpassword",
        email: "test@mail.com",
      })
    ).rejects.toThrow();
  });
});

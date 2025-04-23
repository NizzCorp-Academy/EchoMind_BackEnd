import mongoose from "mongoose";
import ChatModel from "../models/chatModel";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-db-user");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Chat Model", () => {
  it("Should create a new chat", async () => {
    const chat = await ChatModel.create({
     userId:"123456789012345678901234",
      title: "test chat",
    });

    expect(chat.title).toBe("test chat");
    expect(chat.userId.toString()).toBe("123456789012345678901234");

  });

  it("should retun error if user._Id(require) is not provided", async () => {
    await expect(
      ChatModel.create({
        title: "test chat",
       
      })
    ).rejects.toThrow();
  });
  it("should store timestamp and id (Default)", async () => {
    const chat = await ChatModel.create({
      userId:"123456789012345678901234",
       title: "test chat",
     });
    expect(chat._id).toBeDefined();
    expect(chat.createdAt).toBeDefined();
    expect(chat.updatedAt).toBeDefined();
  });
});

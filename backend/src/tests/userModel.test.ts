import mongoose from "mongoose";
import UserModel from "../models/userModel";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-db-user");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("User Model", () => {
  it("Should create a new user", async () => {
    const user = await UserModel.create({
      username: "testuser",
      password: "testpassword",
      email: "test@mail.com",
    });

    expect(user._id).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.password).toBe("testpassword");
    expect(user.email).toBe("test@mail.com");
  });

  it("should retun error if username(require) is not provided", async () => {
    await expect(
      UserModel.create({
        password: "testpassword",
        email: "test@mail.com",
      })
    ).rejects.toThrow();
  });
  it("should create timestamp (Default)", async () => {
    const user = await UserModel.create({
      username: "testuser",
      password: "testpassword",
      email: "text@gmail.com",
    });
  
    expect(user.createdAt).toBeDefined();
  });
  
});

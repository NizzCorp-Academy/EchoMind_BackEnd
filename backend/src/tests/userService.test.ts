import mongoose from "mongoose";
import UserModel from "../models/userModel";
import UserService from "../services/userService";
import AuthUtils from "../utils/authUtil";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-user-service");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  jest.clearAllMocks();
});

describe("User Service", () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    jest.clearAllMocks();
  });
  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should log a new user ", async () => {
    const userService = new UserService();
    const email = "testable@mail.com";
    const password = "password123";
    const testUser = await UserModel.create({
      username: "testuser",
      email,
      password,
    });
    console.log(testUser);
    jest.spyOn(AuthUtils.prototype, "comparePassword").mockResolvedValue(true);
    const user = await userService.logninUser(email, password);
    expect(user.email).toBe(email);
    // expect(user.password).not.toBe("password123");
  });

  it("should return a true if user exists with a given email", async () => {
    await UserModel.create({
      username: "testuser",
      email: "testing@mail.com",
      password: "hashedPassword",
    });

    const userService = new UserService();
    const isExist = await userService.doesExistEmail("testing@mail.com");
    expect(isExist).toBe(true);
  });
  it("should return a false if no user exists with a given email", async () => {
    await UserModel.create({
      username: "testuser",
      email: "testing@mail.com",
      password: "hashedPassword",
    });

    const userService = new UserService();
    const isExist = await userService.doesExistEmail("testinganother@mail.com");
    expect(isExist).toBe(false);
  });
  it("Should return a user with a give userId", async () => {
    const user = await UserModel.create({
      username: "testuser",
      email: "test@mail.com",
      password: "hashedPassword",
    });
    const userService = new UserService();
    const foundUser = await userService.getUserById(user._id.toString());

    expect(foundUser._id.toString()).toBe(user._id.toString());
    expect(foundUser.username).toBe("testuser");
  });
  it("Should throw erro if there was no user with the given userId", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const userService = new UserService();

    await expect(() => userService.getUserById(userId)).rejects.toThrow(
      "User not found"
    );
  });
  it("should create a new user", async () => {
    const userService = new UserService();
    jest
      .spyOn(AuthUtils.prototype, "hashPassword")
      .mockResolvedValue("hashedPassword");
    jest.spyOn(UserModel, "create").mockResolvedValue({
      username: "testuser",
      email: "test@mail.com",
      password: "hashedPassword",
    } as any);
    const user = await userService.registerUser(
      "testuser",
      "test@mail.com",
      "password123"
    );
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@mail.com");
    expect(user.password).toBe("hashedPassword");
  });
});

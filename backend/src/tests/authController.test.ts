import AuthClass from "../controllers/authController";
import UserService from "../services/userService";
import AuthUtils from "../utils/authUtil";

jest.mock("../services/userService");
jest.mock("../utils/authUtil");

describe("AuthController", () => {
  describe("register", () => {
    let req: any;
    let res: any;
    let next: any;

    const mockUser = {
      _id: "123abc",
      username: "testuser",
      email: "test@gmail.com",
      password: "testpassword",
    };

    beforeEach(() => {
      req = {
        body: {
          username: "testuser",
          email: "test@gmail.com",
          password: "testpassword",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      next = jest.fn();

      jest.clearAllMocks();

      UserService.prototype.registerUser = jest
        .fn()
        .mockResolvedValue(mockUser);

      AuthUtils.prototype.generateToken = jest
        .fn()
        .mockReturnValue("mocked-token");
    });

    it("should register user and return user object with token", async () => {
      const authController = new AuthClass();
      await authController.register(req, res, next);
      expect(UserService.prototype.registerUser).toHaveBeenCalledWith(
        "testuser",
        "test@gmail.com",
        "testpassword"
      );

      expect(AuthUtils.prototype.generateToken).toHaveBeenCalledWith("123abc");

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "user registered successfully",
        user: mockUser,
        token: "mocked-token",
      });
    });
    it("should throw an error if username, email or password is missing", async () => {
      req.body = { username: "", email: "", password: "" };

      const authController = new AuthClass();

      await expect(authController.register(req, res, next)).rejects.toThrow(
        "User name and Email and password are required"
      );
    });
    it("should throw an error if register fails", async () => {
      UserService.prototype.registerUser = jest.fn().mockRejectedValue(new Error("registration failed"));

      const authController = new AuthClass();

      await expect(authController.register(req, res, next)).rejects.toThrow(
        "registration failed"
      );
    })
  });

  describe("login", () => {
    let req: any;
    let res: any;
    let next: any;

    const mockUser = {
      _id: "mocked-id",
      email: "test@gmail.com",
      username: "testuser",
      // password: "testpassword",
    };

    beforeEach(() => {
      req = {
        body: {
          email: "test@gmail.com",
          password: "testpassword",
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      next = jest.fn();

      jest.clearAllMocks();

      UserService.prototype.logninUser = jest
        .fn()
        .mockResolvedValue(mockUser);

      AuthUtils.prototype.generateToken = jest
        .fn()
        .mockReturnValue("mocked-token");
    });
    it("should login user and return user object with token with 200", async () => {
      const authController = new AuthClass();
      await authController.login(req, res, next);
      expect(UserService.prototype.logninUser).toHaveBeenCalledWith(
        "test@gmail.com",
        "testpassword"
      );
      expect(AuthUtils.prototype.generateToken).toHaveBeenCalledWith("mocked-id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "user logged in successfully",
        user: mockUser,
        token: "mocked-token",
      });
    });
    it("should throw an error if email or password is missing", async () => {
      req.body = { email: "", password: "" };

      const authController = new AuthClass();

      await expect(authController.login(req, res, next)).rejects.toThrow(
        "Email and password are required"
      );
    });
    it("should throw an error if login fails", async () => {
      UserService.prototype.logninUser = jest.fn().mockRejectedValue(new Error("Login failed"));

      const authController = new AuthClass();

      await expect(authController.login(req, res, next)).rejects.toThrow(
        "Error logging in user: Login failed"
      );
    })
  });
});

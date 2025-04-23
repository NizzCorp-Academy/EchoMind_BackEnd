import "dotenv/config";
import { NextFunction, Response, request } from "express";

import UserService from "../services/userService";
import UserControll from "../controllers/userController";

jest.mock("../services/userService");

describe("userController", () => {
  const mockUser = {
    _id: "123abc",
    username: "testuser",
    email: "test@gmail.com",
    password: "testpassword",
  };
  beforeEach(() => {
    jest.clearAllMocks();

    UserService.prototype.getUserById = jest.fn().mockResolvedValue(mockUser);
  });
  it("should get user by id and return user object with 200", async () => {
    const userController = new UserControll();
    const user = await userController.getUser(mockUser._id);
    expect(UserService.prototype.getUserById).toHaveBeenCalledWith("123abc");
   expect(user).toBeDefined()
  });
 
});
// describe("userController", () => {
//     let req: any;
//     let res: Partial<Response>;
//     let next: NextFunction;

//   const mockUser = {
//     _id: "123abc",
//     username: "testuser",
//     email: "test@gmail.com",
//     password: "testpassword",
//   };
//   beforeEach(() => {
//     req = {
//       body: {
//         userId :"123abc",
//       },
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     next = jest.fn();

//     jest.clearAllMocks();

//     UserService.prototype.getUserById = jest.fn().mockResolvedValue(mockUser);
//   });
//   it("should get user by id and return user object with 200", async () => {
//     const userController = new UserControll();
//     await userController.getUser(req, res as Response, next);
//     expect(UserService.prototype.getUserById).toHaveBeenCalledWith("123abc");
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockUser);
//   });
//     it("should call next with error ", async () => {
//         const error = new Error("error message");
//         (UserService.prototype.getUserById as jest.Mock).mockRejectedValue(error);
//         const userController = new UserControll();
//         await userController.getUser(req, res as Response, next);
//         expect(next).toHaveBeenCalledWith(error);
//     });
// });

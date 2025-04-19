import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";

class UserControll {
  async getUser(userId: string) {
    const userService = new UserService();
    throw new Error("random error");
    const user = await userService.getUserById(userId);
    return user;
  }
}

export default UserControll;

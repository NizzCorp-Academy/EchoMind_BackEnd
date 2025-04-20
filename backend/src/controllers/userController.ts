import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";

class UserControll {
  async getUser(userId: string) {
    const userService = new UserService();
    const user = await userService.getUserById(userId);
    return user;
  }
}

export default UserControll;

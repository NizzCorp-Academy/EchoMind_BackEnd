import { Request, Response, NextFunction } from "express";
import AuthUtils from "../utils/authUtil";
import UserService from "../services/userService";

const userService = new UserService();

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUtils = new AuthUtils();
  try {
    const { username, email, password } = req.body;
    const user = await userService.registerUser(username, email, password);
    const token = authUtils.generateToken(user._id);
    res.status(201).json({ ...user, token });
  } catch (error) {
    next(error);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUtils = new AuthUtils();
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = authUtils.generateToken(user._id);
    res.status(201).json({ ...user, token });
  } catch (error) {
    next(error);
  }
};

/**
 * @file authController.ts
 * @author Muhammad Haseen
 * @brief Controller for handling user authentication.
 * 
 * This file contains the `AuthClass` which provides methods for user registration
 * and login functionality.
 */

import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import AuthUtils from "../utils/authUtil";

/**
 * @class AuthClass
 * @brief Handles user authentication operations.
 */
class AuthClass {
  /**
   * @brief Registers a new user.
   * 
   * This method handles the registration of a new user by validating the input,
   * creating the user, and generating an authentication token.
   * 
   * @param req The HTTP request object containing user details (username, email, password).
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * 
   * 
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const authUtils = new AuthUtils();
      const {
        username,
        email,
        password,
      }: { username: string; email: string; password: string } = req.body;
      if (!username || !email || !password) {
        throw new Error("User name and Email and password are required");
      }

      const user = await userService.registerUser(username, email, password);
      const token = authUtils.generateToken(user._id);
      res.status(201).json({
        message: "user registered successfully",
        user,
        token,
      });

    } catch (error: any) {  
     next(error);
    }
  }

  /**
   * @brief Logs in an existing user.
   * 
   * This method handles user login by validating the input, authenticating the user,
   * and generating an authentication token.
   * 
   * @param req The HTTP request object containing user credentials (email, password).
   * @param res The HTTP response object used to send the response.
   * @param next The next middleware function in the Express pipeline.
   * 
   * 
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const authUtils = new AuthUtils();
      const { email, password }: { email: string; password: string } = req.body;
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const user = await userService.logninUser(email, password);
      
      const token = authUtils.generateToken(user._id);
      res.status(200).json({
        message: "user logged in successfully",
        user,
        token,
      });
    } catch (error: any) {
    next(error);
    }
  }
}

export default AuthClass;
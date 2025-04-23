/**
 * @author Jaseem
 * @file ValidationMiddleware.ts
 * @brief Middleware for validating request bodies using Joi schemas.
 *
 * This file defines the `ValidationMiddleware` class, which includes methods
 * to validate request bodies for various API endpoints using Joi validation schemas.
 *
 * @module ValidationMiddleware
 */

import { Request, Response, NextFunction } from "express";
import ValidationJoi from "../utils/validationUtils";

/**
 * @class ValidationMiddleware
 * @classdesc Contains middleware functions to validate request bodies using Joi schemas.
 */
class ValidationMiddleware {
  /**
   * Validates user registration data.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async registerValidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    validate.registerSchema.validateAsync(req.body);
    next();
  }

  /**
   * Validates user login data.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async loginValidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    await validate.loginSchema.validateAsync(req.body);
    console.log("atleast this works");
    next();
  }

  /**
   * Validates data for creating a new chat.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async chatvalidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    const { id: chatId } = req.params;
    const { prompt } = req.body;
    await validate.createChatSchema.validateAsync({ prompt, chatId });
    next();
  }

  /**
   * Validates data for updating a chat.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async updatechatvalidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    const { id: chatId } = req.params;
    const { title } = req.body;
    await validate.updateChatSchema.validateAsync(chatId, title);
    next();
  }

  /**
   * Validates data for deleting a chat.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async delchatvalidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    const { id: chatId } = req.params;
    await validate.deleteChatSchema.validateAsync({ chatId });
    next();
  }

  /**
   * Validates request body for fetching all messages in a chat.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async getmessagevalidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    const { id: chatId } = req.params;
    await validate.getAllMessagesSchema.validateAsync({ chatId });
    next();
  }

  /**
   * Validates request body containing a message ID.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction callback.
   */
  async messageidvalidation(req: Request, res: Response, next: NextFunction) {
    const validate = new ValidationJoi();
    const { id } = req.params;
    await validate.messageIdSchema.validateAsync({ id });
    next();
  }
}

export default ValidationMiddleware;

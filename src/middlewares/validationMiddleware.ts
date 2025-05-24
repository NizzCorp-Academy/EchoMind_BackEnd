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
import ValidationJoi from "../utils/validationUtils.js";

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
    registerValidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { error } = validate.registerSchema.validate(req.body);
        if (error) next(error);

        next();
    }

    /**
     * Validates user login data.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    loginValidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { error } = validate.loginSchema.validate(req.body);
        if (error) next(error);
        next();
    }

    /**
     * Validates data for creating a new chat.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    chatvalidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { prompt, chatId } = req.body;
        const { error } = validate.createChatSchema.validate({
            prompt,
            chatId,
        });
        if (error) next(error);
        next();
    }

    /**
     * Validates data for updating a chat.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    updatechatvalidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { id } = req.params;
        const { title } = req.body;
        const { error, value } = validate.updateChatSchema.validate({
            chatId: id,
            title,
        });
        if (error) next(error);
        next();
    }

    /**
     * Validates data for deleting a chat.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    delchatvalidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { id: chatId } = req.params;
        const { error } = validate.deleteChatSchema.validate({ chatId });
        if (error) next(error);
        next();
    }

    /**
     * Validates request body for fetching all messages in a chat.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    getmessagevalidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { id: chatId } = req.params;
        const { error } = validate.getAllMessagesSchema.validate({ chatId });
        if (error) next(error);
        next();
    }

    /**
     * Validates request body containing a message ID.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @param next - Express NextFunction callback.
     */
    messageidvalidation(req: Request, res: Response, next: NextFunction) {
        const validate = new ValidationJoi();
        const { id } = req.params;
        const { error } = validate.messageIdSchema.validate({ id });
        if (error) next(error);
        next();
    }
}

export default ValidationMiddleware;

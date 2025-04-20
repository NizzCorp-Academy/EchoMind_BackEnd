import Joi from "joi";

/**
 * @class ValidationJoi
 * @brief Utility class for validating request payloads using Joi schemas.
 *
 * This class contains Joi schemas for validating various request payloads,
 * such as user registration, login, chat creation, chat updates, and message-related operations.
 */
class ValidationJoi {
  /**
   * @brief Schema for validating user registration payloads.
   *
   * Validates:
   * - `username`: A string between 3 and 30 characters (required).
   * - `email`: A valid email address (required).
   * - `password`: A string between 6 and 30 characters (required).
   */
  registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  /**
   * @brief Schema for validating user login payloads.
   *
   * Validates:
   * - `email`: A valid email address (required).
   * - `password`: A string between 6 and 30 characters (required).
   */
  loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  /**
   * @brief Schema for validating chat creation payloads.
   *
   * Validates:
   * - `title`: A string between 3 and 50 characters (optional).
   * - `userId`: A string representing the user ID (required).
   */
  createChatSchema = Joi.object({
    title: Joi.string().min(3).max(50),
    userId: Joi.string().required(),
  });

  /**
   * @brief Schema for validating chat update payloads.
   *
   * Validates:
   * - `chatId`: A string representing the chat ID (required).
   * - `title`: A string between 3 and 50 characters (optional).
   */
  updateChatSchema = Joi.object({
    chatId: Joi.string().required(),
    title: Joi.string().min(3).max(50),
  });

  /**
   * @brief Schema for validating chat deletion payloads.
   *
   * Validates:
   * - `chatId`: A string representing the chat ID (required).
   * - `userId`: A string representing the user ID (required).
   */
  deleteChatSchema = Joi.object({
    chatId: Joi.string().required(),
    userId: Joi.string().required(),
  });

  /**
   * @brief Schema for validating payloads to retrieve all messages for a chat.
   *
   * Validates:
   * - `chatId`: A string representing the chat ID (required).
   */
  getAllMessagesSchema = Joi.object({
    chatId: Joi.string().required(),
  });

  /**
   * @brief Schema for validating payloads to retrieve or delete a specific message.
   *
   * Validates:
   * - `messageId`: A string representing the message ID (required).
   */
  messageIdSchema = Joi.object({
    messageId: Joi.string().required(),
  });
}

export default ValidationJoi;
import { Request, Response, NextFunction } from "express";
import ErrorMessage from "../utils/errorMessage";

/**
 * @author: Haseen
 * @description: Middleware to handle errors in Express applications.
 * @param {Object} error - The error object thrown in the application.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @throws {void} - This function does not throw any errors.
 */
export const errorHandler = (
  error: ErrorMessage,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500; // Default to 500 if undefined
  const message = error.message || "Internal Server Error"; // Default message

  console.log("From Error Handler:", statusCode, message);

  res.status(statusCode).json({ message });
};
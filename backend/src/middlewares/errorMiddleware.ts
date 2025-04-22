import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "../utils/errorMessasge";
import Joi from "joi";

/**
 * @author Muhammad Haseen
 * @date 2025-04-18
 * @file errorMiddleware.ts
 * @brief Middleware for handling errors in the application.
 *
 * This middleware captures errors thrown during request processing and sends
 * appropriate HTTP responses based on the error type.
 *
 * @param err The error object, which can be an instance of `ErrorMessage` or a generic error.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next The next middleware function in the Express pipeline.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("from error handler", err);
  if (err instanceof ErrorMessage) {
    // Handle application-specific errors
    res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
    });
  } else if (err.isJoi === true) {
    console.log("joi error");
    // Handle unexpected errors
    res.status(400).json({
      // status: "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

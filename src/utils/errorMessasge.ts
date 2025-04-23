/**
 * @class ErrorMessage
 * @file errorMessasge.ts
 * @brief Custom error class for handling application-specific errors.
 *
 * This class extends the built-in `Error` class to include additional properties
 * such as `statusCode` and `isOperational` for better error handling.
 * @date 2025-04-18
 * @author Muhammad Haseen
 */
export class ErrorMessage extends Error {
  /**
   * @brief HTTP status code associated with the error.
   */
  statusCode: number;
  errorCode: string;

  /**
   * @brief Indicates if the error is operational (expected) or not.
   */
  isOperational: boolean;

  /**
   * @brief Constructs a new ErrorMessage instance.
   *
   * @param message The error message.
   * @param statusCode The HTTP status code (default is 500).
   * @param isOperational Whether the error is operational (default is true).
   */
  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

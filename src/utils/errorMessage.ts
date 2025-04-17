class ErrorMessage extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message); // Call the parent Error class
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor); // Captures where the error was thrown
    }
  }
  
  export default ErrorMessage;
  
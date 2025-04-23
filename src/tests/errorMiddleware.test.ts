import { errorHandler } from "../middlewares/errorMiddleware";
import { ErrorMessage } from "../utils/errorMessasge";

describe("Error Middleware", () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should handle known ErrorMessage correctly", () => {
    const error = new ErrorMessage("Custom error", 400, "testing");

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "error",
      message: "Custom error",
    });
  });
  it("should handle unexpected errors with status 500", () => {
    const error = new Error("Something went wrong");

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "error",
      message: "Internal Server Error",
    });
  });
  it("should not call next()", () => {
    const error = new Error("Test error");

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
  });
});

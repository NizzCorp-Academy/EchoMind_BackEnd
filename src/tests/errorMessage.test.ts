import { ErrorMessage } from "../utils/errorMessasge";

describe("ErrorMessage", () => {
  it("should initialize with message and status code", () => {
    const error = new ErrorMessage("Test error", 404, "testing");
    expect(error.message).toBe("Test error");
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
  });
  it("should initialize with default status code and operational flag", () => {
    const error = new ErrorMessage("Test error", 400, "testing");
    expect(error.message).toBe("Test error");
    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
  });
  it("should be an instance of Error and ErrorMessage", () => {
    const error = new ErrorMessage("Test error", 400, "testing");
    expect(error instanceof Error).toBe(true);
    expect(error instanceof ErrorMessage).toBe(true);
  });
  it("should capture stack trace correctly", () => {
    const error = new ErrorMessage("Trace this", 400, "testing");

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("Trace this");
  });
});

import "dotenv/config";
import express, { Router, Request, Response, NextFunction } from "express";
import AuthUtils from "../utils/authUtil";
import mongoose from "mongoose";
import request from "supertest";
import cookieParser from "cookie-parser";
import AuthMiddlewares from "../middlewares/authMiddleware";

const { authenticatedRoute } = new AuthMiddlewares();

const testApp = express();
testApp.use(cookieParser());
testApp.use(express.json());

let decodedUSerId: string;

const testController = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("this is getting through");
    decodedUSerId = req.userId;
    res.status(200).json({ decodedUSerId });
  } catch (error: any) {
    const ErrorMessage = error?.message || "internal server error";
    next(ErrorMessage);
  }
};
testApp.get("/endpoint", authenticatedRoute, testController);

testApp.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

describe("Auth Middleware", () => {
  it("should throw error when there is no token", async () => {
    const response = await request(testApp).get("/endpoint");
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("token is not Provided");
  });

  it("should throw error when there is invalid token", async () => {
    const token = "someinvalidtoken";
    const response = await request(testApp)
      .get("/endpoint")
      .set("Cookie", [`jwt=${token}`]);
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("invalid token");
  });
  it("should authenticate the user if the token is valid", async () => {
    const authUtil = new AuthUtils();
    const newUserId = new mongoose.Types.ObjectId().toString();
    const jwt = authUtil.createToken(newUserId);

    const response = await request(testApp)
      .get("/endpoint")
      .set("Cookie", [`jwt=${jwt}`])
      .send({});

    console.log(response.statusCode);
    expect(response.statusCode).toBe(200);
    expect(response.body.decodedUSerId).toBe(newUserId);
  });
});

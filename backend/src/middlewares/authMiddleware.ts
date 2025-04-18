import { Request, Response, NextFunction } from "express";
import AuthUtils from "../utils/authUtil";

/**
 * @author Jaseem
 * @file authMiddleware.ts
 *
 *
 * @function authenticatedRoute
 * @brief a middleware funtion for authenticating the user and setting the req.userId with the jwt payload
 * @param req express request object
 * @param res express response object
 * @param next express nextfunction for calling the next middleware
 * @return this funciton will return the req obj with the userId as the jwt payload
 */
export const authenticatedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUtils = new AuthUtils();
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("token is not Provided");
    }
    const decode = authUtils.verifyToken(token);
    if (!decode) {
      throw new Error("invalid token");
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    next(error);
  }
};

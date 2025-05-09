import { Request, Response, NextFunction } from "express";
import AuthUtils from "../utils/authUtil.js";
import { ErrorMessage } from "../utils/errorMessasge.js";

/**
 * @author Jaseem
 * @file authMiddleware.ts
 *
 *
 * @function authenficatedRoute
 * @brief a middleware funtion for authenticating the user and setting the req.userId with the jwt payload
 * @param req express request object
 * @param res express response object
 * @param next express nextfunction for calling the next middleware
 * @return this funciton will return the req obj with the userId as the jwt payload
 */
class AuthMiddlewares {
    authenticatedRoute(req: Request, res: Response, next: NextFunction) {
        const authUtils = new AuthUtils();
        if (!req.cookies.jwt) {
            throw new ErrorMessage("token is not Provided", 400, "a-mdlw-01");
        }
        // const { token } = req.cookies.jwt;
        const { jwt: token } = req.cookies;
        const decode = authUtils.verifyToken(token);
        // if (decode === null) {
        // throw new Error("invalid token");
        // }
        req.userId = decode.userId;
        next();
    }
}

export default AuthMiddlewares;

/**
 * @file authRoute.ts
 * @brief Defines authentication-related routes.
 * @author Jaseem
 *
 * This file sets up the Express routes for user authentication,
 * including user registration and login. Each route includes
 * validation middleware to ensure request data conforms to the
 * expected schema.
 */

import { Router } from "express";
import AuthClass from "../controllers/authController";
import ValidationMiddleware from "../middlewares/validationMiddleware";
import { Request, Response, NextFunction } from "express";

const { registerValidation, loginValidation } = new ValidationMiddleware();

const authRoute = Router();

/**
 * @route POST /register
 * @description Handles user registration.
 * @middleware registerValidation - Validates the request body using Joi.
 * @controller register - Controller method that processes the registration.
 */
authRoute.post(
  "/register",
  registerValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const { register } = new AuthClass();
    const { username, email, password } = req.body;
    const { user, token } = await register(username, email, password);
    res.status(200).json({ status: "success", user, token });
    next();
  }
);

/**
 * @route POST /login
 * @description Handles user login.
 * @middleware loginValidation - Validates the request body using Joi.
 * @controller login - Controller method that processes the login.
 */
authRoute.post(
  "/login",
  loginValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const { login } = new AuthClass();
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json({ status: "success", user, token });
    next();
  }
);

export default authRoute;

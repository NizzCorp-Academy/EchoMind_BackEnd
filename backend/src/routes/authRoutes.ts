import { Router } from "express";
import AuthClass from "../controllers/authController";

const { register, login } = new AuthClass();

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;

import { Router } from "express";
import UserControll from "../controllers/userController.js";
import AuthMiddlewares from "../middlewares/authMiddleware.js";
import { Request, Response, NextFunction } from "express";

const { authenticatedRoute } = new AuthMiddlewares();

const userRoutes = Router();

userRoutes.get(
    "/me",
    authenticatedRoute,
    async (req: Request, res: Response, next: NextFunction) => {
        const { getUser } = new UserControll();
        const userId = req.userId;
        const user = await getUser(userId);
        console.log(user);
        res.status(200).json({ status: "success", user });
        next();
    }
);

userRoutes.post("/set", (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    }).json({ success: true });
});

export default userRoutes;

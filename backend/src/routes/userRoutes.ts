import { Router } from "express";
import UserControll from "../controllers/userController";
import AuthMiddlewares from "../middlewares/authMiddleware";
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
    res.status(200).json(user);
    next();
  }
);

userRoutes.get("/set", (req: Request, res: Response, next: NextFunction) => {
  const token = req.body;
  res
    .cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    })
    .json({ success: true });
});

export default userRoutes;

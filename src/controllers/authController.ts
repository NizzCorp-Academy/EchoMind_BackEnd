import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";

// interface User {
//     userName: string;
//     password: string;
//     email: string;
// }
class AuthClass {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      //    const user: User = {
      //         userName: req.body.userName,
      //         password: req.body.password,
      //         email: req.body.email
      //     };

      const { userName, password, email } = req.body;

      if (!userName || !password || !email) {
        throw new Error("All fields are required");
      }
      const isUserExist = await UserModel.findOne({ email: email });
      if (isUserExist) {
        throw new Error("User already exists");
      }
      const user = {
        userName,
        password,
        email,
      };
      const newUser = await UserModel.create(user);
      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("All fields are required");
      }
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }
      
      res.status(200).json({
        message: "User logged in successfully",
        user: {
            ...user,password : undefined 
            // userName: user.userName,
            // email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

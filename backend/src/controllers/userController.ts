import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";

class UserControll{
    async getUser (req:Request, res:Response, next:NextFunction) {
        try {
            const userId:string = req.body.userId;
            const userService = new UserService();
            const user = await userService.getUserById(userId);
        
            res.status(200).json(user);
        } catch (error: any) {
           next(error);
        }
    }
}

export default UserControll;
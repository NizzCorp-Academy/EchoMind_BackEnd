import mongoose from "mongoose";

export interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

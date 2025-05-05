import mongoose from "mongoose";

export interface MessageDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    isFromUser: boolean;
    chatId: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

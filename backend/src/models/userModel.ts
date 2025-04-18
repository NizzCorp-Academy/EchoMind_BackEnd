import mongoose, { Document, model, Schema } from "mongoose";

interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * @author: Jaseem
 * @file: userModel.ts
 * @brief: This file defines the User schema and model for MongoDB using Mongoose.
 * @details: The User schema includes fields for username, email, and password. The model is exported for use in other parts of the application.
 * @date: 2025-04-16
 * @version: 1.0.0
 *
 */
const userSchema = new Schema<UserDocument>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;

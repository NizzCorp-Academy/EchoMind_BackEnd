import mongoose, { model, Schema } from "mongoose";


/**
 * @class User
 * @file userModel.ts
 * @author Muhammad Haseen
 * @date 2025-04-17
 * @brief Represents a user in the system.
 *
 * @property {string} userName - The user name.
 * @property {string} email - The user's email (unique).
 * @property {string} password - The hashed password.
 */

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;

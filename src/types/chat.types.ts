import mongoose from "mongoose";

/**
 * @interface ChatDocument
 * @brief Interface representing a Chat document in MongoDB.
 *
 * @extends Document
 *
 * @property {mongoose.Types.ObjectId} _id - The unique identifier for the chat.
 * @property {mongoose.Types.ObjectId} userId - The ID of the user associated with the chat.
 * @property {string} title - The title of the chat.
 * @property {Date} [createdAt] - The timestamp when the chat was created (auto-generated).
 * @property {Date} [updatedAt] - The timestamp when the chat was last updated (auto-generated).
 */
export interface ChatDocument extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * @file chatModel.ts
 * @brief Mongoose model for the Chat collection.
 * @author Muhammad Haseen
 * @date 2025-04-18
 * This file defines the schema and model for the Chat collection in MongoDB.
 * It includes fields for the chat ID, user ID, title, and timestamps.
 */

import mongoose, { model, Schema } from "mongoose";
import { ChatDocument } from "../types/chat.types";

/**
 * @const chatSchema
 * @brief Mongoose schema for the Chat collection.
 *
 * Defines the structure of the Chat documents in MongoDB, including field types,
 * references, and validation rules.
 */
const chatSchema = new Schema<ChatDocument>(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * @const ChatModel
 * @brief Mongoose model for the Chat collection.
 *
 * Provides an interface for interacting with the Chat collection in MongoDB.
 */
const ChatModel = model<ChatDocument>("Chat", chatSchema);

export default ChatModel;

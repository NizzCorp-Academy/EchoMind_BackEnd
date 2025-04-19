import mongoose, { Document, model, Schema } from "mongoose";

interface MessageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  isFromUser: boolean;
  chatId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<MessageDocument>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    isFromUser: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModle =
  models.Message || model<MessageDocument>("User", userSchema);

export default MessageModle;

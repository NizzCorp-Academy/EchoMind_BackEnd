import mongoose, { Document, model, models, Schema } from "mongoose";

interface MessageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  isFromUser: boolean;
  chatId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const messagSchema = new Schema<MessageDocument>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    message: { type: String, required: true },
    isFromUser: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModle = model<MessageDocument>("Message", messagSchema);

export default MessageModle;

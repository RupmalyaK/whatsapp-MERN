import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    socketId:{
      type:String,
      maxLength:120,
    },
    displayName: {
      type: String,
      maxLength: 20,
      required: true,
    },
    friendList:{
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    email: {
      type: String,
      maxLength: 32,
      required: true,
    },
    password: {
      type: String,
      maxLength: 32,
      required: true,
    },
    profileImage: {
      data: { type: Buffer, default: [] },
      contentType: { type: String, default: "" },
    },
    chatRooms: {
      type: [{ type: Schema.Types.ObjectId, ref: "chatRoom" }],
      default: [],
    },
    status: {
      type: String,
      maxLength: 120,
      required: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);

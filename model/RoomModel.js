import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    users:{
      type:[{type:Schema.Types.ObjectId, ref:"user"}],
      required:[true, "Please provide users in the room when created"],
    },
    chats: {
      type: [{
        sender:{
          type:Schema.Types.ObjectId,
          ref:"user",
          required:true,
        },
        text: {
          type: String,
          maxlength: 120,
          required: [true, 'Please provide the text of the chat'],
          trim: true,
        },
        time:{
          type:Date,
          default:Date.now(),
        }
      }],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("chatRoom", roomSchema);

import RoomModel from "../model/RoomModel.js";
import UserModel from "../model/UserModel.js";
import mongoose from "mongoose";
import { io } from "../server.js";



export const createRoomAndJoin = async (socket, data) => {
  const { userId, user2Id } = data;
  try {
    console.log("debuggooo");
    const { _id: roomId } = await RoomModel.create({
      users: [userId, user2Id],
    });
    const user1 = await UserModel.findById(userId);
    const user2 = await UserModel.findById(user2Id);
    if (!user1) {
      throw new Error(`user with id ${userId} does not exist`);
    }
    if (!user2Id) {
      throw new Error(`user with id ${user2Id} does not exist`);
    }
    socket.join(roomId);
    const {socketId:otherUserSocketId} = user2; 
    user1.chatRooms.push(roomId);
    user2.chatRooms.push(roomId);
    io.in(roomId).emit("room-created");
    io.to(otherUserSocketId).emit("req-join-room",roomId);
    await user1.save();
    await user2.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const sendMessage = async (data) => {
  const { userId, roomId, text,socketId,roomIndex } = data;
  console.log(data);
  try {
    const room = await RoomModel.findById(roomId);
    const newChat = {
      sender: mongoose.Types.ObjectId(userId),
      text,
      time:Date.now()
    }
    room.chats.push(newChat);
    await room.save();
    io.in(roomId).emit("msg-sent", {...newChat,roomId,roomIndex});
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setSocketId = async (data,socketId) => {
  const {userId} = data;
  try{
    await UserModel.findByIdAndUpdate(userId,{socketId});
  }
  catch(err)
    {
      console.log(err);
    }
  
}

export const justJoinRoom = (socket,data) => {
  console.log(data.roomId);
  socket.join(data.roomId);
}

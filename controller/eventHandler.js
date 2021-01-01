import RoomModel from "../model/RoomModel.js";
import UserModel from "../model/UserModel.js";
import mongoose from "mongoose";
import { io } from "../server.js";



export const createRoomAndJoin = async (socket, data, userSendingMsg) => {
  const { userId, user2Id } = data;
  try {
    if (userSendingMsg[userId] && userSendingMsg[user2Id])
      {
        throw new Error("User already joining room");
      }
    userSendingMsg[userId] = true;
    userSendingMsg[user2Id] = true;  
  
    const user1 = await UserModel.findById(userId);
    const user2 = await UserModel.findById(user2Id);
   
    if (!user1) {
      throw new Error(`user with id ${userId} does not exist`);
    }
    if (!user2Id) {
      throw new Error(`user with id ${user2Id} does not exist`);
    }
    for(let i = 0; i <= user2.friendList.length - 1; i++)
    {
      if(userId.toString() === user2.friendList[i].toString())
        {
          throw new Error("Already friend"); 
        }
    }
    const { _id: roomId } = await RoomModel.create({
      users: [userId, user2Id],
    });
    socket.join(roomId);
    const {socketId:otherUserSocketId} = user2; 
    user1.chatRooms.push(roomId);
    user1.friendList.push(user2._id);
    user2.chatRooms.push(roomId);
    user2.friendList.push(user1._id);
    delete userSendingMsg.userId;
    delete userSendingMsg.user2Id;
    await user1.save();
    await user2.save();
    io.in(roomId).emit("room-created");
    io.to(otherUserSocketId).emit("req-join-room", roomId);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const sendMessage = async (data,socket) => {
  const { userId, roomId, text,roomIndex } = data;
 
  try {
    const room = await RoomModel.findById(roomId);
    const newChat = {
      sender: mongoose.Types.ObjectId(userId),
      text,
      time:Date.now()
    }
    room.chats.push(newChat);
    await room.save();
    socket.to(roomId).emit("msg-sent", {...newChat,roomId,roomIndex});
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setSocketId = async (data,socketId) => {
  const {userId} = data;

  try{
    await UserModel.findByIdAndUpdate(mongoose.Types.ObjectId(userId),{socketId});
  }
  catch(err)
    {
      console.log(err);
    }
  
}

export const justJoinRoom = (socket,data) => {
  socket.join(data.roomId);
}

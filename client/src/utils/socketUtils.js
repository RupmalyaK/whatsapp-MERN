import io from "socket.io-client";
import { store } from "../store";
import { getNewChatFromSocket } from "../store/actions/roomAction.js";
import { getUserDetail } from "../store/actions/userAction.js";
import { updateUserById } from "../api/usersApi.js";

export const socket = io("/");

socket.on("msg-sent", (data) => {
  store.dispatch(getNewChatFromSocket(data));
});

socket.on("room-created", () => {
  store.dispatch(getUserDetail());
});

socket.on("req-join-room", (roomId) => {
  store.dispatch(getUserDetail());
  justJoinRoom(roomId);
});

export const createRoomAndJoinSocket = (userId, user2Id) => {
  socket.emit("join-room", { userId, user2Id });
};

export const justJoinRoom = (roomId) => {
  socket.emit("just-join-room", { roomId });
};

export const sendMessageSocket = ({ userId, roomId, text }) => {
  console.log("this is the socket id", socket.id);
  socket.emit("send-msg", { userId, roomId, text, socketId: socket.id });
};

export default socket;

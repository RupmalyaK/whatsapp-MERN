import io from "socket.io-client";
import { store } from "../store";
import { getNewChatFromSocket } from "../store/actions/roomAction.js";
import {getUserDetail} from "../store/actions/userAction.js";

export const socket = io("http://localhost:5000");

/*io.engine.generateId = () => {
  return 1;
}*/
socket.on("connect", () => {
  const userId = store.getState().user.id;
  socket.emit("connected", {userId});
});

socket.on("msg-sent", (data) => {

  store.dispatch(getNewChatFromSocket(data));
});

socket.on("room-created", () => {
  store.dispatch(getUserDetail());
})

socket.on("req-join-room",roomId => {
  store.dispatch(getUserDetail());
  justJoinRoom(roomId);
})

socket.on("disconnect", () => {
  //  console.log("is socket connected", socket.connected); // true
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

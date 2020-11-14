import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  displayName: "",
  profileImage: null,
  email: "",
  chatRooms: null,
  lastSeen: null,
  accountCreatedAt: "",
  searchedUsers: [],
  id: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case actionTypes.SET_USER_DETAIL: {
      const {
        displayName,
        profileImage,
        email,
        chatRooms,
        lastSeen,
        createdAt,
        _id: id,
      } = payLoad;
      return {
        ...state,
        displayName,
        profileImage,
        email,
        chatRooms,
        lastSeen,
        accountCreatedAt: createdAt,
        id,
      };
    }
    case actionTypes.GET_USERS_BY_NAME:
      return { ...state, searchedUsers: payLoad };

    case actionTypes.GET_MESSAGE: {
      const { roomIndex, roomId, ...newChat } = payLoad;
      let chatRooms = [...state.chatRooms];
      let newChatInRoom;

      chatRooms = chatRooms.filter((room) => {
        if (room._id === roomId) {
          newChatInRoom = room;
          return false;
        }
        return true;
      });
      console.log("this is chatRooms before shift", chatRooms);
      newChatInRoom.chats.push(newChat);
      chatRooms.unshift(newChatInRoom);
      return { ...state, chatRooms };
    }
    default:
      return state;
  }
};

export default userReducer;

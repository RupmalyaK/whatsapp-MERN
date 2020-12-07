import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  prevDisplayName:"",
  displayName: "",
  profileImage: null,
  email: "",
  chatRooms: null,
  lastSeen: null,
  accountCreatedAt: "",
  searchedUsers: [],
  id: "",
  prevStatus:"",
  friendList:null,
  status: "",
  updatingDisplayName: false,
  updatingStatus: false,
  updatingPhoto: false,
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
        status,
        _id: id,
        prevStatus,
        prevDisplayName,
        friendList,
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
        status,
        prevStatus,
        prevDisplayName,
        friendList,
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

    case actionTypes.SET_UPDATING_DISPLAY_NAME:
      return { ...state, updatingDisplayName: true };
    case actionTypes.UNSET_UPDATING_DISPLAY_NAME:
      return { ...state, updatingDisplayName: false };

    case actionTypes.SET_UPDATING_PHOTO:
      return { ...state, updatingPhoto: true };
    case actionTypes.UNSET_UPDATING_PHOTO:
      return { ...state, updatingPhoto: false };

    case actionTypes.SET_UPDATING_STATUS:
      return { ...state, updatingStatus: true };
    case actionTypes.UNSET_UPDATING_STATUS:
      return { ...state, updatingStatus: false };

    default:
      return state;
  }
};

export default userReducer;

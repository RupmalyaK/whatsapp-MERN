import * as actionTypes from "./actionTypes.js";



const createAction = (type, payLoad) => {
    return { type, payLoad };
  };

  
export const setCurrentRoom = (roomId) => {
    return createAction(actionTypes.SET_CURRENT_ROOM,roomId);
}

export const getNewChatFromSocket = (newChat) =>
  {
    return createAction(actionTypes.GET_MESSAGE,newChat)
  }


import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
currentChatRoomId:null,
};

const roomReducer = (state = INITIAL_STATE, action) => {
    const {type,payLoad} = action;
    
    switch(type)
        {
            case actionTypes.SET_CURRENT_ROOM:
                return {...state,currentChatRoomId:payLoad};
            default:
                return state;
        }
}

export default roomReducer;
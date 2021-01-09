import * as actionTypes from "./actionTypes.js";
import * as authApi from "../../api/authApi.js";
import * as usersApi from "../../api/usersApi.js";
import cookies from "js-cookie";


const arrayToMap = (arr) => {
  const obj = {};
  arr.forEach(ele => {
    obj[ele] = true;
  });
  return obj;
}
const createAction = (type, payLoad) => {
  return { type, payLoad };
};

export const signUpAsync = (formData) => {
  return async (dispatch,getState) => {
    try {
    
      const isSigningUp = getState().user.isSigningUp;
      if(isSigningUp)
        {
          return;
        }
       dispatch(createAction(actionTypes.IS_SIGNING_UP));
      const user = await authApi.signup(formData);
      cookies.set("accesToken", user.accessToken, { expires: 365, path: "/" });
      user.friendList = arrayToMap(user.friendList);
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      const errors = err.response.data.errors;
      const emailErrors = [];
      const displayNameErrors = []; 
      const passwordErrors = []; 
      errors.forEach(error => {
        const errorMsg = error.msg.split(' ');
        const firstElement = errorMsg.shift();
      switch (firstElement)
        {
          case "Display-name":
            displayNameErrors.push(errorMsg.join(' '));
            break;
          case "Password":
            passwordErrors.push(errorMsg.join(' '));
            break;
          case "Email":
            emailErrors.push(errorMsg.join(' '));
            break;  
        }
      });
    
      dispatch(createAction(actionTypes.SET_SIGN_UP_ERRORS, {
       emailErrors,
       displayNameErrors,
       passwordErrors,
      }))
    }
  };
};

export const signInAsync = (email, password, socketId) => {

  return async (dispatch) => {
  
    try {
      const user = await authApi.login({ email, password, socketId });
      console.log(user.accessToken, "this is it");
      cookies.set("accesToken", user.accessToken, { expires: 365, path:'/'}); 
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionTypes.SET_SIGN_IN_ERRORS,"Email or password incorrect"));
    }
  };
};
export const getUsersByName = (searchString) => {
  return async (dispatch) => {
    try {
      if (!searchString) {
        dispatch(createAction(actionTypes.GET_USERS_BY_NAME, []));
        return;
      }
      dispatch(createAction(actionTypes.SET_IS_SEARCHING_USERS));
      const users = await usersApi.getUsersByName(searchString);
      dispatch(createAction(actionTypes.GET_USERS_BY_NAME, users));
    } catch (err) {
    //  dispatch(createAction(actionTypes.UNSET_IS_SEARCHING_USERS));
      console.log(err);
    }
  };
};

export const getUserDetail = () => {
  return async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const user = await usersApi.getUserDetail(userId);
      user.friendList = arrayToMap(user.friendList);
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    cookies.remove("accesToken",{ path:'/'});
    dispatch(
      createAction(actionTypes.SET_USER_DETAIL, {
        displayName: "",
        profileImage: null,
        email: "",
        chatRooms: null,
        lastSeen: null,
        accountCreatedAt: "",
        searchedUsers: [],
        id: "",
      })
    );
  };
};

export const updateUserAsync = (propToUpdate, user) => {
  return async (dispatch, getState) => {
    try {
      const {id:userId, ...otherProps} = getState().user;
      switch (propToUpdate) {
        case "photo":
          dispatch(createAction(actionTypes.SET_UPDATING_PHOTO));
          break;
        case "status":
          dispatch(createAction(actionTypes.SET_UPDATING_STATUS));
          break;
        case "display-name":
          dispatch(createAction(actionTypes.SET_UPDATING_DISPLAY_NAME));
          break;
      }
      const newUser = await usersApi.updateUserById(userId, user);
      newUser.prevStatus = otherProps.status || "";
      newUser.prevDisplayName = otherProps.displayName || "";
      dispatch(createAction(actionTypes.SET_USER_DETAIL, newUser));
      switch (propToUpdate) {
        case "photo":
          dispatch(createAction(actionTypes.UNSET_UPDATING_PHOTO));
          break;
        case "status":
          dispatch(createAction(actionTypes.UNSET_UPDATING_STATUS));
          break;
        case "display-name":
          dispatch(createAction(actionTypes.UNSET_UPDATING_DISPLAY_NAME));
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const undoUserUpdateAsync = (propsToUndo) => {
  return async (dispatch,getState) => {
    const {prevStatus,prevDisplayName} = getState().user; 
    switch(propsToUndo)
      {
        case "display-name":
          dispatch(updateUserAsync("display-name",{displayName:prevDisplayName}));
          break;
        case "status":
          dispatch(updateUserAsync("status",{status:prevStatus}));
          break;
      }
  }
}

export const addChatToRoom = (roomId,text) => {
  return createAction(actionTypes.ADD_CHAT_TO_ROOM, {roomId,text});
}

export const clearSignUpErrors = () => {
  return createAction(actionTypes.CLEAR_SIGN_UP_ERRORS);
}

export const clearSignInErrors = () => {
  return createAction(actionTypes.CLEAR_SIGN_IN_ERRORS);
}

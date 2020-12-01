import * as actionTypes from "./actionTypes.js";
import * as authApi from "../../api/authApi.js";
import * as usersApi from "../../api/usersApi.js";
import cookies from "js-cookie";
import swal from "sweetalert2";

const createAction = (type, payLoad) => {
  return { type, payLoad };
};

export const signUpAsync = (formData) => {
  return async (dispatch) => {
    try {
      const user = await authApi.signup(formData);
      cookies.set("accesToken", user.accessToken, { expires: 365, path: "/" });
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signInAsync = (email, password) => {
  //alert("hello");
  return async (dispatch) => {
    alert(email);
    try {
      const user = await authApi.login({ email, password });
      cookies.set("accesToken", user.accessToken, { expires: 365, path: "/" });
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      console.log(err);
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
      const users = await usersApi.getUsersByName(searchString);
      dispatch(createAction(actionTypes.GET_USERS_BY_NAME, users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserDetail = () => {
  return async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const user = await usersApi.getUserDetail(userId);
      dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    cookies.remove("accessToken");
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
          dispatch(updateUserAsync("status",{displayName:prevDisplayName}));
          break;
      }
  }
}

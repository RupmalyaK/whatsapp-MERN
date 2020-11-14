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
  return async dispatch => {
    alert(email);
    try{
    const user = await authApi.login({email,password});
    cookies.set("accesToken", user.accessToken, { expires: 365, path: "/" });
    dispatch(createAction(actionTypes.SET_USER_DETAIL, user));
    }
    catch(err)
      {
        console.log(err);
      }
  }
}
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
      dispatch(createAction(actionTypes.SET_USER_DETAIL,user));
    } catch (err) {
      console.log(err);
    }
  };
};


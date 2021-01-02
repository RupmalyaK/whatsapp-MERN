import _axios, { create as Create } from "axios";
import Cookies from "js-cookie";

const UNIQUE_USER_KEY = "unique_user_key";
const cookie = new Cookies();

function getUniqueKey() {
  let uniqueKey = cookie.get(UNIQUE_USER_KEY, { path: "/" });
  if (!uniqueKey) {
    // uniqueKey = UUID.randomUUID();
    // cookie.set(UNIQUE_USER_KEY, uniqueKey, {path: '/'});
  }
  return uniqueKey;
}

function getAuthToken() {
  return Cookies.get("accesToken", { path: "/" });
}

function handleError(error) {
  console.error(error);
}

const axios = Create({
  baseURL: "/api",
  // timeout: 1000,
});

export const getWithCancel = async (url, success, error) => {
  try {
    if (window.source) {
      window.source.cancel();
      window.source = null;
    }
    const CancelToken = _axios.CancelToken;
    window.source = CancelToken.source();
    const { data } = await axios({
      mathod: "get",
      url: url,
      responseType: "application/json",
      cancelToken: window.source.token,
      headers: { authorization: "bearer " + getAuthToken() },
    });
    success(data);
  } catch (err) {
    error(err);
  }
};

export const get = async (url, success, error) => {
  try {
    const { data } = await axios({
      mathod: "get",
      url: url,
      responseType: "application/json",
      headers: { authorization: "bearer " + getAuthToken() },
    });
    success(data);
  } catch (err) {
    error(err);
  }
};

export const deleteApi = async (url, success, error) => {
  try {
    const { data } = await axios({
      mathod: "delete",
      url: url,
      responseType: "application/json",
      headers: { authorization: "bearer " + getAuthToken() },
    });
    success(data);
  } catch (err) {
    error(err);
  }
};

export const post = async (url, reqData, success, error) => {
  try {
    const { data } = await axios({
      method: "post",
      url: url,
      data: reqData,
      responseType: "application/json",
      headers: { authorization: "bearer " + getAuthToken() },
    });
    success(data);
  } catch (err) {
    error(err);
  }
};

export const put = async (url, reqData, success, error) => {
  try {
    const { data } = await axios({
      method: "put",
      url: url,
      data: reqData,
      responseType: "application/json",
      headers: { authorization: "bearer " + getAuthToken() },
    });
    success(data);
  } catch (err) {
    error(err);
  }
};

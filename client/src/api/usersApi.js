import * as Api from "./Api";

export const getUserDetail = (userId) => {
    const url = `/users/singleuser/${userId}`;
    return GetRequest(url);
}
export const getUsersByName = (searchString) => {
  const url = `/users/search/${searchString}`;
  return GetWithCancel(url);
};

const GetRequest = (url) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject();
        console.log("api error", err);
      },
    };
    Api.get(obj.url, obj.onSuccess, obj.onError);
  });
};

const PutRequest = (url, data) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      data: data,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject();
        console.log("api error", err);
      },
    };
    Api.put(obj.url, obj.data, obj.onSuccess, obj.onError);
  });
};

const GetWithCancel = (url) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject();
        console.log("api error", err);
      },
    };
    Api.getWithCancel(obj.url, obj.onSuccess, obj.onError);
  });
};


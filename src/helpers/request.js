import axios from "axios";
import constants from "./constants";

const client = axios.create({
  baseURL: constants.URL.MAIN_URL,
  // baseURL: 'https://aceso-staging.herokuapp.com/',
  // baseURL: 'http://192.168.18.2:9010/',
});

const request = function (options) {
  const onSuccess = function (response) {
    console.debug("Request Successful!", response);
    return response;
  };

  const onError = function (error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }

    return error.response;
  };

  return client(options).then(onSuccess).catch(onError);
};

export const get = (url, params) => {
  return request({
    url,
    method: "GET",
    params: params,
  });
};

export const post = (url, data) => {
  return request({
    url,
    method: "POST",
    data,
  });
};

export const put = (url, data) => {
  return request({
    url,
    method: "PUT",
    data,
  });
};

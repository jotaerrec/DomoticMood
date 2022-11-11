import { URL_API } from "Context/types";
import axios from "axios";

export const loginUser = async (data) => {
  let res = await axios({
    url: URL_API + "/users/",
    method: "post",
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
    data: data,
  });
  return res;
};

export const newUser = async (data) => {
  let res = await axios({
    url: URL_API + "/users/register",
    method: "post",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return res;
};

export const validateToken = async () => {
  let res = await axios({
    url: URL_API + "/validateToken/",
    method: "get",
    timeout: 4000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
    },
  });
  return res;
};

export const newPin = async (data) => {
  let res = await axios({
    url: URL_API + "/pins/",
    method: "post",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
    },
    data: data,
  });
  return res;
};

export const newRoom = async (data) => {
  let res = await axios({
    url: URL_API + "/rooms/",
    method: "post",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
    },
    data: data,
  });
  return res;
};

export const getPins = async (room = "") => {
  let res = await axios({
    url: URL_API + "/pins/",
    method: "get",
    timeout: 4000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
      room,
    },
  });
  return res;
};

export const updatePins = async (pin, name) => {
  let res = await axios({
    url: URL_API + "/pins/",
    method: "put",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
    },
    data: {
      pin,
      name,
    },
  });
  return res;
};
export const updateImportant = async (pin, name, important) => {
  let res = await axios({
    url: URL_API + "/pins/important",
    method: "post",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
    },
    data: {
      pin,
      name,
      important,
    },
  });
  return res;
};

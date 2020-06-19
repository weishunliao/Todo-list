import axios from "axios";
import { Message } from "../styles/antd";
import env from "../config/environment";

const instance = axios.create({
  baseURL: env.API,
});

export default function fetch(options) {
  if (options.useToken) {
    options.headers = {
      Authorization: `Bearer ${options.token}`,
    };
  }
  return instance(options)
    .then((resp) => {
      if (resp.status === 200) {
        return Promise.resolve(resp.data);
      } else {
        Message.info(resp.status);
      }
    })
    .catch((error) => {
      if (typeof window !== "undefined") {
        Message.info("Somthing wrong");
      }
      return Promise.reject();
    });
}

export const addNewTask = (body, token) => {
  return fetch({
    method: "post",
    url: "/v1/board/task",
    data: body,
    token,
    useToken: true,
  });
};

export const delTask = (id, token) => {
  return fetch({
    method: "delete",
    url: "/v1/board/task/" + id,
    token,
    useToken: true,
  });
};

export const updateTaskStatus = (body, id, token) => {
  return fetch({
    method: "patch",
    url: "/v1/board/task/" + id + "/status",
    token,
    data: body,
    useToken: true,
  });
};

export const updateTaskPriority = (body, id, token) => {
  return fetch({
    method: "patch",
    url: "/v1/board/task/" + id + "/priority",
    token,
    data: body,
    useToken: true,
  });
};

import axios, { AxiosError } from "axios";
import {
  ACCESS_TOKEN,
  AUTHORIZATION,
  BEARER,
  CONNECTION_ERROR,
} from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers[AUTHORIZATION] = `${BEARER} ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errResponse = (error as AxiosError).response;
    if (errResponse) {
      const { data, status, statusText } = errResponse;
      return Promise.reject({ data, status, statusText });
    } else {
      return Promise.reject({ data: { error: CONNECTION_ERROR } });
    }
  }
);

export { api };

import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN, AUTHORIZATION, BEARER } from "./constants";

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
  (error) => Promise.reject((error as AxiosError).response)
);

export { api };

import axios from "axios";
import { url } from "../utils/constant";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isAuthPageRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

    if ((status === 401 || status === 403) && !isAuthPageRequest) {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
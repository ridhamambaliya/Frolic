import axios from "axios";
import { url } from "../utils/constant";
// instance creation
const api = axios.create({
  baseURL: url,
});
// runs BEFORE every API request
api.interceptors.request.use(
  // req object
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // adding a header to request
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // something fails in interceptor → pass error forward
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isAuthPageRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

    if (status === 401) {
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
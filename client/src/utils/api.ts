// utils/api.ts
import axios from "axios";
import { setCookie, deleteCookie } from "./cookies";
import config from "./config";

const api = axios.create({
  baseURL: config.URL.auth.baseAuth,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          config.URL.auth.refreshToken,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        setCookie({ name: "token", value: newToken });

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('refresh error', refreshError);
        deleteCookie({ name: "token" });
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

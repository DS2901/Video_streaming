// api.js
import axios from "axios";
import { API_BASE_URL } from "./Constant";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ===== Request Interceptor =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== Response Interceptor =====
api.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;

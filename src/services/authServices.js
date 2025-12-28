import api from "../utils/AxiosInterceptor.js";

const BASE_URL = "/api/auth";

const auth = {
  login: (email, password) => api.post(`${BASE_URL}/login`, { email, password }),

  signup: (name, email, password, confirmPassword) =>
    api.post(`${BASE_URL}/signup`, { name, email, password, confirmPassword }),

  forgotPassword: (email) => api.post(`${BASE_URL}/forgot-password`, { email }),

  resetPassword: (token, newPassword, confirmPassword) =>
    api.post(`${BASE_URL}/reset-password`, { token, newPassword, confirmPassword }),
};

export default auth;

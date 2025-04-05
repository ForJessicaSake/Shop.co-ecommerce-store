import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_KEY_BASE_URL;
export const getCurrentToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_KEY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getCurrentToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/login";
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

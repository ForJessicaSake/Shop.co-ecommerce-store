import axios from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_KEY_BASE_URL;
export const getCurrentToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const getCurrentUser = () => {
  const clientId = localStorage.getItem("user_id");
  return clientId ? JSON.parse(clientId) : null;
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
      toast.error("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("client_id");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

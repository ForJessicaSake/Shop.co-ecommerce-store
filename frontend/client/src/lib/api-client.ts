import axios from "axios";

axios.defaults.baseURL = import.meta.env.BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

const session = localStorage.getItem("user_id");
export const client_token = session && JSON.parse(session);

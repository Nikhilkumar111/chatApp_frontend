import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-4-15do.onrender.com/api",
  withCredentials: true,
});

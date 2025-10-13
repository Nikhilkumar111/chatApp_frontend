import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-a8hk.onrender.com",
  withCredentials: true, // send http-only cookies
});

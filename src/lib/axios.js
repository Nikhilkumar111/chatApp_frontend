import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-3-lka1.onrender.com",
  withCredentials: true, // send http-only cookies
});

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backendnew-3.onrender.com",
  withCredentials: true, // send http-only cookies
});

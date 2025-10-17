import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-2-jj1t.onrender.com",
  withCredentials: true, // send http-only cookies
});

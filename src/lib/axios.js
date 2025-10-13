import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "https://chatapp-backend-1-dcfu.onrender.com/api" // backend URL in dev
    : "/api", // production URL (same origin)
  withCredentials: true, // send http-only cookies
});

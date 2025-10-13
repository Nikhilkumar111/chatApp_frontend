import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:3000/api" // backend URL in dev
    : "/api", // production URL (same origin)
  withCredentials: true, // send http-only cookies
});

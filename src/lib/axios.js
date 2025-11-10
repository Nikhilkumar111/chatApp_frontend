import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend1-tpma.onrender.com/api",
  withCredentials: true,
});

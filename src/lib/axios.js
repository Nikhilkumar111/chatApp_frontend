import axios from "axios";


const BASE_URL = "https://tagtells-backend-1.onrender.com/api"
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

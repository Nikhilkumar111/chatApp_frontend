import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"  // local backend when running locally
    : "https://chatapp-backend1-tpma.onrender.com/api";  // Render backend in production

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // IMPORTANT for cookies + CORS
});

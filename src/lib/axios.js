import axios from "axios";

<<<<<<< HEAD

const BASE_URL = "https://tagtells-backend-1.onrender.com/api"
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
=======
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api" // 👈 use your local backend when testing
    : "https://chatapp-backend1-tpma.onrender.com/api"; // 👈 production backend on Render

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ✅ required so cookies (JWT) are sent automatically
>>>>>>> 8f508404f691032112d82a8075146f5ed5437e0b
});

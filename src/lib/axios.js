import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api" // 👈 use your local backend when testing
    : "https://chatapp-backend1-tpma.onrender.com/api"; // 👈 production backend on Render

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ✅ required so cookies (JWT) are sent automatically
});

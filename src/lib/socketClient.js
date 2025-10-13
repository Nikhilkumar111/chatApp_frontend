// src/lib/socketClient.js
import { io } from "socket.io-client";

// replace with your backend URL
const socket = io(import.meta.env.VITE_BACKEND_URL || "https://chatapp-backend-1-dcfu.onrender.com", {
  withCredentials: true,
});

export default socket;

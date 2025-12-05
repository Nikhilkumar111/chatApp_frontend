// src/lib/socketClient.js
import { io } from "socket.io-client";

// replace with your backend URL
const socket = io("https://tagtells-backend-1.onrender.com", {
  withCredentials: true,
});

export default socket;

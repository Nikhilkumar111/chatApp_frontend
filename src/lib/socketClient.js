// src/lib/socketClient.js
import { io } from "socket.io-client";

// replace with your backend URL
const socket = io("https://chatapp-backend-4-15do.onrender.com", {
  withCredentials: true,
});

export default socket;

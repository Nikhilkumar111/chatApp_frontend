// src/lib/socketClient.js
import { io } from "socket.io-client";

// replace with your backend URL
const socket = io("https://chatapp-backend-2-jj1t.onrender.com", {
  withCredentials: true,
});

export default socket;

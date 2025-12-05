// src/lib/socketClient.js
import { io } from "socket.io-client";

// replace with your backend URL
<<<<<<< HEAD
const socket = io("https://tagtells-backend-1.onrender.com", {
=======
const socket = io("https://chatapp-backend-4-15do.onrender.com", {
>>>>>>> 8f508404f691032112d82a8075146f5ed5437e0b
  withCredentials: true,
});

export default socket;

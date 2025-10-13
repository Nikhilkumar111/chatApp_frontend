import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore"; // your auth store

const useSocket = () => {
  const { authUser } = useAuthStore(); // assumes your auth store has user + token
  const socketRef = useRef(null);

  useEffect(() => {
    if (!authUser?.token) return;

    // Connect to backend Socket.io
    socketRef.current = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      auth: { token: authUser.token },
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // cleanup
    return () => {
      socketRef.current.disconnect();
    };
  }, [authUser?.token]);

  return socketRef.current;
};

export default useSocket;

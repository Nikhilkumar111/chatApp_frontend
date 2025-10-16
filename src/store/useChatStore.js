import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [], // always initialize as array
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    const newSound = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newSound);
    set({ isSoundEnabled: newSound });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      const contacts = Array.isArray(res.data) ? res.data : res.data.contacts || [];
      set({ allContacts: contacts });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      // Normalize response to array
      const chatArray = Array.isArray(res.data) ? res.data : res.data.chats || [];
      set({ chats: chatArray });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      const msgs = Array.isArray(res.data) ? res.data : [];
      set({ messages: msgs });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  
sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();
  const { authUser } = useAuthStore.getState();

  const tempId = `temp-${Date.now()}`;
  const optimisticMessage = {
    _id: tempId,
    senderId: authUser._id,
    receiverId: selectedUser._id,
    text: messageData.text,
    image: messageData.image,
    pdf: messageData.pdf, // ✅ Add this line
    createdAt: new Date().toISOString(),
    isOptimistic: true,
  };

  set({ messages: [...messages, optimisticMessage] });

  try {
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    // Replace optimistic message with actual message
    set({ messages: [...messages, res.data] });
  } catch (error) {
    set({ messages }); // rollback optimistic
    toast.error(error.response?.data?.message || "Something went wrong");
  }
},


  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

export default useChatStore;

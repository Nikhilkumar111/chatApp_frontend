import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  // Load chat partners when the component mounts
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // Show loading skeleton while chats are being fetched
  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Show message if there are no chats
  if (!Array.isArray(chats) || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-3 p-3">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);
        const isActive = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200 ${
              isActive
                ? "bg-cyan-500/20 border-cyan-400/40"
                : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/40"
            }`}
          >
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="h-12 w-12 rounded-full object-cover border border-slate-600"
              />
              {/* Online/Offline Status Dot */}
              <span
                className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border border-slate-800 ${
                  isOnline ? "bg-green-400" : "bg-gray-500"
                }`}
              ></span>
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <h4 className="text-slate-200 font-medium">{chat.fullName}</h4>
              <p
                className={`text-sm ${
                  isOnline ? "text-green-400" : "text-slate-500"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;

import { XIcon, VideoIcon } from "lucide-react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import useCallStore from "../store/useCallStore";
import { useEffect } from "react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall } = useCallStore();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 px-6 h-[84px]">
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => startCall(selectedUser._id)}
          className="p-2 rounded-full hover:bg-slate-700 transition"
          title="Start Video Call"
        >
          <VideoIcon className="w-5 h-5 text-slate-200 hover:text-cyan-400" />
        </button>

        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

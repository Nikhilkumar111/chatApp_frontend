import { useEffect, useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { CopyIcon, XIcon, PinIcon } from "lucide-react";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pinnedMessage, setPinnedMessage] = useState(null);

  useEffect(() => {
    if (!selectedUser) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    const pinnedKey = `pinnedMessage_${authUser._id}_${selectedUser._id}`;
    const savedPin = localStorage.getItem(pinnedKey);
    if (savedPin) setPinnedMessage(JSON.parse(savedPin));

    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
    authUser._id,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setSelectedImage(null);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handlePinMessage = (msg) => {
    setPinnedMessage(msg);
    const pinnedKey = `pinnedMessage_${authUser._id}_${selectedUser._id}`;
    localStorage.setItem(pinnedKey, JSON.stringify(msg));
  };

  const handleUnpinMessage = () => {
    setPinnedMessage(null);
    const pinnedKey = `pinnedMessage_${authUser._id}_${selectedUser._id}`;
    localStorage.removeItem(pinnedKey);
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-5xl mx-auto bg-slate-900 rounded-none sm:rounded-2xl shadow-lg overflow-hidden">
      {/* 🔹 Chat Header */}
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      {/* 🔹 Messages Section */}
      <div className="flex-1 flex flex-col px-2 sm:px-6 py-3 sm:py-4 overflow-y-auto relative w-full">
        {/* 🔹 Pinned Message */}
        {pinnedMessage && (
          <div className="sticky top-0 z-10 mb-3 p-3 rounded-xl shadow-md bg-yellow-500 text-white flex items-center justify-between gap-2 max-w-full sm:max-w-3xl mx-auto">
            <div className="flex-1">
              {pinnedMessage.text && (
                <p className="text-sm sm:text-base truncate">{pinnedMessage.text}</p>
              )}
              {pinnedMessage.image && (
                <img
                  src={pinnedMessage.image}
                  alt="Pinned"
                  className="mt-2 rounded-lg object-cover cursor-pointer max-w-[150px] sm:max-w-[200px] max-h-[150px] sm:max-h-[200px] w-auto h-auto"
                  onClick={() => setSelectedImage(pinnedMessage.image)}
                />
              )}
            </div>
            <button
              onClick={handleUnpinMessage}
              className="ml-2 text-white hover:text-black transition"
              title="Unpin message"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 🔹 Chat Messages */}
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        ) : (
          <div className="space-y-3 w-full pb-4 sm:pb-6">
            {messages.map((msg) => {
              const isSender = msg.senderId === authUser._id;
              const isPinned = pinnedMessage?._id === msg._id;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative p-2.5 sm:p-3 max-w-[85%] sm:max-w-[70%] break-words rounded-2xl shadow-md group ${
                      isSender
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                        : "bg-slate-700 text-slate-200"
                    } ${isPinned ? "ring-2 ring-yellow-400" : ""}`}
                  >
                    {/* Bubble Pointer */}
                    <div
                      className={`absolute ${
                        isSender ? "right-[-5px]" : "left-[-5px]"
                      } top-3 h-3 w-3 rotate-45 bg-inherit`}
                    ></div>

                    {/* 🔹 Image Message */}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        onClick={() => setSelectedImage(msg.image)}
                        className="rounded-lg object-cover mb-2 cursor-pointer hover:opacity-90 transition max-w-[180px] sm:max-w-[250px] max-h-[180px] sm:max-h-[250px] w-auto h-auto"
                      />
                    )}

                    {/* 🔹 Text Message */}
                    {msg.text && (
                      <div className="relative">
                        <p className="select-text text-sm sm:text-base leading-snug">{msg.text}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(msg.text)}
                          className="absolute top-1 right-1 text-slate-400 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Copy text"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* 🔹 Pin Button */}
                    <button
                      onClick={() => handlePinMessage(msg)}
                      className="absolute bottom-1 right-1 text-yellow-400 hover:text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Pin this message"
                    >
                      <PinIcon className="w-5 h-5" />
                    </button>

                    {/* 🔹 Timestamp */}
                    <p className="text-[10px] sm:text-xs mt-1 opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      {/* 🔹 Message Input Bar (always visible on mobile) */}
      <div className="flex-shrink-0 border-t border-slate-800 bg-slate-900">
        <MessageInput />
      </div>

      {/* 🔹 Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white hover:text-cyan-400 transition"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-2xl w-full h-auto object-contain shadow-2xl animate-fadeIn"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;

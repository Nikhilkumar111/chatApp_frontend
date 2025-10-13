import { motion } from "framer-motion";
import useChatStore from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-2 sm:px-4 py-4">
      <div className="relative w-full max-w-7xl h-[calc(100vh-2rem)] sm:h-[800px] flex flex-col md:flex-row overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        {/* LEFT SIDEBAR */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`${
            selectedUser ? "hidden md:flex" : "flex"
          } w-full md:w-80 bg-slate-800/60 border-b md:border-b-0 md:border-r border-slate-700/50 flex-col`}
        >
          {/* PROFILE HEADER */}
          <div className="p-4 border-b border-slate-700/50">
            <ProfileHeader />
          </div>

          {/* TAB SWITCHER */}
          <div className="border-b border-slate-700/50 px-4 py-3">
            <ActiveTabSwitch />
          </div>

          {/* CHAT OR CONTACT LIST */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </motion.div>

        {/* MAIN CHAT AREA */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`flex-1 flex flex-col bg-slate-900/70 ${
            !selectedUser ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ChatPage;

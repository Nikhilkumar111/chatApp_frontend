import useChatStore from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const tabs = [
    { id: "chats", label: "💬 Chats" },
    { id: "contacts", label: "👥 Contacts" },
  ];

  return (
    <div className="flex justify-center mt-4 mb-3">
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-2 flex space-x-3 shadow-lg border border-slate-700/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 shadow-md scale-105"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-slate-700/40"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActiveTabSwitch;

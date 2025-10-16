import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import useAuthStore from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="p-4 mb-2 rounded-2xl cursor-pointer 
                     bg-blue-700/60 
                     border border-slate-600/40 hover:border-cyan-400/40
                     shadow-md hover:shadow-cyan-500/30
                     transition-all duration-300 ease-in-out"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full ring-2 ring-cyan-500/60">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="rounded-full"
                />
              </div>
            </div>

            <h4 className="text-slate-100 font-semibold tracking-wide hover:text-cyan-300 transition-colors">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;

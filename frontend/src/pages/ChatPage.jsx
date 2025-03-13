import { useChatStore } from "../stores/useChatStore";
import { useUserStore } from "../stores/useUserStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useEffect } from "react";

const ChatPage = () => {
  const { selectedUser, users, setSelectedUser } = useChatStore();
  const { seller } = useUserStore();

  useEffect(() => {
    setSelectedUser(seller)
  }, [seller]);
  return (
    <div className="h-screen bg-base-200 text-emerald-600">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
         <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;

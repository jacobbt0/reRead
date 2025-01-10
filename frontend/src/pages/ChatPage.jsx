
import { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../stores/useChatStore';
import { useUserStore } from '../stores/useUserStore';
import  LoadingSpinner  from '../components/LoadingSpinner'
import  MessageInput  from '../components/MessageInput';

const ChatPage = () => {

  const {
    messages,
    getMessages,
    sendMessage,
    isMessagesLoading,
    selectedUser,
    realTimeMessages,
    stopRealTimeMessages,
  } = useChatStore()

  const { user } = useUserStore()
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
   
    realTimeMessages();

    return () => stopRealTimeMessages();
  }, [selectedUser._id, getMessages, realTimeMessages, stopRealTimeMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  if(isMessagesLoading) return <LoadingSpinner/>

  return (
    <div className="flex flex-col h-screen bg-gray-700 text-white">

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div
              className={`max-w-xs p-4 rounded-lg shadow-lg text-white ${message.sender === "user"
                ? "bg-emerald-600"
                : "bg-gray-600"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full ${message.sender === "user" ? "bg-emerald-500" : "bg-gray-500"
                    }`}
                ></div>
                <p className="text-lg">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} /> {/* Scroll to this div to auto-scroll */}
      </div>

      {/* Message Input */}
     <MessageInput/>
    </div>
  );
};

export default ChatPage;

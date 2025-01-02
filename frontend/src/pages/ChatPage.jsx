
import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {}
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  // Auto-scroll to the latest message when a new one is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "user" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-700 text-white">

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-4 rounded-lg shadow-lg text-white ${
                message.sender === "user"
                  ? "bg-emerald-600"
                  : "bg-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full ${
                    message.sender === "user" ? "bg-emerald-500" : "bg-gray-500"
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
      <div className="p-4 bg-gray-600 flex items-center space-x-4 border-t border-gray-500">
        <textarea
          type="text"
          className="
          flex-grow p-2 rounded-lg bg-gray-800 text-white
           placeholder-gray-400 focus:outline-none focus:ring-2
            focus:ring-emerald-600 overflow-hidden resize-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          
        />
        <button
          onClick={handleSendMessage}
          className="bg-emerald-600 p-3 rounded-full text-white hover:bg-emerald-700 transition-colors duration-200"
        >
          <Send/>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

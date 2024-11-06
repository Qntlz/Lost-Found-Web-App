// ui/chat/ChatApp.tsx

"use client";

import { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

interface MessageType {
  user: string;
  content: string;
}

interface UserType {
  id: number;
  name: string;
  item: string; // Field for what the user has found or lost
}

export default function ChatApp() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const users: UserType[] = [
    { id: 1, name: "Frenz", item: "Found keys" },
    { id: 2, name: "Micheal", item: "Lost wallet" },
    { id: 3, name: "Jason", item: "Found phone" },
  ];

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "You", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-[80vh] max-w-4xl mx-auto bg-gray-50 shadow-md rounded-lg overflow-hidden">
      {/* Sidebar with user list */}
      <div className="w-1/3 bg-white p-5 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">User List</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-3 mb-2 rounded-lg cursor-pointer flex justify-between items-center transition-colors ${
                selectedUser?.id === user.id
                  ? "bg-red-100 text-red-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              <div>
                <span className="text-lg">{user.name}</span>
                <p className="text-sm text-gray-500">
                  {user.item.startsWith("Found")} {user.item}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col w-2/3 bg-gray-50">
        {/* Header showing selected user */}
        <div className="flex items-center p-4 border-b border-gray-200 bg-gray-100">
          {selectedUser && (
            <div className="flex items-center w-full">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedUser.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {selectedUser.item}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
          {messages.map((msg, index) => (
            <Message
              key={index}
              user={msg.user}
              content={msg.content}
              isOwnMessage={msg.user === "You"}
            />
          ))}
        </div>

        {/* Message input */}
        {selectedUser && (
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </div>
  );
}

// ui/chat/MessageInput.tsx

interface MessageInputProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    sendMessage: () => void;
  }
  
  export default function MessageInput({
    newMessage,
    setNewMessage,
    sendMessage,
  }: MessageInputProps) {
    return (
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 transition"
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Send
        </button>
      </div>
    );
  }
  
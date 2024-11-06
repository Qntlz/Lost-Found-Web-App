// ui/chat/Message.tsx

interface MessageProps {
    user: string;
    content: string;
    isOwnMessage: boolean;
  }
  
  export default function Message({ user, content, isOwnMessage }: MessageProps) {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return (
      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
        <div
          className={`p-3 rounded-lg max-w-xs shadow ${
            isOwnMessage ? "bg-red-400 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          <p className="text-sm">{content}</p>
          <span className="text-xs text-gray-500 block mt-1 text-right">
            {timestamp}
          </span>
        </div>
      </div>
    );
  }
  
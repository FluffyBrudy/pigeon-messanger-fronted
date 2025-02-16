import { FC } from "react";

interface MessageBubbleProps {
  isUser: boolean;
  message: string;
}

const MessageBubble: FC<MessageBubbleProps> = ({ isUser, message }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`p-3 max-w-xs md:max-w-md lg:max-w-lg rounded-lg shadow-md 
          ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBubble;

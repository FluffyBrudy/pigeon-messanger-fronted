import { FC } from "react";

interface MessageBubbleProps {
  isUser: boolean;
  message: string;
}

const MessageBubble: FC<MessageBubbleProps> = ({ isUser, message }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`relative p-3 px-4 max-w-[80%] md:max-w-[65%] lg:max-w-[50%] rounded-2xl shadow-md
          ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white"
              : "bg-gray-100 text-gray-900"
          }
        `}
      >
        <p className="text-md font-poppins leading-snug break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;

import { FC } from "react";

interface MessageBubbleProps {
  isUser: boolean;
  message: string;
  isFile?: boolean;
  isLast?: boolean;
}

const MessageBubble: FC<MessageBubbleProps> = ({
  isUser,
  message,
  isFile = false,
  isLast = false,
}) => {
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
        {!isFile ? (
          <p
            className={`text-md font-poppins leading-snug break-words ${
              isLast ? "opacity-20" : ""
            }`}
          >
            {message}
          </p>
        ) : (
          <img src={message} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

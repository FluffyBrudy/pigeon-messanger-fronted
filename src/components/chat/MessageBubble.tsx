import { FC } from "react";
import { useMediaPreviewStore } from "../../store/mediaPreviewStore";
import { isValidImageUrl, isValidVideoUrl } from "../../utils/urlUtils";

interface MessageBubbleProps {
  isUser: boolean;
  message: string;
  isFile?: boolean; //experimental
  isLast?: boolean;
}

const MessageBubble: FC<MessageBubbleProps> = ({
  isUser,
  message,
  isLast = false,
}) => {
  const setMediaUrl = useMediaPreviewStore((state) => state.setMediaUrl);
  if (!message) return null;
  const bubbleStyles = isUser
    ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white"
    : "bg-gray-100 text-gray-900";
  const textOpacity = isLast ? "opacity-20" : "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`relative p-3 px-4 max-w-[80%] md:max-w-[65%] lg:max-w-[50%] rounded-2xl shadow-md ${bubbleStyles}`}
      >
        {isValidVideoUrl(message).valid ? (
          <video
            src={message}
            controls
            className="cursor-pointer rounded-lg max-w-full"
          />
        ) : isValidImageUrl(message).valid ? (
          <img
            src={message}
            className="cursor-pointer rounded-lg max-w-full"
            alt="message content"
            onClick={() => setMediaUrl(message)}
          />
        ) : (
          <p
            className={`text-md font-poppins leading-snug break-words ${textOpacity}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

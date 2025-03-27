import ImageBubble from "./ImageBubble";
import TextBubble from "./TextBubble";

interface ChatBubbleProps {
  imageUrl: string;
  username: string;
  text: string;
  handleClick: CallableFunction;
  isTextBold?: boolean;
  isCurrentUser?: boolean;
}

const ChatBubble = ({
  isTextBold = false,
  imageUrl,
  username,
  text,
  handleClick,
  isCurrentUser = false,
}: ChatBubbleProps) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`flex gap-1 items-center max-h-[60px] w-full px-2 rounded-md cursor-pointer hover:shadow-lg hover:delay-0
        ${isCurrentUser ? "bg-blue-500 text-white" : "hover:bg-gray-600"}
      `}
    >
      <ImageBubble src={imageUrl} />
      <div className="relative p-2">
        <p className="font-bold">{username}</p>
        <div className={`${isTextBold ? "font-bold" : ""}`}>
          <TextBubble text={text} />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

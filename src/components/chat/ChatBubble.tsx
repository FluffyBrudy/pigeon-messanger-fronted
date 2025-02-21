import ImageBubble from "./ImageBubble";
import TextBubble from "./TextBubble";

interface ChatBubbleProps {
  imageUrl: string;
  username: string;
  text: string;
  handleClick: CallableFunction;
  isTextBold?: boolean;
}

const ChatBubble = ({
  isTextBold = false,
  imageUrl,
  username,
  text,
  handleClick,
}: ChatBubbleProps) => {
  return (
    <div
      onClick={() => handleClick()}
      className="mt-1 flex gap-1 items-center max-h-[60px] w-full hover:bg-gray-600 hover:shadow-lg px-2 rounded-md cursor-pointer hover:delay-0"
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

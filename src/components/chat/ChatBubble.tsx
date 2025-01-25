import ImageBubble from "./ImageBubble";
import TextBubble from "./TextBubble";

interface ChatBubbleProps {
  imageUrl: string;
  name: string;
  text: string;
}

const ChatBubble = ({ imageUrl, name, text }: ChatBubbleProps) => {
  return (
    <div className="mt-1 flex gap-1 items-center max-h-[60px] w-[300px] hover:bg-gray-600 hover:shadow-lg px-2 rounded-md cursor-pointer hover:delay-0">
      <ImageBubble src={imageUrl} />
      <div className="relative p-2">
        <p className="font-bold">{name}</p>
        <TextBubble text={text} />
      </div>
    </div>
  );
};

export default ChatBubble;

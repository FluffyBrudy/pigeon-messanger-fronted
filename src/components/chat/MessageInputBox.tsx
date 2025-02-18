import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import { Send } from "lucide-react";

interface MessageInputBoxProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}

const MessageInputBox: FC<MessageInputBoxProps> = ({
  message,
  setMessage,
  handleSubmit,
}) => {
  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex items-center bg-white p-3 rounded-full w-[min(800px,100%)] mx-auto border border-gray-200 shadow-sm">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleEnterPress}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-900 placeholder-gray-500"
      />
      <button
        onClick={handleSubmit}
        disabled={message.trim() === ""}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        <Send size={22} />
      </button>
    </div>
  );
};

export default MessageInputBox;

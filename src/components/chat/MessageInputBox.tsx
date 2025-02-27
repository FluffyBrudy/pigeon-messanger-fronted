import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useState,
} from "react";
import { Send, Loader2 } from "lucide-react";

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
  const [isSending, setIsSending] = useState(false);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim() !== "" && !isSending) {
      onHandleSubmit();
    }
  };

  const onHandleSubmit = async () => {
    setIsSending(true);
    await handleSubmit();
    setIsSending(false);
    setMessage("");
  };

  return (
    <div className="flex items-center bg-white p-3 rounded-full  mx-auto border border-gray-200 shadow-sm">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleEnterPress}
        placeholder="Type a message..."
        disabled={isSending}
        className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-900 placeholder-gray-500 disabled:opacity-50"
      />
      <button
        onClick={onHandleSubmit}
        disabled={message.trim() === "" || isSending}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isSending ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Send size={22} />
        )}
      </button>
    </div>
  );
};

export default MessageInputBox;

import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useState,
  useRef,
} from "react";
import { Send, Loader2, File } from "lucide-react";

interface MessageInputBoxProps {
  file: File | null;
  message: string;
  setFile: Dispatch<SetStateAction<File | null>>;
  setMessage: Dispatch<SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}

const MessageInputBox: FC<MessageInputBoxProps> = ({
  file,
  message,
  setMessage,
  setFile,
  handleSubmit,
}) => {
  const [isSending, setIsSending] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileSubmit = async () => {
    fileRef.current?.click();
  };

  const handleFileChange = async () => {
    if (fileRef.current) {
      console.log(fileRef.current.files);
      const files = fileRef.current.files;
      if (files && files.length > 0) {
        setFile(files[0]);
      }
    }
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

      <div className="flex gap-[0.1vmax]">
        <div>
          <button
            onClick={() => handleFileSubmit()}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <File className="w-[2vmin] h-auto" />
          </button>
          <input
            onChange={() => handleFileChange()}
            ref={fileRef}
            className="hidden"
            type="file"
          />
        </div>
        <button
          onClick={onHandleSubmit}
          disabled={(message.trim() === "" && !file) || isSending}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSending ? (
            <Loader2 className="animate-spin w-[2vmin] h-auto" />
          ) : (
            <Send className="w-[2vmin] h-auto" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInputBox;

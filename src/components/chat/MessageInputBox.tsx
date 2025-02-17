import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";

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
    <div className="flex w-full h-full">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyUp={handleEnterPress}
        placeholder="Type a message..."
        className="w-full p-2 border rounded-full"
      />
      <button
        onClick={handleSubmit}
        disabled={message.trim() === ""}
        className="p-2 ml-2 bg-blue-500 text-white rounded-md w-[100px]"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInputBox;

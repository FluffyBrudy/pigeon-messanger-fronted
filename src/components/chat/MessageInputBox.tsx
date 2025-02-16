import React, { useState, ChangeEvent, MouseEvent } from "react";

const MessengeInputBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessage("");
    }
  };

  return (
    <div className="flex w-full h-full">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type a message..."
        className="w-full p-2 border rounded-full"
      />
      <button
        onClick={handleSendMessage}
        disabled={message.trim() === ""}
        className="p-2 ml-2 bg-blue-500 text-white rounded-md w-[100px]"
      >
        Send
      </button>
    </div>
  );
};

export default MessengeInputBox;

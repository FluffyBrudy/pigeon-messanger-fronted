import React, { useState, ChangeEvent, MouseEvent } from "react";

const MessengeInputBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      console.log("Sent Message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center py-4 px-2 w-full">
      <div className="flex items-center w-full max-w-2xl bg-white p-3 rounded-full shadow-md">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          className="flex-grow p-3 rounded-full bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={message.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessengeInputBox;

import MessengeInputBox from "./MessageInputBox";

const ChatInterface = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <div>Chat History will go here...</div>
      </div>

      <div className="flex-shrink-0 p-2 min-h-[80px]">
        <MessengeInputBox />
      </div>
    </div>
  );
};

export default ChatInterface;

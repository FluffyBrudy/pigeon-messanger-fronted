import ChatInterface from "../../components/chat/ChatInterface";

const Home = () => {
  return (
    <div className="h-full flex gap-1 relative">
      <div className="flex-1 animate-smoothWidth duration-500 max-h-[100vh] overflow-auto">
        {" "}
        <ChatInterface />
      </div>
    </div>
  );
};

export default Home;

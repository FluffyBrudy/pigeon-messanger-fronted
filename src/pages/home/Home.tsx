import ChatBubbleSidebar from "../../components/chat/ChatBubbleSidebar";
import ChatInterface from "../../components/chat/ChatInterface";

const Home = () => {
  return (
    <div className="flex gap-1">
      <ChatBubbleSidebar />
      <ChatInterface />
    </div>
  );
};

export default Home;

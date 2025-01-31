import ChatBubbleSidebar from "../../components/chat/ChatBubbleSidebar";
import ChatInterface from "../../components/chat/ChatInterface";
import { AddFriendViewer } from "../../components/common/AddFriendViewer";

const Home = () => {
  return (
    <div className="h-full flex gap-1">
      <div className="shrink-0">
        <ChatBubbleSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <ChatInterface />
      </div>
      <div className="shrink-0">
        <AddFriendViewer />
      </div>
    </div>
  );
};

export default Home;

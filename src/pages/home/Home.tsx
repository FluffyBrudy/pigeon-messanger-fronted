import ChatBubbleSidebar from "../../components/chat/ChatBubbleSidebar";
import ChatInterface from "../../components/chat/ChatInterface";
import { AddFriendViewer } from "../../components/global/AddFriendViewer";

const Home = () => {
  return (
    <div>
      <div className="flex gap-1">
        <div className="shrink-0">
          <ChatBubbleSidebar />
        </div>
        <div className="flex-1">
          <ChatInterface />
        </div>
        <div>
          <AddFriendViewer />
        </div>
      </div>
    </div>
  );
};

export default Home;

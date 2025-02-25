import { useState } from "react";
import ChatBubbleSidebar from "../../components/chat/ChatBubbleSidebar";
import ChatInterface from "../../components/chat/ChatInterface";
import { AddFriendViewer } from "../../components/common/AddFriendViewer";
import { Users } from "lucide-react";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full flex gap-1 relative">
      <button
        className="md:hidden absolute top-0 left-0 text-white px-4 py-2 rounded hover:text-lime-500"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {!sidebarOpen && <Users className="scale-150" />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`shrink-0 fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-transform duration-300 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div>
          <ChatBubbleSidebar />
        </div>
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

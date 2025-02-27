import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import useAuthReauthorize from "./hooks/auth/useReauthorize";
import useSocketHandlers from "./hooks/auth/useSocketHandler";
import ChatBubbleSidebar from "./components/chat/ChatBubbleSidebar";
import { AddFriendViewer } from "./components/socialize/AddFriendViewer";

const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useAuthReauthorize();
  useSocketHandlers();

  if (!isAuthenticated) return null;

  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>

      <div>
        <ChatBubbleSidebar />
      </div>

      <div>
        <AddFriendViewer />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

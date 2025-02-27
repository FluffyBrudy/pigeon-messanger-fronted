import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import useAuthReauthorize from "./hooks/auth/useReauthorize";
import useSocketHandlers from "./hooks/auth/useSocketHandler";
import ChatBubbleSidebar from "./components/chat/ChatBubbleSidebar";
import { AddFriendViewer } from "./components/socialize/AddFriendViewer";
import { useState } from "react";

const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [forceShowMenu, setForceShowMenu] = useState(false);

  useAuthReauthorize();
  useSocketHandlers();

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col lg:flex-row max-w-[100vw] h-screen overflow-hidden">
      <Navbar orient="v" className="hidden lg:flex" />
      <Navbar
        orient="h"
        className="lg:hidden"
        smMenuCallback={() => setForceShowMenu((state) => !state)}
      />

      <div className="flex flex-1">
        <div
          className={`transition-all duration-300 ${
            forceShowMenu ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
          } lg:block`}
        >
          <ChatBubbleSidebar />
        </div>

        <div>
          <AddFriendViewer />
        </div>

        <div className="flex-1 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;

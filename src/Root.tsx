import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import useAuthReauthorize from "./hooks/auth/useReauthorize";
import useSocketHandlers from "./hooks/auth/useSocketHandler";
import ChatBubbleSidebar from "./components/chat/ChatBubbleSidebar";
import { AddFriendViewer } from "./components/socialize/AddFriendViewer";
import { useState } from "react";
import LoadingScreen from "./animation/LoadingScreen";

const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [forceShowMenu, setForceShowMenu] = useState(false);

  useAuthReauthorize();
  useSocketHandlers();

  if (!isAuthenticated) return <LoadingScreen />;

  return (
    <div className="flex flex-col lg:flex-row max-w-[100vw] h-screen overflow-hidden">
      <Navbar orient="v" className="hidden lg:flex" />
      <Navbar
        orient="h"
        className="lg:hidden"
        smMenuCallback={() => setForceShowMenu((prev) => !prev)}
      />

      <div className="flex flex-1 relative">
        <div
          className={`lg:flex lg:relative absolute top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 z-40 
            ${
              forceShowMenu ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0`}
          style={{ width: "min(400px,97vw)" }}
        >
          <ChatBubbleSidebar />
        </div>

        {forceShowMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setForceShowMenu(false)}
          />
        )}

        <div className="flex-1 h-full flex overflow-auto">
          <div className="hidden lg:flex p-2">
            <AddFriendViewer />
          </div>

          <div className="flex-1 h-full overflow-auto transition-opacity duration-300">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;

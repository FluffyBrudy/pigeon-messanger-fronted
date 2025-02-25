import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import { GlobalNotification } from "./components/notifications/GlobalNotification";
import useAuthReauthorize from "./hooks/auth/useReauthorize";
import useSocketHandlers from "./hooks/auth/useSocketHandler";

const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useAuthReauthorize();
  useSocketHandlers();

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col box-border">
      <div className="w-full bg-gray-900">
        <div className="m-auto relative w-[100vw] flex justify-center items-center">
          <Navbar />
          <GlobalNotification />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

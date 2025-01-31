import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "./router/routerPath";

const Root = () => {
  const { attemptAuthorization, setAuthenticated, isAuthenticated } =
    useAuthStore();
  const navigation = useNavigate();

  useEffect(() => {
    const reAuthorize = async () => {
      const res = await attemptAuthorization();
      if (res.status === 200) {
        navigation(HOME_ROUTE);
      } else {
        navigation(LOGIN_ROUTE);
      }
    };
    reAuthorize();
  }, [attemptAuthorization, setAuthenticated, navigation]);

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col box-border">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

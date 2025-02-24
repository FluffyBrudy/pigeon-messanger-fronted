import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../router/routerPath";
import { SocketSingleton } from "../../socket/socket";

const useAuthReauthorize = () => {
  const attemptAuthorization = useAuthStore((state) => state.attemptAuthorization);
  const navigate = useNavigate();

  useEffect(() => {
    const reAuthorize = async () => {
      const res = await attemptAuthorization();
      if (res.status === 200) {
        SocketSingleton.connectSocket();
        navigate(HOME_ROUTE);
      } else {
        navigate(LOGIN_ROUTE);
      }
    };
    reAuthorize();
  }, [attemptAuthorization, navigate]);
};

export default useAuthReauthorize;

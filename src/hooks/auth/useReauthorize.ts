import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../router/routerPath";
import { SocketSingleton } from "../../socket/socket";
import { ACCESS_TOKEN } from "../../api/constants";

const useAuthReauthorize = () => {
  const attemptAuthorization = useAuthStore(
    (state) => state.attemptAuthorization
  );
  const navigate = useNavigate();

  useEffect(() => {
    const reAuthorize = async () => {
      if (!localStorage.getItem(ACCESS_TOKEN)) return navigate(LOGIN_ROUTE);
      const res = await attemptAuthorization();
      if (res && res.status === 200) {
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

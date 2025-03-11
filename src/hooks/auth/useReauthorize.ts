import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PREF_PROFILE_SETUP,
} from "../../router/routerPath";
import { SocketSingleton } from "../../socket/socket";
import { ACCESS_TOKEN } from "../../api/constants";

const useAuthReauthorize = () => {
  const attemptAuthorization = useAuthStore(
    (state) => state.attemptAuthorization
  );
  const navigate = useNavigate();
  const isProfileSetup = useRef(false);

  useEffect(() => {
    const reAuthorize = async () => {
      if (!localStorage.getItem(ACCESS_TOKEN)) return;
      const res = await attemptAuthorization();
      if (res && res.status === 200) {
        SocketSingleton.connectSocket();
        const navRoute = isProfileSetup.current
          ? HOME_ROUTE
          : PREF_PROFILE_SETUP;
        navigate(navRoute);
      } else {
        navigate(LOGIN_ROUTE);
      }
    };
    reAuthorize();
  }, [attemptAuthorization, navigate]);
};

export default useAuthReauthorize;

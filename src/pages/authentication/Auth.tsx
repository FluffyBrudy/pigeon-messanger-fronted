import { useEffect } from "react";
import { HOME_ROUTE } from "../../router/routerPath";
import { useAuthStore } from "../../store/authStore";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useAuthStore();
  const attemptAuthorization = useAuthStore(
    (state) => state.attemptAuthorization
  );
  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) attemptAuthorization();
    else navigation(HOME_ROUTE);
  }, [isAuthenticated, navigation, attemptAuthorization]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;

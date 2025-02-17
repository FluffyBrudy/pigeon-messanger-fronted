import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PENDING_REQUESTS_ROUTE,
} from "./router/routerPath";
import { SocketSingleton } from "./socket/socket";
import { GlobalNotification } from "./components/notifications/GlobalNotification";
import { CLIENT_EVENTS, SERVER_EVENTS } from "./socket/constants";
import { useNotificationStore } from "./store/notificationStore";
import { useConnectedFriendStore } from "./store/connectedFriendsStore";
import { MessageTypeRecieverData } from "./types/socketData";

const Root = () => {
  const attemptAuthorization = useAuthStore(
    (state) => state.attemptAuthorization
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigation = useNavigate();
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const setChatMessages = useConnectedFriendStore(
    (state) => state.setChatMessages
  );

  useEffect(() => {
    const reAuthorize = async () => {
      const res = await attemptAuthorization();
      if (res.status === 200) {
        SocketSingleton.connectSocket();
        navigation(HOME_ROUTE);
      } else {
        navigation(LOGIN_ROUTE);
      }
    };
    reAuthorize();
  }, [attemptAuthorization, navigation]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const socketInstance = SocketSingleton.getInstance();
    if (!socketInstance) return;

    socketInstance.on(CLIENT_EVENTS.CONNECT, () => {
      SocketSingleton.active();
    });

    socketInstance.on(
      CLIENT_EVENTS.NOTIFICATION,
      (data: { eventName: string }) => {
        const eventName = data.eventName;
        if (eventName === SERVER_EVENTS.CONNECT_FRIEND) {
          setNotification({
            message: "someone sent you friend request",
            redirectTo: PENDING_REQUESTS_ROUTE,
          });
        }
      }
    );

    socketInstance.on(
      CLIENT_EVENTS.CHAT_MESSAGE_RECEIVER,
      (data: MessageTypeRecieverData) => {
        if (data.eventName === SERVER_EVENTS.CHAT_MESSAGE) {
          setChatMessages(
            [{ creatorId: data.creatorId, messageBody: data.message }],
            "a"
          );
        }
      }
    );

    socketInstance.on(CLIENT_EVENTS.ERRORS, (error) => {
      console.error("Error occured: ", error.message);
      SocketSingleton.disconnect();
    });
  }, [isAuthenticated, setNotification, setChatMessages]);

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col box-border">
      <div className="w-full bg-gray-800">
        <div className="m-auto relative w-[min(1000px,100vw)] flex justify-center items-center">
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

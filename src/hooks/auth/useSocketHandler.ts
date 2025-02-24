import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import { SocketSingleton } from "../../socket/socket";
import { CLIENT_EVENTS, SERVER_EVENTS } from "../../socket/constants";
import { PENDING_REQUESTS_ROUTE } from "../../router/routerPath";
import { MessageTypeRecieverData } from "../../types/socketData";

const useSocketHandlers = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const activeChatId = useConnectedFriendStore((state) => state.activeChatId);
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const setChatMessages = useConnectedFriendStore(
    (state) => state.setChatMessages
  );
  const setLatestMsg = useConnectedFriendStore(
    (state) => state.setLatestMessage
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    const socketInstance = SocketSingleton.getInstance();
    if (!socketInstance) return;

    const handleConnect = () => {
      SocketSingleton.active();
    };

    const handleNotification = (data: { eventName: string }) => {
      if (data.eventName === SERVER_EVENTS.CONNECT_FRIEND) {
        setNotification({
          message: "Someone sent you a friend request",
          redirectTo: PENDING_REQUESTS_ROUTE,
        });
      }
    };

    const handleChatMessage = (data: MessageTypeRecieverData) => {
      if (data.eventName === SERVER_EVENTS.CHAT_MESSAGE) {
        if (activeChatId === data.creatorId) {
          setChatMessages(
            [{ creatorId: data.creatorId, messageBody: data.message }],
            "a"
          );
        }
        setLatestMsg(data.creatorId, data.message);
      }
    };

    const handleError = (error: unknown) => {
      console.error("Error occurred: ", (error as Error).message);
      SocketSingleton.disconnect();
    };

    socketInstance.on(CLIENT_EVENTS.CONNECT, handleConnect);
    socketInstance.on(CLIENT_EVENTS.NOTIFICATION, handleNotification);
    socketInstance.on(CLIENT_EVENTS.CHAT_MESSAGE_RECEIVER, handleChatMessage);
    socketInstance.on(CLIENT_EVENTS.ERRORS, handleError);

    return () => {
      socketInstance.off(CLIENT_EVENTS.CONNECT, handleConnect);
      socketInstance.off(CLIENT_EVENTS.NOTIFICATION, handleNotification);
      socketInstance.off(
        CLIENT_EVENTS.CHAT_MESSAGE_RECEIVER,
        handleChatMessage
      );
      socketInstance.off(CLIENT_EVENTS.ERRORS, handleError);
    };
  }, [
    isAuthenticated,
    setNotification,
    setChatMessages,
    setLatestMsg,
    activeChatId,
  ]);
};

export default useSocketHandlers;

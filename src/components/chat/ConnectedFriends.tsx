import { useEffect, useState } from "react";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import ChatBubble from "./ChatBubble";
import { api } from "../../api/interceptor";
import { LATEST_SINGLE_CHAT_MESSAGES } from "../../api/endpoints";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../router/routerPath";

type LastSingleChatMsgResponse = Array<{ id: string; message: string }>;

const ConnectedFriends = () => {
  const fetchFriends = useConnectedFriendStore(
    (state) => state.fetchConnectedFriends
  );
  const setActiveChatId = useConnectedFriendStore(
    (state) => state.setActiveChatId
  );
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const { connectedFriends, latestMsg, activeChatId } =
    useConnectedFriendStore();
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  useEffect(() => {
    const fetchLatsMessage = async () => {
      try {
        const res = await api.post(LATEST_SINGLE_CHAT_MESSAGES, {
          friendsIds: connectedFriends.map(({ userId }) => userId),
        });
        const data = res.data.data as LastSingleChatMsgResponse;
        const messages = data.reduce(
          (accm, { id, message }) => ({ ...accm, [id]: message }),
          {} as Record<"id", string>
        );
        setMessages(messages);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    if (connectedFriends.length > 0) fetchLatsMessage();
  }, [connectedFriends]);

  useEffect(() => {
    if (!latestMsg) return;
    setMessages((state) => ({ ...state, [latestMsg.id]: latestMsg.message }));
  }, [latestMsg]);

  useEffect(() => {
    if (connectedFriends.length === 0) return;
    setActiveChatId(connectedFriends[0].userId);
  }, [setActiveChatId, connectedFriends]);

  const handleClick = (id: string) => {
    setActiveChatId(id);
    if (currentLocation.pathname !== HOME_ROUTE) {
      navigate(HOME_ROUTE);
    }
  };

  return (
    <div>
      {connectedFriends.length > 0 &&
        connectedFriends.map((friend) => (
          <ChatBubble
            isTextBold={!activeChatId && latestMsg?.id === friend.userId}
            key={friend.userId}
            {...friend}
            text={messages[friend.userId]}
            handleClick={() => handleClick(friend.userId)}
          />
        ))}
      {connectedFriends.length === 0 && (
        <div>
          <p className="font-bold text-center">No friends to show</p>
        </div>
      )}
    </div>
  );
};

export default ConnectedFriends;

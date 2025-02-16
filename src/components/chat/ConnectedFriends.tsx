import { useEffect } from "react";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import ChatBubble from "./ChatBubble";

const ConnectedFriends = () => {
  const fetchFriends = useConnectedFriendStore(
    (state) => state.fetchConnectedFriends
  );
  const setActiveChatId = useConnectedFriendStore(
    (state) => state.setActiveChatId
  );
  const { connectedFriends } = useConnectedFriendStore();
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <div>
      {connectedFriends.map((friend) => (
        <ChatBubble
          key={friend.userId}
          {...friend}
          text="..."
          handleClick={() => setActiveChatId(friend.userId)}
        />
      ))}
    </div>
  );
};

export default ConnectedFriends;

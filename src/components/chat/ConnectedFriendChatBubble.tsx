import { useConnectedFriendStore } from "../../store/connectedFriendsStore";

const ConnectedFriendChatBubble = () => {
  const { connectedFriends, activeChatId } = useConnectedFriendStore();
  return <div>ConnectedFriendChatBubble</div>;
};

export default ConnectedFriendChatBubble;

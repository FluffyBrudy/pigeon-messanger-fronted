import { useCallback } from "react";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { useAddFriendStore } from "../../store/addFriendStore";
import FindFriends from "../socialize/FindFriends";
import ChatBubble from "./ChatBubble";
import { SearchedFriend } from "../../types/social";
import ConnectedFriendChatBubble from "./ConnectedFriendChatBubble";

const ChatBubbleSidebar = () => {
  const { searchedFriend } = useSearchFriendStore();
  const updateSearchFriendData = useAddFriendStore(
    (state) => state.updateFriendData
  );

  const handleClick = useCallback(
    (friendInfo: SearchedFriend) => {
      const { username, id, imageUrl, isAccepted } = friendInfo;
      updateSearchFriendData({
        username,
        id,
        imageUrl,
        isActive: true,
        isAccepted,
      });
    },
    [updateSearchFriendData]
  );
  return (
    <div className="flex flex-col gap-3  h-screen overflow-y-scroll w-[300px] max-w-[300px] border-gray-500 border-[1px] rounded-md py-0">
      <div className="sticky top-0 bg-gray-300 py-2 px-2 border-b border-gray-300">
        <FindFriends />
        <div className="sticky top-0  py-2 px-2 border-b border-gray-300 text-black">
          {searchedFriend.map((friend, i) => (
            <ChatBubble
              key={i}
              text=""
              username={friend.username}
              imageUrl={friend.imageUrl || ""}
              handleClick={() => handleClick(friend)}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <ConnectedFriendChatBubble />
      </div>
    </div>
  );
};

export default ChatBubbleSidebar;

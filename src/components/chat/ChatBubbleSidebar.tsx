import { useCallback } from "react";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { useAddFriendStore } from "../../store/addFriendStore";
import { SearchedFriend } from "../../types/social";
import FindFriends from "../socialize/FindFriends";
import ChatBubble from "./ChatBubble";
import ConnectedFriends from "./ConnectedFriends";

const ChatBubbleSidebar = () => {
  const { searchedFriend, isVisible } = useSearchFriendStore();
  const updateSearchFriendData = useAddFriendStore(
    (state) => state.updateFriendData
  );
  const setSearchedvisibility = useSearchFriendStore(
    (state) => state.setSearchedvisibility
  );

  const handleClick = useCallback(
    (friendInfo: SearchedFriend) => {
      const { username, id, imageUrl, isAccepted } = friendInfo;
      setSearchedvisibility(false);
      updateSearchFriendData({
        username,
        id,
        imageUrl,
        isActive: true,
        isAccepted,
      });
    },
    [updateSearchFriendData, setSearchedvisibility]
  );
  return (
    <div
      className="flex flex-col gap-3 h-screen overflow-y-scroll w-[300px] max-w-[300px] 
  bg-[#16273d]  border-[0px] py-0 shadow-inner shadow-white/40"
    >
      <div className="sticky top-0 bg-gray-300 py-2 px-2 border-b border-gray-300">
        <FindFriends />
        <div className="sticky top-0  py-2 px-2 border-b border-gray-300 text-black">
          {isVisible &&
            searchedFriend.map((friend, i) => (
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
        <ConnectedFriends />
      </div>
    </div>
  );
};

export default ChatBubbleSidebar;

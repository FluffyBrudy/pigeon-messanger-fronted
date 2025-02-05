import { useCallback } from "react";
import { useSearchFriendStore } from "../../store/friendSearchStore";
import { useAddFriendStore } from "../../store/addFriendStore";
import FindFriends from "../socialize/FindFriends";
import ChatBubble from "./ChatBubble";
import { SearchedFriend } from "../../types/social";

const chatBubblesData = [
  {
    id: "1",
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    username: "Rihanna",
    text: "Hello mate",
  },
  {
    id: "2",
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    username: "John",
    text: "How are you?",
  },
  {
    id: "3",
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    username: "Emily",
    text: "Good morning!sssssdddddddddddd",
  },
];

const ChatBubbleSidebar = () => {
  const { searchedFriend } = useSearchFriendStore();
  const { updateFriendData } = useAddFriendStore();

  const handleClick = useCallback(
    (friendInfo: SearchedFriend) => {
      const { username, id, imageUrl, isAccepted } = friendInfo;
      updateFriendData({ username, id, imageUrl, isActive: true, isAccepted });
    },
    [updateFriendData]
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
      {chatBubblesData.map((data, i) => (
        <ChatBubble
          handleClick={() => handleClick({ ...data })} //will be replaced to load chat directly
          key={i}
          {...data}
        />
      ))}
    </div>
  );
};

export default ChatBubbleSidebar;

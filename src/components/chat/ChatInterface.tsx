import { useEffect, useRef, useState } from "react";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import MessengeInputBox from "./MessageInputBox";
import { FetchChatMessageResponse } from "../../types/chat";
import { api } from "../../api/interceptor";
import { CHAT_MESSAGE_FETCH_POST } from "../../api/endpoints";
import MessageBubble from "./MessageBubble";

const ChatInterface = () => {
  const { activeChatId } = useConnectedFriendStore();
  const [chats, setChats] = useState<Array<FetchChatMessageResponse>>([]);
  const userId = useRef(localStorage.getItem("id"));

  useEffect(() => {
    const fetchMsgs = async () => {
      api
        .post(CHAT_MESSAGE_FETCH_POST, {
          recipientId: activeChatId,
        })
        .then((res) => {
          if (res.status === 200) {
            setChats(res.data.data);
          }
        })
        .catch((err) => console.error((err as Error).message));
    };
    fetchMsgs();
  }, [activeChatId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div>
          {chats.map((chat, i) => (
            <MessageBubble
              key={i}
              isUser={userId.current === chat.creatorId}
              message={chat.messageBody}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 p-2 min-h-[80px]">
        <MessengeInputBox />
      </div>
    </div>
  );
};

export default ChatInterface;

import { useEffect, useRef, useState } from "react";
import { useConnectedFriendStore } from "../../store/connectedFriendsStore";
import MessengeInputBox from "./MessageInputBox";
import { CreateChatMessageResponse, FetchChatResponse } from "../../types/chat";
import { api } from "../../api/interceptor";
import {
  CHAT_MESSAGE_CREATE_POST,
  CHAT_MESSAGE_FETCH_POST,
} from "../../api/endpoints";
import MessageBubble from "./MessageBubble";

const ChatInterface = () => {
  const { activeChatId, chatMessages } = useConnectedFriendStore();
  const setChatMessages = useConnectedFriendStore(
    (state) => state.setChatMessages
  );
  const [msgInput, setMsgInput] = useState("");
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const userId = useRef(localStorage.getItem("id"));
  const cursorId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!activeChatId) return;
    const fetchMsgs = async () => {
      api
        .post(CHAT_MESSAGE_FETCH_POST, {
          recipientId: activeChatId,
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data as FetchChatResponse;

            setChatMessages(data.chats.reverse());
            cursorId.current = data.cursor;
          }
        })
        .catch((err) => console.error((err as Error).message));
    };
    fetchMsgs();
  }, [activeChatId, setChatMessages]);

  const handleSend = async () => {
    if (msgInput.trim().length === 0) return;
    try {
      const msgResponse = await api.post(CHAT_MESSAGE_CREATE_POST, {
        recipientId: activeChatId,
        message: msgInput,
      });
      if (msgResponse.status === 200) {
        const { creatorId, message, id } = msgResponse.data
          .data as CreateChatMessageResponse;
        console.log(id);
        setChatMessages([{ creatorId, messageBody: message }], "a");
        setMsgInput("");
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const handleLoadMore = async () => {
    if (disableLoadMore) return;
    try {
      const response = await api.post(CHAT_MESSAGE_FETCH_POST, {
        recipientId: activeChatId,
        cursor: cursorId.current,
      });
      const data = response.data.data as FetchChatResponse;

      setChatMessages(data.chats.reverse(), "p");
      cursorId.current = data.cursor;
      if (data.chats.length === 0) setDisableLoadMore(true);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {chatMessages.length > 0 && !disableLoadMore && (
          <button onClick={handleLoadMore} className="opacity-50 block mx-auto">
            load more...
          </button>
        )}
        <div>
          {chatMessages.map((chat, i) => (
            <MessageBubble
              key={i}
              isUser={userId.current === chat.creatorId}
              message={chat.messageBody}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 p-2 min-h-[80px]">
        <MessengeInputBox
          setMessage={setMsgInput}
          message={msgInput}
          handleSubmit={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatInterface;

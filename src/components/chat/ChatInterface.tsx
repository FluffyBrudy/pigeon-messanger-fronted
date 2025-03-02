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
import { SocketSingleton } from "../../socket/socket";
import { SERVER_EVENTS } from "../../socket/constants";
import SkeletonChatBubble from "../../animation/SkeletonChatBubble";

const ChatInterface = () => {
  const { activeChatId, chatMessages } = useConnectedFriendStore();
  const setChatMessages = useConnectedFriendStore(
    (state) => state.setChatMessages
  );
  const setLatestMessage = useConnectedFriendStore(
    (state) => state.setLatestMessage
  );
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const msgEndRef = useRef<HTMLDivElement | null>(null);
  const userId = useRef(localStorage.getItem("id"));
  const cursorId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!activeChatId) return;
    const fetchMsgs = async () => {
      setMessagesLoading(true);
      api
        .post(CHAT_MESSAGE_FETCH_POST, {
          recipientId: activeChatId,
        })
        .then((res) => {
          if (res.status === 200) {
            setMessagesLoading(false);
            const data = res.data.data as FetchChatResponse;

            setChatMessages(data.chats.reverse());
            cursorId.current = data.cursor;
          }
        })
        .catch((err) => {
          setMessagesLoading(false);
          console.error((err as Error).message);
        });
    };
    fetchMsgs();
  }, [activeChatId, setChatMessages]);

  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (msgInput.trim().length === 0) return;
    if (!activeChatId) return;
    try {
      const msgResponse = await api.post(CHAT_MESSAGE_CREATE_POST, {
        recipientId: activeChatId,
        message: msgInput,
      });
      if (msgResponse.status === 200) {
        const { creatorId, message } = msgResponse.data
          .data as CreateChatMessageResponse;
        SocketSingleton.emitEvent(SERVER_EVENTS.CHAT_MESSAGE, {
          creatorId: userId.current,
          message: msgInput,
          recipientId: [activeChatId],
        });
        setChatMessages([{ creatorId, messageBody: message }], "a");
        setLatestMessage(activeChatId, message);
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
      console.error((err as Error).message);
    }
  };

  if (!activeChatId || messagesLoading)
    return (
      <div className="flex-1 overflow-auto w-full mx-auto lg:w-[60%] sm:w-full">
        <SkeletonChatBubble count={10} />
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-auto">
      <div className="w-[90%] sm:w-[90%] md:w-[90%] lg:w-[60%]">
        {chatMessages.length > 0 && !disableLoadMore && (
          <button
            onClick={handleLoadMore}
            className="opacity-50 block mx-auto mb-10"
          >
            load more...
          </button>
        )}
        <div ref={msgEndRef}>
          {chatMessages.map((chat, i) => (
            <MessageBubble
              key={i}
              isUser={userId.current === chat.creatorId}
              message={chat.messageBody}
            />
          ))}
        </div>
      </div>
      <div className="h-[80px] max-h-[80px] w-full lg:w-[60%] sm:w-full mx-auto fixed -bottom-[15px]">
        {activeChatId && (
          <MessengeInputBox
            setMessage={setMsgInput}
            message={msgInput}
            handleSubmit={handleSend}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

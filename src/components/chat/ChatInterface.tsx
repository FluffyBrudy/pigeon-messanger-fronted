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
import { uploadImage } from "../../service/mediaUpload";

const ChatInterface = () => {
  const { activeChatId, chatMessages, username, imageUrl } =
    useConnectedFriendStore();
  const setChatMessages = useConnectedFriendStore(
    (state) => state.setChatMessages
  );
  const setLatestMessage = useConnectedFriendStore(
    (state) => state.setLatestMessage
  );
  const setProfileInfo = useConnectedFriendStore(
    (state) => state.setProfileInfo
  );

  const [messagesLoading, setMessagesLoading] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [unsentIndex, setUnsentIndex] = useState<number[]>([]);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const msgEndRef = useRef<HTMLDivElement | null>(null);
  const msgCountRef = useRef<number>(0);
  const userId = useRef(localStorage.getItem("id"));
  const cursorId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!fileInput) return;
    const objectUrl = URL.createObjectURL(fileInput);
    setFileDataUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileInput]);

  useEffect(() => {
    if (!activeChatId) {
      setMessagesLoading(false);
      return;
    }
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
            setProfileInfo(data.username, data.imageUrl);
            msgCountRef.current = data.chats.length;
            cursorId.current = data.cursor;
          }
        })
        .catch((err) => {
          setMessagesLoading(false);
          console.error((err as Error).message);
        });
    };
    fetchMsgs();
  }, [activeChatId, setChatMessages, setProfileInfo]);

  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (msgInput.trim().length === 0 && !fileInput) return;
    if (!activeChatId) return;
    try {
      const fileLink = fileInput && (await uploadImage(fileInput));
      const currentIndex = msgCountRef.current;
      if (currentIndex)
        setUnsentIndex((state) => [...state, msgCountRef.current]);
      setChatMessages(
        [
          {
            creatorId: userId.current!,
            messageBody: fileLink || msgInput,
            isFile: !!fileInput,
          },
        ],
        "a"
      );
      const msgResponse = await api.post(CHAT_MESSAGE_CREATE_POST, {
        recipientId: activeChatId,
        message: fileLink || msgInput,
        isFile: !!fileLink,
      });
      if (msgResponse.status === 200) {
        const { message } = msgResponse.data.data as CreateChatMessageResponse;
        const msg = fileLink || message;
        SocketSingleton.emitEvent(SERVER_EVENTS.CHAT_MESSAGE, {
          creatorId: userId.current,
          message: msg,
          recipientId: [activeChatId],
        });
        setUnsentIndex((state) => state.filter((i) => i !== currentIndex));
        msgCountRef.current += 1;
        setLatestMessage(activeChatId, fileInput ? "File" : msg, !!fileLink);
        setFileInput(null);
      }
    } catch (err) {
      msgCountRef.current += 1;
      console.error((err as Error).message);
    } finally {
      if (fileDataUrl) {
        URL.revokeObjectURL(fileDataUrl);
        setFileDataUrl(null);
      }
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

  if (messagesLoading)
    return (
      <div className="flex-1 overflow-auto w-full mx-auto lg:w-[60%] sm:w-full">
        <SkeletonChatBubble count={10} />
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-full items-center box-border overflow-hidden">
      <div className="flex items-center w-full px-4 py-2">
        <img
          src={imageUrl}
          className="w-10 h-10 rounded-full object-cover"
          alt="User"
        />
        <p className="ml-2 font-medium">{username}</p>
      </div>

      <div className="flex flex-[0.9] lg:flex-1 flex-col overflow-auto w-[90%] lg:w-[60%]">
        {chatMessages.length > 50 && !disableLoadMore && (
          <button
            onClick={handleLoadMore}
            className="opacity-50 block mx-auto mb-2"
          >
            Load more...
          </button>
        )}
        <div ref={msgEndRef}>
          {chatMessages.length > 0 &&
            chatMessages.map((chat, i) => (
              <MessageBubble
                key={i}
                isUser={userId.current === chat.creatorId}
                message={chat.messageBody}
                isFile={chat.isFile}
                isLast={unsentIndex.includes(i)}
              />
            ))}
          {!!fileDataUrl && (
            <div className="flex justify-end">
              <img
                className="opacity-20 justify-end"
                src={fileDataUrl}
                alt="preview"
              />
            </div>
          )}
        </div>
      </div>

      {activeChatId ? (
        <div className="w-full lg:w-[60%] sm:w-full p-2 flex-shrink-0">
          <MessengeInputBox
            setMessage={setMsgInput}
            message={msgInput}
            file={fileInput}
            setFile={setFileInput}
            handleSubmit={handleSend}
          />
        </div>
      ) : (
        <div className="flex-1">
          <p className="text-lg font-bold">No chat found</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

import { create } from "zustand";
import { IConnectedFriendsStore } from "../types/store";
import { api } from "../api/interceptor";
import { SOCIAL_ACCEPTED_REQUESTS_GET } from "../api/endpoints";
import { ConnectedFriend } from "../types/user";

export const useConnectedFriendStore = create<IConnectedFriendsStore>()(
  (set) => ({
    activeChatId: null,
    latestMsg: null,
    chatMessages: [],
    username: "",
    imageUrl: "",
    connectedFriends: [],
    async fetchConnectedFriends() {
      try {
        const res = await api.get(SOCIAL_ACCEPTED_REQUESTS_GET);
        if (res.status === 200) {
          const data = res.data.data as Array<ConnectedFriend>;
          set({ connectedFriends: data });
        }
      } catch (err) {
        console.error(err as Error);
      }
    },

    setActiveChatId(id) {
      set({ activeChatId: id });
    },

    setChatMessages(messages, order) {
      if (order === "a") {
        set(({ chatMessages }) => ({
          chatMessages: [...chatMessages, ...messages],
        }));
      } else if (order === "p") {
        set(({ chatMessages }) => ({
          chatMessages: [...messages, ...chatMessages],
        }));
      } else {
        set({ chatMessages: messages });
      }
    },

    setProfileInfo(username, imageUrl) {
      set({ username, imageUrl });
    },

    setLatestMessage(id: string, message: string, isFile = false) {
      set({ latestMsg: { id, message, isFile } });
    },
  })
);

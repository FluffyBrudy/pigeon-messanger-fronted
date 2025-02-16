import { create } from "zustand";
import { IConnectedFriendsStore } from "../types/store";
import { api } from "../api/interceptor";
import { SOCIAL_ACCEPTED_REQUESTS_GET } from "../api/endpoints";
import { ConnectedFriend } from "../types/user";

export const useConnectedFriendStore = create<IConnectedFriendsStore>()(
  (set) => ({
    activeChatId: null,
    connectedFriends: [],
    async fetchConnectedFriends() {
      try {
        const res = await api.get(SOCIAL_ACCEPTED_REQUESTS_GET);
        if (res.status === 200) {
          const data = res.data.data as Array<ConnectedFriend>;
          set({ connectedFriends: data });
        }
      } catch (err) {
        console.error((err as Error).message);
      }
    },
    setActiveChatId(id) {
      set({ activeChatId: id });
    },
  })
);

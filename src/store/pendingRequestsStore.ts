import { create } from "zustand";
import {
  PendingFriendRequestsResponse,
  PendingRequestType,
} from "../types/social";
import { api } from "../api/interceptor";
import { SOCIAL_PENDING_REQUESTS_GET } from "../api/endpoints";

interface IPendingRequestsStore {
  sentRequests: PendingFriendRequestsResponse;
  recvRequests: PendingFriendRequestsResponse;
  fetchPendingRequests: (type: PendingRequestType) => Promise<void>;
  filterRequests: (id: string) => void;
}

export const usePendingRequestsStore = create<IPendingRequestsStore>((set) => ({
  sentRequests: [],
  recvRequests: [],
  fetchPendingRequests: async (reqType) => {
    try {
      const { data } = await api.get(SOCIAL_PENDING_REQUESTS_GET, {
        params: { type: reqType },
      });
      set((state) => ({
        ...state,
        [reqType === PendingRequestType.sent ? "sentRequests" : "recvRequests"]:
          data?.data || [],
      }));
    } catch (err) {
      console.error("Error fetching pending requests:", err);

      set((state) => ({
        ...state,
        [reqType === PendingRequestType.sent ? "sentRequests" : "recvRequests"]:
          [],
      }));
    }
  },

  filterRequests(id) {
    set((state) => ({
      sentRequests: state.sentRequests.filter((user) => user.userId !== id),
      recvRequests: state.recvRequests.filter((user) => user.userId !== id),
    }));
  },
}));

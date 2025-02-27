import { create } from "zustand";
import { AddFriendStoreValues, IAddFriendStore } from "../types/store";
import { api } from "../api/interceptor";
import { SOCIAL_FRIEND_REQUEST_POST } from "../api/endpoints";

const defaultValue: AddFriendStoreValues = {
  id: "",
  username: "",
  imageUrl: "",
  isActive: false,
  isAccepted: false,
};

export const useAddFriendStore = create<IAddFriendStore>()((set, get) => ({
  ...defaultValue,
  updateFriendData(data) {
    set({ ...data });
  },
  toggleVisibility() {
    set((state) => ({ isActive: !state.isActive }));
  },
  getData() {
    return get();
  },
  async sendFriendRequest(friendId) {
    try {
      const response = await api.post(SOCIAL_FRIEND_REQUEST_POST, {
        friendId,
      });
      return response["data"]["data"] || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
}));

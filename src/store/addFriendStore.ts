import { create } from "zustand";
import { AddFriendStoreValues, IAddFriendStore } from "../types/store";

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
}));

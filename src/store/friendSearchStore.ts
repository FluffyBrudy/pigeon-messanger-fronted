import { create } from "zustand";
import { IFriendSearchStore } from "../types/store";

const defaultValue: Omit<
  IFriendSearchStore,
  "setSearchedFriend" | "setError" | "setSearchedvisibility"
> = {
  error: "",
  searchTerm: "",
  isVisible: false,
  searchedFriend: [],
};

const useSearchFriendStore = create<IFriendSearchStore>()((set) => ({
  ...defaultValue,
  setSearchedFriend(friends) {
    set({ searchedFriend: [...friends] });
  },
  setError(error) {
    set({ error });
  },
  setSearchedvisibility(state: boolean) {
    set({ isVisible: state });
  },
}));

export { useSearchFriendStore };

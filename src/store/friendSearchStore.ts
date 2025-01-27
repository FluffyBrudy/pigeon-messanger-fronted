import { create } from "zustand";
import { IFriendSearchStore } from "../types/store";

const defaultValue: Omit<IFriendSearchStore, "setSearchedFriend" | "setError"> =
  {
    error: "",
    searchTerm: "",
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
}));

export { useSearchFriendStore };

export interface SearchedFriend {
  id: string;
  username: string;
  imageUrl: string;
}

export interface IFriendSearchStore {
  error: string;
  searchTerm: string;
  searchedFriend: Array<SearchedFriend>;
  setError: (error: string) => void;
  setSearchedFriend: (friends: Array<SearchedFriend>) => void;
}

export type AddFriendStoreValues = Omit<
  IAddFriendStore,
  "toggleVisibility" | "updateFriendData" | "getData"
>;
export interface IAddFriendStore {
  id: string;
  isActive: boolean;
  username: string;
  imageUrl: string;
  updateFriendData: (data: AddFriendStoreValues) => void;
  toggleVisibility: () => void;
  getData: () => AddFriendStoreValues;
}

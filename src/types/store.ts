import { AxiosError, AxiosResponse } from "axios";
import { SearchedFriend } from "./social";
import { ConnectedFriend } from "./user";
import { FetchChatMessageResponse } from "./chat";

export interface IAuthStoreValues {
  imageUrl: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  username: string;
  isProfileInitialized: boolean;
}
export interface IAuthStore extends IAuthStoreValues {
  setUserData: (
    data: Partial<Omit<IAuthStoreValues, "isAuthenticated">>
  ) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  attemptAuthorization: () => Promise<AxiosResponse | AxiosError | null>;
}

export interface IFriendSearchStore {
  error: string;
  searchTerm: string;
  searchedFriend: Array<SearchedFriend>;
  isVisible: boolean;
  setError: (error: string) => void;
  setSearchedFriend: (friends: Array<SearchedFriend>) => void;
  setSearchedvisibility: (state: boolean) => void;
}

export type AddFriendStoreValues = Omit<
  IAddFriendStore,
  "toggleVisibility" | "updateFriendData" | "getData" | "sendFriendRequest"
>;
export interface IAddFriendStore {
  id: string;
  isActive: boolean;
  username: string;
  imageUrl: string;
  isAccepted?: boolean;
  updateFriendData: (data: AddFriendStoreValues) => void;
  toggleVisibility: () => void;
  getData: () => AddFriendStoreValues;
  sendFriendRequest: (friendId: string) => Promise<string>;
}

export interface IConnectedFriendsStore {
  activeChatId: string | null; //when user is clicked, it is considered to be active chat that user is chatting with
  chatMessages: Array<FetchChatMessageResponse>;
  username: string;
  imageUrl: string;
  connectedFriends: Array<ConnectedFriend>;
  latestMsg: null | { id: string; message: string; isFile: boolean };
  fetchConnectedFriends: () => Promise<void>;
  setActiveChatId: (id: string) => void;
  setChatMessages: (
    messages: Array<FetchChatMessageResponse>,
    order?: "a" | "p"
  ) => void;
  setProfileInfo: (username: string, imageUrl: string) => void;
  setLatestMessage: (id: string, message: string, isFile?: boolean) => void;
}

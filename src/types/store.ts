import { AxiosError, AxiosResponse } from "axios";
import { SearchedFriend } from "./social";
import { Notification } from "./notifications";
import { ConnectedFriend } from "./user";
import { FetchChatMessageResponse } from "./chat";

export interface IAuthStore {
  userId: string | null;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  attemptAuthorization: () => Promise<AxiosResponse | AxiosError>;
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
  connectedFriends: Array<ConnectedFriend>;
  latestMsg: null | { id: string; message: string };
  fetchConnectedFriends: () => Promise<void>;
  setActiveChatId: (id: string) => void;
  setChatMessages: (
    messages: Array<FetchChatMessageResponse>,
    order?: "a" | "p"
  ) => void;
  setLatestMessage: (id: string, message: string) => void;
}

export interface INotifcationStore {
  isVisible: boolean;
  nextId: number;
  notifications: Array<Notification>;
  toAlert: boolean;
  count: number;
  setNotification: (notificationData: Omit<Notification, "id">) => void;
  removeNotification: (nid: Notification["id"]) => void;
  toggleNotification: () => void;
}

import { AxiosError, AxiosResponse } from "axios";
import { SearchedFriend } from "./social";
import { Notification } from "./notifications";
import { ConnectedFriend } from "./user";

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
  setError: (error: string) => void;
  setSearchedFriend: (friends: Array<SearchedFriend>) => void;
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
  connectedFriends: Array<ConnectedFriend>;
  fetchConnectedFriends: (friends: ConnectedFriend) => Promise<void>;
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

export interface SearchedFriend {
  id: string;
  username: string;
  imageUrl: string;
  isAccepted?: boolean;
}

export type PendingFriendRequest = {
  username: string;
  imageUrl: string;
  id: string;
};

export type AddFriendResponse = string;

export type PendingFriendRequestsResponse = PendingFriendRequest[];

export type AcceptFriendRequestResponse = { isAccepted: boolean };

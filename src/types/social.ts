export interface Friend {
  id: string;
  username: string;
  imageUrl: string;
  isAccepted?: boolean;
}

export type SearchedFriend = Friend;

export type FriendRequestReponse = {
  username: string;
  imageUrl: string;
  userId: string;
};

export type AddFriendResponse = string;

export type PendingFriendRequestsResponse = FriendRequestReponse[];
export type AcceptedFriendRequestsResponse = FriendRequestReponse[];

export type AcceptFriendRequestResponse = { isAccepted: boolean };

export enum PendingRequestType {
  sent = "sent",
  recv = "recv",
}

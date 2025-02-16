export interface CreateChatMessageResponse {
  creatorId: string;
  recipientId: string;
  message: string;
}

export interface FetchChatMessageResponse {
  creatorId: string;
  messageBody: string;
}

export interface CreateChatMessageResponse {
  creatorId: string;
  id: string;
  message: string;
}

export interface FetchChatMessageResponse {
  creatorId: string;
  messageBody: string;
}

export interface FetchChatResponse {
  chats: Array<FetchChatMessageResponse>;
  limit: number;
  cursor: string;
}

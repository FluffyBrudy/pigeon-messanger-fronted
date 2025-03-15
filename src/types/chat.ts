export interface CreateChatMessageResponse {
  creatorId: string;
  id: string;
  message: string;
}

export interface FetchChatMessageResponse {
  creatorId: string;
  messageBody: string;
  isFile?: boolean;
}

export interface FetchChatResponse {
  chats: Array<FetchChatMessageResponse>;
  limit: number;
  cursor: string;
}

export type TGetChatListResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};

type LastMessage = {
  user: User;
  time: Date;
  content: string;
};

type User = {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
};

export type TGetChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage;
};

export type TDeleteChatResponse = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
};

export type TGetUSerByLoginResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type TGetChatTokenResponse = {
  token: string;
};

export type TMessagesResponse = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: Date;
  content: string;
  is_read: boolean;
  file: null;
};

export type TMessagesList = {
  isOwner: boolean;
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
};

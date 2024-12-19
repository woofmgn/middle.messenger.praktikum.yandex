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

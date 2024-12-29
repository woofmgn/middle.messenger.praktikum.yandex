import { fetchRequest } from '../../utils/fetchRequest';
import { API_BASE_URL } from '../const';
import {
  TDeleteChatResponse,
  TGetChatListResponse,
  TGetChatResponse,
  TGetChatTokenResponse,
  TGetUSerByLoginResponse,
} from './types';

class ChatApi {
  private request: typeof fetchRequest;
  private baseUrl: string;

  constructor(instanceHttpTransport: typeof fetchRequest) {
    this.request = instanceHttpTransport;
    this.baseUrl = API_BASE_URL;
  }

  public getChatList = async () => {
    return await this.request.get<TGetChatListResponse[]>(`${this.baseUrl}/chats`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  public getChat = async (chatId: number) => {
    return await this.request.get<TGetChatResponse>(`${this.baseUrl}/chats/${chatId}/common`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  public addChat = async (title: string) => {
    return await this.request.post<{ id: number }>(`${this.baseUrl}/chats`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { title },
    });
  };

  public deleteChat = async (chatId: number) => {
    return await this.request.delete<TDeleteChatResponse>(`${this.baseUrl}/chats`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { chatId },
    });
  };

  public getUserByLogin = async (login: string) => {
    return await this.request.post<TGetUSerByLoginResponse[]>(`${this.baseUrl}/user/search`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { login },
    });
  };

  public addUserToChat = async ({ userId, chatId }: { userId: number; chatId: number }) => {
    return await this.request.put(`${this.baseUrl}/chats/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { users: [userId], chatId },
    });
  };

  public deleteUserFromChat = async ({ userId, chatId }: { userId: number; chatId: number }) => {
    return await this.request.delete(`${this.baseUrl}/chats/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { users: [userId], chatId },
    });
  };

  public getChatToken = async (chatId: number) => {
    return await this.request.post<TGetChatTokenResponse>(`${this.baseUrl}/chats/token/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

export const chatApi = new ChatApi(fetchRequest);

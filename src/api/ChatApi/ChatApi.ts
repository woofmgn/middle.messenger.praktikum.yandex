import { fetchRequest } from '../../utils/fetchRequest';
import { API_BASE_URL } from '../const';
import { TGetChatListResponse } from './types';

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
}

export const chatApi = new ChatApi(fetchRequest);

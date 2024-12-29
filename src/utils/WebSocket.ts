import { chatApi } from '../api/ChatApi/ChatApi';
import { reformatAndSaveMessage } from '../service/chatService';

class WebSocketService {
  private socket: WebSocket | undefined;
  private baseUrl: null | string;
  private chatId: number | null;
  private userId: number | null;
  private isConnected: boolean;

  constructor() {
    this.baseUrl = 'ya-praktikum.tech';
    this.isConnected = false;
    this.chatId = null;
    this.userId = null;
  }

  public connectWS = async (chatId: number, userId: number) => {
    if (chatId === this.chatId && userId === this.userId) {
      return;
    }

    try {
      const tokenResponse = await chatApi.getChatToken(chatId);
      if (!tokenResponse) {
        return;
      }

      if (this.socket) {
        this.socket.removeEventListener('open', this.openWS);
        this.socket.removeEventListener('message', this.saveMessage);
        this.socket.removeEventListener('close', this.closeWS);
        this.socket.removeEventListener('error', this.errorWS);

        this.socket.close(1000, `Закрыто соединение для чата ${chatId}`);
      }

      this.socket = new WebSocket(`wss://${this.baseUrl}/ws/chats/${userId}/${chatId}/${tokenResponse.token}`);
      this.socket.addEventListener('open', this.openWS);
      this.socket.addEventListener('message', this.saveMessage);
      this.socket.addEventListener('close', this.closeWS);
      this.socket.addEventListener('error', this.errorWS);

      this.chatId = chatId;
      this.userId = userId;
    } catch (err) {
      return err;
    }
  };

  private openWS = () => {
    this.isConnected = true;

    this.getPreviousMessages();
  };

  private closeWS = (evt: CloseEvent) => {
    console.log(evt.wasClean ? 'Соединение закрыто' : 'Соединение разорвано, произошла ошибка');
    this.isConnected = false;
  };

  private errorWS = (evt: Event) => {
    const errEvent = evt as ErrorEvent;
    console.log(`Ошибка errorWS`, errEvent.message);
  };

  public sendMessage = (message: string) => {
    if (this.isConnected && this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
    }
  };

  private saveMessage = (evt: MessageEvent) => {
    console.log('event', evt);
    let data;
    try {
      data = JSON.parse(evt.data);
    } catch (error) {
      console.error(error);
      return;
    }

    reformatAndSaveMessage(data);
  };

  private getPreviousMessages = () => {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    }
  };
}

export const webSocket = new WebSocketService();

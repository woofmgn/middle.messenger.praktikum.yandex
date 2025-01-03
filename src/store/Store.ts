import { TUserInfoResponse } from '../api/AuthApi';
import { TGetChatListResponse, TMessagesList } from '../api/ChatApi/types';
import EventBus from '../utils/EventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export type TStoreState = {
  isLoading: boolean;
  user: TUserInfoResponse | null;
  chatList: TGetChatListResponse[] | null;
  currentChat: TGetChatListResponse | null;
  loginError: null | string;
  id: string | number | null;
  chatId: number | null;
  messages: TMessagesList[] | null;
};

export class Store extends EventBus {
  private static __instance: Store;
  private state: TStoreState | null = null;

  constructor(defaultState: TStoreState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: object) {
    const prevState = { ...this.state };

    this.state = { ...this.state!, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

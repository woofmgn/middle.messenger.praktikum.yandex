import { chatApi } from '../api/ChatApi/ChatApi';
import { TMessagesResponse } from '../api/ChatApi/types';
import emptyAvatar from '../assets/image/empty-contact-avatar.svg';

export const loadChatList = async () => {
  try {
    const response = await chatApi.getChatList();
    if (!response) {
      return;
    }

    const normalizedData = response.map((contact) => {
      if (!contact.avatar) {
        return {
          ...contact,
          avatar: contact.last_message?.user.avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${contact.last_message?.user.avatar}`
            : emptyAvatar,
        };
      }
      return contact;
    });

    window.store.set({ chatList: normalizedData });
    return normalizedData;
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentChat = (id: number) => {
  const chat = window.store.getState()?.chatList?.find((chat) => chat.id === id);
  if (chat?.last_message?.user.avatar) {
    chat.avatar = `https://ya-praktikum.tech/api/v2/resources/${chat?.last_message?.user.avatar}`;
  }
  window.store.set({ chatId: id });
  window.store.set({ currentChat: chat });
};

export const createChat = async (title: string) => {
  try {
    console.log('title', title);
    const response = await chatApi.addChat(title);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addUserToCurrentChat = async ({ login }: { login: string }) => {
  const chatId = window.store.getState()?.chatId;
  try {
    console.log('isChatId', window.store.getState()?.chatId);
    const userLoginResponse = await chatApi.getUserByLogin(login);

    if (!userLoginResponse) {
      throw new Error(`Не удолось найти пользователя ${login}`);
    }

    if (!chatId) {
      throw new Error('Не передан chatId');
    }

    const response = await chatApi.addUserToChat({ userId: userLoginResponse[0].id, chatId });
    console.log('resp', response);
    // if (!response) {
    //   throw new Error('Не удалось добавить пользователя в чат');
    // }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (login: string) => {
  const chatId = window.store.getState()?.chatId;

  try {
    console.log('isChatId', window.store.getState()?.chatId);
    const userLoginResponse = await chatApi.getUserByLogin(login);

    if (!userLoginResponse) {
      throw new Error(`Не удолось найти пользователя ${login}`);
    }

    if (!chatId) {
      throw new Error('Не передан chatId');
    }

    const response = await chatApi.deleteUserFromChat({ userId: userLoginResponse[0].id, chatId });
    console.log('resp', response);
    // if (!response) {
    //   throw new Error('Не удалось удалить пользователя из чата');
    // }
  } catch (err) {
    console.log(err);
  }
};

export const createNewChat = async (title: string) => {
  try {
    const createChatResponse = await createChat(title);

    if (!createChatResponse) {
      throw new Error(`Не удалось создать чат ${title}`);
    }

    await loadChatList();
  } catch (err) {
    return err;
  }
};

export const onOpenWS = async (chatId: number) => {
  try {
    const response = await chatApi.getChatToken(chatId);

    if (!response) {
      throw new Error('Не удалось получить токен чата');
    }
  } catch (err) {
    return err;
  }
};

export const reformatAndSaveMessage = (message: TMessagesResponse | TMessagesResponse[]) => {
  const userId = window.store.getState()?.user?.id;

  if (!Array.isArray(message)) {
    const messageList = (window.store.getState()?.messages || []).slice();
    messageList.push({
      content: message.content,
      id: message.id,
      isOwner: message.user_id === userId ? true : false,
      time: new Date(message.time).toLocaleTimeString(),
      type: message.type,
      user_id: message.user_id,
    });

    window.store.set({ messages: messageList });
    return;
  }

  const reformatMessageList = message
    .map((item) => {
      return {
        content: item.content,
        id: item.id,
        isOwner: item.user_id === userId ? true : false,
        time: new Date(item.time).toLocaleTimeString(),
        type: item.type,
        user_id: item.user_id,
      };
    })
    .reverse();

  window.store.set({ messages: reformatMessageList });
};

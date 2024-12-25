import { chatApi } from '../api/ChatApi/ChatApi';
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
          avatar: emptyAvatar,
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

export const loadChatById = async (id: number) => {
  try {
    const response = await chatApi.getChat(id);
    console.log(response);
    window.store.set({ currentChat: response });
  } catch (err) {
    console.log(err);
  }
};

export const createChat = async (title: string) => {
  try {
    console.log('title', title);
    const response = await chatApi.addChat(title);

    // if (response) {
    //   await loadChatList();
    // }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteChat = async (title: string) => {
  const chat = window.store.getState()!.chatList!.find((chat) => chat.title === title);
  try {
    if (!chat?.id) {
      return;
    }
    const response = await chatApi.deleteChat(chat.id);

    if (response) {
      const filteredChats = window.store.getState()!.chatList!.filter((chat) => chat.id !== response.result.id);
      window.store.set({ chatList: filteredChats });
    }
  } catch (err) {
    console.log(err);
  }
};

// const searchUserByLogin = async (login: string) => {
//   try {
//     const response = await chatApi.getUserByLogin(login);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };

const addUserToCurrentChat = async ({ userId, chatId }: { userId: number; chatId: number }) => {
  try {
    const response = await chatApi.addUserToChat({ userId, chatId });

    if (!response) {
      throw new Error('Не удалось добавить пользователя в чат');
    }
  } catch (err) {
    return err;
  }
};

export const createNewChatAndAddUser = async (login: string) => {
  try {
    console.log('login', login);
    const userLoginResponse = await chatApi.getUserByLogin(login);

    if (!userLoginResponse) {
      throw new Error(`Не удолось найти пользователя ${login}`);
    }

    const createChatResponse = await createChat(login);

    if (!createChatResponse) {
      throw new Error(`Не удалось создать чат ${login}`);
    }

    await addUserToCurrentChat({ userId: userLoginResponse[0].id, chatId: createChatResponse.id });

    await loadChatList();
  } catch (err) {
    // throw err
    return err;
  }
};

export const onOpenWS = async (chatId: number) => {
  try {
    const response = await chatApi.getChatToken(chatId);

    if (!response) {
      throw new Error('Не удалось получить токен чата');
    }

    // return response;
  } catch (err) {
    return err;
  }
};

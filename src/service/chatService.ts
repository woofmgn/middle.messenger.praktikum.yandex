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

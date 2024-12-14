import { TChangePfofileInfoData, userApi } from '../api/UserApi';

export const changeUserInfo = async (data: TChangePfofileInfoData) => {
  try {
    const response = userApi.changePfofileInfo(data);
    if (!response) {
      return;
    }

    window.store.set({ user: response });
  } catch (err) {
    console.log(err);
  }
};

import { TChangePfofileInfoData, TChangeUserPasswordData, userApi } from '../api/UserApi';

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

export const changeUserPassword = async (pwdData: TChangeUserPasswordData) => {
  try {
    await userApi.changeUserPassword(pwdData);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserAvatar = async (file: FileList) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file[0]);

    const response = await userApi.changePfofileAvatar(formData);
    window.store.set({ user: { ...response, avatar: `https://ya-praktikum.tech/api/v2/resources${response.avatar}` } });
    return response;
  } catch (err) {
    console.log(err);
  }
};

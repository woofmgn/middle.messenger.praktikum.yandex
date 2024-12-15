import { authApi, TSigninData, TSignupData } from '../api/AuthApi';
import { ROUTES } from '../utils/conts';

export const getUserInfo = async () => {
  try {
    const response = await authApi.getCurrentUser();

    if (!response) {
      return;
    }

    window.store.set({ user: response });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (data: TSigninData) => {
  try {
    const response = await authApi.signin(data);

    console.log('response', response);

    if (response === null) {
      await getUserInfo();
      window.router.go(ROUTES.MESSENGER);
    }
  } catch (err) {
    console.log(err);
  }
};

export const registrationUser = async (registerData: TSignupData) => {
  try {
    const response = await authApi.signup(registerData);

    if (!response.id) {
      return;
    }
    console.log('response', response);

    const userResponse = await authApi.getCurrentUser();

    window.store.set({ user: userResponse });
    window.router.go(ROUTES.MESSENGER);
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async () => {
  try {
    await authApi.logout();
    window.router.go(ROUTES.SIGNIN);
  } catch (err) {
    console.log(err);
  }
};

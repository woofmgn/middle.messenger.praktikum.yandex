import * as Pages from './pages';

import Router from './utils/Router';
import { ROUTES } from './utils/conts';
import { Store, StoreEvents } from './store/Store';

window.store = new Store({
  isLoading: false,
  user: null,
  chatList: [],
  loginError: null,
  id: null,
  currentChat: null,
  chatId: null,
  messages: null,
});

window.store.on(StoreEvents.Updated, (prevState, newState) => {
  console.log('prevState', prevState);
  console.log('newState', newState);
});

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use(ROUTES.SIGNIN, Pages.SigninPage)
  .use(ROUTES.SINGUP, Pages.SignupPage)
  .use(ROUTES.PROFILE, Pages.ProfilePage)
  .use(ROUTES.MESSENGER, Pages.MessengerPage)
  .use('*', Pages.NotFoundPage)
  .start();

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import Router from './utils/Router';
import { ROUTES } from './utils/conts';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
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

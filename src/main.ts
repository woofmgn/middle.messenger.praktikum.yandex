import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import Router from './utils/Router';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use('/', Pages.SigninPage)
  .use('/signup', Pages.SignupPage)
  .use('/profile', Pages.ProfilePage)
  .use('/messenger', Pages.MessengerPage)
  .use('*', Pages.NotFoundPage)
  .start();

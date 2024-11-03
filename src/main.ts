import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import emptyAvatar from './assets/image/empty-avatar.svg';
import emptyContactAvatar from './assets/image/empty-contact-avatar.svg';
import { contacts, messages } from './utils/conts';

const pages = {
  signin: [Pages.SigninPage],
  signup: [Pages.SignupPage],
  error: [Pages.ErrorPage],
  notFound: [Pages.NotFoundPage],
  profile: [
    Pages.ProfilePage,
    {
      imageUrl: emptyAvatar,
      editUser: false,
      userForm: true,
      openModal: false,
    },
  ],
  messenger: [
    Pages.MessengerPage,
    {
      contactList: contacts,
      empty: false,
      avatar: emptyContactAvatar,
      name: 'Себастьян',
      dropdown: false,
      messages: messages,
      userModal: false,
      userModalAdd: false,
    },
  ],
  navigation: [Pages.NavigationPage],
};

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  console.log('html', temlpatingFunction(context));
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('messenger'));

document.addEventListener('click', (e) => {
  //@ts-ignore
  const page = e.target.getAttribute('data-page');
  console.log('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

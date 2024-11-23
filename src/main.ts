import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import renderDOM from './utils/renderDom';

const pages = {
  signin: [Pages.SigninPage],
  signup: [Pages.SignupPage],
  error: [Pages.ErrorPage],
  notFound: [Pages.NotFoundPage],
  profile: [Pages.ProfilePage],
  messenger: [Pages.MessengerPage],
  navigation: [Pages.NavigationPage],
};

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: keyof typeof pages) {
  const pageInfo = pages[page];
  if (!pageInfo) {
    console.error(`Page "${page}" not found`);
    return;
  }

  const [source, context] = pageInfo;

  if (typeof source === 'function') {
    renderDOM(new source());
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('navigation'));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('data-page') as keyof typeof pages;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

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

function navigate(page: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('navigation'));

document.addEventListener('click', (e) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const page = e.target.getAttribute('data-page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

import { Link } from '../../components';
import Block from '../../utils/Block';

type TNotFoundPageProps = {
  className?: string;
  Link?: Link;
};

export default class NotFoundPage extends Block<TNotFoundPageProps> {
  constructor() {
    super('div', {
      className: 'layout',
      Link: new Link({ label: 'Назад к чатам', to: () => window.router.back() }),
    });
  }

  render(): string {
    return `
      <div class="not-fount">
        <h1 class="not-fount__title">404</h1>
        <p class="not-fount__text">Не туда попали</p>
        {{{Link}}}
      </div>
    `;
  }
}

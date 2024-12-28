import { Link } from '../../components';
import Block from '../../utils/Block';

type TErrorPageProps = {
  className?: string;
  Link?: Link;
};
export default class ErrorPage extends Block<TErrorPageProps> {
  constructor() {
    super('div', {
      className: 'layout',
      Link: new Link({ label: 'Назад к чатам', to: () => window.router.back() }),
    });
  }

  render(): string {
    return `
      <div class="not-fount">
        <h1 class="not-fount__title">500</h1>
        <p class="not-fount__text">Мы уже фиксим</p>
        {{{Link}}}
      </div>
    `;
  }
}

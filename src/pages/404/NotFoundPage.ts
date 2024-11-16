import { Link } from '../../components';
import Block from '../../utils/Block';

type TNotFoundPageProps = {
  Link: Link;
};

export default class NotFoundPage extends Block {
  constructor(props: TNotFoundPageProps) {
    super('div', {
      ...props,
      className: 'layout',
      Link: new Link({ label: 'Назад к чатам', to: '#' }),
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

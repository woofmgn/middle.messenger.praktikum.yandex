import { Link } from '../../components';
import Block from '../../utils/Block';

type TErrorPageProps = {
  Link: Link;
};

export default class ErrorPage extends Block {
  constructor(props: TErrorPageProps) {
    super('div', {
      ...props,
      className: 'layout',
      Link: new Link({ label: 'Назад к чатам', to: '#' }),
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

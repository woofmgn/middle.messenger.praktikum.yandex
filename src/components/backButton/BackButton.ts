import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';

type TBackButtonProps = {
  className: string;
  events?: {
    click: (e: MouseEvent) => void;
  };
};

export default class BackButton extends Block<TBackButtonProps> {
  constructor() {
    super('div', {
      className: 'back-container',
      events: {
        click: (e) => {
          e.preventDefault();
          window.router.go(ROUTES.MESSENGER);
        },
      },
    });
  }

  render(): string {
    return `
      <button class="back-container__button" />
    `;
  }
}

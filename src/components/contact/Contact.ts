import Block from '../../utils/Block';

type TContactProps = {
  className?: string;
  avatar: string;
  message: string;
  name: string;
  date: string;
  count?: string;
};

export default class Contact extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('li', {
      ...props,
      className: 'contact',
    });
  }

  render(): string {
    return `
      <img src={{avatar}} alt="Изображение аватара пользователя" class="contact__avatar">
      <div class="contact__message-module">
        <div class="contact__message-wrapper">
          <h3 class="contact__name">{{name}}</h3>
          <p class="contact__second-message">{{message}}</p>
        </div>
        <div class="contact__info-wrapper">
          <span class="contact__date">{{date}}</span>
          {{#if count}}
            <div class="contact__count-wrapper">
              <span class="contact__count">{{count}}</span>
            </div>
          {{/if}}
        </div>
      </div>
    `;
  }
}

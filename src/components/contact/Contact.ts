import { TGetChatListResponse } from '../../api/ChatApi/types';
import Block from '../../utils/Block';

type TContactProps = {
  className?: string;
  chatList: TGetChatListResponse;
  onClick: () => void;
  events?: {
    click: () => void;
  };
  isActive: boolean;
};

export default class Contact extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('li', {
      ...props,
      className: `container`,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    const activeClass = this.props.isActive ? 'contact_active' : 'contact';

    return `
              <div class=${activeClass}>
                <img src=${this.props.chatList.avatar} alt="Изображение аватара пользователя" class="contact__avatar">
                <div class="contact__message-module">
                  <div class="contact__message-wrapper">
                    <h3 class="contact__name">${this.props.chatList.title}</h3>
                    <p class="contact__second-message">${this.props.chatList.last_message?.content || ''}</p>
                  </div>
                  <div class="contact__info-wrapper">
                    <span class="contact__date">${this.props.chatList.last_message?.time ? new Date(this.props.chatList.last_message?.time).toLocaleTimeString() : ''}</span>
                    {{#if this.unread_count}}
                      <div class="contact__count-wrapper">
                        <span class="contact__count">${this.props.chatList.unread_count}</span>
                      </div>
                    {{/if}}
                  </div>
                </div>
              </div>
    `;
  }
}

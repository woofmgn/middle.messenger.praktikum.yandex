import { TGetChatListResponse } from '../../api/ChatApi/types';
import { connect } from '../../store/connect';
import Block from '../../utils/Block';

type TContactProps = {
  className?: string;
  chatList: TGetChatListResponse[];
  contactList: {
    className?: string;
    avatar: string;
    message: string;
    title: string;
    date: string | Date;
    unread_count?: number;
  }[];
};

class Contact extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('ul', {
      ...props,
      className: 'chat-list__list-wrapper',
    });
  }

  render(): string {
    console.log('props', this.props.chatList);
    return `
          {{#each chatList}}
          <li class="contact">
              <img src={{this.avatar}} alt="Изображение аватара пользователя" class="contact__avatar">
              <div class="contact__message-module">
                <div class="contact__message-wrapper">
                  <h3 class="contact__name">{{this.title}}</h3>
                  <p class="contact__second-message">{{this.message}}</p>
                </div>
                <div class="contact__info-wrapper">
                  <span class="contact__date">{{this.date}}</span>
                  {{#if this.unread_count}}
                    <div class="contact__count-wrapper">
                      <span class="contact__count">{{this.unread_count}}</span>
                    </div>
                  {{/if}}
                </div>
              </div>
          </li>
          {{/each}}
    `;
  }
}

const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
  return {
    isLoading: state.isLoading,
    chatList: state.chatList,
  };
};

export default connect(mapStateToProps)(Contact);

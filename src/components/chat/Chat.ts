import Block from '../../utils/Block';
import { messages } from '../../utils/conts';
import { ChatHeader } from '../chatHeader';
import { MessagesBoard } from '../messagesBoard';
import avatarImg from '../../assets/image/empty-contact-avatar.svg';
import { ChatInput } from '../chatInput';

export default class Chat extends Block {
  constructor() {
    super('section', {
      // ...props,
      className: 'chat',
      formData: {
        data: {},
      },
      ChatHeader: new ChatHeader({
        avatar: avatarImg,
        name: 'Альбрехт',
      }),
      MessagesBoard: new MessagesBoard({
        messages: messages,
        date: '10 июня',
      }),
      ChatInput: new ChatInput({
        value: '',
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
          this.setProps({
            ...this.props,
            formData: {
              ...this.props.formData,
              data: {
                [target.name]: target.value,
              },
            },
          });
        },
        onBlur: (e) => console.log('blur', e),
        onSubmit: () => {
          console.log(this.props.formData.data);
          this.setProps({
            ...this.props,
            formData: {
              ...this.props.formData,
              data: {
                message: '',
              },
            },
          });
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="chat__wrapper">
        {{#if empty}}
          <h2 class="empty-title">Выберите чат чтобы отправить сообщение</h2>
        {{else}}
          {{{ChatHeader}}}
          {{{MessagesBoard}}}
          {{{ChatInput}}}
        {{/if}}
      </div>
    `;
  }
}

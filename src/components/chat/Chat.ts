import Block from '../../utils/Block';
import { messages } from '../../utils/conts';
import { ChatHeader } from '../chatHeader';
import { MessagesBoard } from '../messagesBoard';
import avatarImg from '../../assets/image/empty-contact-avatar.svg';
import { ChatInput } from '../chatInput';
import { connect } from '../../store/connect';

type TChatProps = {
  className: string;
  ChatHeader: ChatHeader;
  MessagesBoard: MessagesBoard;
  ChatInput: ChatInput;
};

class Chat extends Block<TChatProps> {
  constructor() {
    super('section', {
      className: 'chat',
      ChatHeader: new ChatHeader({
        avatar: avatarImg,
        name: 'Альбрехт',
      }),
      MessagesBoard: new MessagesBoard({
        messages: messages,
        date: '10 июня',
      }),
      ChatInput: new ChatInput(),
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

const mapStateToProps = (state: { index: number }) => {
  return {
    index: state.index,
  };
};

export default connect(mapStateToProps)(Chat);

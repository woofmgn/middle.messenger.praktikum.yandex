import Block from '../../utils/Block';
import { messages } from '../../utils/conts';
import { ChatHeader } from '../chatHeader';
import { MessagesBoard } from '../messagesBoard';
import avatarImg from '../../assets/image/empty-contact-avatar.svg';
import { ChatInput } from '../chatInput';
import { connect } from '../../store/connect';
import { onOpenWS } from '../../service/chatService';

type TChatProps = {
  className: string;
  ChatHeader: ChatHeader;
  MessagesBoard: MessagesBoard;
  ChatInput: ChatInput;
  chatId: number | null;
};

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super('section', {
      ...props,
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

  async componentDidUpdate(oldProps: TChatProps, newProps: TChatProps): Promise<boolean> {
    if (oldProps.chatId !== newProps.chatId && newProps.chatId) {
      console.log(222);
      const response = await onOpenWS(newProps.chatId);
      console.log('response', response);
      return true;
    }
    return false;
  }

  render(): string {
    console.log('this.props.currentChat', this.props.chatId);
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

const mapStateToProps = (state: { chatId: number }) => {
  return {
    chatId: state.chatId,
  };
};

export default connect(mapStateToProps)(Chat);

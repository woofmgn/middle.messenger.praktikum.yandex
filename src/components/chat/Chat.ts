import Block from '../../utils/Block';
import { ChatHeader, TChatHeaderProps } from '../chatHeader';
import { MessagesBoard, TMessagesBoardProps } from '../messagesBoard';
import avatarImg from '../../assets/image/empty-contact-avatar.svg';
import { ChatInput } from '../chatInput';
import { connect } from '../../store/connect';
import { webSocket } from '../../utils/WebSocket';
import { TUserInfoResponse } from '../../api/AuthApi';
import { TStoreState } from '../../store/Store';

export type TChatProps = {
  className?: string;
  ChatHeader?: Block<TChatHeaderProps>;
  MessagesBoard?: Block<TMessagesBoardProps>;
  ChatInput?: ChatInput;
  chatId?: number | null;
  user?: TUserInfoResponse | null;
};

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super('section', {
      ...props,
      className: 'chat',
      ChatHeader: new ChatHeader({
        avatar: avatarImg,
      }),
      MessagesBoard: new MessagesBoard({
        date: '10 июня',
      }),
      ChatInput: new ChatInput(),
    });
  }

  async componentDidUpdate(oldProps: TChatProps, newProps: TChatProps): Promise<boolean> {
    if (oldProps.chatId !== newProps.chatId && newProps.chatId) {
      if (this.props.chatId && this.props.user?.id) {
        await webSocket.connectWS(this.props.chatId, this.props.user.id);
      }
      return true;
    }
    return false;
  }

  render(): string {
    return `
      <div class="chat__wrapper">
        {{#if chatId}}
          {{{ChatHeader}}}
          {{{MessagesBoard}}}
          {{{ChatInput}}}
        {{else}}
          {{{ChatHeader}}}
          <h2 class="empty-title">Выберите чат чтобы отправить сообщение</h2>
        {{/if}}
      </div>
    `;
  }
}

const mapStateToProps = (state: TStoreState) => {
  return {
    chatId: state.chatId,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Chat);

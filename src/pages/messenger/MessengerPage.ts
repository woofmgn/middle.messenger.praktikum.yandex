import { TGetChatListResponse } from '../../api/ChatApi/types';
import { Chat, ChatList } from '../../components';
import { loadChatList } from '../../service/chatService';
import { connect } from '../../store/connect';
import Block from '../../utils/Block';

type TMessagePageProps = {
  className?: string;
  ChatList?: ChatList;
  Chat?: Chat;
  chatList?: TGetChatListResponse[];
};

export default class MessengerPage extends Block<TMessagePageProps> {
  constructor(props: TMessagePageProps) {
    super('div', {
      className: 'messenger-block',
      ChatList: new ChatList(props.chatList),
      Chat: new Chat(),
    });
  }

  render(): string {
    return `
      {{{ChatList}}}
      {{{Chat}}}
    `;
  }
}

// const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
//   return {
//     isLoading: state.isLoading,
//     chatList: state.chatList,
//   };
// };

// export default connect(mapStateToProps)(MessengerPage);

import { Chat, ChatList } from '../../components';
import Block from '../../utils/Block';

type TMessagePageProps = {
  className?: string;
  ChatList?: ChatList;
  Chat?: Chat;
};

export default class MessengerPage extends Block<TMessagePageProps> {
  constructor() {
    super('div', {
      className: 'messenger-block',
      ChatList: new ChatList(),
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

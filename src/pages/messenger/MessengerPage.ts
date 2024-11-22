import { Chat, ChatList } from '../../components';
import Block from '../../utils/Block';

export default class MessengerPage extends Block {
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

import { Chat, ChatList } from '../../components';
import { TChatProps } from '../../components/chat';
import { getUserInfo } from '../../service/authService';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';

type TMessagePageProps = {
  className?: string;
  ChatList?: ChatList;
  Chat?: Block<TChatProps>;
};

export default class MessengerPage extends Block<TMessagePageProps> {
  constructor(props: TMessagePageProps) {
    super('div', {
      ...props,
      className: 'messenger-block',
      ChatList: new ChatList({}),
      Chat: new Chat({}),
    });
  }

  public componentDidMount(): void {
    getUserInfo()
      .then((res) => {
        if (!res) {
          window.router.go(ROUTES.SIGNIN);
        }
      })
      .catch((err) => {
        console.log(err);
        window.router.go(ROUTES.SIGNIN);
      });
  }

  render(): string {
    return `
      {{{ChatList}}}
      {{{Chat}}}
    `;
  }
}

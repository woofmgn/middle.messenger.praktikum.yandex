import { loadChatList } from '../../service/chatService';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';
import { Button } from '../button';
import { ContactList, TContactProps } from '../contactList';
import { CreateChatModal } from '../createChatModal';
import { Link } from '../link';
import { SearchInput } from '../searchInput';

type TChatListProps = {
  className?: string;
  CreateChatButton?: Button;
  Link?: Link;
  SearchInput?: SearchInput;
  ContactList?: Block<TContactProps>;
  CreateChatModal?: CreateChatModal;
  isOpenModal?: boolean;
  currentChatId?: null | number;
};

export default class ChatList extends Block<TChatListProps> {
  constructor(props: TChatListProps) {
    super('section', {
      ...props,
      className: 'chat-list',
      isOpenModal: false,
      currentChatId: null,
      CreateChatButton: new Button({
        label: 'Добавить чат',
        onClick: () => this.setProps({ ...this.props, isOpenModal: true }),
        btnText: true,
      }),
      Link: new Link({
        to: () => window.router.go(ROUTES.PROFILE),
        label: 'Профиль',
        optionalClass: 'chat-list__to-profile-link',
      }),
      SearchInput: new SearchInput({
        onBlur: (e) => console.log(e),
        onChange: (e) => console.log(e),
      }),
      ContactList: new ContactList({
        onClick: (id: number) => console.log(id),
        chatList: [],
      }),
      CreateChatModal: new CreateChatModal({
        modalTypeAdd: true,
        onClose: () => this.setProps({ ...this.props, isOpenModal: false }),
      }),
    });
  }

  public componentDidMount(): void {
    loadChatList()
      .then()
      .catch((err) => console.log(err));
  }

  render(): string {
    return `
      <div class="chat-list__container">
        <div class="chat-list__header">
            <div class="chat-list__button-wrapper">
              {{{CreateChatButton}}}
              {{{Link}}}
            </div>
            {{{SearchInput}}}
        </div>
        {{{ContactList}}}
      </div>
      {{#if isOpenModal}}
        {{{CreateChatModal}}}
      {{/if}}
    `;
  }
}

// const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
//   return {
//     isLoading: state.isLoading,
//     chatList: state.chatList,
//   };
// };

// export default connect(mapStateToProps)(ChatList);

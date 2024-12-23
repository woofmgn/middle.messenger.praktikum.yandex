import { loadChatList } from '../../service/chatService';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';
import { ContactList } from '../contactList';
import { Link } from '../link';
import { SearchInput } from '../searchInput';

type TChatListProps = {
  className?: string;
  Link: Link;
  SearchInput: SearchInput;
  ContactList: ContactList;
};

export default class ChatList extends Block<TChatListProps> {
  constructor() {
    super('section', {
      className: 'chat-list',
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
        onClick: (index) => console.log(index),
        chatList: [],
      }),
    });
  }

  // public componentDidMount(): void {
  //   loadChatList()
  //     .then((res) => {
  //       this.children.ContactList.setProps({ chatList: res });
  //     })
  //     .catch((err) => console.log(err));
  // }

  render(): string {
    return `
      <div class="chat-list__container">
        <div class="chat-list__header">
          {{{Link}}}
          {{{SearchInput}}}
        </div>
        {{{ContactList}}}
      </div>
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

import { loadChatList } from '../../service/chatService';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';
import { Contact } from '../contact';
import { Link } from '../link';
import { SearchInput } from '../searchInput';

type TChatListProps = {
  className?: string;
  Link: Link;
  SearchInput: SearchInput;
  ContactList: Contact;
};

export default class ChatList extends Block<TChatListProps> {
  constructor(props: TChatListProps) {
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
      ContactList: new Contact({}),
    });
  }

  public componentDidMount(): void {
    loadChatList()
      .then()
      .catch((err) => console.log(err));
  }

  render(): string {
    // console.log('chatik', this.props.chatList);

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

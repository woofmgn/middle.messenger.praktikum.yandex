import Block from '../../utils/Block';
import { contacts } from '../../utils/conts';
import { Contact } from '../contact';
import { Link } from '../link';
import { SearchInput } from '../searchInput';

type TChatListProps = {
  className?: string;
  Link: Link;
  SearchInput: SearchInput;
  contactList: Contact[];
};

export default class ChatList extends Block<TChatListProps> {
  constructor() {
    super('section', {
      className: 'chat-list',
      Link: new Link({
        to: '#',
        label: 'Профиль',
        optionalClass: 'chat-list__to-profile-link',
      }),
      SearchInput: new SearchInput({
        onBlur: (e) => console.log(e),
        onChange: (e) => console.log(e),
      }),
      contactList: contacts.map((contact) => {
        return new Contact({
          ...contact,
        });
      }),
    });
  }

  render(): string {
    return `
      <div class="chat-list__container">
        <div class="chat-list__header">
          {{{Link}}}
          {{{SearchInput}}}
        </div>
        <ul class="chat-list__list-wrapper">
          {{#each contactList}}
            {{{this}}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}

import { TGetChatListResponse } from '../../api/ChatApi/types';
import { loadChatById } from '../../service/chatService';
import { connect } from '../../store/connect';
import Block from '../../utils/Block';
import Contact from '../contact/Contact';

type TContactProps = {
  className?: string;
  chatList: TGetChatListResponse[];
  onClick: (id: number) => void;
  isActive: number;
  contacts: Contact[] | null;
};

class ContactList extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('ul', {
      ...props,
      isActive: 0,
      className: 'chat-list__list-wrapper',
      contacts: props.chatList.map((contact) => {
        return new Contact({
          onClick: () => console.log(contact.id),
          chatList: contact,
          isActive: false,
        });
      }),
    });
  }

  componentDidUpdate(oldProps: TContactProps, newProps: TContactProps) {
    console.log('oldProps', oldProps);
    console.log('newProps', newProps);
    if (oldProps.chatList !== newProps.chatList) {
      const res = newProps.chatList.map((contact) => {
        return new Contact({
          onClick: () => {
            this.props.onClick(contact.id);
            this.setProps({ ...this.props, isActive: contact.id });
            console.log('this.props.isActive', this.props.isActive);
          },
          chatList: contact,
          isActive: false,
        });
      });

      (this.children as unknown as { contacts: Contact[] }) = { contacts: res };
      return true;
    }

    if (oldProps.isActive !== newProps.isActive) {
      console.log('is', oldProps.isActive, newProps.isActive);
      const { contacts } = this.children;

      (contacts as unknown as Contact[]).forEach(async (contact) => {
        console.log(1);
        if (contact.props.chatList.id === this.props.isActive) {
          contact.setProps({ ...contact.props, isActive: true });
          console.log('is Active', contact.props.chatList.id, this.props.isActive);

          window.store.set({ chatId: contact.props.chatList.id });

          // await loadChatById(this.props.isActive);
          return;
        }
        contact.setProps({ ...contact.props, isActive: false });
      });
      return true;
    }

    return false;
  }

  render(): string {
    if (!this.props.chatList) {
      return '';
    }

    return `
      {{#each contacts}}
        {{{this}}}
      {{/each}}
    `;
  }
}

const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
  return {
    isLoading: state.isLoading,
    chatList: state.chatList,
  };
};

export default connect(mapStateToProps)(ContactList);

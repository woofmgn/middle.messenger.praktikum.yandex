import { TGetChatListResponse } from '../../api/ChatApi/types';
import { loadChatList } from '../../service/chatService';
import { connect } from '../../store/connect';
import Block from '../../utils/Block';
import Contact from '../contact/Contact';
// import Contact from '../contact/Contact';

type TContactProps = {
  className?: string;
  chatList: TGetChatListResponse[];
  onClick: (id: number) => void;
  events?: Record<string, () => void>;
  Contact: Contact[] | null;
};

class ContactList extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('ul', {
      ...props,
      className: 'chat-list__list-wrapper',
    });
    this.children = this.props.chatList ? this.renderChildren(this.props.chatList) : [];
  }

  private async fetchChatList() {
    const chatList = await loadChatList();
    this.setProps({ chatList: chatList });
  }

  public componentDidMount(): void {
    if (!this.props.chatList) {
      this.fetchChatList();
    }
  }

  private renderChildren(chatList: TGetChatListResponse[]) {
    console.log('renderChildren');
    return chatList.map((contact) => {
      return new Contact({
        onClick: () => console.log(contact.id),
        chatList: contact,
      });
    });
  }

  componentDidUpdate(oldProps: TContactProps, newProps: TContactProps) {
    console.log('oldProps', oldProps);
    console.log('newProps', newProps);
    if (oldProps.chatList !== newProps.chatList) {
      this.children = this.renderChildren(newProps.chatList);
      return true;
    }
    return false;
  }

  render(): string {
    console.log('children', this.children);
    if (!this.props.chatList) {
      return '';
    }

    console.log('children', this.children);

    const children =
      this.children
        .map((child) => {
          console.log('child', child);
          return child.getContent().outerHTML;
        })
        .join('') || '';

    console.log(document);
    return children;
  }
}

const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
  return {
    isLoading: state.isLoading,
    chatList: state.chatList,
  };
};

export default connect(mapStateToProps)(ContactList);

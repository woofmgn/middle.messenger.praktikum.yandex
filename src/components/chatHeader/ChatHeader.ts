import { TGetChatListResponse } from '../../api/ChatApi/types';
import { connect } from '../../store/connect';
import Block from '../../utils/Block';
import { ChatDropdown } from '../chatDropdown';
import { UserModal } from '../userModal';
import { TChatHeaderProps, THeaderButtonProps } from './chatHeader.types';

export class HeaderButton extends Block<THeaderButtonProps> {
  constructor(props: { onClick: () => void }) {
    super('button', {
      ...props,
      className: 'chat-header__button',
      events: {
        click: props.onClick,
      },
    });
  }
}

class ChatHeader extends Block<TChatHeaderProps> {
  constructor(props: TChatHeaderProps) {
    super('div', {
      ...props,
      isShownDropdown: false,
      className: 'chat-header',
      isOpenedModal: false,
      modalTypeAdd: true,
      HeaderButton: new HeaderButton({
        onClick: () => {
          if (this.props.isShownDropdown) {
            this.setProps({ ...this.props, isShownDropdown: false });
            return;
          }
          this.setProps({ ...this.props, isShownDropdown: true });
        },
      }),
      ChatDropdown: new ChatDropdown({
        onClose: () => this.setProps({ ...this.props, isShownDropdown: false }),
        onAddUser: () => {
          this.setProps({ ...this.props, isOpenedModal: true, modalTypeAdd: true });
          (this.children.UserModal as unknown as Block<{ modalTypeAdd: boolean }>).setProps({ modalTypeAdd: true });
        },
        onRemoveUser: () => {
          this.setProps({ ...this.props, isOpenedModal: true, modalTypeAdd: false });
          (this.children.UserModal as unknown as Block<{ modalTypeAdd: boolean }>).setProps({ modalTypeAdd: false });
        },
      }),
      UserModal: new UserModal({
        onClose: () => this.setProps({ ...this.props, isOpenedModal: false }),
        modalTypeAdd: true,
      }),
    });
  }

  componentDidUpdate(_oldProps: TChatHeaderProps, _newProps: TChatHeaderProps): boolean | Promise<boolean> {
    if (_oldProps !== _newProps) {
      return true;
    }
    return false;
  }

  render(): string {
    console.log('this.props.currentChat', this.props.currentChat);
    return `
      <div class="chat-header__wrapper">
        <div class="chat-header__user-info">
        {{#if currentChat.title}}
          <img class="chat-header__avatar" src={{currentChat.avatar}} alt="Изображение аватара пользователя" class="contact__avatar">
          <h3 class="chat-header__username">{{currentChat.title}}</h3>
        {{/if}}
        </div>
        {{{HeaderButton}}}
      </div>
      {{#if isShownDropdown}}
        {{{ChatDropdown}}}
      {{/if}}
      {{#if isOpenedModal}}
        {{{UserModal}}}
      {{/if}}
    `;
  }
}

const mapStateToProps = (state: { currentChat: TGetChatListResponse }) => {
  return {
    currentChat: state.currentChat,
  };
};

export default connect(mapStateToProps)(ChatHeader);

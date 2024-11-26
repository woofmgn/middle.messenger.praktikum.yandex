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

export default class ChatHeader extends Block<TChatHeaderProps> {
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
        onAddUser: () => this.setProps({ ...this.props, isOpenedModal: true, modalTypeAdd: true }),
        onRemoveUser: () => this.setProps({ ...this.props, isOpenedModal: true, modalTypeAdd: false }),
      }),
      UserModal: new UserModal({
        onClose: () => this.setProps({ ...this.props, isOpenedModal: false }),
      }),
    });
  }

  render(): string {
    return `
      <div class="chat-header__wrapper">
        <div class="chat-header__user-info">
          <img class="chat-header__avatar" src={{avatar}} alt="Изображение аватара пользователя" class="contact__avatar">
          <h3 class="chat-header__username">{{name}}</h3>
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

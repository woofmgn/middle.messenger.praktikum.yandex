import Block from '../../utils/Block';
import { Button } from '../button';

type TChatDropdownProps = {
  className?: string;
  AddUserButton?: Button;
  RemoveUserButton?: Button;
  onClose: () => void;
  onAddUser: () => void;
  onRemoveUser: () => void;
};

export default class ChatDropdown extends Block<TChatDropdownProps> {
  constructor(props: TChatDropdownProps) {
    super('div', {
      ...props,
      className: 'chat-dropdown',
      AddUserButton: new Button({
        label: 'Добавить пользователя',
        btnText: true,
        onClick: () => {
          props.onAddUser();
          props.onClose();
        },
      }),
      RemoveUserButton: new Button({
        label: 'Удалить пользователя',
        btnText: true,
        onClick: () => {
          props.onRemoveUser();
          props.onClose();
        },
      }),
    });
  }

  render(): string {
    return `
      <ul class="chat-dropdown__list">
        <li class="chat-dropdown__item">
          <div class="chat-dropdown__icon"></div>
          {{{AddUserButton}}}
        </li>
        <li class="chat-dropdown__item">
          <div class="chat-dropdown__icon chat-dropdown__icon_delete"></div>
          {{{RemoveUserButton}}}
        </li>
      </ul>
    `;
  }
}

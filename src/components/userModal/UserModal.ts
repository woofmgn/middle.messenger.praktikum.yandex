import Block from '../../utils/Block';
import { AuthInput } from '../authInput';
import { Button } from '../button';

type TUserModalProps = {
  onClose: () => void;
  // modalTypeAdd: boolean
};

export default class UserModal extends Block {
  constructor(props: TUserModalProps) {
    super('div', {
      ...props,
      className: 'modal-layout',
      formData: {
        data: {},
        error: {},
      },
      isOpenedModal: false,
      CloseButton: new Button({
        label: '',
        btnText: true,
        optClass: 'modal__cancel-button',
        onClick: props.onClose,
      }),
      UserInput: new AuthInput({
        label: 'Логин',
        name: 'login',
        id: 'login',
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
            ...this.props,
            formData: {
              ...this.props.formData,
              data: {
                ...this.props.formData.data,
                [target.name]: target.value,
              },
            },
          });
        },
        onBlur: (e) => console.log('blur', e),
      }),
      AddButton: new Button({
        label: 'Добавить',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log('submit', this.props.formData.data);
        },
      }),
      RemoveButton: new Button({
        label: 'Удалить',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log('submit', this.props.formData.data);
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="modal-overlay"></div>
      <div class="modal">
        {{{CloseButton}}}
        <h2 class="modal__title">
          {{#if modalTypeAdd}}
            Добавить пользователя
            {{else}}
            Удалить пользователя
          {{/if}}
        </h2>
        <form action="" class="modal__form modal__form-user">
          {{{UserInput}}}
          {{#if modalTypeAdd}}
              {{{AddButton}}}
            {{else}}
              {{{RemoveButton}}}
          {{/if}}
        </form>
      </div>
    `;
  }
}

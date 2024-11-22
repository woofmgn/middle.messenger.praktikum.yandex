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
      UserInput: new AuthInput({
        label: 'Логин',
        name: 'login',
        id: 'login',
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
            ...this.props,
            formState: {
              ...this.props.formState,
              data: {
                ...this.props.formState.data,
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
        onClick: () => console.log('submit'),
      }),
      RemoveButton: new Button({
        label: 'Удалить',
        type: 'submit',
        onClick: () => console.log('submit'),
      }),
    });
  }

  render(): string {
    return `
      <div class="modal-overlay"></div>
      <div class="modal">
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

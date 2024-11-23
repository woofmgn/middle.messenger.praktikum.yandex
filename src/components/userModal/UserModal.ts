import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
import { AuthInput } from '../authInput';
import { Button } from '../button';

type TUserModalProps = {
  onClose: () => void;
};

export default class UserModal extends Block {
  constructor(props: TUserModalProps) {
    super('div', {
      ...props,
      className: 'modal-layout',
      formState: {
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
            formState: {
              ...this.props.formState,
              data: {
                ...this.props.formState.data,
                [target.name]: target.value,
              },
            },
          });
        },
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('login', target.value);

          this.setProps({
            ...this.props,
            formState: {
              ...this.props.formState,
              error: {
                ...this.props.formState.error,
                [target.name]: errorMessage,
              },
            },
          });

          this.children.UserInput.setProps({ error: errorMessage });
        },
      }),
      AddButton: new Button({
        label: 'Добавить',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          console.log('submit', this.props.formState.data);
        },
      }),
      RemoveButton: new Button({
        label: 'Удалить',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          console.log('submit', this.props.formState.data);
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

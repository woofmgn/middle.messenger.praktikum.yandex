import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
import { AuthInput, TAuthInputError } from '../authInput';
import { Button } from '../button';

type TUserModalProps = {
  className?: string;
  formState?: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
  isOpenedModal?: boolean;
  CloseButton?: Button;
  UserInput?: AuthInput;
  AddButton?: Button;
  RemoveButton?: Button;
  onClose: () => void;
};

export default class UserModal extends Block<TUserModalProps> {
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
          if (!this.props.formState) return;

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
          if (!this.props.formState) return;

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

          const child = this.children.UserInput as unknown as TAuthInputError;
          child.setProps({ error: errorMessage });
        },
      }),
      AddButton: new Button({
        label: 'Добавить',
        type: 'submit',
        onClick: (e) => {
          if (!this.props.formState) return;

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
          if (!this.props.formState) return;

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

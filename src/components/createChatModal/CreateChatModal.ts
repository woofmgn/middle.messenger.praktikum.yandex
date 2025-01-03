import { createNewChat } from '../../service/chatService';
import Block from '../../utils/Block';
import { checkValidityForm } from '../../utils/formValidation';
import { AuthInput } from '../authInput';
import { Button } from '../button';

type TCreateChatModalProps = {
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
  modalTypeAdd: boolean;
  onClose: () => void;
};

export default class CreateChatModal extends Block<TCreateChatModalProps> {
  constructor(props: TCreateChatModalProps) {
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
        label: 'Название чата',
        name: 'title',
        id: 'title',
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
          console.log(e);
        },
      }),
      AddButton: new Button({
        label: 'Добавить',
        type: 'submit',
        onClick: async (e) => {
          if (!this.props.formState) return;

          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          if (!this.props.formState.data.title) {
            return;
          }

          await createNewChat(this.props.formState.data.title);
          props.onClose();
        },
      }),
      RemoveButton: new Button({
        label: 'Удалить',
        type: 'submit',
        onClick: async (e) => {
          if (!this.props.formState) return;

          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          props.onClose();
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
            Добавить чат
            {{else}}
            Удалить чат
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

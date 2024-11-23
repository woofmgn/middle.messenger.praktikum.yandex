import Block from '../../utils/Block';
import { Button } from '../button';
import { FileInput } from '../fileInput';

type TProfileModalProps = {
  title: string;
  onCloseModal: () => void;
};

export default class ProfileModal extends Block {
  constructor(props: TProfileModalProps) {
    super('div', {
      ...props,
      className: 'modal-layout',
      title: props.title,
      formState: {
        data: {},
        error: {},
      },
      SubmitButton: new Button({
        label: 'Поменять',
        onClick: () => {
          console.log('formSubmit', this.props.formState.data);
          props.onCloseModal();
        },
        type: 'submit',
      }),
      FileInput: new FileInput({
        onBlur: (e) => console.log(e),
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
            formState: {
              ...this.props.formState,
              data: {
                ...this.props.formState.data,
                [target.name]: target.files,
              },
            },
          });
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="modal-overlay"></div>
      <div class="modal">
        <h2 class="modal__title">{{title}}</h2>
        <form action="" class="modal__form">
          {{{FileInput}}}
          {{{SubmitButton}}}
        </form>
      </div>
    `;
  }
}
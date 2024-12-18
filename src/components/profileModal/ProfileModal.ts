import { changeUserAvatar } from '../../service/profileService';
import Block from '../../utils/Block';
import { Button } from '../button';
import { FileInput } from '../fileInput';

type TProfileModalProps = {
  title: string;
  className?: string;
  formState?: {
    data: Record<string, FileList | null>;
    error: Record<string, string>;
  };
  SubmitButton?: Button;
  FileInput?: FileInput;
  onCloseModal: () => void;
};

export default class ProfileModal extends Block<TProfileModalProps> {
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
        onClick: async (e) => {
          e.preventDefault();
          if (!this.props.formState) return;

          console.log('formSubmit', this.props.formState.data);
          const response = await changeUserAvatar(this.props.formState.data.avatar as unknown as FileList);
          console.log(response);
          props.onCloseModal();
        },
        type: 'submit',
      }),
      FileInput: new FileInput({
        onBlur: (e) => console.log(e),
        onChange: (e: Event) => {
          if (!this.props.formState) return;

          const target = e.target as HTMLInputElement;
          console.log(target.files);
          this.setProps({
            ...this.props,
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

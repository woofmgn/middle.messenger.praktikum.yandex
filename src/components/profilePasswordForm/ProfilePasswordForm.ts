import { changeUserPassword } from '../../service/profileService';
import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
import { Button } from '../button';
import { ProfileInput, TProfileInputProps } from '../profileInput';

type TProfilePasswordFormProps = {
  className?: string;
  formState?: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
  OldPasswordInput?: ProfileInput;
  NewPasswordInput?: ProfileInput;
  RepeatNewPasswordInput?: ProfileInput;
  Button?: Button;
  onSubmit: () => void;
};

export default class ProfilePasswordForm extends Block<TProfilePasswordFormProps> {
  constructor(props: TProfilePasswordFormProps) {
    super('form', {
      ...props,
      className: 'profile-form',
      formState: {
        data: {},
        error: {},
      },
      OldPasswordInput: new ProfileInput({
        id: 'oldPassword',
        name: 'oldPassword',
        type: 'password',
        label: 'Старый пароль',
        value: '',
        onBlur: (e) => {
          if (!this.props.formState) return;

          const target = e.target as HTMLInputElement;
          const errorMessage = validation('password', target.value);

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

          const child = this.children.OldPasswordInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
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
      }),
      NewPasswordInput: new ProfileInput({
        id: 'newPassword',
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        value: '',
        onBlur: (e) => {
          if (!this.props.formState) return;

          const target = e.target as HTMLInputElement;
          const errorMessage = validation('password', target.value);

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

          const child = this.children.NewPasswordInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
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
      }),
      RepeatNewPasswordInput: new ProfileInput({
        id: 'newPasswordRepeat',
        name: 'newPasswordRepeat',
        type: 'password',
        label: 'Повторите новый пароль',
        value: '',
        onBlur: (e) => {
          if (!this.props.formState) return;

          const target = e.target as HTMLInputElement;
          const errorMessage = validation('password', target.value);
          const child = this.children.RepeatNewPasswordInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;

          if (this.props.formState.data.newPassword !== target.value) {
            this.setProps({
              ...this.props,
              formState: {
                ...this.props.formState,
                error: {
                  ...this.props.formState.error,
                  [target.name]: 'Пароли не совпадают',
                },
              },
            });

            child.setProps({ error: errorMessage });
            return;
          }

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

          child.setProps({ error: errorMessage });
        },
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
      }),
      Button: new Button({
        label: 'Сохранить',
        type: 'submit',
        onClick: async (e) => {
          if (!this.props.formState) return;

          e.preventDefault();

          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          if (this.props.formState.data['oldPassword'] === this.props.formState.data['newPassword']) {
            const child = this.children.NewPasswordInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
            child.setProps({ error: 'Старый пароль не может быть использован в качестве нового' });
            return;
          }

          await changeUserPassword({
            newPassword: this.props.formState.data.newPassword,
            oldPassword: this.props.formState.data.oldPassword,
          });
          props.onSubmit();
        },
        optClass: 'profile-form__submit-button',
      }),
    });
  }

  render(): string {
    return `
      {{{OldPasswordInput}}}
      {{{NewPasswordInput}}}
      {{{RepeatNewPasswordInput}}}
      {{{Button}}}
    `;
  }
}

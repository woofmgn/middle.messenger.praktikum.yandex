import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
import { Button } from '../button';
import { ProfileInput } from '../profileInput';

type TProfilePasswordFormProps = {
  onSubmit: () => void;
};

export default class ProfilePasswordForm extends Block {
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
        value: '*****',
        onBlur: (e) => {
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

          this.children.OldPasswordInput.setProps({ error: errorMessage });
        },
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
      }),
      NewPasswordInput: new ProfileInput({
        id: 'newPassword',
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        value: '*****',
        onBlur: (e) => {
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

          this.children.NewPasswordInput.setProps({ error: errorMessage });
        },
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
      }),
      RepeatNewPasswordInput: new ProfileInput({
        id: 'newPasswordRepeat',
        name: 'newPasswordRepeat',
        type: 'password',
        label: 'Повторите новый пароль',
        value: '*****',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('password', target.value);

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

            this.children.RepeatNewPasswordInput.setProps({ error: 'Пароли не совпадают' });
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

          this.children.RepeatNewPasswordInput.setProps({ error: errorMessage });
        },
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
      }),
      Button: new Button({
        label: 'Сохранить',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.errors);
          if (!isValid) {
            return;
          }

          console.log('form submit', this.props.formState.data);
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

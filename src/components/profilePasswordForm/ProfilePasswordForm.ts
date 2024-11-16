import Block from '../../utils/Block';
import { Button } from '../button';
import { ProfileInput } from '../profileInput';

type TProfilePasswordFormProps = {
  onSubmit: () => void;
};

export default class ProfilePasswordForm extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        label: 'Старый пароль',
        value: '*****',
        onBlur: (e) => console.log('OldPasswordInput', e),
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
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
        value: '*****',
        onBlur: (e) => console.log('NewPasswordInput', e),
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
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
        label: 'Повторите новый пароль',
        value: '*****',
        onBlur: (e) => console.log('RepeatNewPasswordInput', e),
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({
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

import Block from '../../utils/Block';
import { Button } from '../button';
import { ProfileInput } from '../profileInput';

type TProfileUserFormProps = {
  editUser: boolean;
  onSubmit: () => void;
};

export default class ProfileUserForm extends Block {
  constructor(props: TProfileUserFormProps) {
    super('form', {
      ...props,
      className: 'profile-form',
      formState: {
        data: {},
        error: {},
      },
      EmailInput: new ProfileInput({
        id: 'email',
        name: 'email',
        label: 'Почта',
        value: 'pochta@yandex.ru',
        onBlur: (e) => console.log('EmailInput', e),
        onChange: (e: Event) => {
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
      LoginInput: new ProfileInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
        onBlur: (e) => console.log('LoginInput', e),
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
      FirstNameInput: new ProfileInput({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        onBlur: (e) => console.log('FirstNameInput', e),
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
      LastNameInput: new ProfileInput({
        id: 'last_name',
        name: 'last_name',
        label: 'Фамилия',
        value: 'Иванов',
        onBlur: (e) => console.log('LastNameInput', e),
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
      ChatNameInput: new ProfileInput({
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Иван',
        onBlur: (e) => console.log('ChatNameInput', e),
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
      PhoneInput: new ProfileInput({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: '+7(909)9673030',
        onBlur: (e) => console.log('PhoneInput', e),
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
        optClass: 'profile-form__submit-button',
        onClick: (e) => {
          e.preventDefault();
          console.log('form submit', this.props.formState.data);
          props.onSubmit();
        },
      }),
    });
  }

  render(): string {
    return `
      {{{EmailInput}}}
      {{{LoginInput}}}
      {{{FirstNameInput}}}
      {{{LastNameInput}}}
      {{{ChatNameInput}}}
      {{{PhoneInput}}}
      {{#if editUser}}
        {{{Button}}}
      {{/if}}
    `;
  }
}

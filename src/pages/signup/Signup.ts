import { AuthInput, AuthTitle, Button, Link } from '../../components';
import Block from '../../utils/Block';

type TSigninProps = {
  className: string;
  formState: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
};

export default class SignupPage extends Block {
  constructor(props: TSigninProps) {
    super('div', {
      ...props,
      className: 'auth-layout',
      formState: {
        data: {},
        error: {},
      },
      AuthTitle: new AuthTitle({
        text: 'Регистрация',
      }),
      EmailInput: new AuthInput({
        id: 'email',
        name: 'email',
        label: 'Почта',
        onBlur: (e) => console.log('EmailInput blur', e),
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
      LoginilInput: new AuthInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
        onBlur: (e) => console.log('LoginilInput blur', e),
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
      FirstNameInput: new AuthInput({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        onBlur: (e) => console.log('FirstNameInput blur', e),
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
      SecondNameInput: new AuthInput({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        onBlur: (e) => console.log('SecondNameInput blur', e),
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
      PhoneInput: new AuthInput({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        onBlur: (e) => console.log('PhoneInput blur', e),
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
      PasswordInput: new AuthInput({
        id: 'password',
        name: 'password',
        label: 'Пароль',
        onBlur: (e) => console.log('PasswordInput blur', e),
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
      PasswordCheckInput: new AuthInput({
        id: 'password-check',
        name: 'password-check',
        label: 'Пароль (ещё раз)',
        onBlur: (e) => console.log('PasswordCheckInput blur', e),
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
        label: 'Зарегистрироваться',
        optClass: 'button-auth',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log('form submit', this.props.formState.data);
        },
      }),
      Link: new Link({
        label: 'Войти',
        to: '#',
        optionalClass: 'auth-link',
      }),
    });
  }

  render(): string {
    return `
      <section class="auth-container">
        {{{AuthTitle}}}
        <form action="" class="auth-form">
          {{{EmailInput}}}
          {{{LoginilInput}}}
          {{{FirstNameInput}}}
          {{{SecondNameInput}}}
          {{{PhoneInput}}}
          {{{PasswordInput}}}
          {{{PasswordCheckInput}}}
          {{{Button}}}
        </form>
        {{{Link}}}
      </section>
    `;
  }
}
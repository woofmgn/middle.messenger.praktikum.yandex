import { AuthInput, AuthTitle, Button, Link } from '../../components';
import Block from '../../utils/Block';

type TSigninProps = {
  className: string;
};

export default class SignupPage extends Block {
  constructor(props: TSigninProps) {
    super('div', {
      ...props,
      className: 'auth-layout',
      AuthTitle: new AuthTitle({
        text: 'Регистрация',
      }),
      EmailInput: new AuthInput({
        id: 'email',
        name: 'email',
        label: 'Почта',
      }),
      LoginilInput: new AuthInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
      }),
      FirstNameInput: new AuthInput({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
      }),
      SecondNameInput: new AuthInput({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
      }),
      PhoneInput: new AuthInput({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
      }),
      PasswordInput: new AuthInput({
        id: 'password',
        name: 'password',
        label: 'Пароль',
      }),
      PasswordCheckInput: new AuthInput({
        id: 'password-check',
        name: 'password-check',
        label: 'Пароль (ещё раз)',
      }),
      Button: new Button({
        label: 'Зарегистрироваться',
        optClass: 'button-auth',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log(e.target);
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

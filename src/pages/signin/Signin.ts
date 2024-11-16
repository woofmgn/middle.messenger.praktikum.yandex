import { AuthInput, AuthTitle, Button, Link } from '../../components';
import Block from '../../utils/Block';

type TSigninProps = {
  className: string;
};

export default class Signin extends Block {
  constructor(props: TSigninProps) {
    super('div', {
      ...props,
      className: 'auth-layout',
      AuthTitle: new AuthTitle({
        text: 'Вход',
      }),
      AuthLoginInput: new AuthInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
      }),
      AuthPasswordInput: new AuthInput({
        id: 'password',
        name: 'password',
        label: 'Пароль',
      }),
      Button: new Button({
        label: 'Войти',
        optClass: 'button-auth',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log(e.target);
        },
      }),
      Link: new Link({
        label: 'Зарегистрироваться',
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
            {{{AuthLoginInput}}}
            {{{AuthPasswordInput}}}
            {{{Button}}}
          </form>
        {{{Link}}}
      </section>
    `;
  }
}

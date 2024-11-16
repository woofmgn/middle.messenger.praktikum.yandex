import { AuthInput, AuthTitle, Button, Link } from '../../components';
import Block from '../../utils/Block';

type TSigninProps = {
  className: string;
  formState: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
};

export default class Signin extends Block {
  constructor(props: TSigninProps) {
    super('div', {
      ...props,
      className: 'auth-layout',
      formState: {
        data: {},
        error: {},
      },
      AuthTitle: new AuthTitle({
        text: 'Вход',
      }),
      AuthLoginInput: new AuthInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
        onBlur: (e) => console.log('AuthLoginInput blur', e),
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
      AuthPasswordInput: new AuthInput({
        id: 'password',
        name: 'password',
        label: 'Пароль',
        onBlur: (e) => console.log('AuthPasswordInput blur', e),
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
        label: 'Войти',
        optClass: 'button-auth',
        type: 'submit',
        onClick: (e) => {
          e.preventDefault();
          console.log('form submit', this.props.formState.data);
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

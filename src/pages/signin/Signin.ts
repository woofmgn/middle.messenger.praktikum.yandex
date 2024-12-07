import { AuthInput, AuthTitle, Button, Link } from '../../components';
import { TAuthInputError } from '../../components/authInput';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';
import { checkValidityForm, validation } from '../../utils/formValidation';

export type TSigninProps = {
  className?: string;
  formState: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
  AuthTitle?: AuthTitle;
  AuthLoginInput?: AuthInput;
  AuthPasswordInput?: AuthInput;
  Button?: Button;
  Link?: Link;
};

export default class Signin extends Block<TSigninProps> {
  constructor() {
    super('div', {
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
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('login', target.value);

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

          const child = this.children.AuthLoginInput as unknown as TAuthInputError;
          child.setProps({ error: errorMessage });
        },
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
        type: 'password',
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

          const child = this.children.AuthPasswordInput as unknown as TAuthInputError;
          child.setProps({ error: errorMessage });
        },
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
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          console.log('form submit', this.props.formState.data);
          window.router.go(ROUTES.MESSENGER);
        },
      }),
      Link: new Link({
        label: 'Зарегистрироваться',
        to: () => window.router.go(ROUTES.SINGUP),
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

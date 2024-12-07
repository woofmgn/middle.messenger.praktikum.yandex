import { AuthInput, AuthTitle, Button, Link } from '../../components';
import { TAuthInputError } from '../../components/authInput';
import Block from '../../utils/Block';
import { ROUTES } from '../../utils/conts';
import { checkValidityForm, validation } from '../../utils/formValidation';

type TSignupPageProps = {
  className?: string;
  formState: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
  AuthTitle?: AuthTitle;
  EmailInput?: AuthInput;
  LoginilInput?: AuthInput;
  FirstNameInput?: AuthInput;
  SecondNameInput?: AuthInput;
  PhoneInput?: AuthInput;
  PasswordInput?: AuthInput;
  PasswordCheckInput?: AuthInput;
  Button?: Button;
  Link?: Link;
};
export default class SignupPage extends Block<TSignupPageProps> {
  constructor() {
    super('div', {
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
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('email', target.value);

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

          const child = this.children.EmailInput as unknown as TAuthInputError;
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

      LoginilInput: new AuthInput({
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

          const child = this.children.LoginilInput as unknown as TAuthInputError;
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

      FirstNameInput: new AuthInput({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('name', target.value);

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

          const child = this.children.FirstNameInput as unknown as TAuthInputError;
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

      SecondNameInput: new AuthInput({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('name', target.value);

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

          const child = this.children.SecondNameInput as unknown as TAuthInputError;
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

      PhoneInput: new AuthInput({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('phone', target.value);

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

          const child = this.children.PhoneInput as unknown as TAuthInputError;
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

      PasswordInput: new AuthInput({
        id: 'password',
        name: 'password',
        label: 'Пароль',
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

          const child = this.children.PasswordInput as unknown as TAuthInputError;
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

      PasswordCheckInput: new AuthInput({
        id: 'password-check',
        name: 'password-check',
        label: 'Пароль (ещё раз)',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          const errorMessage = validation('password', target.value);
          const child = this.children.PasswordCheckInput as unknown as TAuthInputError;

          if (this.props.formState.data.password !== target.value) {
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
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          console.log('form submit', this.props.formState.data);
        },
      }),
      Link: new Link({
        label: 'Войти',
        to: () => window.router.go(ROUTES.SIGNIN),
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

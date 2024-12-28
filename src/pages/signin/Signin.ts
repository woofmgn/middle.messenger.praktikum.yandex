import { TSigninData } from '../../api/AuthApi';
import { AuthInput, AuthTitle, Button, Link } from '../../components';
import { TAuthInputError } from '../../components/authInput';
import { getUserInfo, loginUser } from '../../service/authService';
import { connect } from '../../store/connect';
import { TStoreState } from '../../store/Store';
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

class Signin extends Block<TSigninProps> {
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
        onClick: async (e) => {
          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          await loginUser(this.props.formState.data as TSigninData);
          console.log('form submit', this.props.formState.data);
        },
      }),
      Link: new Link({
        label: 'Зарегистрироваться',
        to: () => window.router.go(ROUTES.SINGUP),
        optionalClass: 'auth-link',
      }),
    });
  }

  public componentDidMount(): void {
    getUserInfo()
      .then((res) => {
        if (res) {
          window.router.go(ROUTES.MESSENGER);
        }
      })
      .catch((err) => console.log(err));
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

const mapStateToProps = (state: TStoreState) => {
  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(Signin);

// export default Signin;

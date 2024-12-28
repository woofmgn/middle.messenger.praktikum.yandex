import { TUserInfoResponse } from '../../api/AuthApi';
import { TChangePfofileInfoData } from '../../api/UserApi';
import { getUserInfo } from '../../service/authService';
import { changeUserInfo } from '../../service/profileService';
import { connect } from '../../store/connect';
import { TStoreState } from '../../store/Store';
import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
import { Button } from '../button';
import { ProfileInput, TProfileInputProps } from '../profileInput';

export type TProfileUserFormProps = {
  editUser: boolean;
  className?: string;
  formState?: {
    data: Record<string, string>;
    error: Record<string, string>;
  };
  user?: TUserInfoResponse;
  EmailInput?: ProfileInput;
  LoginInput?: ProfileInput;
  FirstNameInput?: ProfileInput;
  LastNameInput?: ProfileInput;
  ChatNameInput?: ProfileInput;
  PhoneInput?: ProfileInput;
  Button?: Button;
  onSubmit: () => void;
};

class ProfileUserForm extends Block<TProfileUserFormProps> {
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
        value: props.user?.email || '',
        onBlur: (e) => {
          if (!this.props.formState) return;

          console.log('props.editUser', props.editUser);
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

          const child = this.children.EmailInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
        onChange: (e: Event) => {
          if (!this.props.formState) return;

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

      LoginInput: new ProfileInput({
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: props.user?.login || '',
        onBlur: (e) => {
          if (!this.props.formState) return;

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

          const child = this.children.LoginInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
        onChange: (e) => {
          if (!this.props.formState) return;

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

      FirstNameInput: new ProfileInput({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: props.user?.first_name || '',
        onBlur: (e) => {
          if (!this.props.formState) return;

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

          const child = this.children.FirstNameInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
        onChange: (e) => {
          if (!this.props.formState) return;

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

      LastNameInput: new ProfileInput({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: props.user?.second_name || '',
        onBlur: (e) => {
          if (!this.props.formState) return;

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

          const child = this.children.LastNameInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
        onChange: (e) => {
          if (!this.props.formState) return;

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

      ChatNameInput: new ProfileInput({
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: props.user?.display_name || '',
        onBlur: (e) => {
          console.log('ChatNameInput', e);
        },
        onChange: (e) => {
          if (!this.props.formState) return;

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

      PhoneInput: new ProfileInput({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: props.user?.phone || '',
        onBlur: (e) => {
          if (!this.props.formState) return;

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

          const child = this.children.PhoneInput as unknown as Block<Pick<TProfileInputProps, 'error'>>;
          child.setProps({ error: errorMessage });
        },
        onChange: (e) => {
          if (!this.props.formState) return;

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
        optClass: 'profile-form__submit-button',
        onClick: async (e) => {
          if (!this.props.formState) return;

          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

          console.log('form submit', {
            ...props.user,
            ...(this.props.formState.data as TChangePfofileInfoData),
          });
          console.log(1);
          await changeUserInfo(this.props.formState.data as TChangePfofileInfoData);
          props.onSubmit();
        },
      }),
    });
  }

  componentDidMount(): void {
    if (this.props.user) {
      getUserInfo()
        .then(() => {
          const emailInputChild = this.children.EmailInput as unknown as Block<{ value: string }>;
          const loginInputChild = this.children.LoginInput as unknown as Block<{ value: string }>;
          const firstNameInputChild = this.children.FirstNameInput as unknown as Block<{ value: string }>;
          const lastNameInputChild = this.children.LastNameInput as unknown as Block<{ value: string }>;
          const chatNameInputChild = this.children.ChatNameInput as unknown as Block<{ value: string }>;
          const phoneInputChild = this.children.PhoneInput as unknown as Block<{ value: string }>;

          emailInputChild.setProps({ value: this.props.user?.email || '' });
          loginInputChild.setProps({ value: this.props.user?.login || '' });
          firstNameInputChild.setProps({ value: this.props.user?.first_name || '' });
          lastNameInputChild.setProps({ value: this.props.user?.second_name || '' });
          chatNameInputChild.setProps({ value: this.props.user?.display_name || '' });
          phoneInputChild.setProps({ value: this.props.user?.phone || '' });
        })
        .catch((err) => console.log(err));
    }
  }

  render(): string {
    if (!this.props.user) {
      return '';
    }

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

const mapStateToProps = (state: TStoreState) => {
  return {
    isLoading: state.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfileUserForm);

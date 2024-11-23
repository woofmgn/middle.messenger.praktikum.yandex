import Block from '../../utils/Block';
import { checkValidityForm, validation } from '../../utils/formValidation';
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
        onBlur: (e) => {
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

          this.children.EmailInput.setProps({ error: errorMessage });
        },
        onChange: (e: Event) => {
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
        value: 'ivanivanov',
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

          this.children.LoginInput.setProps({ error: errorMessage });
        },
        onChange: (e) => {
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
        value: 'Иван',
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

          this.children.FirstNameInput.setProps({ error: errorMessage });
        },
        onChange: (e) => {
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
        id: 'last_name',
        name: 'last_name',
        label: 'Фамилия',
        value: 'Иванов',
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

          this.children.LastNameInput.setProps({ error: errorMessage });
        },
        onChange: (e) => {
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
        value: 'Иван',
        onBlur: (e) => {
          console.log('ChatNameInput', e);
        },
        onChange: (e) => {
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
        value: '+7(909)9673030',
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

          this.children.PhoneInput.setProps({ error: errorMessage });
        },
        onChange: (e) => {
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
        onClick: (e) => {
          e.preventDefault();
          const isValid = checkValidityForm(this.props.formState.error);
          if (!isValid) {
            return;
          }

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

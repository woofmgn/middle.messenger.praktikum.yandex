import Block from '../../utils/Block';
import emptyAvatar from '../../assets/image/empty-avatar.svg';
import { Button, ProfilePasswordForm, ProfileUserForm } from '../../components';

type TProfilePageProps = {
  imageUrl: string;
  userForm: boolean;
  state: {
    avatar: string;
    isShownUserForm: boolean;
    isShownUserButton: boolean;
    openModal: boolean;
  };
};

export default class PropfilePage extends Block {
  constructor(props: TProfilePageProps) {
    super('div', {
      ...props,
      className: 'profile-layout',
      state: {
        avatar: emptyAvatar,
        isShownUserForm: true,
        isShownUserButton: true,
        openModal: false,
      },
      ProfileUserForm: new ProfileUserForm({
        editUser: false,
        onSubmit: () => {
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserButton: true } });
          this.children.ProfileUserForm.setProps({ editUser: false });
        },
      }),
      ProfilePasswordForm: new ProfilePasswordForm({
        onSubmit: () => {
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserButton: true } });
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserForm: true } });
        },
      }),
      ButtonChangeData: new Button({
        btnText: true,
        label: 'Изменить данные',
        onClick: (e) => {
          e.preventDefault();
          console.log('click');
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserButton: false } });
          this.children.ProfileUserForm.setProps({ editUser: true });
        },
      }),
      ButtonChangePassword: new Button({
        btnText: true,
        label: 'Изменить пароль',
        onClick: (e) => {
          e.preventDefault();
          console.log('button click');
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserForm: false } });
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserButton: false } });
        },
      }),
      ButtonLogout: new Button({
        btnText: true,
        label: 'Выйти',
        optClass: 'profile-button-container__logout-button',
        onClick: () => console.log('button click'),
      }),
    });
  }
  render(): string {
    console.log('state.avatar.emptyAvatar', this.props.state.avatar.emptyAvatar);
    return `
      <section class="profile-container">
        <div class="profile-container__avatar-wrapper">
          <img src={{this.props.state.avatar.emptyAvatar}} class="profile-container__avatar" alt="Изображение аватара пользователя"/>
        </div>
        <h1 class="profile-container__username">Иван</h1>
        {{#if state.isShownUserForm}}
          {{{ProfileUserForm}}}
            {{else}}
          {{{ProfilePasswordForm}}}
        {{/if}}
        {{#if state.isShownUserButton}}
          <ul class="profile-button-container">
            <li class="profile-button-container__item">
              {{{ButtonChangeData}}}
            </li>
            <li class="profile-button-container__item">
              {{{ButtonChangePassword}}}
            </li>
            <li class="profile-button-container__item">
              {{{ButtonLogout}}}
            </li>
          </ul>
        {{else}}

        {{/if}}
      </section>
      {{#if openModal}}
        {{> ProfileModal title="Загрузите файл"}}
      {{/if}}
    `;
  }
}

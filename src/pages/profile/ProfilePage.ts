import Block from '../../utils/Block';
import emptyAvatar from '../../assets/image/empty-avatar.svg';
import { BackButton, Button, ProfileModal, ProfilePasswordForm, ProfileUserForm } from '../../components';
import { TProfileUserFormProps } from '../../components/profileUserForm/ProfileUserForm';

import { getUserInfo, logoutUser } from '../../service/authService';
import { TUserInfoResponse } from '../../api/AuthApi';
import { connect } from '../../store/connect';
import { ROUTES } from '../../utils/conts';

type TPropfilePageProps = {
  className?: string;
  user?: TUserInfoResponse;
  state: {
    avatar: string;
    isShownUserForm: boolean;
    isShownUserButton: boolean;
    isOpenModal: boolean;
  };
  BackButton?: BackButton;
  ProfileUserForm?: ProfileUserForm;
  ProfilePasswordForm?: ProfilePasswordForm;
  ButtonChangeData?: Button;
  ButtonChangePassword?: Button;
  ButtonLogout?: Button;
  ButtonAvatar?: Button;
  ProfileModal?: ProfileModal;
};

class PropfilePage extends Block<TPropfilePageProps> {
  constructor(props: TPropfilePageProps) {
    super('div', {
      className: 'profile-layout',
      state: {
        avatar: emptyAvatar,
        isShownUserForm: true,
        isShownUserButton: true,
        isOpenModal: false,
      },
      BackButton: new BackButton(),
      ProfileUserForm: new ProfileUserForm({
        editUser: false,
        onSubmit: () => {
          this.setProps({ ...this.props, state: { ...this.props.state, isShownUserButton: true } });
          const child = this.children.ProfileUserForm as unknown as Block<Pick<TProfileUserFormProps, 'editUser'>>;
          child.setProps({ editUser: true });
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
          const child = this.children.ProfileUserForm as unknown as Block<Pick<TProfileUserFormProps, 'editUser'>>;
          child.setProps({ editUser: true });
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
        onClick: async (e) => {
          e.preventDefault();
          await logoutUser();
        },
      }),
      ButtonAvatar: new Button({
        btnText: true,
        optClass: 'profile-container__avatar-button',
        label: '',
        avatar: props.user?.avatar,
        onClick: () => {
          this.setProps({ ...this.props, state: { ...this.props.state, isOpenModal: true } });
        },
      }),
      ProfileModal: new ProfileModal({
        title: 'Загрузите файл',
        onCloseModal: () => {
          this.setProps({ ...this.props, state: { ...this.props.state, isOpenModal: false } });
        },
      }),
    });
  }

  public componentDidMount(): void {
    getUserInfo()
      .then((res) => {
        if (!res) {
          window.router.go(ROUTES.SIGNIN);
        }
      })
      .catch((err) => {
        console.log(err);
        window.router.go(ROUTES.SIGNIN);
      });

    if (this.props.user) {
      const child = this.children.ButtonAvatar as unknown as Block<{ avatar: string }>;
      child.setProps({ avatar: this.props.user.avatar });
    }
  }

  render(): string {
    return `
      {{{BackButton}}}
      <section class="profile-container">
        {{{ButtonAvatar}}}
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
      {{#if state.isOpenModal}}
        {{{ProfileModal}}}
      {{/if}}
    `;
  }
}

const mapStateToProps = (state: { user: TUserInfoResponse; isLoading: boolean }) => {
  return {
    isLoading: state.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PropfilePage);

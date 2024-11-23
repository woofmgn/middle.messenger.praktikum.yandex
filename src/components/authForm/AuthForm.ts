import Block from '../../utils/Block';

type TAuthFormProps = {
  className: string;
};

export default class AuthForm extends Block {
  constructor(props: TAuthFormProps) {
    super('form', {
      ...props,
      className: 'auth-form',
    });
  }

  render(): string {
    return `
      {{{Body}}}
    `;
  }
}

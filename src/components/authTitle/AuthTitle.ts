import Block from '../../utils/Block';

type TAuthTitleProps = {
  text: string;
};

export default class AuthTitle extends Block {
  constructor(props: TAuthTitleProps) {
    super('h1', {
      ...props,
      text: props.text,
    });
  }

  render(): string {
    return `
      {{text}}
    `;
  }
}

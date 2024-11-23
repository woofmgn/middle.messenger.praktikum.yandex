import Block from '../../utils/Block';

type TLinkProps = {
  optionalClass?: string;
  to: string;
  label: string;
};

export default class Link extends Block {
  constructor(props: TLinkProps) {
    super('a', {
      ...props,
      className: `link ${props.optionalClass}`,
      to: props.to,
      label: props.label,
    });
  }

  render(): string {
    return `
      {{label}}
    `;
  }
}

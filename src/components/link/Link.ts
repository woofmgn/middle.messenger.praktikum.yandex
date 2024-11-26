import Block from '../../utils/Block';

type TLinkProps = {
  optionalClass?: string;
  className?: string;
  to: string;
  label: string;
};

export default class Link extends Block<TLinkProps> {
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

import Block from '../../utils/Block';

type TLinkProps = {
  optionalClass?: string;
  className?: string;
  to: () => void;
  label: string;
  events?: {
    click: (e: MouseEvent) => void;
  };
  // onClick
  // attrs?: Record<string, string>;
};

export default class Link extends Block<TLinkProps> {
  constructor(props: TLinkProps) {
    super('button', {
      ...props,
      className: `link ${props.optionalClass}`,
      to: props.to,
      label: props.label,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          props.to();
        },
      },
      // attrs: {
      //   src: props.to,
      // },
    });
  }

  render(): string {
    return `
      {{label}}
    `;
  }
}

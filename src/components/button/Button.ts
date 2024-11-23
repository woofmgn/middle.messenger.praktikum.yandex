import Block from '../../utils/Block';

type TButtonProps = {
  optClass?: string;
  btnText?: boolean;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  onClick: (e: MouseEvent) => void;
};

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: `button ${props.optClass} ${props.btnText && 'button_text'}`,
      attrs: {
        type: props.type || 'button',
      },
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return `
      {{label}}
    `;
  }
}

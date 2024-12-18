import Block from '../../utils/Block';

type TButtonProps = {
  optClass?: string;
  className?: string;
  attrs?: Record<string, string>;
  events?: Record<string, (e: MouseEvent) => void>;
  btnText?: boolean;
  label: string;
  avatar?: string | undefined;
  type?: 'submit' | 'reset' | 'button';
  onClick: (e: MouseEvent) => void;
};

export default class Button extends Block<TButtonProps> {
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
    console.log(this.props.avatar);
    return `
      {{#if avatar}}
        <img class='button__avatar' src=${this.props.avatar} alt='alt'/>
          {{else}}
        {{label}}
      {{/if}}
    `;
  }
}

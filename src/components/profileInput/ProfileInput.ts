import Block from '../../utils/Block';
import Input, { TInputProps } from './Input';

export type TProfileInputProps = {
  name: string;
  type?: string;
  id: string;
  label: string;
  value: string;
  error?: string;
  className?: string;
  optionalClass?: string;
  Input?: Input;
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
};

export default class ProfileInput extends Block<TProfileInputProps> {
  constructor(props: TProfileInputProps) {
    super('div', {
      ...props,
      className: 'profile-input-container',
      error: props.error,
      Input: new Input({
        id: props.id,
        type: props.type || 'text',
        name: props.name,
        optionalClass: props.optionalClass,
        value: props.value,
        onBlur: (e) => props.onBlur(e),
        onChange: (e) => props.onChange(e),
      }),
    });
  }

  public componentDidMount(): void {
    const child = this.children.Input as unknown as Block<Pick<TInputProps, 'value'>>;
    child.setProps({ value: this.props.value });
  }

  render(): string {
    return `
      <div class="profile-input-container__wrapper">
        <label class="profile-input-container__label" for={{name}}>{{label}}</label>
        {{{Input}}}
      </div>
      <span class="profile-input-container__error-text">{{error}}</span>
    `;
  }
}

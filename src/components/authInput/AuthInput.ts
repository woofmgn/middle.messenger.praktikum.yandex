import Block from '../../utils/Block';
import Input from './Input';

type TAuthInputProps = {
  name: string;
  id: string;
  label: string;
  optionalClass?: string;
  error?: string;
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
};

export default class AuthInput extends Block {
  constructor(props: TAuthInputProps) {
    super('div', {
      ...props,
      className: 'input-container',
      name: props.name,
      Input: new Input({
        id: props.id,
        name: props.name,
        onBlur: (e) => props.onBlur(e),
        onChange: (e) => props.onChange(e),
      }),
    });
  }

  render(): string {
    return `
      <label class="input-container__label" for={{name}}>{{label}}</label>
      {{{Input}}}
      <span class="input-container__error-text">{{error}}</span>
    `;
  }
}

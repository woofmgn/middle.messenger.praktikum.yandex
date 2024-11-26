import Block from '../../utils/Block';
import { TAuthInputProps } from './authInput.types';
import Input from './Input';

export default class AuthInput extends Block<TAuthInputProps> {
  constructor(props: TAuthInputProps) {
    super('div', {
      ...props,
      className: 'input-container',
      name: props.name,
      Input: new Input({
        id: props.id,
        name: props.name,
        type: props.type,
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

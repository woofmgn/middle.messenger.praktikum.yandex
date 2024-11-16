import Block from '../../utils/Block';
import Input from './Input';

type TAuthInputProps = {
  name: string;
  id: string;
  label: string;
  optionalClass?: string;
};

export default class AuthInput extends Block {
  constructor(props: TAuthInputProps) {
    super('div', {
      ...props,
      className: 'input-container',
      name: props.name,
      // attrs: {
      //   for: props.id,
      // },
      Input: new Input({
        id: props.id,
        name: props.name,
        onBlur: () => console.log('onBlur'),
        onChange: () => console.log('onChange'),
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

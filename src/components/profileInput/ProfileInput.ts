import Block from '../../utils/Block';
import Input from './Input';

type TProfileInputProps = {
  // Input: Input;
  name: string;
  id: string;
  label: string;
  value: string;
  optionalClass?: string;
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
};

export default class ProfileInput extends Block {
  constructor(props: TProfileInputProps) {
    super('div', {
      ...props,
      className: 'profile-input-container',
      Input: new Input({
        id: props.id,
        name: props.name,
        optionalClass: props.optionalClass,
        value: props.value,
        onBlur: (e) => props.onBlur(e),
        onChange: (e) => props.onChange(e),
      }),
    });
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

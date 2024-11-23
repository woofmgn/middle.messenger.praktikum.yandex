import Block from '../../utils/Block';
import InputField from './InputField';

type TSearchInputProps = {
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export default class SearchInput extends Block {
  constructor(props: TSearchInputProps) {
    super('div', {
      ...props,
      className: 'search-input',
      SearchChatInput: new InputField({
        id: 'message',
        name: 'message',
        placeholder: 'Поиск',
        onChange: (e) => {
          console.log('change', e);
          props.onChange(e);
        },
        onBlur: (e) => {
          console.log('blur', e);
          props.onBlur(e);
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="search-input__label-wrapper">
        <label for="search-chat" class="search-input__label"></label>
        {{{SearchChatInput}}}
      </div>
    `;
  }
}

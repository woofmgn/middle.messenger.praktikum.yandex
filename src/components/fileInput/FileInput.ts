import Block from '../../utils/Block';
import FileInputField from './FileInputField';

type TFileInputProps = {
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
};

export default class FileInput extends Block {
  constructor(props: TFileInputProps) {
    super('div', {
      ...props,
      className: 'file-input',
      FileInputField: new FileInputField({
        name: 'avatar',
        id: 'avatar',
        type: 'file',
        onChange: (e) => props.onChange(e),
        onBlur: (e) => props.onBlur(e),
      }),
    });
  }

  render(): string {
    return `
      <!-- <label class="file-input__input-label" for="avatar">Выбрать файл на компьютере</label> --!>
      {{{FileInputField}}}
      <span class="file-input__file-input-error">Нужно выбрать файл</span>
    `;
  }
}

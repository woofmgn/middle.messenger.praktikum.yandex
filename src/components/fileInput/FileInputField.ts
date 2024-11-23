import Block from '../../utils/Block';

type TFileInputFieldProps = {
  id: string;
  name: string;
  type: string;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export default class FileInputField extends Block {
  constructor(props: TFileInputFieldProps) {
    super('input', {
      ...props,
      className: 'file-input__file-input',
      attrs: {
        id: props.id,
        name: props.name,
        type: props.type,
      },
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }

  render(): string {
    return `
      <input type="file" name="avatar" id="avatar" class="file-input__file-input">
    `;
  }
}
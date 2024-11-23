import Block from '../../utils/Block';

type TInputFieldProps = {
  id: string;
  name: string;
  placeholder: string;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export default class InputField extends Block {
  constructor(props: TInputFieldProps) {
    super('input', {
      ...props,
      className: 'search-input__element',
      attrs: {
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
      },
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }
}

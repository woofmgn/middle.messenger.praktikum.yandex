import Block from '../../utils/Block';

type TInputProps = {
  optionalClass?: string;
  name: string;
  id: string;
  type?: string;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export default class Input extends Block {
  constructor(props: TInputProps) {
    super('input', {
      ...props,
      className: `input-container__input-element ${props.optionalClass}`,
      attrs: {
        name: props.name,
        id: props.id,
        type: props.type || 'text',
      },
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }
}

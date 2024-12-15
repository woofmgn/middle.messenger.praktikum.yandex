import Block from '../../utils/Block';

type TInputProps = {
  optionalClass?: string;
  name: string;
  id: string;
  value: string | number;
  type?: string;
  className?: string;
  attrs?: Record<string, string | number | undefined>;
  events?: Record<string, (e: Event) => void>;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export default class Input extends Block<TInputProps> {
  constructor(props: TInputProps) {
    super('input', {
      ...props,
      className: `profile-input-container__input-element ${props.optionalClass && props.optionalClass}`,
      attrs: {
        name: props.name,
        id: props.id,
        value: props.value,
        type: props.type,
      },
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }
  render() {
    console.log('Input', this.props.value);
    return `
      <p>{{value}}</p>
    `;
  }
}

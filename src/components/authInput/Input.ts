import Block from '../../utils/Block';
import { TInputProps } from './authInput.types';

export default class Input extends Block<TInputProps> {
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

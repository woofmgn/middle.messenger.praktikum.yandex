import Block from '../../utils/Block';
import { webSocket } from '../../utils/WebSocket';
import { TChatInputProps, TInputButtonProps, TInputProps } from './chatInput.types';

export class Input extends Block<TInputProps> {
  constructor(props: TInputProps) {
    super('input', {
      ...props,
      className: 'chat-input__element',
      attrs: {
        type: 'text',
        name: props.name,
        placeholder: props.placeholder,
      },
      events: {
        change: props.onChange,
        blue: props.onBlur,
      },
    });
  }
}

export class InputButton extends Block<TInputButtonProps> {
  constructor(props: TInputButtonProps) {
    super('button', {
      ...props,
      className: 'chat-input__button',
      attrs: {
        type: 'submit',
      },
      events: {
        click: props.onClick,
      },
    });
  }
}

export default class ChatInput extends Block<TChatInputProps> {
  constructor() {
    super('form', {
      className: 'chat-footer-container',
      formData: {
        data: {},
      },
      Input: new Input({
        name: 'message',
        placeholder: 'Сообщение',
        type: 'text',
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          this.setProps({ ...this.props, formData: { data: { [target.name]: target.value } } });
        },
        onBlur: (e) => console.log('blur', e),
      }),
      Button: new InputButton({
        onClick: (e) => {
          e.preventDefault();
          if (!this.props.formData.data.message) {
            return;
          }
          webSocket.sendMessage(this.props.formData.data.message);
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="chat-input">
        {{{Input}}}
        {{{Button}}}
      </div>
    `;
  }
}

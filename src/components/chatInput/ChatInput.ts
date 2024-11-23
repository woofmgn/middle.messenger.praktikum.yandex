import Block from '../../utils/Block';

type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

class Input extends Block {
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

class Button extends Block {
  constructor(props: { onClick: (e: MouseEvent) => void }) {
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

export default class ChatInput extends Block {
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
          console.log('onChange', target.value);
        },
        onBlur: (e) => console.log('blur', e),
      }),
      Button: new Button({
        onClick: (e) => {
          e.preventDefault();
          console.log('submit', this.props.formData);
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

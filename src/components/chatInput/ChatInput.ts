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

type TChatInputProps = {
  value: string;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
  onSubmit: () => void;
};

export default class ChatInput extends Block {
  constructor(props: TChatInputProps) {
    super('div', {
      ...props,
      className: 'chat-footer-container',
      Input: new Input({
        name: 'message',
        placeholder: 'Сообщение',
        type: 'text',
        onChange: (e) => {
          props.onChange(e);
        },
        onBlur: props.onBlur,
      }),
      Button: new Button({
        onClick: (e) => {
          e.preventDefault();
          console.log('submit');
          props.onSubmit();
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

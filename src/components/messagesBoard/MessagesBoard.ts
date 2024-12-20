import Block from '../../utils/Block';

type TMessagesBoardProps = {
  messages: {
    time: string;
    isOwner: boolean;
    text: string;
  }[];
  className?: string;
  date: string;
};

export default class MessagesBoard extends Block<TMessagesBoardProps> {
  constructor(props: TMessagesBoardProps) {
    super('div', {
      ...props,
      className: 'messages-boards',
    });
  }

  render(): string {
    return `
      <div class="messages-boards__container">
        <span class="message-date">{{date}}</span>
        <ul class="messages-list">
          {{#each messages}}
            <li class="messages-list__item {{#if this.isOwner}}messages-list__item_type_owner{{/if}}">
              <p class="messages-list__message">{{this.text}}</p>
              <span class="messages-list__message-time">{{this.time}}</span>
            </li>
          {{/each}}
        </ul>
      </div>
    `;
  }
}

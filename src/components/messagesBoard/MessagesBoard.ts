import { TMessagesList } from '../../api/ChatApi/types';
import { connect } from '../../store/connect';
import { TStoreState } from '../../store/Store';
import Block from '../../utils/Block';

export type TMessagesBoardProps = {
  messages?: TMessagesList[];
  className?: string;
  date: string;
};

class MessagesBoard extends Block<TMessagesBoardProps> {
  constructor(props: TMessagesBoardProps) {
    super('div', {
      ...props,
      className: 'messages-boards',
    });
  }

  public componentDidMount(): void {
    setTimeout(() => {
      const collection = document.querySelector('.messages-boards__container');
      if (collection) {
        collection.scrollTo({
          top: collection.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  }

  render(): string {
    return `
      <div class="messages-boards__container">
        <span class="message-date">{{date}}</span>
        <ul class="messages-list">
          {{#each messages}}
            <li class="messages-list__item {{#if this.isOwner}}messages-list__item_type_owner{{/if}}">
              <p class="messages-list__message">{{this.content}}</p>
              <span class="messages-list__message-time">{{this.time}}</span>
            </li>
          {{/each}}
        </ul>
      </div>
    `;
  }
}

const mapStateToProps = (state: TStoreState) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(MessagesBoard);

import { TGetChatListResponse } from '../../api/ChatApi/types';
import Block from '../../utils/Block';

type TContactProps = {
  className?: string;
  chatList: TGetChatListResponse;
  onClick: () => void;
  events?: {
    click: () => void;
  };
};

export default class Contact extends Block<TContactProps> {
  constructor(props: TContactProps) {
    super('li', {
      ...props,
      className: 'contact',
      events: {
        click: () => console.log(props.chatList.id),
      },
    });
  }

  render(): string {
    console.log('props Contact', this.props.onClick);
    // console.log('document', document);
    return `
              <img src=${this.props.chatList.avatar} alt="Изображение аватара пользователя" class="contact__avatar">
              <div class="contact__message-module">
                <div class="contact__message-wrapper">
                  <h3 class="contact__name">${this.props.chatList.title}</h3>
                  <p class="contact__second-message">${this.props.chatList.last_message || ''}</p>
                </div>
                <div class="contact__info-wrapper">
                  <span class="contact__date">${this.props.chatList.created_by}</span>
                  {{#if this.unread_count}}
                    <div class="contact__count-wrapper">
                      <span class="contact__count">${this.props.chatList.unread_count}</span>
                    </div>
                  {{/if}}
                </div>
              </div>
    `;
  }
}

// const mapStateToProps = (state: { chatList: TGetChatListResponse[]; isLoading: boolean }) => {
//   return {
//     isLoading: state.isLoading,
//     chatList: state.chatList,
//   };
// };

// export default connect(mapStateToProps)(Contact);

// import { TGetChatListResponse } from '../../api/ChatApi/types';
// import Block from '../../utils/Block';
// import emptyAvatar from '../../assets/image/empty-avatar.svg';

// type TContactProps = {
//   className?: string;
//   onClick: (id: number) => void;
//   // onClick: () => void;
//   events?: Record<string, unknown>;
// } & TGetChatListResponse;

// export default class Contact extends Block<TContactProps> {
//   constructor(tagName: string, props: TContactProps) {
//     super((tagName = 'li'), {
//       ...props,
//       className: 'contact',
//       events: {
//         click: () => console.log(1),
//       },
//     });
//     this.props = props;
//   }
//   public render(): string {
//     console.log('contact', this.props.avatar);
//     return `
//     <li class='contact'>
//               <img src=${this.props.avatar || emptyAvatar} alt="Изображение аватара пользователя" class="contact__avatar">
//               <div class="contact__message-module">
//                 <div class="contact__message-wrapper">
//                   <h3 class="contact__name">${this.props.title}</h3>
//                   <p class="contact__second-message">{{this.props.message}}</p>
//                 </div>
//                 <div class="contact__info-wrapper">
//                   <span class="contact__date">${this.props.date || ''}</span>
//                   {{#if this.unread_count}}
//                     <div class="contact__count-wrapper">
//                       <span class="contact__count">${this.props.unread_count}</span>
//                     </div>
//                   {{/if}}
//                 </div>
//               </div>
//               </li>
//     `;
//   }
// }

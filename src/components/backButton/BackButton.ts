import Block from '../../utils/Block';

export default class BackButton extends Block<{ className: string }> {
  constructor() {
    super('div', {
      className: 'back-container',
    });
  }

  render(): string {
    return `
      <button class="back-container__button" />
    `;
  }
}

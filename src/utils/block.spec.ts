import { describe } from 'mocha';
import Block from './Block';
import { expect } from 'chai';
import sinon from 'sinon';

type Props = {
  text?: string;
};

describe('Block', () => {
  let Component: typeof Block<Props>;

  before(() => {
    class ComponentClass extends Block<Props> {
      constructor(tagName: string, props: Props) {
        super(tagName, props);
      }

      render() {
        return `
            <span id="test-text">{{text}}</span>
            <button>{{text-button}}</button>
        `;
      }
    }

    Component = ComponentClass;
  });

  it('Компонент создается с переданными пропсами', () => {
    const text = 'text';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const component = new Component('div', { text });
    const spanText = component.element.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('Компонент обновляется, когда передаются новые пропсы', () => {
    const text = 'oldProps';
    const newProps = 'isNewProps';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const component = new Component('div', { text });
    component.setProps({ text: newProps });

    const spanText = component.element.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(newProps);
  });

  it('Слушатель события навешивается', () => {
    const clickHandlerStub = sinon.stub();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const component = new Component('div', {
      events: {
        click: clickHandlerStub,
      },
    });

    const event = new MouseEvent('click');
    component.element?.dispatchEvent(event);

    expect(clickHandlerStub.calledOnce).to.be.true;
  });
});

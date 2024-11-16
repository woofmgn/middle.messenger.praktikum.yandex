import EventBus from './EventBus';
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

type TProps = Record<string, unknown>;

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus: EventBus;
  props;
  children: Record<string, Block>;

  _element: HTMLElement | null = null;
  _meta: { tagName: string; props: Record<string, unknown> } | null = null;
  _id = uuid();

  constructor(tagName = 'div', propsAndChildren: Record<string, unknown> = {}) {
    const { props, children } = this._getChildrenAndProps(propsAndChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this._meta = {
      tagName,
      props,
    };

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(propsAndChildren: Record<string, unknown>) {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (Array.isArray(obj)) {
            obj.forEach((secondObj) => {
              if (secondObj instanceof Block) {
                children[key] = value as unknown as Block;
              }
            });
          }
          if (obj instanceof Block) {
            children[key] = value as unknown as Block;
          } else {
            props[key] = value;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    if (!this._meta) {
      return;
    }

    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === 'string') {
      const classes = props.className.split(' ').filter((item) => item !== 'undefined');
      console.log('classes', classes);
      console.log(this._element);
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === 'object' && props.attrs !== null) {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        if (!this._element) {
          return;
        }

        this._element.setAttribute(attrName, attrValue);
      });
    }
  }

  init() {
    this._createResources();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}
  // componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    this._removeEvents();
    const block = this._compile();

    if (!this._element) {
      return;
    }

    if (this._element.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  render() {
    return '';
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (!this._element) {
        return;
      }
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (!this._element) {
        return;
      }
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element as HTMLElement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

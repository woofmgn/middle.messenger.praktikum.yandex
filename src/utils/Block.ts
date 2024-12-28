import EventBus from './EventBus';
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default abstract class Block<Props extends Record<string, any>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus: EventBus;
  props: Props;
  children: Record<string, Block<Props>>;

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Props } | null = null;
  private _id = uuid();

  constructor(tagName = 'div', propsAndChildren: Props = {} as Props) {
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

  private _getChildrenAndProps(propsAndChildren: Props) {
    const children: Record<string, Block<Props>> = {};
    const props: Props = {} as Props;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (Array.isArray(obj)) {
            obj.forEach((secondObj) => {
              if (secondObj instanceof Block) {
                children[key] = value as unknown as Block<Props>;
              }
            });
          }
          if (obj instanceof Block) {
            children[key] = value as unknown as Block<Props>;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props[key as keyof Props] = value as any;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    if (!this._meta) {
      return;
    }

    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === 'string') {
      const classes = props.className.split(' ').filter((item) => item !== 'undefined');
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === 'object' && props.attrs !== null) {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        if (!this._element) {
          return;
        }

        this._element.setAttribute(attrName, attrValue as string);

        if (attrName === 'disable' && attrValue) {
          this._element.setAttribute('disabled', attrValue as string);
        }
        if (attrName === 'disable' && !attrValue) {
          this._element.removeAttribute('disabled');
        }
      });
    }
  }

  init() {
    this._createResources();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    // console.log('this._element', this._element);
  }

  public componentDidMount() {}
  // public componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    // console.log('this._meta?.props', this._meta?.props);

    if (typeof this._meta?.props.attrs === 'object' && this._meta?.props.attrs !== null && this._meta) {
      Object.entries(this._meta?.props.attrs).forEach(([attrName, attrValue]) => {
        if (!this._element) {
          return;
        }

        Object.entries(this._meta!.props).forEach(([propKey, propValue]) => {
          if (propKey === attrName) {
            this._element?.setAttribute(attrName, propValue as string);
          }
        });

        if (attrName === 'disable' && attrValue) {
          this._element.setAttribute('disabled', attrValue as string);
        }
        if (attrName === 'disable' && !attrValue) {
          this._element.removeAttribute('disabled');
        }
      });
    }

    this._render();
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean | Promise<boolean> {
    // console.log('componentDidUpdate', oldProps, newProps);
    return true;
  }

  componentWillUnmount() {}

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    // Object.assign(this.props, nextProps);
    const oldProps = { ...this.props };
    this.props = { ...this.props, ...nextProps };

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  get element() {
    return this._element;
  }

  private _render() {
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

  public render() {
    return '';
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (!this._element) {
        return;
      }
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (!this._element) {
        return;
      }
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    this._componentDidMount();
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
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

  public getContent() {
    return this.element as HTMLElement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _makePropsProxy(props: any) {
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

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }
}

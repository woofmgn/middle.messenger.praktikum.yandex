import Block from './Block';
import { RouteInterface } from './Router';

class Route implements RouteInterface {
  private _pathname: string;
  private _blockClass: Block<Record<string, unknown>>;
  private _block: null | Block<Record<string, unknown>>;
  private _props: Record<string, string>;

  constructor(pathname: string, view: Block<Record<string, unknown>>, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: Block<Record<string, unknown>>) {
    const root = document.querySelector(query);

    if (!root) {
      return;
    }

    root.innerHTML = '';
    root.append(block.getContent());
  }

  render() {
    if (!this._block) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this._block = new this._blockClass({});
    }

    if (!this._block) {
      return;
    }
    this._renderDom(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}

export default Route;

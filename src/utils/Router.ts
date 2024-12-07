import Block from './Block';
import Route from './Route';

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  // leave: () => void;
}

class Router {
  private static __instance: Router | undefined;
  private _currentRoute: string | null | RouteInterface = null;
  private _rootQuery: string | undefined;

  public routes: RouteInterface[] = [];
  public history: History = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use<BlockComponent>(pathname: string, block: BlockComponent) {
    const route = new Route(pathname, block as Block<Record<string, unknown>>, { rootQuery: this._rootQuery! });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    // if (this._currentRoute && this._currentRoute !== (route as unknown as string)) {
    //   this._currentRoute.leave();
    // }

    this._currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      return this.routes.find((route) => route.match('*'));
    }
    return route;
  }
}

export default Router;

import { Store } from './store/Store';
import Router from './utils/Router';

declare global {
  interface Window {
    router: Router;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: Store;
  }
}

export {};

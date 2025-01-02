import { Store } from './store/Store';
import Router from './utils/Router';

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}

export {};

import Router from './utils/Router';

declare global {
  interface Window {
    router: Router;
  }
}

export {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TListener = (...args: any[]) => void;

export default class EventBus {
  listeners: Record<string, TListener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: TListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: TListener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit<T extends any[] = []>(event: string, ...args: T) {
    if (!this.listeners[event]) {
      return;
      // throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

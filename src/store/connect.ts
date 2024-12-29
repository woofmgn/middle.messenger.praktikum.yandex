import Block from '../utils/Block';
import isEqual, { PlainObject } from '../utils/isEqual';
import { StoreEvents, TStoreState } from './Store';

type ComponentConstructor<T extends Record<string, unknown> = Record<string, unknown>> = new (props: T) => Block<T>;

export function connect(mapStateToProps: (state: TStoreState) => Record<string, unknown>) {
  return function <T extends Record<string, unknown>>(Component: ComponentConstructor<T>) {
    return class WithStore extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props: T) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState()!);

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState()!);

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state as PlainObject<unknown>, newState as PlainObject<unknown>)) {
            this.setProps({ ...(newState as T) });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}

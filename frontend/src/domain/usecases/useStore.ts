import { Store, useStore } from '@tanstack/react-store';

export const helloWorldStore = new Store({
  isHelloWorld: false,
});

const useHelloWorldStore = () => {
  return useStore(helloWorldStore, (state) => state);
};

export default useHelloWorldStore;

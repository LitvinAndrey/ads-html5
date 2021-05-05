import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

export class SpinnerStore {
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }
}

export const spinnerStore = new SpinnerStore();

export const spinnerStoreContext = createContext(spinnerStore);

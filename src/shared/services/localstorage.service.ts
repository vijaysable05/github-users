import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      const value = this.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  clearLocalStorage() {
    if (this.isLocalStorageSupported) {
      localStorage.clear();
      return true;
    }
    return false;
  }

}

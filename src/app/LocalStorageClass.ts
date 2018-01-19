export class LocalStorageClass {

  constructor() {}

  public localStorageItem(id: string): string {
      return localStorage.getItem(id);
  }
}

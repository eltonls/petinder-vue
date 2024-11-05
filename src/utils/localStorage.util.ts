class LocalStorageUtil<T> {
  setItem(key: string, newValue: T): void {
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  getItem(key: string): T | null {
    const item = localStorage.getItem(key);

    if(item) {
      return JSON.parse(item);
    }

    return null;
  }
  removeIten(key: string): void{
    localStorage.removeItem(key)
  }
}

export default LocalStorageUtil;
export class StorageService {
  private readonly storage: Storage

  constructor(storage: Storage = localStorage) {
    this.storage = storage
  }

  get<T>(key: string): T | null {
    const raw = this.storage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  }

  set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  remove(key: string): void {
    this.storage.removeItem(key)
  }
}

export const storageService = new StorageService()

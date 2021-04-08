class ChromeStorage<T extends Record<string, unknown>> {
  _name: string

  constructor (name?: string) {
    this._name = name || 's'
  }

  setDBName (name: string):void {
    this._name = name
  }

  get name (): string {
    return this._name
  }

  set name (s: string) {
    this._name = s
    this.setDBName(s)
  }

  async getItemsAll ():Promise<T> {
    const promise = ((): Promise<T> => {
      return new Promise((resolve) => {
        chrome.storage.local.get((res) => {
          console.log(this.name, 'Get', res)
          resolve(res as T)
        })
      })
    })()
    const item = await promise
    return item
  }

  async getItem<K extends keyof T> (key: K):Promise<T[K]|null> {
    const promise = ((key): Promise<T[K]> => {
      return new Promise((resolve) => {
        chrome.storage.local.get(key, (res) => {
          const value: unknown = res[key as string]
          console.log(this.name, 'Get', [key, value])
          resolve(value as T[K])
        })
      })
    })(key)
    const item = await promise
    if (item == null) return null
    return item
  }

  async setItem (item: T):Promise<void> {
    const promise = ((item): Promise<void> => {
      const named = Object.entries(item).reduce((pre, [key, value]) => {
        return ({
          [`${this._name}-${key}`]: value,
          ...pre
        })
      }, {})
      return new Promise((resolve) => {
        chrome.storage.local.set(named, () => {
          console.log(this.name, 'Set', item)
          resolve()
        })
      })
    })(item)
    await promise
  }

  async removeItem<K extends keyof T> (key: K):Promise<void> {
    const promise = ((key): Promise<void> => {
      return new Promise((resolve) => {
        chrome.storage.local.remove(key as string, () => {
          console.log(this.name, 'Remove', key)
          resolve()
        })
      })
    })(key)
    await promise
  }
}

export { ChromeStorage }

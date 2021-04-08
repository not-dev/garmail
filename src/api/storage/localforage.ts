import * as localforage from 'localforage'

class IndexedDB<T extends Record<string, unknown>> {
  _name: string
  store: LocalForage

  constructor (name?: string) {
    this._name = name || 'localforage'
    this.store = localforage.createInstance({
      name: this._name
    })
  }

  setDBName (name: string):void {
    this._name = name
    this.store.config({
      name: this._name
    })
  }

  get name (): string {
    return this._name
  }

  set name (s: string) {
    this._name = s
    this.setDBName(s)
  }

  async getItemsAll ():Promise<T> {
    const obj:Record<string, unknown> = {}
    await this.store.iterate((value, key) => {
      console.log(this.name, 'Get', { data: [key, value] })
      obj[key] = value
    })
    return obj as T
  }

  async getItem<K extends keyof T> (key: K):Promise<T[K]|null> {
    console.log(this.name, 'Get', { data: key })
    const item = await this.store.getItem(key as string)
    if (item == null) return null
    return item as T[K]
  }

  async setItem (item: T):Promise<void> {
    await Promise.all(Object.entries(item).map(async ([key, value]) => {
      console.log(this.name, 'Set', { data: [key, value] })
      return await this.store.setItem(key, value)
    }))
  }

  async removeItem<K extends keyof T> (key: K):Promise<void> {
    console.log(this.name, 'Remove', { data: key })
    await this.store.removeItem(key as string)
  }
}

export { IndexedDB }

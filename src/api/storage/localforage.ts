import { sleep } from '@utils'
import * as localforage from 'localforage'

const getItemsAll = async <T=unknown>():Promise<Record<string, T>> => {
  await sleep(3)
  const obj:Record<string, unknown> = {}
  await localforage.iterate((value, key) => {
    console.log('[key, value]: ', [key, value])
    obj[key] = value
  })
  return obj as Record<string, T>
}

const setItem = async ([key, value]: [string, unknown]):Promise<void> => {
  console.log('set', [key, value])
  await localforage.setItem(key, value)
}

const removeItem = async (key: string):Promise<void> => {
  console.log('remove', key)
  await localforage.removeItem(key)
}

class IndexedDB {
  _name: string

  constructor (name?: string) {
    this._name = name || 'localforage'
    this.setDBName(this._name)
  }

  setDBName (name: string):void {
    this._name = name
    localforage.config({
      name: this._name
    })
  }

  get name (): string {
    return this._name
  }

  set name (s: string) {
    this._name = s
    localforage.config({
      name: this._name
    })
  }

  getItemsAll = getItemsAll
  setItem = setItem
  removeItem = removeItem
}

export { IndexedDB, getItemsAll, setItem, removeItem }

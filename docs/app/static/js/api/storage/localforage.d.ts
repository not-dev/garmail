declare class IndexedDB<T extends Record<string, unknown>> {
    _name: string;
    store: LocalForage;
    constructor(name?: string);
    setDBName(name: string): void;
    get name(): string;
    set name(s: string);
    getItemsAll(): Promise<T>;
    getItem<K extends keyof T>(key: K): Promise<T[K] | null>;
    setItem(item: T): Promise<void>;
    removeItem<K extends keyof T>(key: K): Promise<void>;
}
export { IndexedDB };
//# sourceMappingURL=localforage.d.ts.map
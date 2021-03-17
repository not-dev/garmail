declare module 'react-promise-suspense' {
  const usePromise: <T>(promise: (...inputs: any[]) => Promise<T>, inputs: any[], lifespan?: number) => T;
  export = usePromise
}

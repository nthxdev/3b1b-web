import * as Comlink from 'comlink'

const worker = new Worker(
  new URL('../workers/mathWorker.ts', import.meta.url),
  { type: 'module' },
)

export const mathWorker = Comlink.wrap<{
  square(n: number): Promise<number>
}>(worker)

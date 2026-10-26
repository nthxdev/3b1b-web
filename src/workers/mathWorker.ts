import * as Comlink from 'comlink'

const mathWorker = {
  square(n: number) {
    return n * n
  },
}

Comlink.expose(mathWorker)

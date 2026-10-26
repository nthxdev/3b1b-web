import { useState } from 'react'
import { mathWorker } from '../lib/mathWorkerClient'

export default function WorkerDemo() {
  const [result, setResult] = useState<number | null>(null)

  async function calculate() {
    setResult(await mathWorker.square(12))
  }

  return (
    <div>
      <button onClick={calculate}>Calculate 12²</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  )
}

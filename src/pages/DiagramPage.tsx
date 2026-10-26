import Diagram from '../assets/diagram.svg?react'

export default function DiagramPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-4 text-2xl font-bold">SVG Component Test</h1>
      <Diagram className="w-full max-w-md" />
    </main>
  )
}

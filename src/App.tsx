import { Link, Outlet, Route, Routes } from 'react-router'

import LessonPage from './pages/LessonPage'
import DiagramPage from './pages/DiagramPage'
import GraphicsLab from './pages/GraphicsLab'
import LessonSearch from './components/LessonSearch'

function Layout() {
  return (
    <>
      <header className="border-b border-neutral-200 p-4">
        <nav className="mx-auto flex max-w-5xl flex-wrap gap-5">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/lessons/vectors">Vectors</Link>
          <Link to="/diagram">Diagram</Link>
          <Link to="/lab">Graphics Lab</Link>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">3Blue1Brown Web</h1>

      <LessonSearch />
    </main>
  )
}

function About() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-3">An interactive mathematics learning site.</p>
    </main>
  )
}

function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">404 - Not Found</h1>
      <p className="my-3">This page does not exist.</p>
      <Link className="underline" to="/">
        Return home
      </Link>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="lessons/vectors" element={<LessonPage />} />
        <Route path="diagram" element={<DiagramPage />} />
        <Route path="lab" element={<GraphicsLab />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

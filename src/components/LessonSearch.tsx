import { useState } from 'react'
import { Link } from 'react-router'
import { searchLessons } from '../lib/lessonSearch'

export default function LessonSearch() {
  const [query, setQuery] = useState('')
  const results = query ? searchLessons(query) : []

  return (
    <section className="space-y-3">
      <label htmlFor="lesson-search" className="mb-2 block text-sm font-medium">
        Search lessons
      </label>
      <input
        id="lesson-search"
        className="w-full rounded-lg border p-3"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search lessons..."
      />

      {results.map((lesson) => (
        <p key={lesson.title}>
          {lesson.path ? (
            <Link className="underline" to={lesson.path}>
              {lesson.title}
            </Link>
          ) : (
            <span>{lesson.title} — page not created yet</span>
          )}
        </p>
      ))}
    </section>
  )
}

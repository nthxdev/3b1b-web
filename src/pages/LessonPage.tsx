import VectorLesson, { frontmatter } from '../content/lessons/vectors.mdx'

import LessonVideo from '../components/LessonVideo'

export default function LessonPage() {
  return (
    <article className="prose mx-auto min-h-screen max-w-3xl p-8">
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>

      <VectorLesson />

      <section className="not-prose mt-8">
        <h2 className="mb-4 text-xl font-bold">Watch the lesson</h2>

        <LessonVideo url="https://youtu.be/aircAruvnKk" />
      </section>
    </article>
  )
}

import Fuse from 'fuse.js'

export const lessons = [
  {
    title: 'Vectors',
    description: 'Magnitude and direction',
    path: '/lessons/vectors',
  },
  {
    title: 'Calculus',
    description: 'Change and accumulation',
    path: null,
  },
]

const fuse = new Fuse(lessons, {
  keys: ['title', 'description'],
  threshold: 0.35,
})

export function searchLessons(query: string) {
  return fuse.search(query).map((result) => result.item)
}

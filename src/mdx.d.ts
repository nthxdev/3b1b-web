declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types.js'

  const MDX: MDXContent
  export default MDX

  export const frontmatter: {
    title?: string
    description?: string
    order?: number
  }
}

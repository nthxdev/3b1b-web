import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import svgr from 'vite-plugin-svgr'

import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
          remarkMath,
        ],
        rehypePlugins: [rehypeMathjax],
      }),
    },

    react({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),

    tailwindcss(),
    svgr(),
  ],
})

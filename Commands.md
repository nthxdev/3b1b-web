## 1. Core web technologies

|Technology|What it does|
|---|---|
|TypeScript|JavaScript with static type checking. Helps catch errors before running code.|
|React|Builds websites from reusable UI components.|
|React Router|Manages page routes and navigation.|
|Vite|Runs the development server and builds the website for production.|
|Tailwind CSS|Styles pages using small utility classes.|
|Bun|Runs JavaScript and provides tools to install packages, run scripts, and build projects.|
|Node.js|Runs JavaScript outside a browser. An alternative runtime for development tools.|


```bash
sudo apt update && sudo apt install -y curl unzip

curl -fsSL https://bun.com/install | bash
source ~/.bashrc
bun --version

bun create vite . --template react-ts

bun install
bun add react-router
bun add -d tailwindcss @tailwindcss/vite
```

```bash
bun run build
bun run dev --host 0.0.0.0
```

## 2. Content and mathematics

|Technology|What it does|
|---|---|
|MDX|Combines Markdown content with interactive React components.|
|Remark|Processes and transforms Markdown into a form the build system can use.|
|`remark-frontmatter`|Reads metadata at the top of content files.|
|`remark-gfm`|Adds GitHub-style Markdown features, such as tables and task lists.|
|`remark-math`|Identifies mathematical expressions written in Markdown.|
|`remark-mdx-frontmatter`|Makes frontmatter metadata available to MDX code.|
|MathJax|Displays mathematical notation, such as equations and symbols.|
|SVGR|Converts SVG files into React components.|


```bash
bun add -d \
  @mdx-js/rollup \
  remark-frontmatter \
  remark-mdx-frontmatter \
  remark-gfm \
  remark-math \
  rehype-mathjax \
  vite-plugin-svgr \
  @types/mdx
```

> Important: MDX must run before the React plugin. The official MDX documentation specifies this plugin ordering for Vite projects using @vitejs/plugin-react

prose is a CSS class from Tailwind CSS Typography. It makes raw content, such as an MDX lesson, look like a properly formatted article.
if want to remvoe prose:

```bash
sed -i 's/className="prose mx-auto min-h-screen max-w-3xl p-8"/className="mx-auto min-h-screen max-w-3xl p-8"/' src/pages/LessonPage.tsx
```

## 3. Graphics and animation

|Technology|What it does|
|---|---|
|Three.js|Creates interactive 3D graphics using WebGL and other browser graphics capabilities.|
|React Three Fiber|Lets you build Three.js scenes using React components.|
|D3.js|Creates data-driven charts, scales, and diagrams.|
|p5.js|Makes creative coding, drawing, and canvas animations easier.|
|react-p5|Connects p5.js sketches to React.|
|GSAP|Animates properties over time, such as positions, sizes, and opacity.|
|GLSL Canvas|Runs custom GLSL shaders on a web canvas.|
|Embla Carousel|Creates slideable carousels and galleries.|


Three.js + React Three Fiber
+ Learn meshes, geometry, materials, lighting, cameras, and animation frames. R3F lets you describe the 3D scene with React components.

D3.js
+ Learn scales, axes, coordinate mapping, and data visualization. These concepts are particularly useful for mathematical graphs and interactive diagrams.

p5.js
+ Learn the draw loop, canvas coordinates, motion, and procedural visuals. Use it for creative 2D experiments that don't need a React-based scene graph.

GSAP
+ Learn timelines, easing, sequencing, and animation control. It can animate HTML elements and coordinate complex transitions.

GLSL
+ Learn vertex and fragment shaders, UV coordinates, uniforms, and GPU-generated effects. The demo uses a fragment shader on a plane in R3F.

Embla Carousel
+ Learn touch-friendly horizontal scrolling for lesson cards, topic collections, and galleries.


check current version:

```bash
cd ~/3b1b-web
bun pm ls react
```

if React 19

```bash
bun add three @react-three/fiber @react-three/drei
bun add d3 gsap
bun add -d @types/three @types/d3 vite-plugin-glsl
```

What each package adds:

- three — the underlying 3D engine.
- @react-three/fiber — React integration for 3D.
- @react-three/drei — useful ready-made 3D helpers.
- d3 — data visualization utilities.
- gsap — animation timelines and sequencing.
- @types/three, @types/d3 — TypeScript declarations.
- vite-plugin-glsl — lets Vite import shader files.

```bash
# If you decide to use p5.js sketches
bun add p5
bun add -d @types/p5

# If you need React's p5 wrapper instead
bun add react-p5

# If you need slideable carousels
bun add embla-carousel-react
```

## 4. State, search, and UI components

|Technology|What it does|
|---|---|
|Jotai|Manages shared state in React applications.|
|Fuse.js|Searches text approximately, even when the query does not match exactly.|
|Lodash|Provides reusable utility functions for working with JavaScript data.|
|Comlink|Makes communication with Web Workers easier.|
|Base UI|Provides building blocks for accessible user-interface components.|
|Phosphor Icons|Provides icons for websites and applications.|
|YouTube/Vimeo web components|Embed videos using reusable browser components.|


```bash
# Shared React state
bun add jotai

# Fuzzy search
bun add fuse.js

# JavaScript utilities + TypeScript declarations
bun add lodash
bun add -d @types/lodash

# Web Worker communication
bun add comlink

# Accessible UI primitives
bun add @base-ui/react

# Phosphor icon library
bun add @phosphor-icons/react

# YouTube, Vimeo, and other video embeds
bun add react-player
```

## 5. Testing and code quality

|Technology|What it does|
|---|---|
|Playwright|Automates a browser to test website behavior.|
|Axe|Checks for common accessibility problems.|
|ESLint|Finds code-quality issues and potential mistakes.|
|Prettier|Formats code consistently.|
|TypeScript type checking|Finds type errors without needing to execute the application.|
|cspell|Finds spelling mistakes in code and text.|
|Knip|Finds unused files, exports, and dependencies.|
|Linkinator|Checks links for problems, such as broken URLs.|


**Install all tools**

```bash
bun add -d \
  @playwright/test \
  @axe-core/playwright \
  eslint \
  @eslint/js \
  globals \
  typescript-eslint \
  eslint-plugin-react-hooks \
  eslint-config-prettier \
  prettier \
  cspell \
  knip \
  linkinator \
  @types/node
```

Install Chromium for Playwright:

```bash
bunx playwright install chromium
```

If Playwright reports missing Linux system libraries in WSL, run:

```bash
bunx playwright install --with-deps chromium
```

Playwright automates browsers. Axe provides automated accessibility checks inside those browser tests

**TypeScript type checking**

```
"typecheck": "tsc -b --pretty"
bun run --bun typecheck
```

in `tsconfig.node.json`

```
"include": [
  "vite.config.ts",
  "playwright.config.ts",
  "tests/**/*.ts"
]
```

**ESLint — code-quality checks**
make - `eslint.config.mjs`

```
"lint": "eslint ."
bun run --bun lint
```

**Prettier — automatic formatting**
Create `.prettierrc.json`:

```
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

Create `.prettierignore`:

```
node_modules/
dist/
coverage/
playwright-report/
test-results/
bun.lock
```

test it:

```bash
# Format the project
bun run --bun format

# Check formatting without changing files
bun run --bun format:check

# Format one file
bun run --bun prettier --write src/App.tsx
```

**CSpell — spelling checks**

```bash
bun run --bun spellcheck
```

**Run - Knip**

```bash
bun run --bun knip
```

**Playwright**

```bash
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

run tests:

```bash
bun run --bun test:e2e
bun run --bun test:e2e:ui
```

**Axe**

```bash
bun run --bun test:e2e
```

**Linkinator — broken-link checks**
Build your website before scanning the generated output:

```bash
bun run --bun build
bun run --bun links
```

To scan links in your MDX lesson content:

```bash
bun run --bun links:content
```

Run the checks individually in this order while setting everything up:

```bash
bun run --bun typecheck
bun run --bun lint
bun run --bun format:check
bun run --bun spellcheck
```

knip reqiuires decisions 
```bash
bun run --bun knip
```

```bash
bun run --bun build
bun run --bun links
bun run --bun links:content
bun run --bun test:e2e
```

## 6. Deployment and architecture6. Deployment and architecture

|Technology or term|What it does|
|---|---|
|Netlify|Hosts and deploys the website.|
|Static pre-rendering|Generates HTML pages before visitors request them.|
|Server-side rendering (SSR)|Generates HTML on a server for a request. This project disables its normal SSR mode.|
|Hydration|Connects JavaScript behavior to HTML already rendered in the browser.|
|Static routes|Known page URLs for which HTML can be generated during the build.|



```
app/
├── api/          # Code for API requests
├── assets/       # Images, videos and other files
├── components/   # Reusable UI pieces
├── data/         # Shared website data
├── pages/        # Page-specific code and content
└── util/         # Helper functions

The main idea: TypeScript and React build the interface; MDX and MathJax handle educational content and equations; graphics libraries power interactive demonstrations; testing tools check quality; and Netlify publishes the result.
```

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as d3 from 'd3'
import gsap from 'gsap'
import P5 from 'p5'
import useEmblaCarousel from 'embla-carousel-react'
import * as THREE from 'three'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5 dark:border-neutral-700">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  )
}

// 1. Three.js rendered through React Three Fiber
function SpinningCube() {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.5
    mesh.current.rotation.y += delta * 0.8
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#4f8cff" />
    </mesh>
  )
}

export function ThreeDemo() {
  return (
    <Section title="1. Three.js + React Three Fiber">
      <p className="mb-3 text-sm">
        Drag to rotate the view. The cube spins automatically.
      </p>
      <div className="h-72 overflow-hidden rounded-lg bg-neutral-950">
        <Canvas camera={{ position: [3, 2, 4] }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 4, 5]} intensity={3} />
          <SpinningCube />
          <OrbitControls />
        </Canvas>
      </div>
    </Section>
  )
}

// 2. D3 scales + SVG for a simple chart
export function D3Demo() {
  const values = [4, 8, 5, 12, 9, 15, 11]
  const width = 560
  const height = 220
  const margin = { top: 12, right: 12, bottom: 28, left: 32 }

  const chart = (() => {
    const x = d3
      .scaleBand()
      .domain(values.map((_, i) => String(i + 1)))
      .range([margin.left, width - margin.right])
      .padding(0.2)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(values) ?? 1])
      .nice()
      .range([height - margin.bottom, margin.top])

    return { x, y }
  })()

  return (
    <Section title="2. D3.js">
      <p className="mb-3 text-sm">
        A small chart using D3 scales and SVG rectangles.
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {chart.y.ticks(4).map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={chart.y(tick)}
              y2={chart.y(tick)}
              stroke="currentColor"
              opacity={0.15}
            />
            <text
              x={margin.left - 6}
              y={chart.y(tick) + 4}
              textAnchor="end"
              fontSize="11"
              fill="currentColor"
            >
              {tick}
            </text>
          </g>
        ))}
        {values.map((value, i) => (
          <rect
            key={i}
            x={chart.x(String(i + 1))}
            y={chart.y(value)}
            width={chart.x.bandwidth()}
            height={chart.y(0) - chart.y(value)}
            rx={4}
            fill="#4f8cff"
          />
        ))}
        {values.map((_, i) => (
          <text
            key={i}
            x={(chart.x(String(i + 1)) ?? 0) + chart.x.bandwidth() / 2}
            y={height - 8}
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
          >
            {i + 1}
          </text>
        ))}
      </svg>
    </Section>
  )
}

// 3. p5.js canvas mounted and cleaned up by React
export function P5Demo() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!host.current) return

    const sketch = new P5((p) => {
      p.setup = () => {
        p.createCanvas(560, 220)
        p.noStroke()
      }

      p.draw = () => {
        p.background(15, 23, 42)
        const x = p.width / 2 + Math.sin(p.frameCount * 0.035) * 150
        const y = p.height / 2 + Math.cos(p.frameCount * 0.05) * 55

        p.fill(79, 140, 255)
        p.circle(x, y, 42)

        p.fill(255)
        p.textSize(13)
        p.text('A simple p5.js sketch', 16, 24)
      }
    }, host.current)

    return () => sketch.remove()
  }, [])

  return (
    <Section title="3. p5.js">
      <p className="mb-3 text-sm">
        A continuously animated canvas, managed through a React effect.
      </p>
      <div ref={host} className="max-w-full overflow-hidden rounded-lg" />
    </Section>
  )
}

// 4. GSAP animates a normal DOM element
export function GsapDemo() {
  const target = useRef<HTMLDivElement>(null)
  const animation = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!target.current) return
    animation.current = gsap.to(target.current, {
      x: 180,
      rotation: 180,
      duration: 1.4,
      ease: 'power2.inOut',
      paused: true,
    })

    return () => {
      animation.current?.kill()
    }
  }, [])

  return (
    <Section title="4. GSAP">
      <p className="mb-4 text-sm">
        Press play or rewind to control a GSAP animation.
      </p>
      <div className="mb-5 flex h-16 items-center overflow-hidden">
        <div ref={target} className="h-12 w-12 rounded-lg bg-violet-500" />
      </div>
      <div className="flex gap-3">
        <button
          className="rounded-md bg-violet-600 px-4 py-2 text-white"
          onClick={() => animation.current?.restart()}
        >
          Play
        </button>
        <button
          className="rounded-md border px-4 py-2"
          onClick={() => animation.current?.reverse()}
        >
          Reverse
        </button>
      </div>
    </Section>
  )
}

// 5. GLSL fragment shader running on a Three.js plane

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position =
      projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;

    float wave =
      sin(p.x * 18.0 + uTime * 1.5) *
      cos(p.y * 14.0 - uTime);

    vec3 color = 0.5 + 0.5 * cos(
      vec3(0.0, 2.0, 4.0) + wave * 2.0 + uTime
    );

    gl_FragColor = vec4(color, 1.0);
  }
`

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame((state) => {
    const material = materialRef.current

    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

function ShaderDemo() {
  return (
    <Section title="5. GLSL shader">
      <p className="mb-3 text-sm">
        A GPU fragment shader generates animated color patterns.
      </p>

      <div className="h-64 overflow-hidden rounded-lg bg-neutral-950">
        <Canvas>
          <ShaderPlane />
        </Canvas>
      </div>
    </Section>
  )
}

// 6. Embla Carousel
export function CarouselDemo() {
  const [viewportRef] = useEmblaCarousel({ loop: true })

  const slides = [
    { title: 'Vectors', text: 'Magnitude and direction' },
    { title: 'Calculus', text: 'Change and accumulation' },
    { title: 'Linear algebra', text: 'Vectors, matrices, transformations' },
  ]

  return (
    <Section title="6. Embla Carousel">
      <p className="mb-3 text-sm">
        Drag horizontally or use a touch gesture to change slides.
      </p>
      <div className="overflow-hidden rounded-lg" ref={viewportRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            <div className="min-w-0 flex-[0_0_100%] p-1" key={slide.title}>
              <div className="flex h-40 flex-col justify-center rounded-lg bg-neutral-900 p-6 text-white">
                <p className="text-sm text-blue-300">Lesson {i + 1}</p>
                <h3 className="mt-2 text-2xl font-bold">{slide.title}</h3>
                <p className="mt-1">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default function GraphicsLab() {
  return (
    <main className="mx-auto grid min-h-screen max-w-4xl gap-6 p-6 md:p-10">
      <header>
        <p className="text-sm uppercase tracking-widest text-blue-500">
          Interactive experiments
        </p>
        <h1 className="mt-2 text-3xl font-bold">Graphics Lab</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Small working examples of the graphics and animation tools in this
          project.
        </p>
      </header>

      <ThreeDemo />
      <D3Demo />
      <P5Demo />
      <GsapDemo />
      <ShaderDemo />
      <CarouselDemo />
    </main>
  )
}

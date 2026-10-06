import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import CursorFollower from './components/ui/CursorFollower.jsx'
import Hero from './components/sections/Hero.jsx'

// Everything below the fold is split into its own chunk so the hero paints first.
const Projects = lazy(() => import('./components/sections/Projects.jsx'))
const About = lazy(() => import('./components/sections/About.jsx'))
const Skills = lazy(() => import('./components/sections/Skills.jsx'))
const Experience = lazy(() => import('./components/sections/Experience.jsx'))
const Blog = lazy(() => import('./components/sections/Blog.jsx'))
const Contact = lazy(() => import('./components/sections/Contact.jsx'))
const Footer = lazy(() => import('./components/layout/Footer.jsx'))

// Each section streams in independently; the placeholder reserves roughly a section's
// height so anchors and the scrollbar don't jump while its chunk loads.
const Lazy = ({ children }) => (
  <Suspense fallback={<div aria-hidden="true" className="min-h-[60vh]" />}>{children}</Suspense>
)

export default function App() {
  return (
    <div className="relative">
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream">
        Skip to content
      </a>
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Lazy><Projects /></Lazy>
        <Lazy><About /></Lazy>
        <Lazy><Skills /></Lazy>
        <Lazy><Experience /></Lazy>
        <Lazy><Blog /></Lazy>
        <Lazy><Contact /></Lazy>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

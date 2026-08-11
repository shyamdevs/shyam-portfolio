import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import CursorFollower from './components/ui/CursorFollower.jsx'
import Hero from './components/sections/Hero.jsx'
import Projects from './components/sections/Projects.jsx'
import About from './components/sections/About.jsx'
import Skills from './components/sections/Skills.jsx'
import Experience from './components/sections/Experience.jsx'
import Blog from './components/sections/Blog.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <div className="relative">
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

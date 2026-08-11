import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { posts } from '../../data/content.js'

export default function Blog() {
  return (
    <section id="blog" className="py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Writing"
          title={
            <>
              Notes from the
              <br />
              <span className="italic text-olive">build process.</span>
            </>
          }
        />

        <div className="mt-16 divide-y divide-line hairline">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <a
                href="#"
                data-cursor-hover
                className="group grid md:grid-cols-[7rem_1fr_auto] items-center gap-4 md:gap-10 py-8"
              >
                <span className="font-mono text-xs text-ink-faint">{post.date}</span>
                <div>
                  <span className="eyebrow mb-2 inline-block">{post.tag} · {post.readTime}</span>
                  <h3 className="text-xl md:text-2xl text-ink group-hover:text-olive transition-colors font-display">
                    {post.title}
                  </h3>
                  <p className="text-ink-faint text-sm mt-2 max-w-lg hidden md:block">{post.excerpt}</p>
                </div>
                <FiArrowUpRight className="text-ink-faint group-hover:text-olive group-hover:translate-x-1 group-hover:-translate-y-1 transition-all justify-self-end" size={22} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

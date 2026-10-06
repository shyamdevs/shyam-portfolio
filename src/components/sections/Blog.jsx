import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { refreshPortfolio, usePortfolio } from '../../lib/portfolioStore.js'
import { prefetchPost } from '../../lib/postsCache.js'
import { formatNoteDate } from '../../utils/format.js'

// The reading modal only loads when somebody opens a note.
const NoteModal = lazy(() => import('../notes/NoteModal.jsx'))

function NoteRow({ post, index, onOpen }) {
  return (
    <Reveal delay={index * 0.06}>
      <button
        type="button"
        onClick={() => onOpen(post)}
        onPointerEnter={() => prefetchPost(post)}
        onFocus={() => prefetchPost(post)}
        data-cursor-hover
        aria-haspopup="dialog"
        className="group grid w-full items-center gap-3 py-7 text-left md:grid-cols-[7rem_1fr_auto] md:gap-10 md:py-8"
      >
        <time dateTime={new Date(post.date).toISOString()} className="font-mono text-xs text-ink-faint">
          {formatNoteDate(post.date)}
        </time>
        <div className="transition-transform duration-500 ease-out md:group-hover:translate-x-2">
          <span className="eyebrow mb-2 inline-block">
            {post.tag} · {post.readTime}
          </span>
          <h3 className="font-display text-xl text-ink transition-colors group-hover:text-olive md:text-2xl">{post.title}</h3>
          <p className="mt-2 max-w-lg text-sm text-ink-faint">{post.excerpt}</p>
        </div>
        <FiArrowUpRight
          aria-hidden="true"
          size={22}
          className="hidden justify-self-end text-ink-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-olive md:block"
        />
      </button>
    </Reveal>
  )
}

function NotesSkeleton() {
  return (
    <div aria-busy="true" className="divide-y divide-line">
      {[0, 1, 2].map((i) => (
        <div key={i} className="grid gap-3 py-8 md:grid-cols-[7rem_1fr_auto] md:gap-10">
          <Skeleton className="h-3 w-16" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Blog() {
  const { data, status } = usePortfolio()
  const [active, setActive] = useState(null)
  const posts = data?.posts || []

  return (
    <section id="blog" className="py-24 md:py-36">
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

        <div className="hairline mt-14 md:mt-16">
          {!data && status === 'loading' ? (
            <NotesSkeleton />
          ) : !data && status === 'error' ? (
            <div role="alert" className="py-10 text-sm text-ink-faint">
              Notes couldn’t be loaded right now.{' '}
              <button type="button" onClick={refreshPortfolio} className="text-olive underline underline-offset-4 hover:text-olive-dark">
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <p className="py-10 text-sm text-ink-faint">No notes published yet — check back soon.</p>
          ) : (
            <div className="divide-y divide-line">
              {posts.map((post, i) => (
                <NoteRow key={post._id} post={post} index={i} onOpen={setActive} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <Suspense key={active._id} fallback={null}>
            <NoteModal note={active} onClose={() => setActive(null)} />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  )
}

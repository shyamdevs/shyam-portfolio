import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import NoteContent from './NoteContent.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { loadPost } from '../../lib/postsCache.js'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'
import { formatNoteDate } from '../../utils/format.js'

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'

/**
 * Accessible reading dialog.
 *  - Portalled to <body>: ancestors with transforms (scroll reveals) would otherwise
 *    break `position: fixed`.
 *  - role=dialog + aria-modal, labelled by the title; focus moves in, is trapped,
 *    and returns to the row that opened it.
 *  - Escape and backdrop click close it (backdrop uses mousedown-on-self so
 *    selecting text and releasing outside doesn't dismiss).
 *  - Background scroll is locked (ref-counted) and restored; the body scrolls
 *    internally with overscroll-behavior: contain.
 *  - Metadata renders instantly from the list; the full body is fetched (and was
 *    usually prefetched on hover).
 */
export default function NoteModal({ note, onClose }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const opener = useRef(document.activeElement)
  const { reduced } = useMotionPrefs()
  const [body, setBody] = useState({ status: 'loading', post: null })

  useScrollLock(true)

  useEffect(() => {
    let alive = true
    setBody({ status: 'loading', post: null })
    loadPost(note.slug, note.updatedAt)
      .then((post) => alive && setBody({ status: 'ready', post }))
      .catch(() => alive && setBody({ status: 'error', post: null }))
    return () => { alive = false }
  }, [note.slug, note.updatedAt])

  useEffect(() => {
    closeRef.current?.focus()
    const previous = opener.current
    return () => previous?.focus?.()
  }, [])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = panelRef.current?.querySelectorAll(FOCUSABLE)
    if (!items?.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const down = useRef(false)
  const t = reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/55 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      onMouseDown={(e) => { down.current = e.target === e.currentTarget }}
      onMouseUp={(e) => { if (down.current && e.target === e.currentTarget) onClose(); down.current = false }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: reduced ? 0 : 32, scale: reduced ? 1 : 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduced ? 0 : 20 }}
        transition={t}
        className="relative flex max-h-[94dvh] w-full max-w-[46rem] flex-col overflow-hidden rounded-t-[22px] border border-line bg-cream shadow-cardHover md:max-h-[88vh] md:rounded-[22px]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 pb-5 pt-6 sm:px-8 md:px-10 md:pt-8">
          <div className="min-w-0">
            <p className="eyebrow mb-3">
              {note.tag} <span aria-hidden="true">·</span>{' '}
              <time dateTime={new Date(note.date).toISOString()}>{formatNoteDate(note.date)}</time>{' '}
              <span aria-hidden="true">·</span> {note.readTime}
            </p>
            <h2 id={titleId} className="text-[26px] leading-[1.12] tracking-tight text-ink sm:text-3xl md:text-4xl">
              {note.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close note"
            data-cursor-hover
            className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            <FiX size={18} />
          </button>
        </header>

        <div className="overscroll-contain overflow-y-auto px-5 py-7 sm:px-8 md:px-10 md:py-9" tabIndex={-1}>
          {body.status === 'loading' && (
            <div className="space-y-4" aria-busy="true" aria-label="Loading note">
              {[100, 94, 98, 70, 100, 88].map((w, i) => <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} />)}
            </div>
          )}
          {body.status === 'error' && (
            <p role="alert" className="text-ink-faint">
              This note couldn’t be loaded — it may have been unpublished or the connection dropped. Close and try again.
            </p>
          )}
          {body.status === 'ready' && <NoteContent content={body.post.content} />}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

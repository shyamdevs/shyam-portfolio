import { useEffect } from 'react'

// Reference-counted so stacked overlays (mobile menu + modal) can't unlock each other.
let locks = 0
let saved = null

function lock() {
  if (locks++ > 0) return
  const { style } = document.body
  const scrollbar = window.innerWidth - document.documentElement.clientWidth
  saved = { overflow: style.overflow, paddingRight: style.paddingRight }
  style.overflow = 'hidden'
  // compensate for the vanished scrollbar so the page doesn't jump sideways
  if (scrollbar > 0) style.paddingRight = `${scrollbar}px`
}

function unlock() {
  if (--locks > 0) return
  locks = 0
  document.body.style.overflow = saved?.overflow ?? ''
  document.body.style.paddingRight = saved?.paddingRight ?? ''
  saved = null
}

export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return undefined
    lock()
    return unlock
  }, [active])
}

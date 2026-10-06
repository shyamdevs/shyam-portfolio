import { useSyncExternalStore } from 'react'
import { apiFetch } from './api.js'

/**
 * One shared data layer for the whole public site.
 *
 *  - ONE request (GET /portfolio) feeds hero, projects, skills, experience,
 *    notes, resume and site images. Components just subscribe.
 *  - In-flight requests are de-duplicated (StrictMode, remounts, focus events).
 *  - Stale-while-revalidate: a short-lived sessionStorage snapshot paints
 *    instantly on reload, and the network is ALWAYS asked again right away.
 *  - Revalidates on tab focus and every minute while the tab is visible, so
 *    admin edits show up without a manual refresh.
 *  - `cache: 'no-cache'` makes the browser revalidate with the server's ETag
 *    (a tiny 304 when nothing changed) instead of trusting an old copy.
 */
const SNAPSHOT_KEY = 'portfolio:v1'
const SNAPSHOT_MAX_AGE = 5 * 60 * 1000
const FOCUS_THROTTLE = 15 * 1000
const POLL_INTERVAL = 60 * 1000

function readSnapshot() {
  try {
    const raw = sessionStorage.getItem(SNAPSHOT_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw)
    return Date.now() - at < SNAPSHOT_MAX_AGE ? data : null
  } catch {
    return null
  }
}

function writeSnapshot(data) {
  try {
    sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* storage full or unavailable — the snapshot is only an optimisation */
  }
}

const initialData = typeof window !== 'undefined' ? readSnapshot() : null

// Snapshots are replaced, never mutated, so selectors can return stable references.
let state = {
  data: initialData,
  status: initialData ? 'success' : 'loading', // loading | success | error
  error: null,
  fetchedAt: 0,
}
let inflight = null
const listeners = new Set()

function setState(next) {
  state = { ...state, ...next }
  listeners.forEach((l) => l())
}

export function refreshPortfolio() {
  if (inflight) return inflight
  inflight = apiFetch('/portfolio', { cache: 'no-cache' })
    .then((data) => {
      // Skip the update (and every re-render) when nothing actually changed.
      const changed = JSON.stringify(data) !== JSON.stringify(state.data)
      if (changed) writeSnapshot(data)
      setState({ data: changed ? data : state.data, status: 'success', error: null, fetchedAt: Date.now() })
    })
    .catch((error) => {
      // Keep showing whatever we already have; only surface an error if we have nothing.
      setState(state.data ? { error } : { status: 'error', error })
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

let started = false
function start() {
  if (started || typeof window === 'undefined') return
  started = true
  refreshPortfolio()

  const revalidate = () => {
    if (document.visibilityState === 'visible' && Date.now() - state.fetchedAt > FOCUS_THROTTLE) {
      refreshPortfolio()
    }
  }
  document.addEventListener('visibilitychange', revalidate)
  window.addEventListener('focus', revalidate)
  setInterval(revalidate, POLL_INTERVAL)
}

function subscribe(listener) {
  start()
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const getSnapshot = () => state

/** Subscribe to the whole store state: { data, status, error }. */
export function usePortfolio() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Subscribe to one slice (e.g. `d => d.projects`); re-renders only when it changes. */
export function usePortfolioSlice(select, fallback) {
  const { data } = usePortfolio()
  return data ? select(data) ?? fallback : fallback
}

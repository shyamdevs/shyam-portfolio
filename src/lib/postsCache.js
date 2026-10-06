import { apiFetch } from './api.js'

// Full note bodies are fetched on demand (the homepage payload only carries
// excerpts). Promises are cached per slug + updatedAt: hover-prefetch and click
// share one request, and an edit made in the admin changes `updatedAt`, which
// naturally busts the cached body.
const cache = new Map()

export function loadPost(slug, version = '') {
  const key = `${slug}:${version}`
  if (!cache.has(key)) {
    const p = apiFetch(`/posts/${encodeURIComponent(slug)}`, { cache: 'no-cache' }).catch((err) => {
      cache.delete(key) // never cache failures
      throw err
    })
    cache.set(key, p)
  }
  return cache.get(key)
}

export const prefetchPost = (post) => {
  loadPost(post.slug, post.updatedAt).catch(() => {})
}

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

/** Single place that talks to the API: timeout, JSON parsing, consistent errors. */
export async function apiFetch(path, { method = 'GET', body, timeout = 15000, cache } = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
      cache,
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(data?.message || `Request failed (${res.status})`, res.status)
    return data
  } catch (err) {
    if (err.name === 'AbortError') throw new ApiError('The request timed out.', 0)
    throw err
  } finally {
    clearTimeout(timer)
  }
}

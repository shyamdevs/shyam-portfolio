import { useEffect, useRef, useState } from 'react'
import { cdnUrl, isCloudinary } from '../../lib/cdn.js'

function Img({ src, alt, widths, sizes, ratio, priority, className, onFail, fallback }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const cdn = isCloudinary(src)

  // a cached image can finish loading before React attaches onLoad
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [])

  const sized = (w) => cdnUrl(src, ratio ? { width: w, height: Math.round(w / ratio) } : { width: w })
  const srcSet = cdn ? widths.map((w) => `${sized(w)} ${w}w`).join(', ') : undefined
  const defaultW = widths[Math.floor(widths.length / 2)] // fallback src for browsers that ignore srcset

  return (
    <img
      ref={ref}
      src={cdn ? sized(defaultW) : src}
      srcSet={srcSet}
      sizes={cdn ? sizes : undefined}
      alt={alt}
      width={ratio ? 1000 : undefined}
      height={ratio ? Math.round(1000 / ratio) : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => (fallback && src !== fallback ? onFail() : setLoaded(true))}
      className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}

/**
 * Image that never causes layout shift and never downloads more than it needs.
 *  - The PARENT owns the box (aspect-ratio / fixed size); this fills it.
 *  - Cloudinary images get f_auto,q_auto + a srcset of right-sized variants.
 *  - Lazy by default; pass `priority` for the one above-the-fold hero image.
 *  - Fades in over the olive placeholder, and falls back if the URL is dead.
 */
export default function ResponsiveImage({
  src,
  alt,
  fallback = '',
  widths = [480, 720, 960],
  sizes = '100vw',
  ratio, // optional width/height, e.g. 16/11, to crop variants server-side
  priority = false,
  className = '',
}) {
  const [current, setCurrent] = useState(src || fallback)
  useEffect(() => setCurrent(src || fallback), [src, fallback])
  if (!current) return null

  return (
    <Img
      key={current}
      src={current}
      alt={alt}
      widths={widths}
      sizes={sizes}
      ratio={ratio}
      priority={priority}
      className={className}
      fallback={fallback}
      onFail={() => setCurrent(fallback)}
    />
  )
}

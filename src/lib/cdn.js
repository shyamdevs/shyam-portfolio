// Cloudinary delivery helpers. Stored URLs look like
//   https://res.cloudinary.com/<cloud>/image/upload/v123/portfolio/images/abc.jpg
// Inserting a transformation segment makes the CDN resize + re-encode on the fly
// (f_auto -> AVIF/WebP where supported, q_auto -> perceptual quality) and cache the result.
const MARKER = '/image/upload/'

export const isCloudinary = (url) => typeof url === 'string' && url.includes('res.cloudinary.com') && url.includes(MARKER)

export function cdnUrl(url, { width, height, crop = 'fill', gravity = 'auto' } = {}) {
  if (!isCloudinary(url) || /\.svg($|\?)/i.test(url)) return url
  const parts = ['f_auto', 'q_auto']
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`, `c_${crop}`, `g_${gravity}`)
  else if (width) parts.push('c_limit')
  return url.replace(MARKER, `${MARKER}${parts.join(',')}/`)
}

export function cdnSrcSet(url, widths, opts = {}) {
  if (!isCloudinary(url) || /\.svg($|\?)/i.test(url)) return undefined
  return widths.map((w) => `${cdnUrl(url, { ...opts, width: w })} ${w}w`).join(', ')
}

import { Fragment } from 'react'

// Notes are authored as plain text in the admin. This renders a small, SAFE
// subset of markdown straight to React elements — no dangerouslySetInnerHTML,
// so note content can never inject markup or scripts.
//   ## / ### headings   - or * lists   > quotes   ``` fenced code   **bold**   `code`
function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={i} className="rounded bg-olive-50 px-1.5 py-0.5 font-mono text-[0.88em] text-olive-dark">{part.slice(1, -1)}</code>
    return <Fragment key={i}>{part}</Fragment>
  })
}

function parse(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let para = []
  let list = null
  let code = null

  const flushPara = () => {
    if (para.length) blocks.push({ type: 'p', text: para.join(' ') })
    para = []
  }
  const flushList = () => {
    if (list) blocks.push({ type: 'ul', items: list })
    list = null
  }

  for (const raw of lines) {
    if (code) {
      if (raw.trim().startsWith('```')) {
        blocks.push({ type: 'code', text: code.join('\n') })
        code = null
      } else code.push(raw)
      continue
    }
    const line = raw.trim()
    if (line.startsWith('```')) { flushPara(); flushList(); code = []; continue }
    if (!line) { flushPara(); flushList(); continue }
    const h = line.match(/^(#{2,3})\s+(.*)$/)
    if (h) { flushPara(); flushList(); blocks.push({ type: `h${h[1].length}`, text: h[2] }); continue }
    if (/^>\s?/.test(line)) { flushPara(); flushList(); blocks.push({ type: 'quote', text: line.replace(/^>\s?/, '') }); continue }
    if (/^[-*]\s+/.test(line)) { flushPara(); (list ||= []).push(line.replace(/^[-*]\s+/, '')); continue }
    flushList()
    para.push(line)
  }
  if (code) blocks.push({ type: 'code', text: code.join('\n') })
  flushPara()
  flushList()
  return blocks
}

export default function NoteContent({ content }) {
  return (
    <div className="space-y-5 text-[17px] leading-[1.8] text-ink-soft md:text-[18px]">
      {parse(content || '').map((b, i) => {
        switch (b.type) {
          case 'h2': return <h3 key={i} className="pt-4 font-display text-2xl text-ink md:text-[28px]"><Inline text={b.text} /></h3>
          case 'h3': return <h4 key={i} className="pt-2 font-display text-xl text-ink"><Inline text={b.text} /></h4>
          case 'ul': return (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-olive">
              {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
            </ul>
          )
          case 'quote': return <blockquote key={i} className="border-l-2 border-olive pl-5 font-display text-xl italic text-ink"><Inline text={b.text} /></blockquote>
          case 'code': return <pre key={i} className="overflow-x-auto rounded-xl bg-ink p-4 font-mono text-[13px] leading-relaxed text-cream/90"><code>{b.text}</code></pre>
          default: return <p key={i}><Inline text={b.text} /></p>
        }
      })}
    </div>
  )
}

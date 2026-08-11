import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}>
      <Reveal>
        <p className="eyebrow mb-4">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tightest leading-[1.05] text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-ink-faint text-lg font-body leading-relaxed max-w-xl">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

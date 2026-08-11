import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCheck } from 'react-icons/fi'
import Magnetic from './Magnetic.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[32px] p-8 md:p-10 bg-white/40 backdrop-blur-xl border border-white/60 shadow-glass"
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="eyebrow mb-2 block">{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              value={form[f.name]}
              onChange={handleChange}
              className="w-full bg-cream/60 border border-line rounded-2xl px-4 py-3.5 text-ink placeholder:text-ink-faint/60 focus:border-olive outline-none transition-colors"
              placeholder={f.label === 'Name' ? 'Your name' : 'you@email.com'}
            />
          </div>
        ))}
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className="eyebrow mb-2 block">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-cream/60 border border-line rounded-2xl px-4 py-3.5 text-ink placeholder:text-ink-faint/60 focus:border-olive outline-none transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div className="mb-7">
        <label htmlFor="message" className="eyebrow mb-2 block">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full bg-cream/60 border border-line rounded-2xl px-4 py-3.5 text-ink placeholder:text-ink-faint/60 focus:border-olive outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <Magnetic>
        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor-hover
          className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60"
        >
          {status === 'sent' ? (
            <>Sent <FiCheck /></>
          ) : status === 'sending' ? (
            'Sending…'
          ) : (
            <>Send Message <FiArrowUpRight /></>
          )}
        </button>
      </Magnetic>

      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-700">
          Something went wrong — please try again, or email me directly.
        </motion.p>
      )}
      {status === 'sent' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-olive-dark">
          Thanks — I'll get back to you shortly.
        </motion.p>
      )}
    </form>
  )
}

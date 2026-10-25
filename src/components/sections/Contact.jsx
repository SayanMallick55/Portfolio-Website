import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'

const channels = [
  { label: 'GitHub', action: 'View source', href: 'https://github.com/', icon: FiGithub },
  { label: 'LinkedIn', action: 'Connect', href: 'https://www.linkedin.com/', icon: FiLinkedin },
  { label: 'Email', action: 'Send transmission', href: 'mailto:sayan@example.com', icon: FiMail },
]

const initialValues = { name: '', email: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please include a message.'
  return errors
}

export function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submissionError, setSubmissionError] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status !== 'idle') setStatus('idle')
    setSubmissionError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setSubmissionError('Web3Forms is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env and restart Vite.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          subject: `Portfolio transmission from ${values.name.trim()}`,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Web3Forms request failed (${response.status}).`)
      }
      setValues(initialValues)
      setStatus('success')
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Unable to establish connection. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-grid" aria-hidden="true" />
      <div className="section-shell contact-shell">
        <motion.header className="contact-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          <p>Contact / Terminal 04</p>
          <h2 id="contact-title">Open Channel</h2>
          <div><span>Have a project, idea, or opportunity?</span><strong>Let&apos;s build something worth launching.</strong></div>
        </motion.header>

        <div className="contact-layout">
          <motion.form className="contact-terminal" onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="contact-terminal-top"><span>Transmission terminal</span><i>Secure channel</i></div>
            <div className="contact-field"><label htmlFor="contact-name">Callsign</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />{errors.name && <small id="contact-name-error">{errors.name}</small>}</div>
            <div className="contact-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your email" value={values.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />{errors.email && <small id="contact-email-error">{errors.email}</small>}</div>
            <div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="5" placeholder="Tell me about the mission..." value={values.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />{errors.message && <small id="contact-message-error">{errors.message}</small>}</div>
            <button className="contact-transmit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>{status === 'sending' ? 'Transmitting...' : <>Transmit <FiSend aria-hidden="true" /></>}</button>
            <AnimatePresence mode="wait">{status === 'success' && <motion.div className="contact-response is-success" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><strong>Transmission received</strong><span>Your message has been successfully transmitted.</span></motion.div>}{status === 'error' && <motion.div className="contact-response is-error" role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><strong>Transmission failed</strong><span>{submissionError || 'Unable to establish connection. Please try again.'}</span></motion.div>}</AnimatePresence>
          </motion.form>

          <motion.aside className="contact-side" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <div className="contact-status"><p>System status</p><dl><div><dt>Status</dt><dd><i /> Available for opportunities</dd></div><div><dt>Signal</dt><dd>Stable</dd></div><div><dt>Channel</dt><dd>Open</dd></div></dl></div>
            <div className="contact-channels"><p>Transmission channels</p>{channels.map(({ label, action, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}><Icon aria-hidden="true" /><span><b>{label}</b><small>{action} <FiArrowUpRight aria-hidden="true" /></small></span></a>)}</div>
          </motion.aside>
        </div>
        <p className="contact-signoff">End of transmission <span /></p>
      </div>
    </section>
  )
}

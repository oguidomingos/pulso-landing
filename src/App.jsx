import { useState, useEffect, useRef, createContext, useContext } from 'react'
import './index.css'
import Wiki from './Wiki.jsx'
import heartbeatSrc from '/heartbeat.mp3?url'

const WHATSAPP_LINK = 'https://wa.me/5561991465706?text=Ol%C3%A1%2C%20quero%20minha%20auditoria%20em%2048h'
const CRM_URL = 'https://crm.icebergcompany.com.br'
const CRM_TOKEN = '30f04dbfccecb6d:e607c7b800ae61d'

const ModalContext = createContext({ open: false, setOpen: () => {} })

function Icon({ name, className = '' }) {
  const icons = {
    search: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    chart: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
    map: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    globe: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
    target: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    megaphone: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
    clipboard: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>,
    camera: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    instagram: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
    sparkles: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>,
    check: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>,
    users: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    calendar: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    shield: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    zap: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    pulse: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 12 6 12 8 8 12 16 14 10 16 12 22 12"/></svg>,
    heart: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    phone: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    star: <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    arrowRight: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  }
  return icons[name] || null
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function LeadModal() {
  const { open, setOpen } = useContext(ModalContext)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    if (open && nameRef.current) {
      setTimeout(() => nameRef.current?.focus(), 100)
    }
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) {
      setStatus('idle')
      setErrorMsg('')
    }
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (!name.trim()) return
    if (digits.length < 10) { setErrorMsg('Telefone inválido'); return }

    setStatus('sending')
    setErrorMsg('')

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    try {
      const res = await fetch(`${CRM_URL}/api/resource/CRM%20Lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${CRM_TOKEN}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName || '',
          email: email || null,
          mobile_no: `+55${digits}`,
          source: 'Website',
          status: 'Sem Contato',
        }),
      })

      if (!res.ok) throw new Error('CRM error')

      const data = await res.json()
      const leadId = data?.data?.name

      // Add note async, don't block
      fetch(`${CRM_URL}/api/resource/CRM%20Note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${CRM_TOKEN}`,
        },
        body: JSON.stringify({
          title: 'Lead via Website',
          content: `<p><strong>Origem:</strong> Landing Page pulso.marketing</p><p><strong>Telefone:</strong> +55${digits}</p><p><strong>Email:</strong> ${email || 'Não informado'}</p>`,
          reference_doctype: 'CRM Lead',
          reference_docname: leadId,
        }),
      }).catch(() => {})

      setStatus('success')

      // Redirect to WhatsApp after brief success state
      setTimeout(() => {
        const whatsappMsg = encodeURIComponent(`Olá, sou ${name.trim()}. Quero minha auditoria em 48h.`)
        window.open(`https://wa.me/5561991465706?text=${whatsappMsg}`, '_blank')
        setTimeout(() => { setOpen(false); setName(''); setPhone(''); setEmail(''); setStatus('idle') }, 1000)
      }, 1500)

    } catch {
      setStatus('error')
      setErrorMsg('Erro ao enviar. Tente novamente.')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => status !== 'sending' && setOpen(false)}>
      <div className="absolute inset-0 bg-[#102A43]/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="glass-card p-6 sm:p-8 bg-[#F7F9FC]/95 shadow-2xl border-[#2CB1BC]/20 hover:transform-none">
          {/* Close */}
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#102A43]/5 flex items-center justify-center hover:bg-[#102A43]/10 transition-colors" aria-label="Fechar">
            <svg className="w-4 h-4 text-[#486581]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2CB1BC]/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="w-8 h-8 text-[#2CB1BC]" />
              </div>
              <h3 className="text-xl font-bold text-[#102A43] mb-2">Recebemos seus dados!</h3>
              <p className="text-sm text-[#486581]">Redirecionando para o WhatsApp...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2CB1BC]/10 border border-[#2CB1BC]/20 flex items-center justify-center">
                    <Icon name="pulse" className="w-5 h-5 text-[#2CB1BC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#102A43] text-lg leading-tight">Receba sua auditoria</h3>
                    <p className="text-xs text-[#486581]">Preencha para receber em 48h</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#486581] uppercase tracking-widest mb-1.5 block">Nome completo *</label>
                  <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. João Silva"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#102A43]/10 text-[#102A43] text-sm font-medium placeholder:text-[#486581]/40 focus:outline-none focus:border-[#2CB1BC]/50 focus:ring-2 focus:ring-[#2CB1BC]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#486581] uppercase tracking-widest mb-1.5 block">WhatsApp *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(61) 99999-9999"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#102A43]/10 text-[#102A43] text-sm font-medium placeholder:text-[#486581]/40 focus:outline-none focus:border-[#2CB1BC]/50 focus:ring-2 focus:ring-[#2CB1BC]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#486581] uppercase tracking-widest mb-1.5 block">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@clinica.com.br"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#102A43]/10 text-[#102A43] text-sm font-medium placeholder:text-[#486581]/40 focus:outline-none focus:border-[#2CB1BC]/50 focus:ring-2 focus:ring-[#2CB1BC]/10 transition-all"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-primary py-3.5 text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                      ENVIANDO...
                    </>
                  ) : (
                    'QUERO MINHA AUDITORIA EM 48H'
                  )}
                </button>

                <p className="text-center text-[10px] text-[#486581]/50 font-medium">
                  Seus dados estão seguros. Sem spam.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function DarkOverlay() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const handler = (e) => setDark(!!e.detail.dark)
    window.addEventListener('eeg-color-change', handler)
    return () => window.removeEventListener('eeg-color-change', handler)
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(16,42,67,0.85), rgba(16,42,67,0.95))',
        opacity: dark ? 1 : 0,
        transition: 'opacity 1.75s ease-in-out',
        pointerEvents: 'none',
      }}
    />
  )
}

function EEGCanvas() {
  const canvasRef = useRef(null)
  const colorRef = useRef('#2CB1BC')

  useEffect(() => {
    const handleColorChange = (e) => {
      colorRef.current = e.detail.color || '#2CB1BC'
      if (canvasRef.current) {
        const isDark = !!e.detail.dark
        canvasRef.current.style.opacity = isDark ? '0.11' : '1'
        canvasRef.current.style.mixBlendMode = isDark ? 'screen' : 'normal'
      }
    }
    window.addEventListener('eeg-color-change', handleColorChange)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let sweepX = 0
    const SPEED = 1.6
    const CYCLE = 380
    const BG_COLOR = '#F7F9FC'

    const audio = new Audio(heartbeatSrc)
    audio.volume = 0.4
    let audioUnlocked = false

    const UNLOCK_EVENTS = ['click', 'touchstart', 'pointerdown', 'keydown']
    const onUnlock = () => {
      audio.play().then(() => { audio.pause(); audio.currentTime = 0; audioUnlocked = true }).catch(() => {})
      UNLOCK_EVENTS.forEach(e => document.removeEventListener(e, onUnlock))
    }
    UNLOCK_EVENTS.forEach(e => document.addEventListener(e, onUnlock, { once: true }))

    let lastBeat = -Infinity
    const COOLDOWN_MS = 25_000

    const playHeartbeat = () => {
      if (!audioUnlocked) return
      const now = Date.now()
      if (now - lastBeat < COOLDOWN_MS) return
      lastBeat = now
      audio.currentTime = 0
      audio.play().catch(() => {})
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.fillStyle = BG_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      sweepX = 0
    }
    resize()
    window.addEventListener('resize', resize)

    const ecgY = (x, baseline) => {
      const c = ((x % CYCLE) + CYCLE) % CYCLE
      if (c < 110) return baseline
      if (c < 122) return baseline - (c - 110) * 1.4
      if (c < 134) return baseline - 17 + (c - 122) * 1.4
      if (c < 155) return baseline
      if (c < 163) return baseline + (c - 155) * 3.5
      if (c < 169) return baseline + 28 - (c - 163) * 26
      if (c < 175) return baseline - 128 + (c - 169) * 23
      if (c < 185) return baseline + 10 - (c - 175) * 1.0
      if (c < 210) return baseline
      if (c < 230) return baseline - (c - 210) * 0.65
      if (c < 250) return baseline - 13 + (c - 230) * 0.65
      return baseline
    }

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const baseline = H * 0.5

      const isRedNow = colorRef.current !== '#2CB1BC'
      ctx.fillStyle = isRedNow ? 'rgba(247, 249, 252, 0.08)' : 'rgba(247, 249, 252, 0.04)'
      ctx.fillRect(0, 0, W, H)

      const prevSweepX = sweepX - SPEED
      const x    = sweepX    % W
      const prevX = prevSweepX % W
      const wrapped = x < prevX

      const R_PEAK = 169
      const prevC = ((prevSweepX % CYCLE) + CYCLE) % CYCLE
      const currC = ((sweepX    % CYCLE) + CYCLE) % CYCLE
      const crossedPeak = (prevC < R_PEAK && currC >= R_PEAK) || (prevC > currC  && currC >= R_PEAK)
      if (crossedPeak) playHeartbeat()

      const ERASE = 60
      ctx.fillStyle = BG_COLOR
      const eraseEnd = x + ERASE
      if (eraseEnd <= W) {
        ctx.fillRect(x, 0, ERASE, H)
      } else {
        ctx.fillRect(x, 0, W - x, H)
        ctx.fillRect(0, 0, eraseEnd - W, H)
      }

      if (!wrapped) {
        const y    = ecgY(sweepX, baseline)
        const py   = ecgY(prevSweepX, baseline)
        const isRed = colorRef.current !== '#2CB1BC'

        ctx.beginPath()
        ctx.moveTo(prevX, py)
        ctx.lineTo(x, y)
        ctx.strokeStyle = colorRef.current
        ctx.lineWidth = isRed ? 3.5 : 2.5
        ctx.shadowColor = isRed ? 'rgba(239, 68, 68, 1)' : 'rgba(44, 177, 188, 0.4)'
        ctx.shadowBlur = isRed ? 50 : 10
        ctx.stroke()
        if (isRed) {
          ctx.shadowBlur = 60
          ctx.shadowColor = 'rgba(239, 68, 68, 0.5)'
          ctx.stroke()
        }
        ctx.shadowBlur = 0
      }

      sweepX += SPEED
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('eeg-color-change', handleColorChange)
      UNLOCK_EVENTS.forEach(e => document.removeEventListener(e, onUnlock))
      audio.pause()
    }
  }, [])

  return <canvas ref={canvasRef} id="eeg-canvas" />
}

function FadeIn({ children, from = 'up' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(ref.current) }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const variants = {
    up: 'translate-y-8',
    blur: 'blur-xl scale-95',
    zoom: 'scale-90',
    left: '-translate-x-12',
    right: 'translate-x-12',
  }
  return (
    <div ref={ref} className={`transition-all duration-[1750ms] ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : `opacity-0 ${variants[from]}`}`}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const { setOpen: openModal } = useContext(ModalContext)
  const links = [['Mecanismo','#servicos'],['Resultados','#resultados'],['Planos','#planos'],['Dúvidas','#faq']]
  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto glass-card h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between" style={{ borderRadius: '100px', background: 'rgba(247, 249, 252, 0.8)', borderColor: 'rgba(44, 177, 188, 0.15)' }}>
        <a href="#" className="flex items-center">
          <img src={import.meta.env.BASE_URL + 'pulso-logo-horizontal.svg'} alt="Pulso" className="h-8 sm:h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] text-[#486581] hover:text-[#102A43] transition-colors font-semibold tracking-wide uppercase">{label}</a>
          ))}
          <a href="#/wiki" className="text-[13px] text-[#2CB1BC] hover:text-[#229DA7] transition-colors font-bold tracking-wide uppercase">Wiki</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => openModal(true)} className="btn-primary text-xs py-2 px-6">
            Falar agora
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#486581]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-2 glass-card p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block text-sm text-[#486581] hover:text-[#102A43] font-medium">{label}</a>
          ))}
          <a href="#/wiki" onClick={() => setOpen(false)} className="block text-sm text-[#2CB1BC] font-bold">Wiki de Serviços</a>
          <button onClick={() => { setOpen(false); openModal(true) }} className="block w-full text-center btn-primary text-sm">Falar agora</button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { setOpen } = useContext(ModalContext)
  return (
    <section className="min-h-screen flex items-center pt-20 sm:pt-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#2CB1BC]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#2CB1BC]/3 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-12 items-center py-12 sm:py-20 relative z-10">
        <div className="text-left">
          <div className="mb-5 sm:mb-8 flex">
            <span className="section-label flex items-center gap-2 text-[9px] sm:text-[11px]">
              <span className="glow-point" />
              ENGENHARIA DE CAPTAÇÃO MÉDICA
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#102A43] leading-[0.95] tracking-tighter mb-5 sm:mb-8">
            O consultório ao lado agradece o seu <span className="text-[#2CB1BC]">silêncio digital.</span>
          </h1>
          <p className="text-[#486581] text-base sm:text-xl max-w-xl mb-8 sm:mb-12 leading-relaxed font-medium">
            A indicação física hoje termina na pesquisa na internet. E você é invisível, o paciente escolhe o concorrente anunciado. Criamos seu sistema previsível de agendamento em 48 horas. Antes de qualquer contrato.
          </p>
          <div className="flex flex-wrap gap-5 mb-6 sm:mb-8">
            <button onClick={() => setOpen(true)}
               className="btn-primary flex items-center gap-3 px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base">
              QUERO MINHA AUDITORIA EM 48H
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[#486581] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5 sm:gap-2"><Icon name="check" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2CB1BC]"/> Adequado ao CFM</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><Icon name="check" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2CB1BC]"/> Setup Zero</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><Icon name="check" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2CB1BC]"/> Exclusividade Regional</span>
          </div>
        </div>

        <div className="hidden lg:block relative w-[420px]">
          <div className="absolute inset-0 bg-[#2CB1BC]/10 blur-[80px] rounded-full" />
          <div className="glass-card p-8 relative z-10 border-[#2CB1BC]/25 bg-[#F7F9FC]/80">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2CB1BC]/10 flex items-center justify-center border border-[#2CB1BC]/20">
                  <Icon name="pulse" className="w-6 h-6 text-[#2CB1BC]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43] uppercase tracking-tighter">SISTEMA PULSO</div>
                  <div className="text-[10px] text-[#486581]">Live Insights — Ativo</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#2CB1BC]/10 px-3 py-1 rounded-full border border-[#2CB1BC]/15">
                <span className="w-2 h-2 rounded-full bg-[#2CB1BC] animate-pulse" />
                <span className="text-[10px] text-[#2CB1BC] font-black uppercase">Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Pacientes/Mês', value: '+42', color: '#2CB1BC' },
                { label: 'Taxa Conversão', value: '12.4%', color: '#229DA7' },
                { label: 'Custo por Lead', value: 'R$ 24', color: '#2CB1BC' },
                { label: 'ROI Estimado', value: '6.8x', color: '#229DA7' },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#486581] uppercase tracking-wide">{m.label}</span>
                  <span className="text-3xl font-black text-[#102A43] leading-none" style={{ color: m.color }}>{m.value}</span>
                  <div className="w-full h-1 bg-[#102A43]/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-current rounded-full" style={{ width: '75%', color: m.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#F7F9FC] rounded-2xl border border-[#2CB1BC]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-[#486581] uppercase">Fluxo de Agendamentos</span>
                <span className="text-[10px] text-[#2CB1BC] font-bold">+18% vs. semana ant.</span>
              </div>
              <div className="h-24 flex items-end gap-1.5">
                {[45, 65, 50, 95, 70, 85, 55, 75, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#2CB1BC]/20 rounded-t-md transition-all hover:bg-[#2CB1BC]" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

function PainPoints() {
  const ref = useRef(null)
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting
      setIsDark(isVisible)
      const color = isVisible ? '#EF4444' : '#2CB1BC'
      window.dispatchEvent(new CustomEvent('eeg-color-change', { detail: { color, dark: isVisible } }))
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const points = [
    { title: 'Agenda Vulnerável', desc: 'Você tem anos de especialidade, mas sua receita ainda é refém do acaso.' },
    { title: 'O Ralo do Marketing de Tiktok', desc: 'Agências tradicionais vendem "posts bonitos". Nós geramos leads qualificados.' },
    { title: 'A Indicação Interrompida', desc: '87,8% dos pacientes buscam avaliações online antes de agendar, mesmo com indicação direta. Se a sua vitrine falha, o lead esfria.' },
    { title: 'Injustiça de Mercado', desc: 'Médicos com metade da sua experiência dominam a internet e lotam a agenda.' },
  ]
  return (
    <section ref={ref} className="py-14 sm:py-20 px-4 sm:px-8 relative z-10 transition-all duration-[1750ms]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 sm:mb-12 text-center">
          <span className={`section-label mb-4 transition-all duration-[1750ms] ${isDark ? '!bg-red-500/10 !border-red-500/20 !text-red-400' : ''}`}>O Diagnóstico da Dor</span>
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 transition-colors duration-[1750ms] ${isDark ? 'text-white drop-shadow-lg' : 'text-[#102A43]'}`}>
            O prejuízo silencioso de ser invisível<br className="hidden sm:block" /> no digital.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {points.map((p, i) => (
            <div key={i} className={`p-5 sm:p-8 flex flex-col gap-3 sm:gap-4 rounded-3xl border transition-all duration-[1750ms] ${isDark ? 'border-red-500/10 hover:border-red-500/30 bg-white/5 backdrop-blur-md' : 'glass-card border-red-500/5 hover:border-red-500/20'}`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-[1750ms] ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-500/5 border-red-500/10'}`}>
                  <span className={`text-base sm:text-lg font-black transition-colors duration-[1750ms] ${isDark ? 'text-red-400' : 'text-red-500'}`}>!</span>
                </div>
                <h3 className={`font-bold text-base sm:text-xl transition-colors duration-[1750ms] ${isDark ? 'text-white' : 'text-[#102A43]'}`}>{p.title}</h3>
              </div>
              <p className={`text-sm sm:text-base leading-relaxed pl-12 sm:pl-14 transition-colors duration-[1750ms] ${isDark ? 'text-white/60' : 'text-[#486581]'}`}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: 'search', name: 'Raio-X', desc: 'Raio-X profundo do seu posicionamento local e gaps digitais.' },
    { icon: 'megaphone', name: 'Anúncios Cirúrgicos', desc: 'Google e Meta (Instagram e Facebook) direcionados exclusivamente para a sua subespecialidade.' },
    { icon: 'globe', name: 'Vitrine de Elite', desc: 'Páginas limpas, institucionais e 100% adequadas ao CFM. Postagens que aumentam sua autoridade. Zero dancinhas.' },
    { icon: 'phone', name: 'Auditoria Comercial', desc: 'O volume de contatos chega. Nós treinamos sua recepção para destravar o agendamento no WhatsApp.' },
  ]

  return (
    <section id="servicos" className="py-14 sm:py-20 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="section-label mb-4 sm:mb-6">O Mecanismo Único</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-4 sm:mb-6">
            Engenharia de<br />Precisão Comercial.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((s, i) => (
            <div key={i} className="glass-card p-5 sm:p-8 group flex items-start gap-4 sm:gap-6">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#2CB1BC]/10 border border-[#2CB1BC]/20 flex items-center justify-center shrink-0 group-hover:bg-[#2CB1BC] group-hover:text-white transition-all duration-300">
                <Icon name={s.icon} className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#102A43] text-lg sm:text-2xl mb-1 sm:mb-2">{s.name}</h3>
                <p className="text-[#486581] text-sm sm:text-base leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section id="resultados" className="py-14 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-14 text-center">
          <span className="section-label mb-4 sm:mb-6">A Prova Fria</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-4 sm:mb-6">Impacto Auditado.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {[
            { value: '+300%', label: 'Fluxo de oportunidades', desc: 'qualificadas chegando no WhatsApp' },
            { value: '-45%', label: 'Redução no Custo', desc: 'por Lead (CPL)' },
            { value: 'Elite', label: 'Posicionamento Premium', desc: 'de autoridade local' },
            { value: '5.2x', label: 'Retorno Médio', desc: 'sobre o Investimento (ROI)' },
          ].map((m, i) => (
            <div key={i} className="glass-card p-4 sm:p-8 text-center border-[#102A43]/5 bg-[#F7F9FC]/60">
              <div className="text-3xl sm:text-5xl font-bold text-[#102A43] mb-2 sm:mb-4 tracking-tighter" style={{ filter: 'drop-shadow(0 4px 6px rgba(44, 177, 188, 0.2))' }}>{m.value}</div>
              <div className="text-[#102A43] font-bold text-xs sm:text-base mb-1 sm:mb-2 uppercase tracking-tight">{m.label}</div>
              <div className="text-[#486581] text-[8px] sm:text-[10px] uppercase font-bold tracking-widest">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RiskReversal() {
  const { setOpen } = useContext(ModalContext)
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto glass-card p-6 sm:p-12 lg:p-20 bg-[#F7F9FC] border-[#2CB1BC]/30">
        <span className="section-label mb-5 sm:mb-8">Inversão Total de Risco</span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-6 sm:mb-10 leading-tight">
          Você não paga para imaginar.<br />
          <span className="text-[#2CB1BC]">Você vê pronto.</span>
        </h2>
        <div className="space-y-4 sm:space-y-6 text-[#486581] text-base sm:text-xl font-medium mb-8 sm:mb-12">
          <p>Entregamos sua estrutura pronta em <strong className="text-[#102A43]">48 horas ANTES do contrato:</strong></p>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-lg">
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> Sua nova Vitrine de Elite estruturada.</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> Landing Page de alta conversão.</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> Linha editorial de posts/reels chave.</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> Diretriz de marca, e posicionamento.</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> O desenho tático dos seus Anúncios Cirúrgicos.</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><Icon name="check" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] shrink-0 mt-0.5" /> A auditoria de presença digital do seu território.</li>
          </ul>
          <p className="pt-4 border-t border-[#102A43]/10 text-sm sm:text-base">Se você aprovar o sistema, nós avançamos. Se não, você não deve um único centavo. Risco zero para o seu consultório.</p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary inline-flex px-8 py-4 text-sm sm:px-12 sm:py-5 sm:text-xl font-bold">
          QUERO MINHA ESTRUTURA EM 48H
        </button>
      </div>
    </section>
  )
}

function Plans() {
  const { setOpen } = useContext(ModalContext)
  const bundles = [
    { name: 'Essencial', sub: 'Destrave sua agenda', desc: 'O sistema cirúrgico para quem precisa sair da invisibilidade e destravar a agenda.', price: 'R$ 2.500/mês', cta: 'VERIFICAR DISPONIBILIDADE REGIONAL', features: ['M1 — Diagnóstico Estratégico: Raio-X profundo dos gargalos da sua clínica e mapeamento da concorrência local.','M2 — Diretriz de Marca & Posicionamento: Ajuste fino da sua identidade visual para atrair o público de alto ticket.','O7 — Vitrine Digital Activa: Configuração técnica do seu Google Meu Negócio (GMB) + Alinhamento do Instagram para autoridade (Zero dancinhas).','M4 — Landing Page de Elite: Página institucional ultraveloz, focada em conversão e 100% adequada às normas do CFM.','M6 — Anúncios Cirúrgicos (Meta + Google Ads): Campanhas configuradas especificamente para capturar o paciente no momento exato da busca pela sua subespecialidade.'] },
    { name: 'Growth', sub: 'Escala rápida', desc: 'A estrutura completa para clínicas que buscam escala rápida e volumosa de pacientes.', price: 'R$ 3.500 – R$ 4.500/mês', popular: true, cta: 'ATIVAR ESCALA DA CLÍNICA', features: ['Tudo do Plano Essencial +','M5 — Linha Editorial Recorrente (16 posts/mês): Produção e agendamento de criativos de performance para manter sua vitrine ativa.','M3 — Site Premium Expandido (8 Seções): Arquitetura web completa para clínicas com múltiplos profissionais ou subespecialidades estruturadas.','Auditoria Comercial da Recepção: Análise ativa dos scripts do seu WhatsApp para garantir que o lead que chega vire consulta paga.'] },
    { name: 'Authority', sub: 'Monopólio regional absoluto', desc: 'Para o especialista que exige dominar o topo do mercado.', price: 'R$ 5.500/mês', cta: 'DOMINAR MEU TERRITÓRIO', features: ['Tudo do Plano Growth +','M7 — SEO Avançado + GMB Contínuo: Trabalho de posicionamento orgânico para fazer seu nome liderar as buscas sem depender apenas de anúncios pagos.','M8 — Automação & Bot IA 24/7: Atendimento inteligente no WhatsApp para qualificar, responder e direcionar o paciente premium na mesma hora, mesmo de madrugada.','Produção Audiovisual Dedicada: Captação de imagens e vídeos de alta classe no seu próprio consultório para anúncios.'] },
  ]
  return (
    <section id="planos" className="py-14 sm:py-20 px-4 sm:px-8 relative bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="section-label mb-4 sm:mb-6">Planos de Engenharia</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-4 sm:mb-6">Ativos de Performance.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
          {bundles.map((p, i) => (
            <div key={i} className={`glass-card p-5 sm:p-8 flex flex-col relative transition-all duration-500 ${p.popular ? 'border-[#2CB1BC] border-2 sm:scale-[1.02] z-10 bg-[#F7F9FC]' : 'bg-[#F7F9FC]/40'}`}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2CB1BC] text-white text-[9px] sm:text-[10px] font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-xl shadow-[#2CB1BC]/20 tracking-widest">
                  MAIS ESCOLHIDO
                </div>
              )}
              <div className="mb-5 sm:mb-8">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#2CB1BC] uppercase tracking-[0.2em] mb-2 block">{p.sub}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#102A43] mb-2 sm:mb-3">{p.name}</h3>
                <div className="text-base sm:text-xl font-bold text-[#102A43] mb-3 sm:mb-4 bg-[#F7F9FC] inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-[#102A43]/5">{p.price}</div>
                <p className="text-[#486581] text-xs sm:text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-[#102A43]">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2CB1BC]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="check" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2CB1BC]" />
                    </div>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setOpen(true)}
                 className={`block w-full text-center font-bold py-3 sm:py-4 rounded-xl transition-all text-[10px] sm:text-xs tracking-widest uppercase ${p.popular ? 'btn-primary' : 'border-2 border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-white'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const faqs = [
    { q: 'Quanto tempo para os resultados?', a: 'Sistema completo rodando em 15 dias, campanhas ativas e coletando leads nos primeiros 30 dias.' },
    { q: 'Como controlo o retorno?', a: 'Te entregamos tudo que você precisa saber para decidir. Relatórios Executivos e Dashboard analítico em tempo real integrado ao seu WhatsApp comercial.' },
    { q: 'Existem multas de contrato?', a: 'Não. Nós entregamos o produto antes do contrato para garantir que você só assina pelo resultado.' },
  ]
  return (
    <section id="faq" className="py-14 sm:py-20 px-4 sm:px-8 relative bg-[#F7F9FC]">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-14">
          <span className="section-label mb-4 sm:mb-6">Perguntas Frequentes</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-4 sm:mb-6">FAQ Rápido.</h2>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden bg-[#F7F9FC]/50 border-[#102A43]/5">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-5 sm:px-10 sm:py-8 text-left hover:bg-[#F7F9FC] transition-colors duration-300 gap-4">
                <span className="font-bold text-[#102A43] text-base sm:text-xl tracking-tight">{faq.q}</span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#102A43]/10 flex items-center justify-center shrink-0 transition-all duration-500 ${openIdx === i ? 'bg-[#102A43] border-[#102A43]' : ''}`}>
                  <Icon name="arrowRight" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 ${openIdx === i ? 'text-white rotate-90' : 'text-[#102A43]'}`} />
                </div>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 sm:px-10 sm:pb-10 text-[#486581] text-sm sm:text-lg font-medium leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Deliverables48h() {
  const deliverables = [
    { icon: 'search', title: 'Diagnóstico Digital 360°', desc: 'Raio-X completo da sua presença digital, concorrência local e gaps de posicionamento no seu território.' },
    { icon: 'sparkles', title: 'Diretriz de Marca & Posicionamento', desc: 'Identidade visual ajustada para atrair pacientes de alto ticket com autoridade institucional.' },
    { icon: 'globe', title: 'Landing Page de Alta Conversão', desc: 'Página institucional ultraveloz, focada em agendamento e 100% adequada às normas do CFM.' },
    { icon: 'instagram', title: 'Vitrine Digital no Instagram', desc: 'Configuração estratégica do perfil, bio, destaques e grade visual para transmitir autoridade. Zero dancinhas.' },
    { icon: 'target', title: 'Anúncios Cirúrgicos Configurados', desc: 'Campanhas de Google e Meta prontas para capturar o paciente no momento exato da busca pela sua subespecialidade.' },
    { icon: 'clipboard', title: 'Linha Editorial de Conteúdo', desc: 'Calendário de posts e reels estratégicos para manter sua vitrine ativa e atrair leads qualificados.' },
    { icon: 'map', title: 'Auditoria Territorial', desc: 'Mapeamento da presença digital dos concorrentes na sua região e identificação de oportunidades inexploradas.' },
    { icon: 'chart', title: 'Google Meu Negócio Otimizado', desc: 'Configuração técnica completa do GMB para dominar as buscas locais e aparecer no mapa.' },
  ]

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-14">
          <span className="section-label mb-4 sm:mb-6">Entrega Relâmpago</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] mb-4 sm:mb-6">
            O que você recebe em <span className="text-[#2CB1BC]">48 horas.</span>
          </h2>
          <p className="text-[#486581] text-sm sm:text-lg font-medium max-w-2xl mx-auto">
            Tudo isso pronto e funcionando antes de qualquer contrato. Se não aprovar, não deve nada.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {deliverables.map((d, i) => (
            <div key={i} className="glass-card p-4 sm:p-6 group hover:border-[#2CB1BC]/30 bg-[#F7F9FC]/60">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#2CB1BC]/10 border border-[#2CB1BC]/15 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#2CB1BC] group-hover:border-[#2CB1BC] transition-all duration-300">
                <Icon name={d.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-[#2CB1BC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-[#102A43] text-sm sm:text-base mb-1 sm:mb-2">{d.title}</h3>
              <p className="text-[#486581] text-xs sm:text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LossCalculator() {
  const [slots, setSlots] = useState(5)
  const [value, setValue] = useState(800)
  const loss = slots * value * 4

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 relative">
      <div className="max-w-md mx-auto relative z-10">
        <div className="glass-card overflow-hidden shadow-xl shadow-[#102A43]/10 border-[#102A43]/8 bg-[#F7F9FC]/95 hover:transform-none">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
            <span className="text-[10px] sm:text-[11px] text-[#486581] font-bold uppercase tracking-widest">Simulador de Prejuízo</span>
            <div className="flex items-center gap-2 bg-[#2CB1BC]/10 px-3 py-1 rounded-full border border-[#2CB1BC]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2CB1BC] animate-pulse" />
              <span className="text-[10px] text-[#2CB1BC] font-bold uppercase">Live</span>
            </div>
          </div>

          {/* Calculator Display */}
          <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6">
            <div className="text-right mb-1">
              <div className="text-[#486581] text-xs sm:text-sm font-medium tracking-wide mb-2 sm:mb-3 text-left">Prejuízo mensal estimado</div>
              <div className="text-[#EF4444] text-4xl sm:text-6xl font-bold tracking-tight leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
                R$ {loss.toLocaleString('pt-BR')}
              </div>
              <div className="text-[#486581]/50 text-[10px] sm:text-xs mt-1.5 sm:mt-2 text-right font-medium">/mês perdido em silêncio digital</div>
            </div>
          </div>

          {/* Expression */}
          <div className="px-4 sm:px-6 pb-3 sm:pb-4">
            <div className="flex items-center justify-between text-[#486581] text-[10px] sm:text-xs font-medium bg-[#102A43]/[0.03] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-[#102A43]/5">
              <span>{slots} hor.</span>
              <span className="text-[#102A43]/20">&times;</span>
              <span>R$ {value}</span>
              <span className="text-[#102A43]/20">&times;</span>
              <span>4 sem.</span>
              <span className="text-[#102A43]/20">=</span>
              <span className="text-[#EF4444] font-bold">R$ {loss.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-5">
            <div>
              <div className="flex justify-between text-[#486581] text-[10px] sm:text-xs mb-2">
                <span>Horários ociosos / semana</span>
                <span className="text-[#102A43] font-bold">{slots}</span>
              </div>
              <input
                type="range" min="1" max="20" value={slots}
                onChange={(e) => setSlots(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer calc-slider"
              />
            </div>
            <div>
              <div className="flex justify-between text-[#486581] text-[10px] sm:text-xs mb-2">
                <span>Valor médio do procedimento</span>
                <span className="text-[#102A43] font-bold">R$ {value}</span>
              </div>
              <input
                type="range" min="200" max="5000" step="100" value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer calc-slider"
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-5">
            <div className="h-[1px] bg-[#102A43]/5 mb-3 sm:mb-4" />
            <p className="text-center text-[#486581]/60 text-[10px] sm:text-[11px] font-medium">
              Cada mês sem sistema = dinheiro no bolso do concorrente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const { setOpen } = useContext(ModalContext)
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 relative">
      <div className="max-w-6xl mx-auto glass-card p-6 sm:p-12 lg:p-16 text-center relative overflow-hidden border-none shadow-3xl" style={{ background: 'linear-gradient(135deg, #0d1f33 0%, #102A43 40%, #153550 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(44,177,188,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(51,207,211,0.08) 0%, transparent 50%)' }} />
        <span className="section-label mb-5 sm:mb-8 bg-[#2CB1BC]/15 text-[#33cfd3] border-[#2CB1BC]/20 relative z-10">Última Etapa</span>
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.0] tracking-tighter mb-5 sm:mb-8 relative z-10">
          Sua reputação está trabalhando<br className="hidden sm:block" /> menos do que deveria.
        </h2>
        <p className="text-sm sm:text-xl text-white/50 font-medium mb-8 sm:mb-12 relative z-10 max-w-3xl mx-auto">
          Horários ociosos &times; Valor do procedimento = <span className="text-[#33cfd3] font-bold">Prejuízo mensal.</span><br/>Não dê essa vantagem para o concorrente ao lado.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <button onClick={() => setOpen(true)}
             className="bg-[#33cfd3] text-[#0d1f33] hover:bg-white px-8 py-4 text-sm sm:px-14 sm:py-6 sm:text-xl font-bold rounded-2xl flex items-center justify-center gap-3 sm:gap-4 transition-all duration-500 shadow-lg shadow-[#33cfd3]/25">
            <Icon name="phone" className="w-5 h-5 sm:w-7 sm:h-7" />
            ATIVAR SISTEMA PULSO
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 sm:py-16 px-4 sm:px-8 border-t border-[#102A43]/5 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12">
        <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6">
          <img src={import.meta.env.BASE_URL + 'pulso-logo.svg'} alt="Pulso" className="h-6 sm:h-7 w-auto" />
          <p className="text-[#486581] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Engenharia de Captação Médica © {new Date().getFullYear()}</p>
        </div>
        <div className="flex gap-6 sm:gap-12">
          {['Serviços', 'Resultados', 'Planos', 'Wiki'].map((l) => (
            <a key={l} href={l === 'Wiki' ? '#/wiki' : `#${l.toLowerCase()}`} className="text-[10px] sm:text-xs font-black text-[#486581] hover:text-[#2CB1BC] uppercase tracking-widest transition-colors duration-300">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

function App() {
  const isWikiHash = (hash) => hash.startsWith('#/wiki')
  const [page, setPage] = useState(isWikiHash(window.location.hash) ? 'wiki' : 'home')
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    const onHash = () => setPage(isWikiHash(window.location.hash) ? 'wiki' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  if (page === 'wiki') return <Wiki />
  return (
    <ModalContext.Provider value={{ open: modalOpen, setOpen: setModalOpen }}>
      <div className="bg-[#F7F9FC] min-h-screen relative">
        <EEGCanvas />
        <DarkOverlay />
        <div className="relative z-10">
          <Navbar />
          <FadeIn from="blur"><Hero /></FadeIn>
          <FadeIn from="up"><PainPoints /></FadeIn>
          <FadeIn from="blur"><Services /></FadeIn>
          <FadeIn from="right"><Results /></FadeIn>
          <FadeIn from="zoom"><RiskReversal /></FadeIn>
          <FadeIn from="up"><Deliverables48h /></FadeIn>
          <FadeIn from="up"><Plans /></FadeIn>
          <FadeIn from="up"><FAQ /></FadeIn>
          <FadeIn from="up"><LossCalculator /></FadeIn>
          <FadeIn from="zoom"><CTA /></FadeIn>
          <Footer />
        </div>
        <LeadModal />
      </div>
    </ModalContext.Provider>
  )
}

export default App

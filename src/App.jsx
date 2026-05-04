import { useState, useEffect, useRef } from 'react'
import './index.css'
import Wiki from './Wiki.jsx'
import heartbeatSrc from '/heartbeat.mp3?url'

const WHATSAPP_LINK = 'https://wa.me/5561999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Pulso'

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

function EEGCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let sweepX = 0
    const SPEED = 1.6
    const CYCLE = 380

    // ── Audio: heartbeat MP3, played on each wave reset ──────────────────────
    const audio = new Audio(heartbeatSrc)
    audio.volume = 0.6
    let audioUnlocked = false

    const UNLOCK_EVENTS = ['click', 'touchstart', 'pointerdown', 'keydown']
    const onUnlock = () => {
      // Play + immediately pause to unlock autoplay policy
      audio.play().then(() => { audio.pause(); audio.currentTime = 0; audioUnlocked = true }).catch(() => {})
      UNLOCK_EVENTS.forEach(e => document.removeEventListener(e, onUnlock))
    }
    UNLOCK_EVENTS.forEach(e => document.addEventListener(e, onUnlock, { once: true }))

    let lastBeat = -Infinity
    const COOLDOWN_MS = 30_000

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
      ctx.fillStyle = '#0D1B2A'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      sweepX = 0
    }
    resize()
    window.addEventListener('resize', resize)

    // ECG waveform — clean clinical shape
    const ecgY = (x, baseline) => {
      const c = ((x % CYCLE) + CYCLE) % CYCLE
      if (c < 110) return baseline
      if (c < 122) return baseline - (c - 110) * 1.4         // P wave up
      if (c < 134) return baseline - 17 + (c - 122) * 1.4    // P wave down
      if (c < 155) return baseline
      if (c < 163) return baseline + (c - 155) * 3.5         // Q dip
      if (c < 169) return baseline + 28 - (c - 163) * 26     // R spike up
      if (c < 175) return baseline - 128 + (c - 169) * 23    // R spike down
      if (c < 185) return baseline + 10 - (c - 175) * 1.0    // S recovery
      if (c < 210) return baseline
      if (c < 230) return baseline - (c - 210) * 0.65        // T wave up
      if (c < 250) return baseline - 13 + (c - 230) * 0.65   // T wave down
      return baseline
    }

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const baseline = H * 0.5

      // Phosphor decay — each frame paint a thin layer of background over old line
      ctx.fillStyle = 'rgba(13, 27, 42, 0.018)'
      ctx.fillRect(0, 0, W, H)

      const prevSweepX = sweepX - SPEED
      const x    = sweepX    % W
      const prevX = prevSweepX % W
      const wrapped = x < prevX

      // Fire sound when sweep crosses the R-spike peak (cycle position 169)
      const R_PEAK = 169
      const prevC = ((prevSweepX % CYCLE) + CYCLE) % CYCLE
      const currC = ((sweepX    % CYCLE) + CYCLE) % CYCLE
      const crossedPeak = (prevC < R_PEAK && currC >= R_PEAK) ||
                          (prevC > currC  && currC >= R_PEAK)   // cycle wrap edge case
      if (crossedPeak) playHeartbeat()

      // Erase band ahead of sweep head (blank region, like a real scope)
      const ERASE = 44
      ctx.fillStyle = '#0D1B2A'
      const eraseEnd = x + ERASE
      if (eraseEnd <= W) {
        ctx.fillRect(x, 0, ERASE, H)
      } else {
        ctx.fillRect(x, 0, W - x, H)
        ctx.fillRect(0, 0, eraseEnd - W, H)
      }

      // Draw new ECG segment (skip on wrap to avoid diagonal artifacts)
      if (!wrapped) {
        const y    = ecgY(sweepX, baseline)
        const py   = ecgY(prevSweepX, baseline)

        ctx.beginPath()
        ctx.moveTo(prevX, py)
        ctx.lineTo(x, y)
        ctx.strokeStyle = '#00BFA5'
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 14
        ctx.shadowColor = '#00BFA5'
        ctx.stroke()
        ctx.shadowBlur = 0

      }

      sweepX += SPEED
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      UNLOCK_EVENTS.forEach(e => document.removeEventListener(e, onUnlock))
      audio.pause()
    }
  }, [])

  return <canvas ref={canvasRef} id="eeg-canvas" />
}

// Variants: 'up' | 'blur' | 'flip' | 'zoom' | 'left' | 'right'
const VARIANTS = {
  up: {
    hidden: { opacity: 0, transform: 'translateY(52px)' },
    shown:  { opacity: 1, transform: 'translateY(0px)' },
    ease: 'cubic-bezier(.22,.68,0,1.05)', dur: '0.8s',
  },
  blur: {
    hidden: { opacity: 0, transform: 'scale(0.96)', filter: 'blur(14px)' },
    shown:  { opacity: 1, transform: 'scale(1)',    filter: 'blur(0px)' },
    ease: 'cubic-bezier(.4,0,.2,1)', dur: '0.9s',
  },
  flip: {
    hidden: { opacity: 0, transform: 'perspective(900px) rotateX(18deg) translateY(28px)' },
    shown:  { opacity: 1, transform: 'perspective(900px) rotateX(0deg)  translateY(0px)' },
    ease: 'cubic-bezier(.22,.68,0,1.05)', dur: '0.85s',
  },
  zoom: {
    hidden: { opacity: 0, transform: 'scale(0.86)' },
    shown:  { opacity: 1, transform: 'scale(1)' },
    ease: 'cubic-bezier(.34,1.4,.64,1)', dur: '0.75s',
  },
  left: {
    hidden: { opacity: 0, transform: 'translateX(-52px)' },
    shown:  { opacity: 1, transform: 'translateX(0px)' },
    ease: 'cubic-bezier(.22,.68,0,1.05)', dur: '0.75s',
  },
  right: {
    hidden: { opacity: 0, transform: 'translateX(52px)' },
    shown:  { opacity: 1, transform: 'translateX(0px)' },
    ease: 'cubic-bezier(.22,.68,0,1.05)', dur: '0.75s',
  },
}

function FadeIn({ children, from = 'up', delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const v = VARIANTS[from] ?? VARIANTS.up
  const needsFilter = from === 'blur'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        scrollSnapAlign: 'start',
        ...(visible ? v.shown : v.hidden),
        transition: [
          `opacity ${v.dur} ${v.ease} ${delay}ms`,
          `transform ${v.dur} ${v.ease} ${delay}ms`,
          needsFilter ? `filter ${v.dur} ${v.ease} ${delay}ms` : '',
        ].filter(Boolean).join(', '),
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}


// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Serviços','#servicos'],['Como Funciona','#como-funciona'],['Planos','#planos'],['Resultados','#resultados'],['Dúvidas','#faq']]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/80 backdrop-blur-md border-b border-[#00BFA5]/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src={import.meta.env.BASE_URL + 'pulso-logo.svg'} alt="Pulso" className="h-7" />
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-[#8096A7] hover:text-[#F0E9DC] transition-colors font-medium">{label}</a>
          ))}
          <a href="#/wiki" className="text-sm text-[#00BFA5] hover:text-[#33D4B5] transition-colors font-medium">Wiki</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#como-funciona" className="text-sm text-[#8096A7] hover:text-[#F0E9DC] transition-colors font-medium px-4 py-2">Saiba mais</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-[#0D1B2A] text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            Falar agora
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#8096A7]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0D1B2A]/98 backdrop-blur-md border-t border-[#00BFA5]/10 px-6 py-5 space-y-4">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block text-sm text-[#8096A7] hover:text-[#F0E9DC]">{label}</a>
          ))}
          <a href="#/wiki" onClick={() => setOpen(false)} className="block text-sm text-[#00BFA5]">Wiki de Serviços</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
             className="block text-center bg-white text-[#0D1B2A] text-sm font-semibold py-2.5 rounded-full">Falar agora</a>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_400px] gap-16 items-center py-20">

        {/* ── Left ── */}
        <div>
          <div className="inline-flex items-center gap-2.5 border border-[#00BFA5]/20 bg-[#00BFA5]/5 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5]" style={{ boxShadow: '0 0 8px #00BFA5' }} />
            <span className="section-label">Diagnóstico gratuito disponível</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-[#F0E9DC] leading-[1.02] tracking-tight mb-6">
            Sua clínica<br />
            merece uma<br />
            <span style={{ color: '#00BFA5', textShadow: '0 0 60px rgba(0,191,165,0.25)' }}>agenda cheia.</span>
          </h1>
          <p className="text-[#8096A7] text-lg max-w-lg mb-10 leading-relaxed">
            Transformamos o marketing da sua clínica em um sistema previsível de captação de pacientes — estratégia, dados e resultados mensuráveis.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
               className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105">
              <Icon name="phone" className="w-4 h-4" />
              Falar com especialista
            </a>
            <a href="#como-funciona"
               className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#8096A7] border border-white/10 hover:border-[#00BFA5]/30 hover:text-[#F0E9DC] transition-all">
              Ver como funciona
              <Icon name="arrowRight" className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[#8096A7]">
            {[['shield','Conforme CFM/CRM'],['chart','Resultados em 90 dias'],['users','Especialistas em saúde']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2">
                <Icon name={icon} className="w-4 h-4 text-[#00BFA5]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Dashboard card ── */}
        <div className="hidden lg:flex flex-col glass-card p-5 gap-4" style={{ borderColor: 'rgba(0,191,165,0.18)' }}>
          <div className="flex items-center justify-between">
            <span className="section-label">PAINEL PULSO</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5]" style={{ boxShadow: '0 0 6px #00BFA5', animation: 'pulse 2s infinite' }} />
              <span className="text-[11px] text-[#00BFA5] font-medium">Ao vivo</span>
            </div>
          </div>
          {/* Mini ECG */}
          <div className="h-14 bg-[#0D1B2A]/60 rounded-xl border border-[#00BFA5]/10 flex items-center px-3 overflow-hidden">
            <svg viewBox="0 0 400 40" className="w-full h-9" fill="none">
              <polyline
                points="0,20 30,20 38,20 42,14 46,26 50,20 80,20 88,20 92,14 96,26 100,20 130,20 134,17 137,20 141,4 145,34 149,20 153,17 158,20 185,20 189,17 192,20 196,4 200,34 204,20 208,17 213,20 240,20 244,17 247,20 251,4 255,34 259,20 263,17 268,20 295,20 299,17 302,20 306,4 310,34 314,20 318,17 323,20 360,20 380,20 400,20"
                stroke="#00BFA5" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px rgba(0,191,165,0.7))' }}
              />
            </svg>
          </div>
          {/* 2×2 metrics */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Novos pacientes', value: '+34', trend: '↑ 12% vs mês ant.' },
              { label: 'Taxa de conv.', value: '8,2%', trend: '↑ 3,1% vs mês ant.' },
              { label: 'Custo por lead', value: 'R$ 28', trend: '↓ 5% vs mês ant.' },
              { label: 'Agendamentos', value: '127', trend: '↑ 18% vs mês ant.' },
            ].map((m, i) => (
              <div key={i} className="bg-[#00BFA5]/5 border border-[#00BFA5]/10 rounded-xl p-3.5">
                <div className="text-[11px] text-[#8096A7] mb-1.5 font-medium">{m.label}</div>
                <div className="text-[#F0E9DC] font-bold text-2xl leading-none mb-1">{m.value}</div>
                <div className="text-[11px] text-[#00BFA5]">{m.trend}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#00BFA5]/10">
            <span className="text-[11px] text-[#8096A7]">Clínica Derma São Paulo</span>
            <span className="text-[11px] text-[#00BFA5] font-medium">Maio 2025</span>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
function PainPoints() {
  const points = [
    { title: 'Agenda com horários vagos', desc: 'Você tem capacidade para atender mais, mas os pacientes não chegam. Raramente é a qualidade do serviço — é visibilidade.', subs: ['Subutilização de até 40% da capacidade', 'Receita imprevisível sem fluxo constante'] },
    { title: 'Dependência de indicações', desc: 'Quando as indicações param, a receita cai. Impossível escalar ou planejar crescimento dependendo de algo fora do seu controle.', subs: ['Sem indicação, sem paciente novo', 'Impossível planejar expansão'] },
    { title: 'Marketing sem retorno mensurável', desc: 'Já investiu em agência, posts, impulsionamento. O resultado? Likes, mas não pacientes. Falta estratégia orientada a conversão.', subs: ['Investimento sem ROI claro', 'Conteúdo que não gera agendamentos'] },
    { title: 'Invisível no Google', desc: 'Pacientes pesquisam "clínica perto de mim" e seus concorrentes aparecem. Você investe em estrutura mas não em encontrabilidade.', subs: ['Fora do top 10 do Google Maps', 'Zero tráfego orgânico local'] },
  ]
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="section-label mb-4">Você se identifica?</div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] leading-tight max-w-xl">
              A maioria das clínicas<br />enfrenta os mesmos problemas.
            </h2>
            <p className="text-[#8096A7] max-w-xs leading-relaxed text-sm">
              A diferença é que agora existe uma solução especializada para o mercado médico.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {points.map((p, i) => (
            <div key={i} className="glass-card p-7 flex flex-col gap-4 hover:border-[#00BFA5]/25 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-400 text-sm font-bold">!</span>
                </div>
                <h3 className="font-semibold text-[#F0E9DC] text-xl leading-snug">{p.title}</h3>
              </div>
              <p className="text-[#8096A7] text-sm leading-relaxed">{p.desc}</p>
              <div className="border-t border-white/5 pt-4 space-y-2">
                {p.subs.map((s, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-[#8096A7]">
                    <span className="w-1 h-1 rounded-full bg-red-400/50 shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: 'clipboard', name: 'Diagnóstico Completo', sub: 'Ponto de partida', desc: 'Score 0-100 da sua clínica: digital, comercial e competitivo.', badge: 'Incluso', tags: ['Score digital', 'Análise competidores', 'Auditoria completa'] },
    { icon: 'search', name: 'Pesquisa de Mercado', sub: 'Inteligência local', desc: 'Volume de busca, sazonalidade e perfil do paciente ideal na sua região.', badge: 'Disponível', tags: ['Keywords locais', 'Perfil do paciente', 'Sazonalidade'] },
    { icon: 'map', name: 'Google Meu Negócio', sub: 'Presença local', desc: 'Top 3 no Maps quando o paciente pesquisar especialidade perto de você.', badge: 'Disponível', tags: ['Perfil verificado', 'Posts semanais', 'Avaliações'] },
    { icon: 'globe', name: 'Site Profissional', sub: 'Sua clínica 24h', desc: 'Site rápido, mobile-first, feito para converter visitante em agendamento.', badge: 'Disponível', tags: ['Mobile-first', 'SEO técnico', 'CFM compliant'] },
    { icon: 'megaphone', name: 'Tráfego Pago', sub: 'Google Ads + Meta Ads', desc: 'Anúncios que atraem pacientes qualificados, não curiosos.', badge: 'Alta demanda', tags: ['Google + Meta', 'Otimização 3×/sem', 'ROAS mensurado'] },
    { icon: 'instagram', name: 'Redes Sociais', sub: 'Autoridade digital', desc: 'Instagram que gera autoridade e atrai pacientes — não só seguidores.', badge: 'Disponível', tags: ['12–20 posts/mês', 'Reels + Stories', 'Gestão DMs'] },
    { icon: 'target', name: 'Landing Pages', sub: 'Conversão máxima', desc: 'Uma página, um objetivo: transformar clique em consulta agendada.', badge: 'Disponível', tags: ['Por campanha', 'A/B testing', 'Formulário direto'] },
    { icon: 'camera', name: 'Criativos & Vídeos', sub: 'Produção visual', desc: 'Peças, Reels e anúncios prontos para publicar toda semana.', badge: 'Disponível', tags: ['10–20 peças/mês', '4–8 vídeos', 'Banco organizado'] },
    { icon: 'sparkles', name: 'IA & Automação', sub: 'Escala inteligente', desc: 'Chatbot no WhatsApp, e-mail automático e qualificação de leads 24h.', badge: 'Premium', tags: ['Chatbot 24h', 'E-mail automation', 'Lead scoring'] },
  ]
  const badgeStyle = b => {
    if (b === 'Incluso')      return { bg: 'rgba(0,191,165,0.12)',   color: '#00BFA5',  border: 'rgba(0,191,165,0.3)' }
    if (b === 'Alta demanda') return { bg: 'rgba(251,146,60,0.1)',   color: '#fb923c',  border: 'rgba(251,146,60,0.3)' }
    if (b === 'Premium')      return { bg: 'rgba(168,85,247,0.1)',   color: '#a855f7',  border: 'rgba(168,85,247,0.3)' }
    return                           { bg: 'rgba(107,138,133,0.08)', color: '#8096A7',  border: 'rgba(107,138,133,0.2)' }
  }
  return (
    <section id="servicos" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-[#00BFA5]/20 bg-[#00BFA5]/5 rounded-full px-4 py-1.5 mb-6">
            <Icon name="pulse" className="w-3 h-3 text-[#00BFA5]" />
            <span className="section-label">Serviços</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] mb-4 leading-tight">
            Tudo que sua clínica<br />precisa para crescer
          </h2>
          <p className="text-[#8096A7] text-lg max-w-xl mx-auto">
            Cada serviço resolve um problema específico. Contrate individualmente ou combine no plano ideal.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const bs = badgeStyle(s.badge)
            return (
              <div key={i} className="glass-card p-6 flex flex-col gap-4 hover:border-[#00BFA5]/25 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#00BFA5]/8 border border-[#00BFA5]/15 flex items-center justify-center group-hover:bg-[#00BFA5]/15 transition-colors">
                    <Icon name={s.icon} className="w-5 h-5 text-[#00BFA5]" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                        style={{ background: bs.bg, color: bs.color, borderColor: bs.border }}>
                    {s.badge}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-[#8096A7] font-medium mb-1">{s.sub}</div>
                  <h3 className="font-semibold text-[#F0E9DC] text-base leading-snug">{s.name}</h3>
                </div>
                <p className="text-[#8096A7] text-sm leading-relaxed flex-1">{s.desc}</p>
                <div className="border-t border-white/5 pt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t, j) => (
                    <span key={j} className="text-[11px] text-[#8096A7] bg-white/4 border border-white/8 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Conversa inicial', desc: 'Entendemos sua clínica, objetivos e desafios. Sem compromisso.', time: 'Dia 1' },
    { num: '02', title: 'Diagnóstico gratuito', desc: 'Análise completa da presença digital e comparativo com concorrentes.', time: 'Semana 1' },
    { num: '03', title: 'Plano de ação', desc: 'Cronograma detalhado com metas claras e responsáveis definidos.', time: 'Semana 2' },
    { num: '04', title: 'Execução', desc: 'Equipe coloca tudo no ar: site, Google, anúncios, redes sociais.', time: 'Semanas 2–4' },
    { num: '05', title: 'Crescimento contínuo', desc: 'Pacientes chegando e relatórios mensais mostrando cada resultado.', time: 'Mês 2+' },
  ]
  const milestones = [
    { label: 'Diagnóstico digital', pct: 100, status: 'Concluído' },
    { label: 'Google Meu Negócio', pct: 100, status: 'Ativo' },
    { label: 'Site profissional',   pct: 100, status: 'No ar' },
    { label: 'Campanhas de anúncio', pct: 85, status: 'Rodando' },
    { label: 'Redes sociais',        pct: 70, status: 'Em produção' },
  ]
  return (
    <section id="como-funciona" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: timeline */}
        <div>
          <div className="section-label mb-4">Como funciona</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] leading-tight mb-4">
            Do diagnóstico<br />ao resultado.
          </h2>
          <p className="text-[#8096A7] text-base leading-relaxed mb-12 max-w-md">
            Você cuida dos pacientes. Nós cuidamos de trazer eles até você — processo estruturado do dia 1.
          </p>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#00BFA5]/10 border border-[#00BFA5]/25 flex items-center justify-center shrink-0 group-hover:bg-[#00BFA5]/20 group-hover:border-[#00BFA5]/50 transition-all">
                    <span className="text-[#00BFA5] text-xs font-bold">{s.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: 'linear-gradient(to bottom, rgba(0,191,165,0.3), rgba(0,191,165,0.04))' }} />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="font-semibold text-[#F0E9DC]">{s.title}</h3>
                    <span className="text-[11px] text-[#00BFA5] bg-[#00BFA5]/8 border border-[#00BFA5]/15 px-2 py-0.5 rounded-full">{s.time}</span>
                  </div>
                  <p className="text-[#8096A7] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: progress card */}
        <div className="glass-card p-8" style={{ borderColor: 'rgba(0,191,165,0.15)' }}>
          <div className="section-label mb-6">Sua clínica em 30 dias</div>
          <div className="space-y-5">
            {milestones.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#F0E9DC] font-medium">{m.label}</span>
                  <span className="text-xs text-[#00BFA5]">{m.status}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#00BFA5]/10 overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                       style={{ width: `${m.pct}%`, background: 'linear-gradient(to right, #00A88E, #00BFA5)', boxShadow: '0 0 8px rgba(0,191,165,0.4)' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#00BFA5]/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold text-[#00BFA5]" style={{ textShadow: '0 0 20px rgba(0,191,165,0.3)' }}>+34</div>
              <div className="text-xs text-[#8096A7] mt-1">Novos pacientes no mês</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00BFA5]" style={{ textShadow: '0 0 20px rgba(0,191,165,0.3)' }}>R$ 28</div>
              <div className="text-xs text-[#8096A7] mt-1">Custo por paciente captado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PLANS ────────────────────────────────────────────────────────────────────
function Plans() {
  const [tab, setTab] = useState('pacotes')
  const individual = [
    { icon: 'megaphone', name: 'Tráfego Pago', sub: 'Anúncios que convertem', desc: 'Google Ads + Meta Ads gerenciados para atrair pacientes qualificados.', features: ['Configuração Google + Meta Ads','1 landing page por campanha','Otimização 3× por semana','4–8 criativos de anúncio/mês','Remarketing inteligente','Relatório mensal (CPL, CPA, ROAS)'], ideal: 'Para quem já tem site, mas não recebe pacientes pelo digital.' },
    { icon: 'instagram', name: 'Social Media', sub: 'Presença que gera autoridade', desc: 'Instagram completo: conteúdo, visuais, Reels, Stories e interações.', features: ['Otimização do perfil','12–16 posts/mês','4–8 Reels editados/mês','15–20 Stories/mês','Calendário editorial','Relatório mensal'], ideal: 'Para quem quer construir autoridade e atrair pelo Instagram.' },
    { icon: 'globe', name: 'Site + Manutenção', sub: 'Sua clínica 24h no ar', desc: 'Site profissional e manutenção mensal: segurança, atualizações e SEO.', features: ['Site institucional (6–8 páginas)','Design mobile-first','Botão WhatsApp + agendamento','SEO básico (GSC + GA4)','Manutenção mensal','1–2 blog posts/mês (SEO)'], ideal: 'Para quem não tem site ou tem um site antigo sem resultado.' },
    { icon: 'map', name: 'Google Meu Negócio', sub: 'Apareça no Google Maps', desc: 'Top 3 no Maps quando pacientes pesquisarem perto de você.', features: ['Criação/otimização do perfil','Upload de fotos profissionais','Posts semanais','Gestão de avaliações (24h)','Cadastro completo de serviços','Relatório mensal'], ideal: 'Para clínicas que dependem de busca local.' },
    { icon: 'camera', name: 'Criativos + Vídeos', sub: 'Conteúdo visual profissional', desc: 'Peças visuais e vídeos que alimentam redes sociais e anúncios.', features: ['10–20 peças estáticas/mês','4–8 vídeos editados/mês','Roteiros para gravação','Legendas em todos os vídeos','Banco de criativos organizado','Teste A/B de criativos'], ideal: 'Complemento para quem já tem gestão de redes.' },
    { icon: 'clipboard', name: 'Auditoria + Consultoria', sub: 'Diagnóstico + plano de ação', desc: 'Análise completa (digital + comercial) com plano de ação detalhado.', features: ['Diagnóstico digital (score 0–100)','Diagnóstico comercial','Análise de 5–10 concorrentes','Pesquisa de keywords','Scripts de atendimento','Plano de ação (90 dias)'], ideal: 'Para quem quer entender antes de investir.' },
  ]
  const bundles = [
    { name: 'Starter', sub: 'Para quem está começando', desc: 'Presença digital básica para clínicas sem marketing ativo.', popular: false, features: ['Diagnóstico completo','Google Meu Negócio','12 posts/mês no Instagram','10 stories/mês','12 peças visuais/mês','Relatório mensal'] },
    { name: 'Growth', sub: 'Para crescer rápido', desc: 'Captação acelerada de pacientes com anúncios, site e conteúdo.', popular: true, features: ['Tudo do Starter +','Site institucional profissional','1 landing page por campanha','Google Ads + Meta Ads','16 posts + 8 Reels + 20 stories/mês','16 peças + 4 vídeos/mês','Auditoria comercial + scripts','Reunião mensal'] },
    { name: 'Pro', sub: 'Para dominar a região', desc: 'Para clínicas que querem ser referência absoluta na especialidade.', popular: false, features: ['Tudo do Growth +','SEO avançado + 4 blog posts/mês','E-mail marketing + CRM','Chatbot IA no WhatsApp','TikTok + YouTube','20 peças + 8 vídeos/mês','Dashboard em tempo real','Reunião quinzenal estratégica'] },
  ]
  return (
    <section id="planos" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-label mb-4">Planos e serviços</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] mb-4 leading-tight">Monte o plano<br />ideal para sua clínica</h2>
          <p className="text-[#8096A7] text-lg max-w-xl mx-auto">Contrate individualmente ou escolha um pacote. Sem surpresas.</p>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[['pacotes','Pacotes Completos'],['individual','Serviços Individuais']].map(([val, label]) => (
            <button key={val} onClick={() => setTab(val)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === val ? 'bg-[#00BFA5] text-[#0D1B2A] shadow-lg shadow-[#00BFA5]/20' : 'glass-card text-[#8096A7] hover:text-[#F0E9DC]'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'pacotes' && (
          <div className="grid md:grid-cols-3 gap-5">
            {bundles.map((p, i) => (
              <div key={i} className={`relative glass-card p-8 flex flex-col ${p.popular ? 'border-[#00BFA5]/35' : ''}`}
                   style={p.popular ? { boxShadow: '0 0 40px rgba(0,191,165,0.08)' } : {}}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00BFA5] text-[#0D1B2A] text-[11px] font-bold px-4 py-1 rounded-full"
                       style={{ boxShadow: '0 0 16px rgba(0,191,165,0.5)' }}>
                    MAIS POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#F0E9DC] mb-1">Pulso {p.name}</h3>
                  <p className="text-sm text-[#00BFA5] font-medium mb-3">{p.sub}</p>
                  <p className="text-[#8096A7] text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-white/5">
                  <div className="text-[#8096A7] text-xs mb-1">Investimento mensal</div>
                  <div className="text-[#F0E9DC] font-bold text-lg">Consulte valores</div>
                  <div className="text-[#8096A7] text-xs mt-0.5">Contrato mínimo: 6 meses</div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#8096A7]">
                      <Icon name="check" className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                   className={`block text-center font-semibold py-3.5 rounded-full transition-all text-sm ${p.popular ? 'btn-primary' : 'text-[#00BFA5] border border-[#00BFA5]/25 hover:border-[#00BFA5]/50 hover:bg-[#00BFA5]/5'}`}>
                  Quero esse plano
                </a>
              </div>
            ))}
          </div>
        )}

        {tab === 'individual' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {individual.map((p, i) => (
              <div key={i} className="glass-card p-6 flex flex-col hover:border-[#00BFA5]/25 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00BFA5]/8 border border-[#00BFA5]/15 flex items-center justify-center">
                    <Icon name={p.icon} className="w-5 h-5 text-[#00BFA5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F0E9DC] text-sm leading-tight">{p.name}</h3>
                    <p className="text-xs text-[#00BFA5]">{p.sub}</p>
                  </div>
                </div>
                <p className="text-[#8096A7] text-sm leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[#8096A7]">
                      <Icon name="check" className="w-3.5 h-3.5 text-[#00BFA5] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="bg-[#00BFA5]/5 border border-[#00BFA5]/10 rounded-lg p-2.5 mb-4">
                  <p className="text-[11px] text-[#8096A7]">{p.ideal}</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                   className="block text-center text-sm font-semibold py-2.5 rounded-full text-[#00BFA5] border border-[#00BFA5]/25 hover:border-[#00BFA5]/50 hover:bg-[#00BFA5]/5 transition-all">
                  Saber mais
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-[#8096A7] text-sm mt-8">
          O investimento em anúncios (Google/Meta) é pago diretamente às plataformas, separado da mensalidade.
        </p>
      </div>
    </section>
  )
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function Results() {
  return (
    <section id="resultados" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="section-label mb-4">Resultados</div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] leading-tight max-w-xl">
              Números que importam<br />para você.
            </h2>
            <p className="text-[#8096A7] max-w-xs leading-relaxed text-sm">
              Não falamos de likes ou seguidores. Falamos de pacientes na agenda e crescimento mensurável.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { value: '+30%', label: 'Mais leads em 90 dias', desc: 'Média das clínicas no 3º mês de contrato' },
            { value: '85%', label: 'Ocupação da agenda', desc: 'Meta atingida por 80% dos clientes' },
            { value: 'Top 3', label: 'No Google Maps', desc: 'Em até 60 dias após otimização' },
            { value: '5×', label: 'Retorno sobre anúncio', desc: 'ROAS médio nas campanhas Pulso' },
          ].map((m, i) => (
            <div key={i} className="glass-card p-6 flex flex-col justify-between hover:border-[#00BFA5]/25 transition-all">
              <div className="text-4xl sm:text-5xl font-bold text-[#00BFA5] mb-2 leading-none"
                   style={{ textShadow: '0 0 30px rgba(0,191,165,0.3)' }}>
                {m.value}
              </div>
              <div>
                <div className="text-[#F0E9DC] text-sm font-semibold mb-1">{m.label}</div>
                <div className="text-[#8096A7] text-xs leading-snug">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ad investment guide */}
        <div className="glass-card p-8" style={{ borderColor: 'rgba(0,191,165,0.12)' }}>
          <div className="section-label mb-2">Guia de investimento em anúncios</div>
          <h3 className="text-[#F0E9DC] text-xl font-bold mb-6">Quanto custa trazer pacientes pelo digital?</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { tier: 'Básico', budget: 'R$ 1–2 mil/mês', leads: '30–60 leads/mês', color: 'rgba(0,191,165,0.8)' },
              { tier: 'Intermediário', budget: 'R$ 2–5 mil/mês', leads: '60–150 leads/mês', color: '#00BFA5' },
              { tier: 'Avançado', budget: 'R$ 5–15 mil/mês', leads: '150–400+ leads/mês', color: '#33D4B5' },
            ].map((t, i) => (
              <div key={i} className="bg-[#00BFA5]/5 border border-[#00BFA5]/10 rounded-xl p-5">
                <div className="section-label mb-2" style={{ color: t.color }}>{t.tier}</div>
                <div className="text-[#F0E9DC] text-xl font-bold mb-1">{t.budget}</div>
                <div className="text-[#8096A7] text-sm">{t.leads}</div>
              </div>
            ))}
          </div>
          <p className="text-[#8096A7] text-xs mt-5">
            Estimativas baseadas em CPC médio de R$ 3–8 na área de saúde e taxa de conversão de 5–15%.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── DIFFERENTIALS ────────────────────────────────────────────────────────────
function Differentials() {
  const big = [
    {
      icon: 'shield', title: 'Conformidade com o CFM', desc: 'Conhecemos as normas de publicidade médica (Res. 2.336/2023). Seu marketing é eficaz e 100% legal.',
      features: ['Nenhum post ou anúncio fora das normas', 'Restrições de antes/depois respeitadas', 'Depoimentos dentro das regras do Conselho'],
    },
    {
      icon: 'chart', title: 'Foco em pacientes, não métricas de vaidade', desc: 'Nosso único KPI é agendamento. Não comemoramos likes, seguidores ou impressões sem conversão.',
      features: ['Dashboard com custo real por paciente', 'Relatório mensal orientado a negócio', 'Metas claras de ocupação da agenda'],
    },
  ]
  const small = [
    { icon: 'zap', title: 'Sistema, não campanha', desc: 'Construímos uma máquina de atração que funciona 24/7, não ações pontuais que somem.' },
    { icon: 'heart', title: 'Só o setor médico', desc: 'Atendemos exclusivamente clínicas. Entendemos o mercado, o paciente e as regulamentações de dentro.' },
    { icon: 'calendar', title: 'Contrato com compromisso', desc: 'Mínimo 6 meses porque resultado sustentável leva 60–90 dias. Sem promessas de milagre.' },
    { icon: 'sparkles', title: 'IA aplicada ao marketing médico', desc: 'Usamos inteligência artificial para qualificar leads, gerar conteúdo e otimizar campanhas.' },
  ]
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="section-label mb-4">Por que a Pulso</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] leading-tight max-w-2xl">
            Não somos uma agência genérica.
          </h2>
        </div>
        {/* Two large feature cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {big.map((item, i) => (
            <div key={i} className="glass-card p-8 hover:border-[#00BFA5]/25 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center mb-5">
                <Icon name={item.icon} className="w-6 h-6 text-[#00BFA5]" />
              </div>
              <h3 className="text-xl font-bold text-[#F0E9DC] mb-3">{item.title}</h3>
              <p className="text-[#8096A7] text-sm leading-relaxed mb-6">{item.desc}</p>
              <div className="space-y-2.5">
                {item.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-sm text-[#8096A7]">
                    <Icon name="check" className="w-4 h-4 text-[#00BFA5] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Four smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {small.map((item, i) => (
            <div key={i} className="glass-card p-6 hover:border-[#00BFA5]/25 transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#00BFA5]/8 border border-[#00BFA5]/15 flex items-center justify-center mb-4">
                <Icon name={item.icon} className="w-4 h-4 text-[#00BFA5]" />
              </div>
              <h3 className="font-semibold text-[#F0E9DC] text-sm mb-2">{item.title}</h3>
              <p className="text-[#8096A7] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const faqs = [
    { q: 'Preciso entender de marketing para contratar?', a: 'Não. Nosso trabalho é cuidar de tudo para você. Explicamos cada etapa em linguagem simples e enviamos relatórios claros todo mês mostrando quantos pacientes chegaram e quanto custou cada um.' },
    { q: 'Quanto tempo para ver resultado?', a: 'Os primeiros leads aparecem nas primeiras semanas após as campanhas entrarem no ar. Resultados consistentes levam 60–90 dias — por isso trabalhamos com contrato mínimo de 6 meses.' },
    { q: 'O investimento em anúncios está incluso?', a: 'Não. A mensalidade cobre estratégia, criação e gestão. O valor dos anúncios (Google/Meta) é pago por você diretamente às plataformas. Recomendamos a partir de R$ 1.000/mês para começar.' },
    { q: 'E se já tenho agência ou faço marketing sozinho?', a: 'Começamos pelo diagnóstico gratuito — ele mostra exatamente os gaps. Se está satisfeito com o resultado atual, ótimo. Se não, mostramos o caminho.' },
    { q: 'Vocês trabalham com qual especialidade?', a: 'Todas: estética, odontologia, dermatologia, ortopedia, oftalmologia, cardiologia e demais. Adaptamos a estratégia para cada área e cada região.' },
    { q: 'O marketing segue as regras do CFM?', a: 'Sim, sempre. Conhecemos as normas (Resolução CFM 2.336/2023) e garantimos conformidade em todo conteúdo — incluindo restrições sobre preços, antes/depois e depoimentos.' },
    { q: 'Posso cancelar antes dos 6 meses?', a: 'O contrato mínimo existe porque marketing é construção, não mágica. Após os 6 meses, a renovação é mensal e você cancela quando quiser.' },
    { q: 'Como acompanho os resultados?', a: 'Relatórios mensais com linguagem simples: pacientes que ligaram, que agendaram, custo por lead, performance no Google e no Instagram. Além de reuniões periódicas de alinhamento.' },
  ]
  return (
    <section id="faq" className="py-24 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <div className="section-label mb-4">Dúvidas frequentes</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0E9DC] leading-tight">
            Perguntas que você<br />provavelmente tem.
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#00BFA5]/3 transition-colors">
                <span className="font-medium text-[#F0E9DC] text-sm sm:text-base pr-8 leading-snug">{faq.q}</span>
                <svg className={`w-4 h-4 text-[#00BFA5] shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                     fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 border-t border-[#00BFA5]/8 pt-4">
                  <p className="text-[#8096A7] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto glass-card overflow-hidden" style={{ borderColor: 'rgba(0,191,165,0.2)', boxShadow: '0 0 80px rgba(0,191,165,0.06)' }}>
        <div className="p-10 sm:p-16">
          <div className="section-label mb-6">Próximo passo</div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight mb-10">
            <span className="text-[#F0E9DC]">Pronto para lotar</span><br />
            <span style={{ color: 'rgba(0,191,165,0.45)' }}>sua agenda.</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-[#00BFA5]/10">
            <div>
              <div className="text-xs text-[#8096A7] uppercase tracking-widest mb-3">WhatsApp</div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105">
                <Icon name="phone" className="w-4 h-4" />
                Falar agora
              </a>
            </div>
            <div>
              <div className="text-xs text-[#8096A7] uppercase tracking-widest mb-3">Diagnóstico</div>
              <div className="text-[#F0E9DC] font-semibold mb-1">Gratuito</div>
              <div className="text-[#8096A7] text-sm">Análise completa sem compromisso</div>
            </div>
            <div>
              <div className="text-xs text-[#8096A7] uppercase tracking-widest mb-3">Resposta</div>
              <div className="text-[#F0E9DC] font-semibold mb-1">Em até 2h</div>
              <div className="text-[#8096A7] text-sm">Atendimento de seg–sex, 8h–18h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 sm:px-8 pb-12 pt-8 border-t border-[#00BFA5]/8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <img src={import.meta.env.BASE_URL + 'pulso-icon.svg'} alt="Pulso" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
            <span className="font-bold text-[#F0E9DC] text-lg tracking-tight">Pulso</span>
            <span className="text-[#8096A7] text-sm">Assessoria de Marketing para Clínicas</span>
          </div>
          <p className="text-[#8096A7] text-xs">Do diagnóstico à escala em 90 dias.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-[#8096A7]">
          <a href="#servicos" className="hover:text-[#F0E9DC] transition-colors section-label">Serviços</a>
          <a href="#planos" className="hover:text-[#F0E9DC] transition-colors section-label">Planos</a>
          <a href="#faq" className="hover:text-[#F0E9DC] transition-colors section-label">FAQ</a>
          <a href="#/wiki" className="hover:text-[#00BFA5] transition-colors section-label text-[#00BFA5]">Wiki</a>
          <span className="text-[#8096A7] text-xs">© {new Date().getFullYear()} Pulso</span>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const isWikiHash = (hash) => hash.startsWith('#/wiki')
  const [page, setPage] = useState(isWikiHash(window.location.hash) ? 'wiki' : 'home')
  useEffect(() => {
    const onHash = () => setPage(isWikiHash(window.location.hash) ? 'wiki' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  if (page === 'wiki') return <Wiki />
  return (
    <div style={{ background: '#0D1B2A', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <EEGCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <FadeIn from="blur" ><Hero /></FadeIn>
        <FadeIn from="flip" ><PainPoints /></FadeIn>
        <FadeIn from="left" ><Services /></FadeIn>
        <FadeIn from="right"><HowItWorks /></FadeIn>
        <FadeIn from="zoom" ><Plans /></FadeIn>
        <FadeIn from="flip" ><Results /></FadeIn>
        <FadeIn from="left" ><Differentials /></FadeIn>
        <FadeIn from="blur" ><FAQ /></FadeIn>
        <FadeIn from="zoom" ><CTA /></FadeIn>
        <FadeIn from="up"   ><Footer /></FadeIn>
      </div>
    </div>
  )
}

export default App

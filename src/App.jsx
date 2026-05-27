import { useState, useEffect, useRef } from 'react'
import './index.css'
import Wiki from './Wiki.jsx'
import heartbeatSrc from '/heartbeat.mp3?url'

const WHATSAPP_LINK = 'https://wa.me/5561999999999?text=Ol%C3%A1%2C%20quero%20minha%20auditoria%20em%2048h'

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
  const colorRef = useRef('#00BFA5')

  useEffect(() => {
    const handleColorChange = (e) => {
      colorRef.current = e.detail.color || '#00BFA5'
    }
    window.addEventListener('eeg-color-change', handleColorChange)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let sweepX = 0
    const SPEED = 1.6
    const CYCLE = 380
    const BG_COLOR = '#FFFFFF'

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

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
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

        ctx.beginPath()
        ctx.moveTo(prevX, py)
        ctx.lineTo(x, y)
        ctx.strokeStyle = colorRef.current
        ctx.lineWidth = 2.5
        ctx.shadowBlur = 10
        ctx.shadowColor = colorRef.current === '#00BFA5' ? 'rgba(0, 191, 165, 0.4)' : 'rgba(239, 68, 68, 0.4)'
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
    <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : `opacity-0 ${variants[from]}`}`}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Mecanismo','#servicos'],['Resultados','#resultados'],['Planos','#planos'],['Dúvidas','#faq']]
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-5xl mx-auto glass-card h-16 px-6 flex items-center justify-between" style={{ borderRadius: '100px', background: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(0, 191, 165, 0.15)' }}>
        <a href="#" className="flex items-center">
          <img src={import.meta.env.BASE_URL + 'pulso-logo.svg'} alt="Pulso" className="h-8 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] text-[#5A6B7A] hover:text-[#0D1B2A] transition-colors font-semibold tracking-wide uppercase">{label}</a>
          ))}
          <a href="#/wiki" className="text-[13px] text-[#00BFA5] hover:text-[#00A88E] transition-colors font-bold tracking-wide uppercase">Wiki</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
             className="btn-primary text-xs py-2 px-6">
            Falar agora
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#5A6B7A]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-2 glass-card p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block text-sm text-[#5A6B7A] hover:text-[#0D1B2A] font-medium">{label}</a>
          ))}
          <a href="#/wiki" onClick={() => setOpen(false)} className="block text-sm text-[#00BFA5] font-bold">Wiki de Serviços</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
             className="block text-center btn-primary text-sm">Falar agora</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#00BFA5]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#00BFA5]/3 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-12 items-center py-20 relative z-10">
        <div className="text-left">
          <div className="mb-8 flex">
            <span className="section-label flex items-center gap-2">
              <span className="glow-point" />
              ENGENHARIA DE CAPTAÇÃO MÉDICA DE ALTO PADRÃO
            </span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#0D1B2A] leading-[0.95] tracking-tighter mb-8">
            O consultório ao lado agradece o seu <span className="text-[#00BFA5]">silêncio digital.</span>
          </h1>
          <p className="text-[#5A6B7A] text-xl max-w-xl mb-12 leading-relaxed font-medium">
            A indicação física hoje termina na pesquisa na internet. E você é invisível, o paciente escolhe o concorrente anunciado. Criamos seu sistema previsível de agendamento em 48 horas. Antes de qualquer contrato.
          </p>
          <div className="flex flex-wrap gap-5 mb-8">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
               className="btn-primary flex items-center gap-3 px-8 py-4 text-base">
              QUERO MINHA AUDITORIA EM 48H
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[#5A6B7A] text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-[#00BFA5]"/> Adequado ao CFM</span>
            <span className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-[#00BFA5]"/> Setup Zero</span>
            <span className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-[#00BFA5]"/> Exclusividade Regional</span>
          </div>
        </div>

        <div className="hidden lg:block relative w-[450px]">
          <div className="absolute inset-0 bg-[#00BFA5]/10 blur-[80px] rounded-full" />
          <div className="glass-card p-8 relative z-10 border-[#00BFA5]/25 bg-white/80">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00BFA5]/10 flex items-center justify-center border border-[#00BFA5]/20">
                  <Icon name="pulse" className="w-6 h-6 text-[#00BFA5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0D1B2A] uppercase tracking-tighter">SISTEMA PULSO</div>
                  <div className="text-[10px] text-[#5A6B7A]">Live Insights — Ativo</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#00BFA5]/10 px-3 py-1 rounded-full border border-[#00BFA5]/15">
                <span className="w-2 h-2 rounded-full bg-[#00BFA5] animate-pulse" />
                <span className="text-[10px] text-[#00BFA5] font-black uppercase">Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Pacientes/Mês', value: '+42', color: '#00BFA5' },
                { label: 'Taxa Conversão', value: '12.4%', color: '#00A88E' },
                { label: 'Custo por Lead', value: 'R$ 24', color: '#00BFA5' },
                { label: 'ROI Estimado', value: '6.8x', color: '#00A88E' },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#5A6B7A] uppercase tracking-wide">{m.label}</span>
                  <span className="text-3xl font-black text-[#0D1B2A] leading-none" style={{ color: m.color }}>{m.value}</span>
                  <div className="w-full h-1 bg-[#0D1B2A]/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-current rounded-full" style={{ width: '75%', color: m.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#00BFA5]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-[#5A6B7A] uppercase">Fluxo de Agendamentos</span>
                <span className="text-[10px] text-[#00BFA5] font-bold">+18% vs. semana ant.</span>
              </div>
              <div className="h-24 flex items-end gap-1.5">
                {[45, 65, 50, 95, 70, 85, 55, 75, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#00BFA5]/20 rounded-t-md transition-all hover:bg-[#00BFA5] hover:shadow-[0_0_10px_rgba(0,191,165,0.4)]" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 w-24 h-24 glass-card flex items-center justify-center rotate-12 animate-float bg-white/90">
            <Icon name="zap" className="w-10 h-10 text-[#00BFA5]" />
          </div>
          <div className="absolute -bottom-10 -left-10 glass-card p-5 flex items-center gap-3 animate-float bg-white/90" style={{ animationDelay: '1.5s' }}>
            <div className="w-9 h-9 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-black text-sm shadow-xl">A+</div>
            <div className="text-xs font-bold text-[#0D1B2A]">Qualificação de Leads</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PainPoints() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const color = entry.isIntersecting ? '#EF4444' : '#00BFA5'
      window.dispatchEvent(new CustomEvent('eeg-color-change', { detail: { color } }))
    }, { 
      threshold: 0.1,
      rootMargin: '-10% 0px -10% 0px'
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
    <section ref={ref} className="py-24 px-6 sm:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="section-label mb-4">O Diagnóstico da Dor</span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D1B2A] leading-tight mb-6">
            O prejuízo silencioso de ser invisível<br />no digital.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <div key={i} className="glass-card p-8 flex flex-col gap-4 border-red-500/5 hover:border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-lg font-black">!</span>
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-xl">{p.title}</h3>
              </div>
              <p className="text-[#5A6B7A] text-base leading-relaxed pl-14">{p.desc}</p>
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
    <section id="servicos" className="py-24 px-6 sm:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-6">O Mecanismo Único</span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D1B2A] mb-6">
            Engenharia de<br />Precisão Comercial.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i} className="glass-card p-10 group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00BFA5] group-hover:text-white transition-all duration-300">
                <Icon name={s.icon} className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B2A] text-2xl mb-2">{s.name}</h3>
                <p className="text-[#5A6B7A] text-base leading-relaxed">{s.desc}</p>
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
    <section id="resultados" className="py-24 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <span className="section-label mb-6">A Prova Fria</span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D1B2A] mb-6">Impacto Auditado.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '+300%', label: 'Fluxo de oportunidades', desc: 'qualificadas chegando no WhatsApp' },
            { value: '-45%', label: 'Redução no Custo', desc: 'por Lead (CPL)' },
            { value: 'Elite', label: 'Posicionamento Premium', desc: 'de autoridade local' },
            { value: '5.2x', label: 'Retorno Médio', desc: 'sobre o Investimento (ROI)' },
          ].map((m, i) => (
            <div key={i} className="glass-card p-10 text-center border-[#0D1B2A]/5 bg-white/60">
              <div className="text-6xl font-black text-[#0D1B2A] mb-4 tracking-tighter" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 191, 165, 0.2))' }}>{m.value}</div>
              <div className="text-[#0D1B2A] font-black text-base mb-2 uppercase tracking-tight">{m.label}</div>
              <div className="text-[#5A6B7A] text-[10px] uppercase font-bold tracking-widest">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RiskReversal() {
  return (
    <section className="py-24 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto glass-card p-12 sm:p-20 bg-[#F8FAFC] border-[#00BFA5]/30">
        <span className="section-label mb-8">Inversão Total de Risco</span>
        <h2 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] mb-10 leading-tight">
          Você não paga para imaginar.<br />
          <span className="text-[#00BFA5]">Você vê pronto.</span>
        </h2>
        <div className="space-y-6 text-[#5A6B7A] text-xl font-medium mb-12">
          <p>Entregamos sua estrutura pronta em <strong className="text-[#0D1B2A]">48 horas ANTES do contrato:</strong></p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> Sua nova Vitrine de Elite estruturada.</li>
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> Landing Page de alta conversão.</li>
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> Linha editorial de posts/reels chave.</li>
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> Diretriz de marca, e posicionamento.</li>
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> O desenho tático dos seus Anúncios Cirúrgicos.</li>
            <li className="flex items-center gap-3"><Icon name="check" className="w-5 h-5 text-[#00BFA5]" /> A auditoria de presença digital do seu território.</li>
          </ul>
          <p className="pt-4 border-t border-[#0D1B2A]/10">Se você aprovar o sistema, nós avançamos. Se não, você não deve um único centavo. Risco zero para o seu consultório.</p>
        </div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex px-12 py-5 text-xl font-black">
          QUERO MINHA ESTRUTURA EM 48H
        </a>
      </div>
    </section>
  )
}

function Plans() {
  const bundles = [
    { name: 'Essencial', sub: 'Destrave sua agenda', desc: 'O sistema cirúrgico para quem precisa sair da invisibilidade e destravar a agenda.', price: 'R$ 2.500/mês', cta: 'VERIFICAR DISPONIBILIDADE REGIONAL', features: ['M1 — Diagnóstico Estratégico: Raio-X profundo dos gargalos da sua clínica e mapeamento da concorrência local.','M2 — Diretriz de Marca & Posicionamento: Ajuste fino da sua identidade visual para atrair o público de alto ticket.','O7 — Vitrine Digital Activa: Configuração técnica do seu Google Meu Negócio (GMB) + Alinhamento do Instagram para autoridade (Zero dancinhas).','M4 — Landing Page de Elite: Página institucional ultraveloz, focada em conversão e 100% adequada às normas do CFM.','M6 — Anúncios Cirúrgicos (Meta + Google Ads): Campanhas configuradas especificamente para capturar o paciente no momento exato da busca pela sua subespecialidade.'] },
    { name: 'Growth', sub: 'Escala rápida', desc: 'A estrutura completa para clínicas que buscam escala rápida e volumosa de pacientes.', price: 'R$ 3.500 – R$ 4.500/mês', popular: true, cta: 'ATIVAR ESCALA DA CLÍNICA', features: ['Tudo do Plano Essencial +','M5 — Linha Editorial Recorrente (16 posts/mês): Produção e agendamento de criativos de performance para manter sua vitrine ativa.','M3 — Site Premium Expandido (8 Seções): Arquitetura web completa para clínicas com múltiplos profissionais ou subespecialidades estruturadas.','Auditoria Comercial da Recepção: Análise ativa dos scripts do seu WhatsApp para garantir que o lead que chega vire consulta paga.'] },
    { name: 'Authority', sub: 'Monopólio regional absoluto', desc: 'Para o especialista que exige dominar o topo do mercado.', price: 'R$ 5.500/mês', cta: 'DOMINAR MEU TERRITÓRIO', features: ['Tudo do Plano Growth +','M7 — SEO Avançado + GMB Contínuo: Trabalho de posicionamento orgânico para fazer seu nome liderar as buscas sem depender apenas de anúncios pagos.','M8 — Automação & Bot IA 24/7: Atendimento inteligente no WhatsApp para qualificar, responder e direcionar o paciente premium na mesma hora, mesmo de madrugada.','Produção Audiovisual Dedicada: Captação de imagens e vídeos de alta classe no seu próprio consultório para anúncios.'] },
  ]
  return (
    <section id="planos" className="py-24 px-6 sm:px-8 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-6">Planos de Engenharia</span>
          <p className="text-[#0D1B2A] text-lg font-black max-w-3xl mx-auto mb-12 bg-white/80 p-6 rounded-2xl border border-[#0D1B2A]/5">
            "Para garantir a soberania nos leilões do Google, limitamos a engenharia a apenas <span className="text-[#00BFA5]">3 especialistas por região</span>."
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D1B2A] mb-6">Ativos de Performance.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {bundles.map((p, i) => (
            <div key={i} className={`glass-card p-10 flex flex-col relative transition-all duration-500 ${p.popular ? 'border-[#00BFA5] border-2 scale-105 z-10 bg-white' : 'bg-white/40'}`}>
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00BFA5] text-white text-[10px] font-black px-5 py-2 rounded-full shadow-xl shadow-[#00BFA5]/20 tracking-widest">
                  MAIS ESCOLHIDO
                </div>
              )}
              <div className="mb-8">
                <span className="text-[11px] font-black text-[#00BFA5] uppercase tracking-[0.2em] mb-2 block">{p.sub}</span>
                <h3 className="text-3xl font-black text-[#0D1B2A] mb-3">{p.name}</h3>
                <div className="text-xl font-black text-[#0D1B2A] mb-4 bg-[#F8FAFC] inline-block px-4 py-2 rounded-lg border border-[#0D1B2A]/5">{p.price}</div>
                <p className="text-[#5A6B7A] text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-bold text-[#0D1B2A]">
                    <div className="w-5 h-5 rounded-full bg-[#00BFA5]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="check" className="w-3 h-3 text-[#00BFA5]" />
                    </div>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                 className={`block text-center font-black py-4 rounded-xl transition-all text-xs tracking-widest uppercase ${p.popular ? 'btn-primary' : 'border-2 border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white'}`}>
                {p.cta}
              </a>
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
    <section id="faq" className="py-24 px-6 sm:px-8 relative bg-white">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="section-label mb-6">Matando Objeções</span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D1B2A] mb-6">FAQ Rápido.</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden bg-[#F8FAFC]/50 border-[#0D1B2A]/5">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      className="w-full flex items-center justify-between px-10 py-8 text-left hover:bg-white transition-colors duration-300">
                <span className="font-bold text-[#0D1B2A] text-xl tracking-tight">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center transition-all duration-500 ${openIdx === i ? 'bg-[#0D1B2A] border-[#0D1B2A]' : ''}`}>
                  <Icon name="arrowRight" className={`w-4 h-4 transition-all duration-500 ${openIdx === i ? 'text-white rotate-90' : 'text-[#0D1B2A]'}`} />
                </div>
              </button>
              {openIdx === i && (
                <div className="px-10 pb-10 text-[#5A6B7A] text-lg font-medium leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
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

function CTA() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
      <div className="max-w-6xl mx-auto glass-card p-16 sm:p-24 text-center relative overflow-hidden bg-[#0D1B2A] border-none shadow-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/20 to-transparent pointer-events-none" />
        <span className="section-label mb-8 bg-[#00BFA5]/20 text-[#00BFA5] border-none relative z-10">Gatilhada Final</span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tighter mb-8 relative z-10">
          Sua reputação está trabalhando<br />menos do que deveria.
        </h2>
        <p className="text-xl text-[#5A6B7A] font-bold mb-12 relative z-10 max-w-3xl mx-auto">
          Horários ociosos &times; Valor do procedimento = <span className="text-[#00BFA5]">Prejuízo mensal.</span><br/>Não dê essa vantagem para o concorrente ao lado.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
             className="bg-[#00BFA5] text-[#0D1B2A] hover:bg-white px-14 py-6 text-xl font-black rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_0_30px_rgba(0,191,165,0.4)]">
            <Icon name="phone" className="w-7 h-7" />
            ATIVAR SISTEMA PULSO
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-8 border-t border-[#0D1B2A]/5 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-6">
          <img src={import.meta.env.BASE_URL + 'pulso-logo.svg'} alt="Pulso" className="h-7 w-auto" />
          <p className="text-[#5A6B7A] text-[10px] font-black uppercase tracking-[0.3em]">Engenharia de Captação Médica © {new Date().getFullYear()}</p>
        </div>
        <div className="flex gap-12">
          {['Serviços', 'Resultados', 'Planos', 'Wiki'].map((l) => (
            <a key={l} href={l === 'Wiki' ? '#/wiki' : `#${l.toLowerCase()}`} className="text-xs font-black text-[#5A6B7A] hover:text-[#00BFA5] uppercase tracking-widest transition-colors duration-300">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

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
    <div className="bg-white min-h-screen relative">
      <EEGCanvas />
      <div className="relative z-10">
        <Navbar />
        <FadeIn from="blur"><Hero /></FadeIn>
        <FadeIn from="up"><PainPoints /></FadeIn>
        <FadeIn from="blur"><Services /></FadeIn>
        <FadeIn from="right"><Results /></FadeIn>
        <FadeIn from="zoom"><RiskReversal /></FadeIn>
        <FadeIn from="up"><Plans /></FadeIn>
        <FadeIn from="up"><FAQ /></FadeIn>
        <FadeIn from="zoom"><CTA /></FadeIn>
        <Footer />
      </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import './index.css'
import Wiki from './Wiki.jsx'

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
    heart: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    phone: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    star: <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    arrowRight: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  }
  return icons[name] || null
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="zap" className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-midnight">Pulso</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-sm text-text-muted hover:text-primary transition-colors">Servi&#231;os</a>
          <a href="#como-funciona" className="text-sm text-text-muted hover:text-primary transition-colors">Como Funciona</a>
          <a href="#planos" className="text-sm text-text-muted hover:text-primary transition-colors">Planos</a>
          <a href="#resultados" className="text-sm text-text-muted hover:text-primary transition-colors">Resultados</a>
          <a href="#faq" className="text-sm text-text-muted hover:text-primary transition-colors">D&#250;vidas</a>
          <a href="#/wiki" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">Wiki</a>
        </div>
        <div className="hidden md:block">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Falar com Especialista
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-text-muted">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          <a href="#servicos" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Servi&#231;os</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Como Funciona</a>
          <a href="#planos" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Planos</a>
          <a href="#resultados" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Resultados</a>
          <a href="#faq" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">D&#250;vidas</a>
          <a href="#/wiki" onClick={() => setOpen(false)} className="block text-sm font-semibold text-primary hover:text-primary-dark">Wiki de Servi&#231;os</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl">Falar com Especialista</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 text-center bg-gradient-to-b from-surface-alt to-bg">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <Icon name="shield" className="w-4 h-4" />
          Marketing especializado para cl&#237;nicas m&#233;dicas
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-midnight leading-tight mb-6">
          Sua cl&#237;nica merece uma <span className="text-primary">agenda cheia</span> todos os dias
        </h1>
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          A Pulso transforma o marketing da sua cl&#237;nica em um <strong>sistema previs&#237;vel</strong> de atra&#231;&#227;o de pacientes — com estrat&#233;gia, dados e resultados que voc&#234; consegue medir.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-primary/20">
            <Icon name="phone" className="w-5 h-5" />
            Quero mais pacientes
          </a>
          <a href="#como-funciona" className="inline-flex items-center gap-2 text-primary font-semibold px-6 py-4 rounded-2xl hover:bg-primary/5 transition-colors">
            Ver como funciona
            <Icon name="arrowRight" className="w-5 h-5" />
          </a>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Icon name="shield" className="w-5 h-5 text-green" />
            Conforme CFM/CRM
          </div>
          <div className="flex items-center gap-2">
            <Icon name="chart" className="w-5 h-5 text-primary" />
            Resultados em 90 dias
          </div>
          <div className="flex items-center gap-2">
            <Icon name="users" className="w-5 h-5 text-blue" />
            Especialistas em sa&#250;de
          </div>
        </div>
      </div>
    </section>
  )
}

function PainPoints() {
  const points = [
    { title: 'Agenda com hor\u00e1rios vagos', desc: 'Voc\u00ea tem capacidade para atender mais pacientes, mas eles n\u00e3o chegam.' },
    { title: 'Depend\u00eancia de indica\u00e7\u00f5es', desc: 'Quando as indica\u00e7\u00f5es param, a receita cai. N\u00e3o h\u00e1 previsibilidade.' },
    { title: 'Marketing que n\u00e3o d\u00e1 resultado', desc: 'J\u00e1 gastou com ag\u00eancia ou posts no Instagram, mas n\u00e3o viu retorno.' },
    { title: 'N\u00e3o aparece no Google', desc: 'Pacientes pesquisam "\u00e9 perto de mim", e sua cl\u00ednica n\u00e3o aparece.' },
  ]
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Voc&#234; se identifica com isso?</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">A maioria das cl&#237;nicas enfrenta esses problemas. A diferen&#231;a &#233; que agora existe uma solu&#231;&#227;o.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <div key={i} className="flex gap-4 bg-surface rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors">
              <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl font-bold">!</div>
              <div>
                <h3 className="font-bold text-midnight text-lg mb-1">{p.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: 'clipboard', title: 'Diagn\u00f3stico Completo', desc: 'Analisamos tudo: sua cl\u00ednica, pre\u00e7os, concorrentes, presen\u00e7a digital. Voc\u00ea recebe um raio-X completo de onde est\u00e1 e para onde pode ir.', items: ['An\u00e1lise comercial (pre\u00e7os, servi\u00e7os, ocupa\u00e7\u00e3o)', 'Auditoria digital (Google, Instagram, site)', 'Compara\u00e7\u00e3o com concorrentes da regi\u00e3o', 'Score de posicionamento 0-100'] },
    { icon: 'search', title: 'Pesquisa de Mercado', desc: 'Descobrimos quem s\u00e3o seus pacientes ideais, o que pesquisam no Google e como fazer eles chegarem at\u00e9 voc\u00ea.', items: ['Perfil do paciente ideal', 'Volume de buscas na sua regi\u00e3o', 'An\u00e1lise de concorrentes', 'Oportunidades por sazonalidade'] },
    { icon: 'map', title: 'Google Meu Neg\u00f3cio', desc: 'Colocamos sua cl\u00ednica no mapa — literalmente. Quando algu\u00e9m pesquisar "dentista perto de mim", voc\u00ea aparece.', items: ['Perfil otimizado e verificado', 'Fotos profissionais e posts semanais', 'Gest\u00e3o de avalia\u00e7\u00f5es', 'Meta: top 3 no Google Maps'] },
    { icon: 'globe', title: 'Site Profissional', desc: 'Criamos seu site pensando no celular, r\u00e1pido, bonito e feito para o paciente agendar — n\u00e3o s\u00f3 para "ter um site".', items: ['Design mobile-first', 'Bot\u00e3o de WhatsApp e agendamento', 'Otimizado para Google (SEO)', 'Conforme regras do CFM'] },
    { icon: 'target', title: 'Landing Pages', desc: 'P\u00e1ginas focadas em um \u00fanico objetivo: fazer o paciente agendar. Usadas com an\u00fancios para m\u00e1ximo resultado.', items: ['Uma p\u00e1gina por campanha', 'Textos persuasivos', 'Formul\u00e1rio ou WhatsApp direto', 'Teste A/B para otimiza\u00e7\u00e3o'] },
    { icon: 'megaphone', title: 'An\u00fancios (Tr\u00e1fego Pago)', desc: 'Gerenciamos seus an\u00fancios no Google e Instagram para atrair pacientes qualificados, n\u00e3o curiosos.', items: ['Google Ads + Meta Ads', 'Otimiza\u00e7\u00e3o 2-3x por semana', 'Relat\u00f3rio mensal de resultados', 'Remarketing inteligente'] },
    { icon: 'users', title: 'Auditoria Comercial', desc: 'Analisamos como sua equipe atende — do WhatsApp \u00e0 recep\u00e7\u00e3o. De nada adianta tra\u00e7ar pacientes se o atendimento perde a venda.', items: ['An\u00e1lise do funil de vendas', 'Scripts de atendimento prontos', 'Automa\u00e7\u00f5es de confirma\u00e7\u00e3o', 'Treinamento da recep\u00e7\u00e3o'] },
    { icon: 'instagram', title: 'Redes Sociais', desc: 'Gerenciamos seu Instagram com conte\u00fado que gera autoridade e atrai pacientes — n\u00e3o s\u00f3 likes.', items: ['12-20 posts por m\u00eas', 'Reels e Stories', 'Calend\u00e1rio editorial mensal', 'Gest\u00e3o de coment\u00e1rios e DMs'] },
    { icon: 'camera', title: 'Criativos (Fotos e V\u00eddeos)', desc: 'Produzimos as pe\u00e7as visuais: posts, an\u00fancios, v\u00eddeos curtos. Tudo pronto para publicar.', items: ['10-20 pe\u00e7as est\u00e1ticas/m\u00eas', '4-8 v\u00eddeos editados/m\u00eas', 'Roteiros para grava\u00e7\u00e3o', 'Banco de criativos organizado'] },
    { icon: 'sparkles', title: 'Servi\u00e7os Extras', desc: 'Para quem quer ir al\u00e9m: SEO avan\u00e7ado, e-mail marketing, chatbot com IA e gest\u00e3o de reputa\u00e7\u00e3o online.', items: ['SEO org\u00e2nico + blog posts', 'E-mail marketing autom\u00e1tico', 'Chatbot inteligente no WhatsApp', 'Monitoramento de avalia\u00e7\u00f5es'] },
  ]
  return (
    <section id="servicos" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">NOSSOS SERVI&#199;OS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Tudo que sua cl&#237;nica precisa para crescer</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Cada servi&#231;o foi pensado para resolver um problema espec&#237;fico. Voc&#234; n&#227;o precisa entender de marketing — &#233; para isso que estamos aqui.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name={s.icon} className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-midnight text-lg mb-2">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                    <Icon name="check" className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Conversa inicial', desc: 'Entendemos sua cl\u00ednica, objetivos e desafios. Sem compromisso.', time: 'Dia 1' },
    { num: '02', title: 'Diagn\u00f3stico gratuito', desc: 'Fazemos uma an\u00e1lise completa da sua presen\u00e7a digital e comparamos com concorrentes.', time: 'Semana 1' },
    { num: '03', title: 'Plano de a\u00e7\u00e3o', desc: 'Apresentamos exatamente o que precisa ser feito, com cronograma e metas claras.', time: 'Semana 2' },
    { num: '04', title: 'Execu\u00e7\u00e3o', desc: 'Nossa equipe coloca tudo para rodar: site, Google, Instagram, an\u00fancios.', time: 'Semanas 2-4' },
    { num: '05', title: 'Resultados', desc: 'Voc\u00ea come\u00e7a a receber pacientes novos e acompanha tudo por relat\u00f3rios mensais.', time: 'M\u00eas 2+' },
  ]
  return (
    <section id="como-funciona" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">COMO FUNCIONA</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Do diagn&#243;stico ao resultado em 5 passos</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Voc&#234; cuida dos pacientes. N&#243;s cuidamos de trazer eles at&#233; voc&#234;.</p>
        </div>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 sm:gap-6 items-start bg-surface rounded-2xl border border-border p-5 sm:p-6 hover:border-primary/30 transition-colors">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-lg">{s.num}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-midnight text-lg">{s.title}</h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-semibold">{s.time}</span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Plans() {
  const [tab, setTab] = useState('individual')
  const individual = [
    {
      name: 'Tr\u00e1fego Pago',
      icon: 'megaphone',
      subtitle: 'An\u00fancios que trazem pacientes',
      desc: 'Gerenciamos seus an\u00fancios no Google e Instagram para atrair pacientes qualificados direto para sua agenda.',
      features: [
        'Configura\u00e7\u00e3o de Google Ads + Meta Ads',
        'Cria\u00e7\u00e3o de 1 landing page por campanha',
        'Otimiza\u00e7\u00e3o 2-3x por semana',
        '4-8 criativos de an\u00fancio por m\u00eas',
        'Remarketing para quem visitou o site',
        'Relat\u00f3rio mensal (CPL, CPA, ROAS)',
        'Reuni\u00e3o mensal de resultados',
      ],
      ideal: 'Ideal para quem j\u00e1 tem site e Instagram, mas n\u00e3o recebe pacientes pelo digital.',
    },
    {
      name: 'Social Media',
      icon: 'instagram',
      subtitle: 'Presen\u00e7a que gera autoridade',
      desc: 'Cuidamos do seu Instagram por completo: conte\u00fado, visuais, Reels, Stories e intera\u00e7\u00e3o com seguidores.',
      features: [
        'Otimiza\u00e7\u00e3o do perfil e bio',
        '12-16 posts/m\u00eas (feed + carross\u00e9is)',
        '4-8 Reels editados por m\u00eas',
        '15-20 Stories/m\u00eas',
        'Calend\u00e1rio editorial mensal',
        'Resposta a coment\u00e1rios e DMs',
        'Relat\u00f3rio mensal de m\u00e9tricas',
      ],
      ideal: 'Ideal para quem quer construir autoridade e atrair pacientes pelo Instagram.',
    },
    {
      name: 'Site + Manuten\u00e7\u00e3o',
      icon: 'globe',
      subtitle: 'Sua cl\u00ednica 24h no ar',
      desc: 'Criamos seu site profissional e cuidamos da manuten\u00e7\u00e3o mensal: atualiza\u00e7\u00f5es, seguran\u00e7a e novos conte\u00fados.',
      features: [
        'Site institucional completo (6-8 p\u00e1ginas)',
        'Design mobile-first e r\u00e1pido',
        'Bot\u00e3o de WhatsApp + agendamento',
        'SEO b\u00e1sico (Google Search Console + GA4)',
        'Manuten\u00e7\u00e3o mensal (atualiza\u00e7\u00f5es e corre\u00e7\u00f5es)',
        '1-2 blog posts/m\u00eas (SEO)',
        'Certificado SSL + conformidade CFM',
      ],
      ideal: 'Ideal para quem n\u00e3o tem site ou tem um site antigo que n\u00e3o gera resultado.',
    },
    {
      name: 'Google Meu Neg\u00f3cio',
      icon: 'map',
      subtitle: 'Apare\u00e7a no Google Maps',
      desc: 'Otimizamos e mantemos seu perfil no Google para voc\u00ea aparecer quando pacientes pesquisarem perto de voc\u00ea.',
      features: [
        'Cria\u00e7\u00e3o ou otimiza\u00e7\u00e3o do perfil',
        'Upload de fotos profissionais',
        'Posts semanais no Google',
        'Gest\u00e3o de avalia\u00e7\u00f5es (resposta em 24h)',
        'Cadastro de todos os servi\u00e7os',
        'Relat\u00f3rio mensal de insights',
        'Meta: top 3 no Google Maps',
      ],
      ideal: 'Ideal para quem depende de busca local ("perto de mim") para atrair pacientes.',
    },
    {
      name: 'Criativos + V\u00eddeos',
      icon: 'camera',
      subtitle: 'Conte\u00fado visual profissional',
      desc: 'Produzimos as pe\u00e7as visuais e v\u00eddeos que alimentam suas redes e an\u00fancios.',
      features: [
        '10-20 pe\u00e7as est\u00e1ticas/m\u00eas',
        '4-8 v\u00eddeos editados (Reels, an\u00fancios)',
        'Roteiros para grava\u00e7\u00e3o pelo m\u00e9dico',
        'Dire\u00e7\u00e3o de grava\u00e7\u00e3o (remota ou presencial)',
        'Legendas em todos os v\u00eddeos',
        'Banco de criativos organizado',
        'Teste A/B de criativos em campanhas',
      ],
      ideal: 'Ideal como complemento para quem j\u00e1 tem gest\u00e3o de redes, mas precisa de material visual.',
    },
    {
      name: 'Auditoria + Consultoria',
      icon: 'clipboard',
      subtitle: 'Diagn\u00f3stico + plano de a\u00e7\u00e3o',
      desc: 'Analisamos tudo (digital + comercial) e entregamos um plano claro do que precisa ser feito — voc\u00ea executa ou contrata a gente.',
      features: [
        'Diagn\u00f3stico digital completo (score 0-100)',
        'Diagn\u00f3stico comercial (funil de vendas)',
        'An\u00e1lise de 5-10 concorrentes',
        'Pesquisa de keywords + volume de busca',
        'Scripts de atendimento prontos',
        'Plano de a\u00e7\u00e3o priorizado (90 dias)',
        'Apresenta\u00e7\u00e3o executiva para o m\u00e9dico',
      ],
      ideal: 'Ideal para quem quer entender a situa\u00e7\u00e3o antes de investir em marketing cont\u00ednuo.',
    },
  ]
  const bundles = [
    {
      name: 'Pulso Starter',
      subtitle: 'Para quem est\u00e1 come\u00e7ando',
      desc: 'Ideal para cl\u00ednicas que ainda n\u00e3o t\u00eam presen\u00e7a digital ou est\u00e3o no in\u00edcio.',
      popular: false,
      features: [
        'Diagn\u00f3stico completo (comercial + digital)',
        'Google Meu Neg\u00f3cio (cria\u00e7\u00e3o + manuten\u00e7\u00e3o)',
        '12 posts/m\u00eas no Instagram',
        '10 stories/m\u00eas',
        '12 pe\u00e7as visuais por m\u00eas',
        'Relat\u00f3rio mensal de resultados',
      ],
    },
    {
      name: 'Pulso Growth',
      subtitle: 'Para quem quer crescer r\u00e1pido',
      desc: 'Para cl\u00ednicas que querem acelerar a capta\u00e7\u00e3o de pacientes com an\u00fancios e site.',
      popular: true,
      features: [
        'Tudo do Starter +',
        'Pesquisa de mercado completa',
        'Site institucional profissional',
        '1 landing page por campanha',
        'Gest\u00e3o de Google Ads + Meta Ads',
        '16 posts + 8 Reels + 20 stories/m\u00eas',
        '16 pe\u00e7as + 4 v\u00eddeos editados/m\u00eas',
        'Auditoria comercial + scripts',
        'Reuni\u00e3o mensal de alinhamento',
      ],
    },
    {
      name: 'Pulso Pro',
      subtitle: 'Para quem quer dominar',
      desc: 'Para cl\u00ednicas que querem ser refer\u00eancia absoluta na regi\u00e3o.',
      popular: false,
      features: [
        'Tudo do Growth +',
        'SEO avan\u00e7ado + 4 blog posts/m\u00eas',
        'E-mail marketing + CRM',
        'Gest\u00e3o de reputa\u00e7\u00e3o online',
        'Chatbot inteligente no WhatsApp',
        'Multi-plataforma (IG + TikTok + YouTube)',
        '20 pe\u00e7as + 8 v\u00eddeos editados/m\u00eas',
        'Dashboard em tempo real',
        'Reuni\u00e3o quinzenal estrat\u00e9gica',
      ],
    },
  ]
  return (
    <section id="planos" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">PLANOS E SERVI&#199;OS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Monte o plano ideal para sua cl&#237;nica</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Contrate servi&#231;os individuais ou escolha um pacote completo. Sem surpresas, sem letras mi&#250;das.</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          <button onClick={() => setTab('individual')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === 'individual' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-muted border border-border hover:border-primary/30'}`}>
            Servi&#231;os Individuais
          </button>
          <button onClick={() => setTab('pacotes')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === 'pacotes' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-muted border border-border hover:border-primary/30'}`}>
            Pacotes Completos
          </button>
        </div>

        {tab === 'individual' && (
          <>
            <p className="text-center text-text-muted text-sm mb-8 max-w-xl mx-auto">Precisa de apenas um servi&#231;o? Escolha o que faz sentido para o momento da sua cl&#237;nica. Todos incluem relat&#243;rio mensal.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {individual.map((p, i) => (
                <div key={i} className="bg-surface rounded-2xl border border-border p-6 flex flex-col hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon name={p.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-midnight text-lg leading-tight">{p.name}</h3>
                      <p className="text-xs text-primary font-semibold">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-4 flex-1">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text">
                        <Icon name="check" className="w-4 h-4 text-green shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-surface-alt rounded-lg p-3 mb-4">
                    <p className="text-xs text-text-muted">{p.ideal}</p>
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center font-bold py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all text-sm">
                    Saber mais
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'pacotes' && (
          <>
            <p className="text-center text-text-muted text-sm mb-8 max-w-xl mx-auto">Quer tudo integrado? Nossos pacotes combinam m&#250;ltiplos servi&#231;os com desconto e estrat&#233;gia unificada.</p>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {bundles.map((p, i) => (
                <div key={i} className={`relative bg-surface rounded-2xl border ${p.popular ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]' : 'border-border'} p-6 sm:p-8 flex flex-col`}>
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">MAIS POPULAR</div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-extrabold text-midnight mb-1">{p.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-2">{p.subtitle}</p>
                    <p className="text-text-muted text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mb-6">
                    <div className="text-text-muted text-sm mb-1">Investimento mensal</div>
                    <div className="text-midnight font-extrabold text-lg">Consulte valores</div>
                    <div className="text-xs text-text-muted">Contrato m&#237;nimo: 6 meses</div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-text">
                        <Icon name="check" className="w-4 h-4 text-green shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`block text-center font-bold py-3.5 rounded-xl transition-all ${p.popular ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}>
                    Quero esse pacote
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-10 space-y-2">
          <p className="text-text-muted text-sm">
            <strong>N&#227;o sabe qual escolher?</strong> Come&#231;e pelo diagn&#243;stico gratuito — n&#243;s recomendamos o melhor caminho.
          </p>
          <p className="text-text-muted text-sm">
            <strong>Importante:</strong> o investimento em an&#250;ncios (Google/Meta Ads) &#233; pago pela cl&#237;nica diretamente &#224;s plataformas, n&#227;o faz parte da mensalidade.
          </p>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    { value: '+30%', label: 'Mais leads em 90 dias' },
    { value: '85%', label: 'Ocupa\u00e7\u00e3o da agenda' },
    { value: 'Top 3', label: 'No Google Maps' },
    { value: '5x', label: 'Retorno sobre an\u00fancios' },
  ]
  return (
    <section id="resultados" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">RESULTADOS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">N&#250;meros que importam para voc&#234;</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">N&#227;o falamos de curtidas ou seguidores. Falamos de pacientes na agenda.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">{m.value}</div>
              <div className="text-sm text-text-muted">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-midnight rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">Investimento em an&#250;ncios: quanto custa trazer pacientes?</h3>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">B&#225;sico</div>
              <div className="text-white text-2xl font-bold">R$1-2 mil/m&#234;s</div>
              <div className="text-white/60 text-sm mt-1">30-60 leads/m&#234;s</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">Intermedi&#225;rio</div>
              <div className="text-white text-2xl font-bold">R$2-5 mil/m&#234;s</div>
              <div className="text-white/60 text-sm mt-1">60-150 leads/m&#234;s</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">Avan&#231;ado</div>
              <div className="text-white text-2xl font-bold">R$5-15 mil/m&#234;s</div>
              <div className="text-white/60 text-sm mt-1">150-400+ leads/m&#234;s</div>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-6">Valores baseados em CPC m&#233;dio de R$3-8 na &#225;rea de sa&#250;de e taxa de convers&#227;o de 5-15%</p>
        </div>
      </div>
    </section>
  )
}

function Differentials() {
  const items = [
    { icon: 'shield', title: 'Conformidade com o CFM', desc: 'Conhecemos as regras de publicidade m\u00e9dica. Seu marketing \u00e9 eficaz E legal.' },
    { icon: 'chart', title: 'Foco na agenda, n\u00e3o em m\u00e9tricas', desc: 'Nosso KPI principal \u00e9 pacientes agendados — n\u00e3o likes, seguidores ou cliques.' },
    { icon: 'zap', title: 'Sistema, n\u00e3o campanha', desc: 'Criamos uma m\u00e1quina de atra\u00e7\u00e3o que funciona 24/7, n\u00e3o a\u00e7\u00f5es pontuais.' },
    { icon: 'heart', title: 'Especialistas em sa\u00fade', desc: 'S\u00f3 trabalhamos com cl\u00ednicas m\u00e9dicas. Entendemos o mercado de dentro.' },
    { icon: 'calendar', title: 'Contrato com compromisso', desc: 'M\u00ednimo 6 meses porque resultado consistente leva 60-90 dias. Sem atalhos.' },
    { icon: 'sparkles', title: 'Intelig\u00eancia artificial', desc: 'Usamos IA para qualificar leads, gerar conte\u00fado e otimizar campanhas.' },
  ]
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">POR QUE A PULSO</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">N&#227;o somos uma ag&#234;ncia gen&#233;rica</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Somos especialistas em marketing para cl&#237;nicas m&#233;dicas. Isso faz toda a diferen&#231;a.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={item.icon} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-midnight mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
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
    { q: 'Preciso entender de marketing para contratar?', a: 'N\u00e3o. Nosso trabalho \u00e9 justamente cuidar de tudo para voc\u00ea. Explicamos cada passo em linguagem simples e enviamos relat\u00f3rios claros todo m\u00eas mostrando quantos pacientes novos chegaram.' },
    { q: 'Quanto tempo demora para ver resultado?', a: 'Os primeiros leads come\u00e7am a aparecer nas primeiras semanas ap\u00f3s as campanhas entrarem no ar. Resultados consistentes e previs\u00edveis levam de 60 a 90 dias. Por isso trabalhamos com contrato m\u00ednimo de 6 meses.' },
    { q: 'O investimento em an\u00fancios est\u00e1 incluso no plano?', a: 'N\u00e3o. O valor do plano cobre todo o nosso trabalho (estrat\u00e9gia, cria\u00e7\u00e3o, gest\u00e3o). O investimento em an\u00fancios (Google e Instagram) \u00e9 pago por voc\u00ea diretamente \u00e0s plataformas. Recomendamos a partir de R$1.000/m\u00eas para come\u00e7ar.' },
    { q: 'E se eu j\u00e1 tenho ag\u00eancia ou fa\u00e7o marketing sozinho?', a: 'Podemos come\u00e7ar pelo diagn\u00f3stico gratuito. Ele mostra exatamente onde est\u00e3o os gaps e o que pode ser melhorado. Se voc\u00ea est\u00e1 satisfeito com o resultado atual, \u00f3timo. Se n\u00e3o, mostramos o caminho.' },
    { q: 'Voc\u00eas trabalham com qual especialidade?', a: 'Trabalhamos com todas as especialidades m\u00e9dicas: est\u00e9tica, odontologia, dermatologia, ortopedia, oftalmologia, cardiologia e demais. Adaptamos a estrat\u00e9gia para cada \u00e1rea.' },
    { q: 'O marketing \u00e9 feito dentro das regras do CFM?', a: 'Sim, sempre. Conhecemos as normas de publicidade m\u00e9dica (Resolu\u00e7\u00e3o CFM 2.336/2023) e garantimos que todo conte\u00fado est\u00e1 em conformidade. Isso inclui restri\u00e7\u00f5es sobre pre\u00e7os, antes/depois e depoimentos.' },
    { q: 'Posso cancelar a qualquer momento?', a: 'O contrato m\u00ednimo \u00e9 de 6 meses. Isso existe porque marketing \u00e9 constru\u00e7\u00e3o, n\u00e3o m\u00e1gica. Ap\u00f3s os 6 meses, a renova\u00e7\u00e3o \u00e9 mensal e voc\u00ea pode cancelar a qualquer momento.' },
    { q: 'Como acompanho os resultados?', a: 'Enviamos relat\u00f3rios mensais com linguagem simples: quantos pacientes ligaram, quantos agendaram, quanto custou cada lead, como est\u00e1 o Google e o Instagram. Al\u00e9m disso, temos reuni\u00f5es peri\u00f3dicas para alinhar estrat\u00e9gia.' },
  ]
  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">D&#218;VIDAS FREQUENTES</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Perguntas que voc&#234; pode ter</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-alt transition-colors">
                <span className="font-semibold text-midnight text-sm sm:text-base pr-4">{faq.q}</span>
                <svg className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5">
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
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
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-midnight rounded-3xl p-8 sm:p-14 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">Pronto para lotar sua agenda?</h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Comece com um diagn&#243;stico gratuito da sua presen&#231;a digital. Sem compromisso, sem enrola&#231;&#227;o.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-xl">
          <Icon name="phone" className="w-5 h-5" />
          Falar com Especialista
        </a>
        <p className="text-white/50 text-sm mt-6">Diagn&#243;stico gratuito &#8226; Resposta em at&#233; 2h &#8226; Sem compromisso</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 bg-surface">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="zap" className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-midnight">Pulso</span>
          <span className="text-text-muted text-sm">por Trion Marketing</span>
        </div>
        <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} Trion Marketing. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

function App() {
  const [page, setPage] = useState(window.location.hash === '#/wiki' ? 'wiki' : 'home')

  useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#/wiki' ? 'wiki' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (page === 'wiki') return <Wiki />

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <HowItWorks />
      <Plans />
      <Results />
      <Differentials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App

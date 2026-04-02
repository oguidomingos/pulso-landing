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
          <a href="#servicos" className="text-sm text-text-muted hover:text-primary transition-colors">Serviços</a>
          <a href="#como-funciona" className="text-sm text-text-muted hover:text-primary transition-colors">Como Funciona</a>
          <a href="#planos" className="text-sm text-text-muted hover:text-primary transition-colors">Planos</a>
          <a href="#resultados" className="text-sm text-text-muted hover:text-primary transition-colors">Resultados</a>
          <a href="#faq" className="text-sm text-text-muted hover:text-primary transition-colors">Dúvidas</a>
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
          <a href="#servicos" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Serviços</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Como Funciona</a>
          <a href="#planos" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Planos</a>
          <a href="#resultados" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Resultados</a>
          <a href="#faq" onClick={() => setOpen(false)} className="block text-sm text-text-muted hover:text-primary">Dúvidas</a>
          <a href="#/wiki" onClick={() => setOpen(false)} className="block text-sm font-semibold text-primary hover:text-primary-dark">Wiki de Serviços</a>
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
          Marketing especializado para clínicas médicas
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-midnight leading-tight mb-6">
          Sua clínica merece uma <span className="text-primary">agenda cheia</span> todos os dias
        </h1>
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          A Pulso transforma o marketing da sua clínica em um <strong>sistema previsível</strong> de atração de pacientes — com estratégia, dados e resultados que você consegue medir.
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
            Especialistas em saúde
          </div>
        </div>
      </div>
    </section>
  )
}

function PainPoints() {
  const points = [
    { title: 'Agenda com horários vagos', desc: 'Você tem capacidade para atender mais pacientes, mas eles não chegam.' },
    { title: 'Dependência de indicações', desc: 'Quando as indicações param, a receita cai. Não há previsibilidade.' },
    { title: 'Marketing que não dá resultado', desc: 'Já gastou com agência ou posts no Instagram, mas não viu retorno.' },
    { title: 'Não aparece no Google', desc: 'Pacientes pesquisam "é perto de mim", e sua clínica não aparece.' },
  ]
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Você se identifica com isso?</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">A maioria das clínicas enfrenta esses problemas. A diferença é que agora existe uma solução.</p>
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
    { icon: 'clipboard', title: 'Diagnóstico Completo', desc: 'Analisamos tudo: sua clínica, preços, concorrentes, presença digital. Você recebe um raio-X completo de onde está e para onde pode ir.', items: ['Análise comercial (preços, serviços, ocupação)', 'Auditoria digital (Google, Instagram, site)', 'Comparação com concorrentes da região', 'Score de posicionamento 0-100'] },
    { icon: 'search', title: 'Pesquisa de Mercado', desc: 'Descobrimos quem são seus pacientes ideais, o que pesquisam no Google e como fazer eles chegarem até você.', items: ['Perfil do paciente ideal', 'Volume de buscas na sua região', 'Análise de concorrentes', 'Oportunidades por sazonalidade'] },
    { icon: 'map', title: 'Google Meu Negócio', desc: 'Colocamos sua clínica no mapa — literalmente. Quando alguém pesquisar "dentista perto de mim", você aparece.', items: ['Perfil otimizado e verificado', 'Fotos profissionais e posts semanais', 'Gestão de avaliações', 'Meta: top 3 no Google Maps'] },
    { icon: 'globe', title: 'Site Profissional', desc: 'Criamos seu site pensando no celular, rápido, bonito e feito para o paciente agendar — não só para "ter um site".', items: ['Design mobile-first', 'Botão de WhatsApp e agendamento', 'Otimizado para Google (SEO)', 'Conforme regras do CFM'] },
    { icon: 'target', title: 'Landing Pages', desc: 'Páginas focadas em um único objetivo: fazer o paciente agendar. Usadas com anúncios para máximo resultado.', items: ['Uma página por campanha', 'Textos persuasivos', 'Formulário ou WhatsApp direto', 'Teste A/B para otimização'] },
    { icon: 'megaphone', title: 'Anúncios (Tráfego Pago)', desc: 'Gerenciamos seus anúncios no Google e Instagram para atrair pacientes qualificados, não curiosos.', items: ['Google Ads + Meta Ads', 'Otimização 2-3x por semana', 'Relatório mensal de resultados', 'Remarketing inteligente'] },
    { icon: 'users', title: 'Auditoria Comercial', desc: 'Analisamos como sua equipe atende — do WhatsApp à recepção. De nada adianta traçar pacientes se o atendimento perde a venda.', items: ['Análise do funil de vendas', 'Scripts de atendimento prontos', 'Automações de confirmação', 'Treinamento da recepção'] },
    { icon: 'instagram', title: 'Redes Sociais', desc: 'Gerenciamos seu Instagram com conteúdo que gera autoridade e atrai pacientes — não só likes.', items: ['12-20 posts por mês', 'Reels e Stories', 'Calendário editorial mensal', 'Gestão de comentários e DMs'] },
    { icon: 'camera', title: 'Criativos (Fotos e Vídeos)', desc: 'Produzimos as peças visuais: posts, anúncios, vídeos curtos. Tudo pronto para publicar.', items: ['10-20 peças estáticas/mês', '4-8 vídeos editados/mês', 'Roteiros para gravação', 'Banco de criativos organizado'] },
    { icon: 'sparkles', title: 'Serviços Extras', desc: 'Para quem quer ir além: SEO avançado, e-mail marketing, chatbot com IA e gestão de reputação online.', items: ['SEO orgânico + blog posts', 'E-mail marketing automático', 'Chatbot inteligente no WhatsApp', 'Monitoramento de avaliações'] },
  ]
  return (
    <section id="servicos" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">NOSSOS SERVIÇOS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Tudo que sua clínica precisa para crescer</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Cada serviço foi pensado para resolver um problema específico. Você não precisa entender de marketing — é para isso que estamos aqui.</p>
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
    { num: '01', title: 'Conversa inicial', desc: 'Entendemos sua clínica, objetivos e desafios. Sem compromisso.', time: 'Dia 1' },
    { num: '02', title: 'Diagnóstico gratuito', desc: 'Fazemos uma análise completa da sua presença digital e comparamos com concorrentes.', time: 'Semana 1' },
    { num: '03', title: 'Plano de ação', desc: 'Apresentamos exatamente o que precisa ser feito, com cronograma e metas claras.', time: 'Semana 2' },
    { num: '04', title: 'Execução', desc: 'Nossa equipe coloca tudo para rodar: site, Google, Instagram, anúncios.', time: 'Semanas 2-4' },
    { num: '05', title: 'Resultados', desc: 'Você começa a receber pacientes novos e acompanha tudo por relatórios mensais.', time: 'Mês 2+' },
  ]
  return (
    <section id="como-funciona" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">COMO FUNCIONA</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Do diagnóstico ao resultado em 5 passos</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Você cuida dos pacientes. Nós cuidamos de trazer eles até você.</p>
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
      name: 'Tráfego Pago',
      icon: 'megaphone',
      subtitle: 'Anúncios que trazem pacientes',
      desc: 'Gerenciamos seus anúncios no Google e Instagram para atrair pacientes qualificados direto para sua agenda.',
      features: [
        'Configuração de Google Ads + Meta Ads',
        'Criação de 1 landing page por campanha',
        'Otimização 2-3x por semana',
        '4-8 criativos de anúncio por mês',
        'Remarketing para quem visitou o site',
        'Relatório mensal (CPL, CPA, ROAS)',
        'Reunião mensal de resultados',
      ],
      ideal: 'Ideal para quem já tem site e Instagram, mas não recebe pacientes pelo digital.',
    },
    {
      name: 'Social Media',
      icon: 'instagram',
      subtitle: 'Presença que gera autoridade',
      desc: 'Cuidamos do seu Instagram por completo: conteúdo, visuais, Reels, Stories e interação com seguidores.',
      features: [
        'Otimização do perfil e bio',
        '12-16 posts/mês (feed + carrosséis)',
        '4-8 Reels editados por mês',
        '15-20 Stories/mês',
        'Calendário editorial mensal',
        'Resposta a comentários e DMs',
        'Relatório mensal de métricas',
      ],
      ideal: 'Ideal para quem quer construir autoridade e atrair pacientes pelo Instagram.',
    },
    {
      name: 'Site + Manutenção',
      icon: 'globe',
      subtitle: 'Sua clínica 24h no ar',
      desc: 'Criamos seu site profissional e cuidamos da manutenção mensal: atualizações, segurança e novos conteúdos.',
      features: [
        'Site institucional completo (6-8 páginas)',
        'Design mobile-first e rápido',
        'Botão de WhatsApp + agendamento',
        'SEO básico (Google Search Console + GA4)',
        'Manutenção mensal (atualizações e correções)',
        '1-2 blog posts/mês (SEO)',
        'Certificado SSL + conformidade CFM',
      ],
      ideal: 'Ideal para quem não tem site ou tem um site antigo que não gera resultado.',
    },
    {
      name: 'Google Meu Negócio',
      icon: 'map',
      subtitle: 'Apareça no Google Maps',
      desc: 'Otimizamos e mantemos seu perfil no Google para você aparecer quando pacientes pesquisarem perto de você.',
      features: [
        'Criação ou otimização do perfil',
        'Upload de fotos profissionais',
        'Posts semanais no Google',
        'Gestão de avaliações (resposta em 24h)',
        'Cadastro de todos os serviços',
        'Relatório mensal de insights',
        'Meta: top 3 no Google Maps',
      ],
      ideal: 'Ideal para quem depende de busca local ("perto de mim") para atrair pacientes.',
    },
    {
      name: 'Criativos + Vídeos',
      icon: 'camera',
      subtitle: 'Conteúdo visual profissional',
      desc: 'Produzimos as peças visuais e vídeos que alimentam suas redes e anúncios.',
      features: [
        '10-20 peças estáticas/mês',
        '4-8 vídeos editados (Reels, anúncios)',
        'Roteiros para gravação pelo médico',
        'Direção de gravação (remota ou presencial)',
        'Legendas em todos os vídeos',
        'Banco de criativos organizado',
        'Teste A/B de criativos em campanhas',
      ],
      ideal: 'Ideal como complemento para quem já tem gestão de redes, mas precisa de material visual.',
    },
    {
      name: 'Auditoria + Consultoria',
      icon: 'clipboard',
      subtitle: 'Diagnóstico + plano de ação',
      desc: 'Analisamos tudo (digital + comercial) e entregamos um plano claro do que precisa ser feito — você executa ou contrata a gente.',
      features: [
        'Diagnóstico digital completo (score 0-100)',
        'Diagnóstico comercial (funil de vendas)',
        'Análise de 5-10 concorrentes',
        'Pesquisa de keywords + volume de busca',
        'Scripts de atendimento prontos',
        'Plano de ação priorizado (90 dias)',
        'Apresentação executiva para o médico',
      ],
      ideal: 'Ideal para quem quer entender a situação antes de investir em marketing contínuo.',
    },
  ]
  const bundles = [
    {
      name: 'Pulso Starter',
      subtitle: 'Para quem está começando',
      desc: 'Ideal para clínicas que ainda não têm presença digital ou estão no início.',
      popular: false,
      features: [
        'Diagnóstico completo (comercial + digital)',
        'Google Meu Negócio (criação + manutenção)',
        '12 posts/mês no Instagram',
        '10 stories/mês',
        '12 peças visuais por mês',
        'Relatório mensal de resultados',
      ],
    },
    {
      name: 'Pulso Growth',
      subtitle: 'Para quem quer crescer rápido',
      desc: 'Para clínicas que querem acelerar a captação de pacientes com anúncios e site.',
      popular: true,
      features: [
        'Tudo do Starter +',
        'Pesquisa de mercado completa',
        'Site institucional profissional',
        '1 landing page por campanha',
        'Gestão de Google Ads + Meta Ads',
        '16 posts + 8 Reels + 20 stories/mês',
        '16 peças + 4 vídeos editados/mês',
        'Auditoria comercial + scripts',
        'Reunião mensal de alinhamento',
      ],
    },
    {
      name: 'Pulso Pro',
      subtitle: 'Para quem quer dominar',
      desc: 'Para clínicas que querem ser referência absoluta na região.',
      popular: false,
      features: [
        'Tudo do Growth +',
        'SEO avançado + 4 blog posts/mês',
        'E-mail marketing + CRM',
        'Gestão de reputação online',
        'Chatbot inteligente no WhatsApp',
        'Multi-plataforma (IG + TikTok + YouTube)',
        '20 peças + 8 vídeos editados/mês',
        'Dashboard em tempo real',
        'Reunião quinzenal estratégica',
      ],
    },
  ]
  return (
    <section id="planos" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">PLANOS E SERVIÇOS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Monte o plano ideal para sua clínica</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Contrate serviços individuais ou escolha um pacote completo. Sem surpresas, sem letras miúdas.</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          <button onClick={() => setTab('individual')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === 'individual' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-muted border border-border hover:border-primary/30'}`}>
            Serviços Individuais
          </button>
          <button onClick={() => setTab('pacotes')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === 'pacotes' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-muted border border-border hover:border-primary/30'}`}>
            Pacotes Completos
          </button>
        </div>

        {tab === 'individual' && (
          <>
            <p className="text-center text-text-muted text-sm mb-8 max-w-xl mx-auto">Precisa de apenas um serviço? Escolha o que faz sentido para o momento da sua clínica. Todos incluem relatório mensal.</p>
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
            <p className="text-center text-text-muted text-sm mb-8 max-w-xl mx-auto">Quer tudo integrado? Nossos pacotes combinam múltiplos serviços com desconto e estratégia unificada.</p>
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
                    <div className="text-xs text-text-muted">Contrato mínimo: 6 meses</div>
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
            <strong>Não sabe qual escolher?</strong> Comece pelo diagnóstico gratuito — nós recomendamos o melhor caminho.
          </p>
          <p className="text-text-muted text-sm">
            <strong>Importante:</strong> o investimento em anúncios (Google/Meta Ads) é pago pela clínica diretamente às plataformas, não faz parte da mensalidade.
          </p>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    { value: '+30%', label: 'Mais leads em 90 dias' },
    { value: '85%', label: 'Ocupação da agenda' },
    { value: 'Top 3', label: 'No Google Maps' },
    { value: '5x', label: 'Retorno sobre anúncios' },
  ]
  return (
    <section id="resultados" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">RESULTADOS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Números que importam para você</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Não falamos de curtidas ou seguidores. Falamos de pacientes na agenda.</p>
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
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">Investimento em anúncios: quanto custa trazer pacientes?</h3>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">Básico</div>
              <div className="text-white text-2xl font-bold">R$1-2 mil/mês</div>
              <div className="text-white/60 text-sm mt-1">30-60 leads/mês</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">Intermediário</div>
              <div className="text-white text-2xl font-bold">R$2-5 mil/mês</div>
              <div className="text-white/60 text-sm mt-1">60-150 leads/mês</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5">
              <div className="text-lilac text-sm font-semibold mb-1">Avançado</div>
              <div className="text-white text-2xl font-bold">R$5-15 mil/mês</div>
              <div className="text-white/60 text-sm mt-1">150-400+ leads/mês</div>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-6">Valores baseados em CPC médio de R$3-8 na área de saúde e taxa de conversão de 5-15%</p>
        </div>
      </div>
    </section>
  )
}

function Differentials() {
  const items = [
    { icon: 'shield', title: 'Conformidade com o CFM', desc: 'Conhecemos as regras de publicidade médica. Seu marketing é eficaz E legal.' },
    { icon: 'chart', title: 'Foco na agenda, não em métricas', desc: 'Nosso KPI principal é pacientes agendados — não likes, seguidores ou cliques.' },
    { icon: 'zap', title: 'Sistema, não campanha', desc: 'Criamos uma máquina de atração que funciona 24/7, não ações pontuais.' },
    { icon: 'heart', title: 'Especialistas em saúde', desc: 'Só trabalhamos com clínicas médicas. Entendemos o mercado de dentro.' },
    { icon: 'calendar', title: 'Contrato com compromisso', desc: 'Mínimo 6 meses porque resultado consistente leva 60-90 dias. Sem atalhos.' },
    { icon: 'sparkles', title: 'Inteligência artificial', desc: 'Usamos IA para qualificar leads, gerar conteúdo e otimizar campanhas.' },
  ]
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">POR QUE A PULSO</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Não somos uma agência genérica</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Somos especialistas em marketing para clínicas médicas. Isso faz toda a diferença.</p>
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
    { q: 'Preciso entender de marketing para contratar?', a: 'Não. Nosso trabalho é justamente cuidar de tudo para você. Explicamos cada passo em linguagem simples e enviamos relatórios claros todo mês mostrando quantos pacientes novos chegaram.' },
    { q: 'Quanto tempo demora para ver resultado?', a: 'Os primeiros leads começam a aparecer nas primeiras semanas após as campanhas entrarem no ar. Resultados consistentes e previsíveis levam de 60 a 90 dias. Por isso trabalhamos com contrato mínimo de 6 meses.' },
    { q: 'O investimento em anúncios está incluso no plano?', a: 'Não. O valor do plano cobre todo o nosso trabalho (estratégia, criação, gestão). O investimento em anúncios (Google e Instagram) é pago por você diretamente às plataformas. Recomendamos a partir de R$1.000/mês para começar.' },
    { q: 'E se eu já tenho agência ou faço marketing sozinho?', a: 'Podemos começar pelo diagnóstico gratuito. Ele mostra exatamente onde estão os gaps e o que pode ser melhorado. Se você está satisfeito com o resultado atual, ótimo. Se não, mostramos o caminho.' },
    { q: 'Vocês trabalham com qual especialidade?', a: 'Trabalhamos com todas as especialidades médicas: estética, odontologia, dermatologia, ortopedia, oftalmologia, cardiologia e demais. Adaptamos a estratégia para cada área.' },
    { q: 'O marketing é feito dentro das regras do CFM?', a: 'Sim, sempre. Conhecemos as normas de publicidade médica (Resolução CFM 2.336/2023) e garantimos que todo conteúdo está em conformidade. Isso inclui restrições sobre preços, antes/depois e depoimentos.' },
    { q: 'Posso cancelar a qualquer momento?', a: 'O contrato mínimo é de 6 meses. Isso existe porque marketing é construção, não mágica. Após os 6 meses, a renovação é mensal e você pode cancelar a qualquer momento.' },
    { q: 'Como acompanho os resultados?', a: 'Enviamos relatórios mensais com linguagem simples: quantos pacientes ligaram, quantos agendaram, quanto custou cada lead, como está o Google e o Instagram. Além disso, temos reuniões periódicas para alinhar estratégia.' },
  ]
  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">DÚVIDAS FREQUENTES</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-midnight mb-4">Perguntas que você pode ter</h2>
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
          Comece com um diagnóstico gratuito da sua presença digital. Sem compromisso, sem enrolação.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-xl">
          <Icon name="phone" className="w-5 h-5" />
          Falar com Especialista
        </a>
        <p className="text-white/50 text-sm mt-6">Diagnóstico gratuito • Resposta em até 2h • Sem compromisso</p>
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
  const isWikiHash = (hash) => hash.startsWith('#/wiki')
  const [page, setPage] = useState(isWikiHash(window.location.hash) ? 'wiki' : 'home')

  useEffect(() => {
    const onHash = () => setPage(isWikiHash(window.location.hash) ? 'wiki' : 'home')
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

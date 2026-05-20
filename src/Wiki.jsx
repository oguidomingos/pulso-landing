import { useState, useEffect } from 'react'

function getWikiSectionFromHash(hash) {
  const match = hash.match(/^#\/wiki\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

const baseline = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Completo',
    executive: 'Análise técnica da clínica: situação comercial e presença digital. Resultado: relatório com score de 0 a 100 e plano de ação priorizado para agendamentos de alto ticket.',
    value: 'Identifica onde a clínica perde pacientes e define o caminho técnico para escala. Elimina o "chute" no marketing.',
    deliverables: [
      'Relatório de Diagnóstico 360',
      'Score de Posicionamento Digital',
      'Benchmark de Concorrentes Regionais',
      'Mapa de Oportunidades Críticas',
    ],
    playbook: [
      { step: 'Briefing Técnico', desc: 'Coleta de dados de serviços, agenda e ticket médio.', time: 'Dia 1' },
      { step: 'Auditoria Digital', desc: 'Avaliação de Google, IG e Site (Core Web Vitals).', time: 'Dias 2-3' },
      { step: 'Scoring', desc: 'Pontuação de 0-100 baseada em métricas de conversão.', time: 'Dias 4-5' },
      { step: 'Apresentação', desc: 'Entrega do plano de ação em reunião estratégica.', time: 'Dia 7' },
    ],
  },
  {
    id: 'pesquisa',
    title: 'Pesquisa de Mercado',
    executive: 'Inteligência de dados aplicada à região da clínica. Mapeamento de demanda, custo por clique (CPC) e comportamento do paciente ideal.',
    value: 'Direciona o investimento para onde há maior volume de busca qualificada e menor concorrência técnica.',
    deliverables: [
      'Relatório de Demanda Regional',
      'Planilha de Keywords de Alto Valor',
      'Perfil Psicológico da Persona (Paciente)',
      'Análise de Sazonalidade Local',
    ],
    playbook: [
      { step: 'Mapping', desc: 'Identificar termos que o paciente pesquisa no Google.', time: 'Dias 1-2' },
      { step: 'Competitive Intel', desc: 'Analisar o que as clínicas vizinhas estão anunciando.', time: 'Dias 3-4' },
      { step: 'Persona Build', desc: 'Definir dores e desejos do público de alto ticket.', time: 'Dias 5-6' },
    ],
  },
]

const categories = [
  {
    id: 'trafego-pago',
    title: 'Tráfego Pago Elite',
    icon: 'rocket',
    executive: 'Gestão de campanhas de alta performance no Google Ads e Meta Ads. Foco total em ROI e aquisição de pacientes qualificados.',
    value: 'Gera fluxo imediato de leads. Transformamos cliques em agendamentos através de segmentação técnica avançada.',
    deliverables: [
      'Campanhas Google & Meta Ativas',
      'Dashboards Live de Performance',
      'Relatórios quinzenais de ROI',
      'Gestão de Budget Dinâmico',
    ],
    playbook: [
      { step: 'Setup Técnico', desc: 'Instalação de Pixels, GTM e conversões.', time: 'Dias 1-2' },
      { step: 'Creative Ops', desc: 'Produção de anúncios focados em conversão.', time: 'Dias 3-5' },
      { step: 'Scale', desc: 'Otimização diária de lances e audiências.', time: 'Contínuo' },
    ],
    subservices: [
      {
        id: 'gmb',
        title: 'Google Maps Premium',
        tag: 'Essencial',
        executive: 'Domínio das buscas locais. Posicionamos a clínica nas 3 primeiras posições do Google Maps para sua especialidade.',
        value: 'Gera agendamentos orgânicos (sem custo por clique) através de relevância geográfica.',
        deliverables: ['Otimização de Perfil GMB', 'Gestão de Reviews', 'Posts Técnicos Semanais'],
        playbook: [
          { step: 'Auditoria', desc: 'Checklist de 30 pontos de relevância local.', time: 'Dia 1' },
          { step: 'Optimization', desc: 'Keyword stuffing natural e upload de fotos.', time: 'Dias 2-4' },
        ],
      },
    ],
  },
  {
    id: 'site',
    title: 'Ecossistema de Conversão',
    icon: 'globe',
    tag: 'Infraestrutura',
    executive: 'Desenvolvimento de sites e landing pages mobile-first de altíssima velocidade. Foco em UX para o setor médico.',
    value: 'A base de toda a operação. Um site rápido e persuasivo triplica a conversão de anúncios.',
    deliverables: [
      'Site High-Speed (PageSpeed 90+)',
      'Landing Pages de Procedimentos',
      'SEO Técnico On-page',
    ],
    playbook: [
      { step: 'Wireframing', desc: 'Desenho da jornada do paciente no site.', time: 'Semana 1' },
      { step: 'Development', desc: 'Codificação mobile-first e integrações.', time: 'Semanas 2-3' },
    ],
    subservices: [],
  },
]

function CategoryIcon({ type }) {
  const icons = {
    rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3M22 2l-7.69 7.69M15 9.35V4l7-2-2 7h-5.35M14 17.85V22l4-3-3.15-1.15"/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></>,
    lightbulb: <><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></>,
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  )
}

function BaselineCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div id={item.id} className="glass-card p-8 scroll-mt-24 bg-white/60">
      <h3 className="font-black text-[#0D1B2A] text-2xl mb-4">{item.title}</h3>
      <p className="text-[#5A6B7A] text-base leading-relaxed mb-6 font-medium">{item.executive}</p>
      <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-8 border border-[#0D1B2A]/5">
        <h4 className="text-[10px] font-black text-[#00BFA5] uppercase tracking-widest mb-2">Value Proposition</h4>
        <p className="text-[#0D1B2A] text-sm leading-relaxed font-bold">{item.value}</p>
      </div>
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-[#5A6B7A] uppercase tracking-widest mb-4">Entregáveis</h4>
        <ul className="space-y-3">
          {item.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#0D1B2A]">
              <div className="w-5 h-5 rounded-full bg-[#00BFA5]/10 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#00BFA5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-[#0D1B2A] font-black text-[10px] uppercase tracking-widest hover:text-[#00BFA5] transition-colors">
        <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
        {expanded ? 'Fechar Detalhes' : 'Ver Metodologia'}
      </button>
      {expanded && (
        <div className="mt-8 border-t border-[#0D1B2A]/5 pt-8 space-y-6">
          {item.playbook.map((p, i) => (
            <div key={i} className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-[#0D1B2A] text-white flex items-center justify-center text-xs font-black">{i + 1}</div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-[#0D1B2A] text-sm">{p.step}</h4>
                  <span className="text-[9px] text-[#00BFA5] font-black uppercase bg-[#00BFA5]/5 px-2 py-0.5 rounded-full">{p.time}</span>
                </div>
                <p className="text-[#5A6B7A] text-sm font-medium">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CategorySection({ category }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="glass-card overflow-hidden bg-white/80">
        <div className="p-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] text-white flex items-center justify-center shadow-xl shadow-[#0D1B2A]/10">
              <CategoryIcon type={category.icon} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#0D1B2A] tracking-tight">{category.title}</h2>
              <div className="mt-1 flex gap-2">
                <span className="text-[10px] font-black text-[#00BFA5] uppercase tracking-widest bg-[#00BFA5]/5 px-3 py-1 rounded-full border border-[#00BFA5]/10">SISTEMA ATIVO</span>
              </div>
            </div>
          </div>

          <p className="text-[#5A6B7A] text-xl leading-relaxed mb-10 font-medium">{category.executive}</p>

          <div className="bg-[#F8FAFC] rounded-3xl p-8 mb-10 border border-[#0D1B2A]/5">
            <h3 className="text-[10px] font-black text-[#00BFA5] uppercase tracking-widest mb-3">Valor Estratégico</h3>
            <p className="text-[#0D1B2A] text-lg leading-relaxed font-bold">{category.value}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-[#5A6B7A] uppercase tracking-widest mb-6">Entregas de Operação</h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {category.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-4 text-base font-bold text-[#0D1B2A]">
                  <div className="w-6 h-6 rounded-full bg-[#00BFA5]/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#00BFA5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-[#0D1B2A] font-black text-[10px] uppercase tracking-widest hover:text-[#00BFA5] transition-colors">
            <svg className={`w-5 h-5 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
            {expanded ? 'Ocultar Playbook Técnico' : 'Ver Playbook Técnico'}
          </button>

          {expanded && (
            <div className="mt-10 border-t border-[#0D1B2A]/5 pt-10">
              <div className="space-y-8">
                {category.playbook.map((p, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#0D1B2A]/5 flex items-center justify-center text-lg font-black text-[#0D1B2A] shadow-sm">{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-black text-[#0D1B2A] text-lg uppercase tracking-tight">{p.step}</h4>
                        <span className="text-[10px] text-[#00BFA5] font-black uppercase bg-[#00BFA5]/5 px-3 py-1 rounded-full">{p.time}</span>
                      </div>
                      <p className="text-[#5A6B7A] text-base leading-relaxed font-medium">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {category.subservices && category.subservices.length > 0 && (
          <div className="border-t border-[#0D1B2A]/5 bg-[#F8FAFC]/50 p-10 space-y-8">
            <h3 className="text-[10px] font-black text-[#5A6B7A] uppercase tracking-widest">Módulos Especializados</h3>
            {category.subservices.map(sub => (
              <div key={sub.id} className="glass-card p-6 bg-white border-[#0D1B2A]/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-[#0D1B2A] text-xl">{sub.title}</h4>
                  <span className="text-[9px] font-black text-[#00BFA5] bg-[#00BFA5]/5 px-2 py-1 rounded-md border border-[#00BFA5]/10 uppercase tracking-widest">{sub.tag}</span>
                </div>
                <p className="text-[#5A6B7A] text-sm mb-4 font-medium">{sub.executive}</p>
                <div className="flex flex-wrap gap-2">
                  {sub.deliverables.map((d, i) => (
                    <span key={i} className="text-[10px] font-black text-[#0D1B2A]/60 bg-[#F8FAFC] border border-[#0D1B2A]/5 px-2 py-1 rounded-lg">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function WikiNav() {
  return (
    <nav className="hidden lg:block sticky top-24 w-80 shrink-0 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 custom-scrollbar">
      <div className="glass-card p-8 bg-white/90">
        <h3 className="font-black text-[#0D1B2A] text-[10px] uppercase tracking-[0.2em] mb-8 pb-4 border-b border-[#0D1B2A]/5">Index de Serviços</h3>
        <div className="mb-10">
          <p className="text-[10px] text-[#00BFA5] font-black uppercase tracking-widest mb-4">Foundation</p>
          <div className="space-y-2">
            {baseline.map(b => (
              <a key={b.id} href={`#/wiki/${b.id}`} className="block px-4 py-2 rounded-xl text-sm text-[#5A6B7A] hover:bg-[#0D1B2A] hover:text-white transition-all font-bold tracking-tight">{b.title}</a>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <p className="text-[10px] text-[#00BFA5] font-black uppercase tracking-widest mb-4">Vertical Ops</p>
          <ul className="space-y-4">
            {categories.map(c => (
              <li key={c.id}>
                <a href={`#/wiki/${c.id}`} className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-[#5A6B7A] hover:bg-[#0D1B2A] hover:text-white transition-all font-black uppercase tracking-tighter">
                   <div className="w-5 h-5 flex items-center justify-center"><CategoryIcon type={c.icon} /></div>
                  <span className="truncate">{c.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function WikiTopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#0D1B2A]/5">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="text-2xl font-black text-[#0D1B2A] tracking-tighter uppercase">Pulso <span className="text-[#00BFA5]">Wiki</span></span>
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <a href="#" className="text-xs font-black text-[#5A6B7A] hover:text-[#0D1B2A] uppercase tracking-widest transition-all">Sair da Documentação</a>
          <a href={WHATSAPP_LINK} className="btn-primary text-[10px] py-3 px-6">Suporte Estratégico</a>
        </div>
      </div>
    </nav>
  )
}

export default function Wiki() {
  useEffect(() => {
    const scrollToSection = () => {
      const sectionId = getWikiSectionFromHash(window.location.hash)
      if (!sectionId) return
      const target = document.getElementById(sectionId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    scrollToSection()
    window.addEventListener('hashchange', scrollToSection)
    return () => window.removeEventListener('hashchange', scrollToSection)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#0D1B2A]">
      <WikiTopNav />

      <div className="pt-40 pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-24 max-w-4xl">
            <span className="section-label mb-8">Technical Repository v4.2</span>
            <h1 className="text-6xl sm:text-8xl font-black text-[#0D1B2A] mb-10 tracking-tighter leading-[0.9]">
              ARQUITETURA DE<br />
              <span className="text-[#00BFA5]">GROWTH MÉDICO.</span>
            </h1>
            <p className="text-[#5A6B7A] text-2xl leading-relaxed font-medium max-w-2xl">Manual técnico dos processos, entregas e metodologias oficiais da Pulso para operações de alto ticket.</p>
          </div>

          <div className="mb-32">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#0D1B2A]/5 text-[#00BFA5] flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#0D1B2A] tracking-tight">Foundation Core</h2>
                <p className="text-sm font-bold text-[#5A6B7A] uppercase tracking-[0.2em] mt-1">Sistemas incluídos em 100% das operações ativas</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {baseline.map(b => <BaselineCard key={b.id} item={b} />)}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <WikiNav />
            <div className="flex-1 min-w-0 space-y-16">
              {categories.map(c => (
                <CategorySection key={c.id} category={c} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#0D1B2A]/5 py-20 px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0D1B2A] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="font-black text-[#0D1B2A] text-xl tracking-tighter uppercase">Pulso Wiki</span>
          </div>
          <p className="text-[#5A6B7A] text-[10px] font-black uppercase tracking-[0.3em]">Documentação Confidencial — Pulso Systems © 2024</p>
        </div>
      </footer>
    </div>
  )
}

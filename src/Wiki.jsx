import { useState, useEffect } from 'react'

const WHATSAPP_LINK = 'https://wa.me/5561999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Pulso'

const baseline = [
  {
    id: 'diagnostico',
    title: 'Diagn\u00f3stico Completo',
    executive: 'O diagn\u00f3stico \u00e9 o primeiro passo antes de qualquer a\u00e7\u00e3o de marketing. Funciona como um "check-up" da cl\u00ednica: analisamos a situa\u00e7\u00e3o comercial (pre\u00e7os, servi\u00e7os, agenda, canais de venda) e a presen\u00e7a digital (Google, Instagram, site, reputa\u00e7\u00e3o online). O resultado \u00e9 um relat\u00f3rio claro com nota de 0 a 100 e um plano do que precisa ser feito.',
    value: 'Sem diagn\u00f3stico, qualquer investimento em marketing \u00e9 chute. O m\u00e9dico descobre exatamente onde est\u00e1 perdendo pacientes e recebe um plano priorizado. Al\u00e9m disso, o diagn\u00f3stico funciona como porta de entrada comercial \u2014 demonstra compet\u00eancia antes de pedir investimento.',
    deliverables: [
      'Relat\u00f3rio de Diagn\u00f3stico (PDF/DOCX, 10-15 p\u00e1ginas)',
      'Apresenta\u00e7\u00e3o executiva (5-7 slides)',
      'Score de Posicionamento Digital (0-100) com benchmark de concorrentes',
      'Mapa de oportunidades priorizadas',
    ],
    playbook: [
      { step: 'Coleta de informa\u00e7\u00f5es', desc: 'Briefing com o m\u00e9dico/gestor: servi\u00e7os, pre\u00e7os, hist\u00f3rico, diferenciais, canais atuais, investimento em marketing. Formul\u00e1rio padronizado + call de 30min.', time: 'Dia 1' },
      { step: 'Auditoria digital', desc: 'Avaliar Google Meu Neg\u00f3cio, Instagram, site, diret\u00f3rios (Doctoralia, TopDoctors). Completude, reviews, fotos, posi\u00e7\u00e3o no Map Pack, SEO, velocidade.', time: 'Dias 2-3' },
      { step: 'An\u00e1lise comercial', desc: 'Taxa de ocupa\u00e7\u00e3o da agenda, ticket m\u00e9dio, recorr\u00eancia, mix particular/conv\u00eanio. Identificar gargalos (tempo de resposta WhatsApp, follow-up, no-show).', time: 'Dias 2-3' },
      { step: 'Benchmark concorrentes', desc: 'Mapear 3-5 concorrentes diretos: presen\u00e7a digital, nota Google, engajamento IG, posicionamento de pre\u00e7o.', time: 'Dia 4' },
      { step: 'Scoring e relat\u00f3rio', desc: 'Pontuar 0-100 em 3 plataformas (Google, IG, Site). Classificar: Cr\u00edtico (0-40), Em desenvolvimento (41-70), Otimizado (71-100). Estimar receita perdida. Montar relat\u00f3rio + apresenta\u00e7\u00e3o.', time: 'Dias 5-7' },
      { step: 'Apresenta\u00e7\u00e3o ao m\u00e9dico', desc: 'Reuni\u00e3o de 30-45min com achados, quick wins e plano recomendado. Foco na agenda (quantos pacientes a mais), n\u00e3o em m\u00e9tricas t\u00e9cnicas.', time: 'Dia 7' },
    ],
  },
  {
    id: 'pesquisa',
    title: 'Pesquisa de Marketing',
    executive: 'A pesquisa de marketing \u00e9 a intelig\u00eancia por tr\u00e1s de todas as decis\u00f5es. Descobrimos quem \u00e9 o paciente ideal, o que ele pesquisa no Google, quais concorrentes disputam esse p\u00fablico e em quais meses a demanda sobe ou cai. Com esses dados, cada real investido tem dire\u00e7\u00e3o.',
    value: 'Sem pesquisa, o marketing \u00e9 baseado em achismo. Com ela, o m\u00e9dico sabe quantas pessoas buscam seus servi\u00e7os na regi\u00e3o todo m\u00eas, quanto custa um clique e quais procedimentos t\u00eam alta demanda mas pouca oferta \u2014 oportunidades reais de crescimento.',
    deliverables: [
      'Relat\u00f3rio de Pesquisa (PDF/DOCX, 15-20 p\u00e1ginas)',
      'Planilha de keywords (50-100 termos com volume e CPC)',
      'Mapa de concorrentes (comparativo visual)',
      'Perfil de persona do paciente ideal',
    ],
    playbook: [
      { step: 'Definir persona', desc: 'Perfil demogr\u00e1fico + psicogr\u00e1fico do paciente ideal: idade, renda, dores, desejos, obje\u00e7\u00f5es, jornada de decis\u00e3o.', time: 'Dias 1-2' },
      { step: 'Pesquisa de keywords', desc: 'Mapear 50-100 termos: volume mensal, CPC, dificuldade. Organizar por cluster de servi\u00e7o. Identificar long-tails de baixa concorr\u00eancia.', time: 'Dias 2-4' },
      { step: 'An\u00e1lise de demanda', desc: 'Cruzar volume de busca com raio geogr\u00e1fico. Estimar mercado mensal em leads potenciais. Mapear sazonalidade.', time: 'Dias 3-5' },
      { step: 'Mapear concorrentes', desc: 'Analisar 5-10 concorrentes: presen\u00e7a digital, posicionamento de pre\u00e7o, volume de reviews, pontos fortes e fracos.', time: 'Dias 4-6' },
      { step: 'Consolidar relat\u00f3rio', desc: 'Documento final com personas, mapa de keywords, an\u00e1lise de concorrentes, oportunidades e recomenda\u00e7\u00f5es estrat\u00e9gicas.', time: 'Dias 7-10' },
    ],
  },
]

const categories = [
  {
    id: 'trafego-pago',
    title: 'Tr\u00e1fego Pago',
    icon: 'rocket',
    tag: null,
    executive: 'Comprar visibilidade no Google e Instagram para atrair pacientes qualificados. Gerenciamos campanhas em Google Ads (para quem j\u00e1 est\u00e1 pesquisando) e Meta Ads (para quem ainda n\u00e3o sabe que precisa). O objetivo \u00e9 gerar agendamentos a um custo previs\u00edvel.',
    value: 'Enquanto o org\u00e2nico leva meses, an\u00fancios geram leads na primeira semana. Um CPC de R$5 com 10% de convers\u00e3o = R$50 por lead. Se 25% agenda e o ticket m\u00e9dio \u00e9 R$500, cada R$1 investido retorna R$2,50. Com otimiza\u00e7\u00e3o cont\u00ednua, esse n\u00famero sobe para 5-10x em 90 dias.',
    deliverables: [
      'Campanhas ativas no Google Ads e/ou Meta Ads',
      'Landing pages por campanha',
      '4-8 criativos de an\u00fancio/m\u00eas',
      'Dashboard de m\u00e9tricas em tempo real',
      'Relat\u00f3rio mensal (CPL, CPA, ROAS, CTR)',
      'Reuni\u00e3o mensal de alinhamento',
    ],
    playbook: [
      { step: 'Setup de contas', desc: 'Criar/acessar Google Ads + Business Manager (Meta). Instalar pixel e tags de convers\u00e3o. Conectar GA4. Configurar eventos de convers\u00e3o.', time: 'Dias 1-2' },
      { step: 'Campanhas Google', desc: 'Pesquisa (termos de alta inten\u00e7\u00e3o), Google Maps ads, Display/remarketing, extens\u00f5es (sitelinks, callouts, localiza\u00e7\u00e3o, liga\u00e7\u00e3o).', time: 'Dias 2-4' },
      { step: 'Campanhas Meta', desc: 'Awareness, tr\u00e1fego para LP/WhatsApp, leads (formul\u00e1rio nativo), remarketing, lookalike.', time: 'Dias 2-4' },
      { step: 'Otimiza\u00e7\u00e3o semanal', desc: 'Ajustar lances, pausar keywords ruins, negativar termos irrelevantes, testar novos p\u00fablicos, realocar budget.', time: 'Cont\u00ednuo' },
      { step: 'Relat\u00f3rio mensal', desc: 'M\u00e9tricas-chave: CPL, CPA, ROAS, CTR. Comparar com m\u00eas anterior. Recomenda\u00e7\u00f5es + reuni\u00e3o de 30min.', time: 'Mensal' },
    ],
    subservices: [
      {
        id: 'gmb',
        title: 'Google Meu Neg\u00f3cio',
        tag: null,
        executive: 'O Google Meu Neg\u00f3cio \u00e9 o cart\u00e3o de visitas da cl\u00ednica no Google. Quando algu\u00e9m pesquisa "dermatologista perto de mim", os 3 primeiros resultados no mapa (Map Pack) recebem a maioria dos cliques. Criamos, otimizamos e mantemos o perfil para que a cl\u00ednica apare\u00e7a nessas posi\u00e7\u00f5es.',
        value: '46% de todas as buscas no Google t\u00eam inten\u00e7\u00e3o local. Um perfil GMB otimizado gera liga\u00e7\u00f5es, rotas e visitas ao site sem custo por clique. Estar no top 3 do Maps \u00e9 equivalente a estar na vitrine da rua mais movimentada da cidade.',
        deliverables: [
          'Perfil verificado e 100% preenchido',
          'Fotos profissionais (10-20 imagens)',
          'Posts semanais no Google (4-8/m\u00eas)',
          'Gest\u00e3o de avalia\u00e7\u00f5es com templates de resposta',
          'Relat\u00f3rio mensal de insights (visualiza\u00e7\u00f5es, cliques, liga\u00e7\u00f5es)',
        ],
        playbook: [
          { step: 'Verificar/criar perfil', desc: 'Criar com nome exato da cl\u00ednica, endere\u00e7o, telefone, hor\u00e1rios. Solicitar verifica\u00e7\u00e3o. Se existe: auditar com checklist de 30+ pontos.', time: 'Dias 1-3' },
          { step: 'Otimizar informa\u00e7\u00f5es', desc: 'Categoria principal + secund\u00e1rias. Descri\u00e7\u00e3o de 750 caracteres com palavras-chave. Atributos. URL do site, link de agendamento.', time: 'Dia 3' },
          { step: 'Upload de fotos', desc: 'Fachada, interior, equipe, antes/depois (quando CFM permitir). M\u00ednimo 10, ideal 20+. Geotaggear.', time: 'Dia 4' },
          { step: 'Cadastrar servi\u00e7os e Q&A', desc: 'Listar procedimentos como "servi\u00e7os" com descri\u00e7\u00e3o. Preencher 10-15 perguntas frequentes proativamente.', time: 'Dia 5' },
          { step: 'Rotina mensal', desc: '1-2 posts/semana. Responder 100% das avalia\u00e7\u00f5es em 24h. Atualizar fotos (2-4 novas/m\u00eas). Relat\u00f3rio mensal.', time: 'Cont\u00ednuo' },
        ],
      },
      {
        id: 'landing-page',
        title: 'Landing Page',
        tag: null,
        executive: 'P\u00e1gina \u00fanica com um \u00fanico objetivo: convers\u00e3o. Enquanto o site institucional tem v\u00e1rias p\u00e1ginas, a LP foca em um procedimento ou campanha espec\u00edfica e direciona toda a aten\u00e7\u00e3o para uma a\u00e7\u00e3o: agendar.',
        value: 'An\u00fancios que direcionam para o site geral convertem 2-5%. An\u00fancios para uma LP espec\u00edfica convertem 8-15%. Cada landing page bem feita pode significar o dobro ou triplo de agendamentos com o mesmo investimento.',
        deliverables: [
          'Landing page publicada e conectada a campanhas',
          'Headline testada e copywriting persuasivo',
          'Formul\u00e1rio de captura ou bot\u00e3o WhatsApp',
          'A/B testing configurado (quando h\u00e1 volume)',
        ],
        playbook: [
          { step: 'Definir campanha', desc: 'Procedimento com melhor margem ou maior demanda. Definir oferta e urg\u00eancia.', time: 'Dia 1' },
          { step: 'Copywriting', desc: 'Headline: problema + solu\u00e7\u00e3o. 3-5 bullets de benef\u00edcios. Prova social. FAQ de 5-8 perguntas.', time: 'Dias 1-2' },
          { step: 'Design e desenvolvimento', desc: 'Layout de coluna \u00fanica, sem menu. Hero com imagem/v\u00eddeo. CTA acima da dobra e repetido. Formul\u00e1rio curto.', time: 'Dias 2-4' },
          { step: 'Integra\u00e7\u00e3o e teste', desc: 'Conectar formul\u00e1rio ao CRM/WhatsApp. Pixel de convers\u00e3o. Testar em mobile. PageSpeed 90+.', time: 'Dias 5-7' },
        ],
      },
      {
        id: 'auditoria-comercial',
        title: 'Auditoria Comercial',
        tag: 'Aditivo no pre\u00e7o',
        executive: 'Analisa o processo de vendas da cl\u00ednica \u2014 do primeiro contato no WhatsApp at\u00e9 o p\u00f3s-consulta. De nada adianta investir em marketing se a equipe demora 2 dias para responder, n\u00e3o tem script ou n\u00e3o faz follow-up. Muitas cl\u00ednicas perdem 30-50% dos leads aqui.',
        value: 'Reduzir o tempo de resposta de 4h para 15min pode dobrar a taxa de convers\u00e3o. Implementar follow-up automatizado recupera 20-30% dos leads que n\u00e3o agendaram de primeira. A auditoria encontra dinheiro que a cl\u00ednica j\u00e1 gasta, mas perde no atendimento.',
        deliverables: [
          'Relat\u00f3rio de Auditoria Comercial (PDF/DOCX)',
          'Score de atendimento (0-100 por etapa)',
          'Pack de scripts (WhatsApp, telefone, recep\u00e7\u00e3o)',
          'Fluxograma do funil de vendas',
          'Fluxo de automa\u00e7\u00e3o (confirma\u00e7\u00e3o, lembrete, follow-up)',
          'Sess\u00e3o de treinamento para recep\u00e7\u00e3o (1-2h)',
        ],
        playbook: [
          { step: 'Cliente oculto', desc: 'Entrar em contato como paciente via WhatsApp, telefone e formul\u00e1rio. Medir tempo de resposta, qualidade, se h\u00e1 script, se oferece agendamento.', time: 'Dias 1-3' },
          { step: 'An\u00e1lise do funil', desc: 'Mapear cada etapa: lead entra \u2192 resposta \u2192 qualifica\u00e7\u00e3o \u2192 agendamento \u2192 consulta \u2192 p\u00f3s-consulta. Identificar onde caem leads.', time: 'Dias 3-5' },
          { step: 'Scripts e automa\u00e7\u00f5es', desc: 'Scripts para WhatsApp, telefone e recep\u00e7\u00e3o. Fluxo de automa\u00e7\u00e3o: confirma\u00e7\u00e3o 24h antes, lembrete 2h antes, pesquisa p\u00f3s-consulta.', time: 'Dias 7-10' },
          { step: 'Treinamento', desc: 'Sess\u00e3o de 1-2h com equipe. Entrega de relat\u00f3rio + scripts + fluxograma. Acompanhamento 2 semanas.', time: 'Dias 10-15' },
        ],
      },
      {
        id: 'criativos-anuncios',
        title: 'Criativos (Fotos e V\u00eddeos)',
        tag: 'Para an\u00fancios',
        executive: 'Pe\u00e7as visuais que alimentam as campanhas de an\u00fancio: banners, v\u00eddeos curtos, carross\u00e9is. Produzimos tudo \u2014 do roteiro \u00e0 edi\u00e7\u00e3o final \u2014 para que o m\u00e9dico s\u00f3 precise gravar quando necess\u00e1rio.',
        value: 'An\u00fancios com v\u00eddeo t\u00eam CTR 2-3x maior que est\u00e1ticos. Criativos novos a cada 2-3 semanas evitam fadiga de an\u00fancio. Investir em criativos de qualidade reduz o custo por lead porque a plataforma premia melhor engajamento.',
        deliverables: [
          '10-20 pe\u00e7as est\u00e1ticas/m\u00eas (banners, an\u00fancios)',
          '4-8 v\u00eddeos editados/m\u00eas (Reels, an\u00fancios)',
          'Roteiros para grava\u00e7\u00e3o pelo m\u00e9dico',
          'Dire\u00e7\u00e3o de grava\u00e7\u00e3o (remota ou presencial)',
          'Legendas em todos os v\u00eddeos',
        ],
        playbook: [
          { step: 'Roteiros', desc: 'Storyboard para cada pe\u00e7a. Formato: hook (3s) + conte\u00fado + CTA. Para o m\u00e9dico: roteiros curtos, linguagem natural.', time: 'Dias 1-2' },
          { step: 'Grava\u00e7\u00e3o', desc: 'Presencial: dirigir grava\u00e7\u00e3o no consult\u00f3rio. Remota: enviar guia de grava\u00e7\u00e3o com celular (enquadramento, luz, \u00e1udio).', time: 'Dia 3' },
          { step: 'Edi\u00e7\u00e3o', desc: 'Corte profissional, legendas obrigat\u00f3rias, m\u00fasica, thumbnails. Formatos: 1:1 (feed), 9:16 (stories/reels), 16:9 (YouTube).', time: 'Dias 4-6' },
          { step: 'Teste A/B', desc: 'M\u00ednimo 3 varia\u00e7\u00f5es por conjunto. Renovar a cada 2-3 semanas. Banco organizado por tipo e campanha.', time: 'Cont\u00ednuo' },
        ],
      },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media',
    icon: 'instagram',
    tag: null,
    executive: 'Gest\u00e3o completa do Instagram da cl\u00ednica: da otimiza\u00e7\u00e3o do perfil \u00e0 produ\u00e7\u00e3o de conte\u00fado, passando por Reels, Stories e intera\u00e7\u00e3o com a comunidade. O objetivo n\u00e3o \u00e9 acumular seguidores \u2014 \u00e9 construir autoridade m\u00e9dica que converte em agendamentos.',
    value: '72% dos pacientes verificam o Instagram do m\u00e9dico antes de agendar. Um perfil ativo com conte\u00fado educativo, resultados e humaniza\u00e7\u00e3o gera confian\u00e7a. O mix certo de conte\u00fado cria um ciclo de atra\u00e7\u00e3o org\u00e2nica que complementa os an\u00fancios.',
    deliverables: [
      'Perfil otimizado (bio, highlights, feed visual)',
      '12-20 posts/m\u00eas (feed + carross\u00e9is)',
      '4-8 Reels/m\u00eas',
      '15-20 Stories/m\u00eas',
      'Calend\u00e1rio editorial mensal',
      'Gest\u00e3o de coment\u00e1rios e DMs',
      'Relat\u00f3rio mensal de m\u00e9tricas',
    ],
    playbook: [
      { step: 'Setup do perfil', desc: 'Bio com CTA + link. Foto profissional. 5-8 highlights: Servi\u00e7os, Resultados, Depoimentos, FAQ, Sobre, Dicas. 3 posts fixados.', time: 'Dias 1-3' },
      { step: 'Planejamento editorial', desc: 'Calend\u00e1rio mensal. Mix: 40% educativo, 25% resultados/prova social, 15% bastidores, 10% CTA, 10% tend\u00eancias.', time: 'Mensal' },
      { step: 'Produ\u00e7\u00e3o de conte\u00fado', desc: 'Carross\u00e9is educativos, Reels 15-60s, Stories di\u00e1rios, prova social.', time: 'Cont\u00ednuo' },
      { step: 'Publica\u00e7\u00e3o e engajamento', desc: 'Publicar nos melhores hor\u00e1rios. Responder coment\u00e1rios em 4h e DMs em 2h. Engajamento ativo com perfis da regi\u00e3o.', time: 'Di\u00e1rio' },
      { step: 'An\u00e1lise mensal', desc: 'Relat\u00f3rio: alcance, engajamento (meta 2%+), crescimento, salvamentos, compartilhamentos. Ajustar mix.', time: 'Mensal' },
    ],
    subservices: [
      {
        id: 'criativos-social',
        title: 'Criativos (Fotos, V\u00eddeos e Postagens com Edi\u00e7\u00e3o)',
        tag: null,
        executive: 'Toda a produ\u00e7\u00e3o visual para redes sociais: posts de feed, carross\u00e9is, v\u00eddeos curtos (Reels), Stories e artes finais editadas. Do briefing \u00e0 entrega final, incluindo roteiro, dire\u00e7\u00e3o, grava\u00e7\u00e3o e edi\u00e7\u00e3o profissional.',
        value: 'Conte\u00fado visual de qualidade profissional aumenta o engajamento em 3-5x comparado a posts amadores. V\u00eddeos geram 2x mais salvamentos e compartilhamentos que imagens est\u00e1ticas. A consist\u00eancia visual constr\u00f3i reconhecimento de marca.',
        deliverables: [
          '10-20 pe\u00e7as est\u00e1ticas/m\u00eas (posts, carross\u00e9is)',
          '4-8 v\u00eddeos editados/m\u00eas (Reels, Stories)',
          'Roteiros para grava\u00e7\u00e3o pelo m\u00e9dico',
          'Dire\u00e7\u00e3o de grava\u00e7\u00e3o (remota ou presencial)',
          'Edi\u00e7\u00e3o com legendas, m\u00fasica e efeitos',
          'Templates padronizados na identidade visual',
        ],
        playbook: [
          { step: 'Invent\u00e1rio visual', desc: 'Coletar fotos/v\u00eddeos existentes. Avaliar qualidade. Definir o que precisa ser produzido.', time: 'Dia 1' },
          { step: 'Roteiros e briefings', desc: 'Criar roteiro para cada pe\u00e7a de v\u00eddeo. Para o m\u00e9dico: textos curtos, linguagem natural. Guia de cen\u00e1rio e luz.', time: 'Dias 2-3' },
          { step: 'Grava\u00e7\u00e3o', desc: 'Presencial no consult\u00f3rio ou remota com guia detalhado. Foco em naturalidade e autoridade.', time: 'Dia 4' },
          { step: 'Edi\u00e7\u00e3o e entrega', desc: 'Corte, legendas (85% assistem sem som), m\u00fasica, transi\u00e7\u00f5es, thumbnail. Formatos adaptados para cada plataforma.', time: 'Dias 5-7' },
        ],
      },
    ],
  },
  {
    id: 'site',
    title: 'Cria\u00e7\u00e3o de Site (Portal)',
    icon: 'globe',
    tag: 'Adicional',
    executive: 'O site \u00e9 a base de toda a estrat\u00e9gia digital. N\u00e3o \u00e9 um folder bonito \u2014 \u00e9 uma m\u00e1quina de convers\u00e3o. Criamos sites mobile-first, r\u00e1pidos, otimizados para Google e com foco em fazer o visitante agendar uma consulta.',
    value: '60% dos pacientes pesquisam online antes de escolher um m\u00e9dico. Um site lento, antigo ou sem bot\u00e3o de WhatsApp perde pacientes para concorrentes. Um site bem feito funciona 24h como vendedor: aparece no Google, transmite credibilidade e converte visitantes em agendamentos.',
    deliverables: [
      'Site institucional completo (6-8 p\u00e1ginas)',
      'Design responsivo (mobile-first)',
      'SEO on-page configurado (titles, metas, Schema.org)',
      'GA4 + Google Search Console + Meta Pixel',
      'Bot\u00e3o de WhatsApp flutuante',
      'Treinamento b\u00e1sico para equipe editar conte\u00fado',
    ],
    playbook: [
      { step: 'Briefing e wireframe', desc: 'Estrutura de p\u00e1ginas, hierarquia de informa\u00e7\u00e3o, CTAs prim\u00e1rios. Coletar textos, fotos, certifica\u00e7\u00f5es. Validar wireframe.', time: 'Dias 1-3' },
      { step: 'Design e desenvolvimento', desc: 'Mobile-first. PageSpeed 85+. Cores e tipografia alinhadas com identidade visual. P\u00e1ginas individuais por servi\u00e7o (SEO).', time: 'Dias 4-10' },
      { step: 'Conte\u00fado e SEO', desc: 'Titles e meta descriptions \u00fanicos. Schema.org (LocalBusiness, MedicalClinic). Sitemap XML. Imagens otimizadas.', time: 'Dias 8-12' },
      { step: 'Integra\u00e7\u00f5es', desc: 'GA4 + Search Console + Meta Pixel + Google Ads tag. WhatsApp widget. Integra\u00e7\u00e3o com Doctoralia/Calendly.', time: 'Dias 12-14' },
      { step: 'Conformidade CFM + LGPD', desc: 'Sem pre\u00e7os expostos, antes/depois s\u00f3 com consentimento, pol\u00edtica de privacidade, cookies, opt-in em formul\u00e1rios.', time: 'Dia 14' },
      { step: 'Publica\u00e7\u00e3o e treinamento', desc: 'Deploy com SSL. Indexa\u00e7\u00e3o no Google. Treinamento de 30min para equipe. Monitorar Core Web Vitals.', time: 'Dias 15-20' },
    ],
    subservices: [],
  },
  {
    id: 'ia-automacoes',
    title: 'Intelig\u00eancia Artificial e Automa\u00e7\u00f5es',
    icon: 'cpu',
    tag: 'Adicional',
    executive: 'Solu\u00e7\u00f5es de IA e automa\u00e7\u00e3o para cl\u00ednicas que querem escalar sem aumentar equipe. Chatbots que qualificam e agendam, notifica\u00e7\u00f5es inteligentes e CRM automatizado \u2014 tudo funcionando 24h.',
    value: 'Automa\u00e7\u00f5es reduzem custo operacional em 30-50% e eliminam erros humanos. Um bot no WhatsApp que responde em 15 segundos (vs. 4h da recep\u00e7\u00e3o) pode dobrar a taxa de convers\u00e3o de leads em agendamentos. Notifica\u00e7\u00f5es autom\u00e1ticas reduzem no-show em at\u00e9 40%.',
    deliverables: [
      'Solu\u00e7\u00e3o completa de automa\u00e7\u00e3o implementada',
      'Dashboard de monitoramento',
      'Treinamento da equipe',
      'Suporte t\u00e9cnico mensal',
    ],
    playbook: [
      { step: 'Mapeamento de processos', desc: 'Identificar fluxos repet\u00edtivos: agendamento, confirma\u00e7\u00e3o, follow-up, cobran\u00e7a, pesquisa de satisfa\u00e7\u00e3o. Priorizar por impacto.', time: 'Dias 1-3' },
      { step: 'Configura\u00e7\u00e3o e testes', desc: 'Implementar automa\u00e7\u00f5es escolhidas. Testar exaustivamente com cen\u00e1rios reais. Ajustar prompts e fluxos.', time: 'Dias 4-10' },
      { step: 'Go-live e treinamento', desc: 'Ativar em produ\u00e7\u00e3o. Treinar equipe. Monitorar primeiras 2 semanas. Ajustes finos.', time: 'Dias 11-14' },
    ],
    subservices: [
      {
        id: 'bot-qualificacao',
        title: 'Bot de Qualifica\u00e7\u00e3o e Agendamento',
        tag: null,
        executive: 'Chatbot inteligente no WhatsApp que atende pacientes 24h. Faz a triagem do interesse (procedimento, urg\u00eancia, disponibilidade), qualifica o lead e agenda direto na agenda do m\u00e9dico \u2014 sem esperar a recep\u00e7\u00e3o.',
        value: 'Um bot responde em 15 segundos, enquanto a recep\u00e7\u00e3o leva em m\u00e9dia 4h. Funciona fora do hor\u00e1rio comercial (50% das buscas por m\u00e9dico acontecem \u00e0 noite/fim de semana). Reduz carga da equipe e garante que nenhum lead \u00e9 ignorado.',
        deliverables: [
          'Bot WhatsApp configurado e ativo 24h',
          'Fluxo de qualifica\u00e7\u00e3o personalizado por procedimento',
          'Integra\u00e7\u00e3o com agenda (Google Calendar, Doctoralia)',
          'Dashboard de leads qualificados',
          'Relat\u00f3rio mensal de convers\u00f5es',
        ],
        playbook: [
          { step: 'Mapeamento de fluxo', desc: 'Definir perguntas de qualifica\u00e7\u00e3o: procedimento de interesse, urg\u00eancia, prefer\u00eancia de hor\u00e1rio, conv\u00eanio. \u00c1rvore de decis\u00e3o por servi\u00e7o.', time: 'Dias 1-2' },
          { step: 'Configura\u00e7\u00e3o do bot', desc: 'Criar persona de atendimento (tom profissional mas acolhedor). Configurar respostas, bot\u00f5es interativos, fallback para humano.', time: 'Dias 3-5' },
          { step: 'Integra\u00e7\u00f5es', desc: 'Conectar com agenda do m\u00e9dico, CRM, sistema de notifica\u00e7\u00f5es. Configurar regras de encaminhamento (quente \u2192 humano imediato).', time: 'Dias 6-7' },
          { step: 'Teste e go-live', desc: 'Testar com cen\u00e1rios reais. Treinar equipe sobre o fluxo. Monitorar primeiras 2 semanas. Ajustar respostas com base em conversas reais.', time: 'Dias 8-14' },
        ],
      },
      {
        id: 'notificacoes',
        title: 'Notifica\u00e7\u00f5es a Pacientes e Colaboradores',
        tag: null,
        executive: 'Sistema automatizado de notifica\u00e7\u00f5es por WhatsApp para toda a jornada do paciente: confirma\u00e7\u00e3o de consulta, lembrete, preparo para exames, p\u00f3s-consulta e retorno. Tamb\u00e9m para colaboradores: lembretes de tarefas e comunica\u00e7\u00e3o interna.',
        value: 'Notifica\u00e7\u00f5es autom\u00e1ticas reduzem no-show em 30-40% (de 25% para 12-15%). Lembrete de retorno reativa 20-30% dos pacientes inativos. A equipe deixa de gastar horas ligando para confirmar e foca no atendimento presencial.',
        deliverables: [
          'Sistema de confirma\u00e7\u00e3o autom\u00e1tica 24h antes',
          'Lembrete 2h antes da consulta',
          'Pesquisa de satisfa\u00e7\u00e3o p\u00f3s-consulta',
          'Lembrete de retorno autom\u00e1tico',
          'Notifica\u00e7\u00f5es internas para equipe',
        ],
        playbook: [
          { step: 'Mapear jornada', desc: 'Definir todos os pontos de contato: pr\u00e9-consulta, dia da consulta, p\u00f3s-consulta, retorno. Definir timing ideal de cada notifica\u00e7\u00e3o.', time: 'Dias 1-2' },
          { step: 'Criar templates', desc: 'Escrever mensagens para cada momento. Tom profissional e acolhedor. Incluir bot\u00f5es interativos (confirmar/reagendar/cancelar).', time: 'Dias 3-4' },
          { step: 'Configurar automa\u00e7\u00f5es', desc: 'Integrar com sistema de agenda. Configurar triggers e cron\u00f4metros. Testar com cen\u00e1rios reais.', time: 'Dias 5-7' },
          { step: 'Monitoramento', desc: 'Acompanhar taxa de no-show, taxa de confirma\u00e7\u00e3o, reativa\u00e7\u00e3o de pacientes inativos. Ajustar mensagens mensalmente.', time: 'Cont\u00ednuo' },
        ],
      },
      {
        id: 'crm',
        title: 'CRM',
        tag: null,
        executive: 'Sistema centralizado para gerenciar todos os leads e pacientes da cl\u00ednica. Do primeiro contato ao p\u00f3s-consulta, cada intera\u00e7\u00e3o \u00e9 registrada. O m\u00e9dico e a equipe t\u00eam visibilidade total do pipeline de vendas e do hist\u00f3rico de cada paciente.',
        value: 'Sem CRM, leads se perdem entre WhatsApp, telefone e e-mail. Com CRM, a cl\u00ednica sabe exatamente quantos leads recebeu, quantos agendaram, quantos faltaram e por qu\u00ea. Permite segmenta\u00e7\u00e3o para campanhas (ex: pacientes que fizeram botox h\u00e1 6 meses \u2192 lembrete de retorno).',
        deliverables: [
          'CRM implementado e configurado',
          'Pipeline de vendas personalizado (lead \u2192 contato \u2192 agendamento \u2192 consulta \u2192 retorno)',
          'Integra\u00e7\u00e3o com WhatsApp e formul\u00e1rios',
          'Dashboard de m\u00e9tricas de vendas',
          'Treinamento da equipe (recep\u00e7\u00e3o + gestor)',
        ],
        playbook: [
          { step: 'Escolha e setup', desc: 'Selecionar CRM adequado (custo x funcionalidade). Configurar pipeline personalizado. Importar base de pacientes existente.', time: 'Dias 1-3' },
          { step: 'Integra\u00e7\u00f5es', desc: 'Conectar com WhatsApp (mensagens viram registros), formul\u00e1rios do site/LP, Google Ads (leads entram automaticamente), agenda.', time: 'Dias 4-7' },
          { step: 'Automa\u00e7\u00f5es', desc: 'Lead novo \u2192 alerta para recep\u00e7\u00e3o. Lead sem resposta em 2h \u2192 escala\u00e7\u00e3o. P\u00f3s-consulta \u2192 pesquisa NPS. 6 meses \u2192 lembrete de retorno.', time: 'Dias 8-10' },
          { step: 'Treinamento e go-live', desc: 'Treinar equipe (2h). Monitorar uso nas primeiras 2 semanas. Ajustar campos e fluxos conforme feedback.', time: 'Dias 11-14' },
        ],
      },
    ],
  },
  {
    id: 'consultoria',
    title: 'Consultoria',
    icon: 'lightbulb',
    tag: null,
    executive: 'Consultoria estrat\u00e9gica para cl\u00ednicas que querem ir al\u00e9m do marketing digital: melhorar processos internos, treinar equipe, inovar em servi\u00e7os e medir a satisfa\u00e7\u00e3o real dos pacientes. \u00c9 o complemento que transforma a cl\u00ednica por dentro.',
    value: 'Marketing atrai pacientes, mas processos mal estruturados os perdem. Uma cl\u00ednica com rituais de atendimento definidos, equipe treinada e NPS alto constr\u00f3i reputa\u00e7\u00e3o que reduz o custo de aquisi\u00e7\u00e3o ao longo do tempo. O b\u00f4nus: avalia\u00e7\u00f5es positivas no Google s\u00e3o o melhor marketing gratuito.',
    deliverables: [
      'Diagn\u00f3stico de processos e clima',
      'Plano de a\u00e7\u00e3o personalizado',
      'Sess\u00f5es de treinamento',
      'Relat\u00f3rios de NPS e clima',
    ],
    playbook: [
      { step: 'Diagn\u00f3stico interno', desc: 'Mapear processos atuais, entrevistar equipe, identificar gargalos e oportunidades de melhoria.', time: 'Dias 1-5' },
      { step: 'Plano de a\u00e7\u00e3o', desc: 'Priorizar a\u00e7\u00f5es por impacto vs. esfor\u00e7o. Definir respons\u00e1veis e prazos. Validar com gestor da cl\u00ednica.', time: 'Dias 6-7' },
      { step: 'Implementa\u00e7\u00e3o', desc: 'Executar o plano com suporte cont\u00ednuo. Sess\u00f5es quinzenais de acompanhamento.', time: 'Cont\u00ednuo' },
    ],
    subservices: [
      {
        id: 'mapeamento-processo',
        title: 'Mapeamento de Processo',
        tag: null,
        executive: 'Documenta\u00e7\u00e3o visual de todos os processos da cl\u00ednica: desde como o lead \u00e9 atendido at\u00e9 como o p\u00f3s-consulta funciona. Identifica redundâncias, gargalos e etapas desnecess\u00e1rias que atrasam o atendimento.',
        value: 'Processos mapeados permitem delegar com seguran\u00e7a (a cl\u00ednica n\u00e3o depende de uma pessoa). Reduz erros, acelera o atendimento e facilita o treinamento de novos colaboradores. \u00c9 o fundamento para qualquer automa\u00e7\u00e3o futura.',
        deliverables: [
          'Fluxogramas visuais de cada processo',
          'Manual de opera\u00e7\u00f5es (SOPs)',
          'Identifica\u00e7\u00e3o de gargalos e recomenda\u00e7\u00f5es',
          'Checklists de atendimento',
        ],
        playbook: [
          { step: 'Observa\u00e7\u00e3o', desc: 'Acompanhar a rotina da cl\u00ednica (presencial ou remoto). Entrevistar cada fun\u00e7\u00e3o. Documentar fluxo atual "como \u00e9".', time: 'Dias 1-3' },
          { step: 'Mapeamento', desc: 'Criar fluxogramas visuais (BPMN simplificado). Identificar gargalos, redundâncias e riscos.', time: 'Dias 4-5' },
          { step: 'Proposta "como deveria ser"', desc: 'Redesenhar processos otimizados. Criar SOPs e checklists. Validar com gestor.', time: 'Dias 6-7' },
        ],
      },
      {
        id: 'rituais',
        title: 'Defini\u00e7\u00e3o de Rituais',
        tag: null,
        executive: 'Cria\u00e7\u00e3o de rituais de gest\u00e3o para a cl\u00ednica: reuni\u00f5es semanais de equipe, reviews mensais de m\u00e9tricas, feedbacks 1:1, planning de campanhas. Estrutura que transforma a cl\u00ednica de "apagar inc\u00eandios" para "gest\u00e3o profissional".',
        value: 'Cl\u00ednicas que implementam rituais de gest\u00e3o t\u00eam 40% menos rotatividade e 25% mais produtividade. A equipe sabe o que se espera, o m\u00e9dico tem visibilidade dos n\u00fameros e decis\u00f5es s\u00e3o tomadas com dados, n\u00e3o com achismo.',
        deliverables: [
          'Calend\u00e1rio de rituais (semanal/mensal)',
          'Templates de reuni\u00e3o (pauta + ata)',
          'Dashboards de m\u00e9tricas por ritual',
          'Guia de implementa\u00e7\u00e3o',
        ],
        playbook: [
          { step: 'Diagn\u00f3stico de gest\u00e3o', desc: 'Entender como a cl\u00ednica toma decis\u00f5es hoje. Quais reuni\u00f5es existem (se existem). Quais m\u00e9tricas acompanham.', time: 'Dias 1-2' },
          { step: 'Desenho dos rituais', desc: 'Definir frequ\u00eancia, participantes, pauta e entregáveis de cada ritual. Criar templates.', time: 'Dias 3-4' },
          { step: 'Implementa\u00e7\u00e3o assistida', desc: 'Facilitar os primeiros 4 rituais junto com a equipe. Ajustar formato conforme feedback.', time: '4 semanas' },
        ],
      },
      {
        id: 'treinamento',
        title: 'Treinamento de Atendimento e Comercial',
        tag: null,
        executive: 'Capacita\u00e7\u00e3o da equipe de recep\u00e7\u00e3o e atendimento para converter mais leads em pacientes. Inclui scripts de abordagem, t\u00e9cnicas de venda consultiva adaptadas para sa\u00fade, e treinamento pr\u00e1tico com simula\u00e7\u00f5es.',
        value: 'A recep\u00e7\u00e3o \u00e9 o "vendedor" da cl\u00ednica. Uma equipe treinada converte 30-40% dos leads em agendamentos (vs. 10-15% sem treinamento). O investimento em marketing s\u00f3 d\u00e1 retorno completo quando o atendimento converte os leads que chegam.',
        deliverables: [
          'Pack de scripts (WhatsApp, telefone, presencial)',
          'Manual de atendimento',
          'Sess\u00f5es de treinamento (2-4h)',
          'Simula\u00e7\u00f5es pr\u00e1ticas com feedback',
          'Avalia\u00e7\u00e3o de desempenho p\u00f3s-treinamento',
        ],
        playbook: [
          { step: 'Diagn\u00f3stico do atendimento', desc: 'Cliente oculto. Analisar conversas de WhatsApp. Identificar gaps (demora, falta de script, perda de leads).', time: 'Dias 1-3' },
          { step: 'Criar material', desc: 'Scripts para cada canal (WhatsApp, telefone, presencial). Fluxo de obje\u00e7\u00f5es. Frases proibidas. T\u00e9cnicas de agendamento.', time: 'Dias 4-5' },
          { step: 'Treinamento', desc: 'Sess\u00e3o te\u00f3rica (1-2h) + simula\u00e7\u00f5es pr\u00e1ticas (1-2h). Feedback individual. Refor\u00e7o quinzenal.', time: 'Dia 6 + cont\u00ednuo' },
        ],
      },
      {
        id: 'novos-servicos',
        title: 'Sugest\u00e3o de Novos Servi\u00e7os e Inova\u00e7\u00e3o',
        tag: null,
        executive: 'An\u00e1lise de mercado para identificar novos procedimentos ou servi\u00e7os que a cl\u00ednica pode oferecer. Baseado em pesquisa de demanda, tend\u00eancias, compet\u00eancia da equipe e viabilidade financeira.',
        value: 'Cl\u00ednicas que renovam seu portf\u00f3lio crescem 20-30% mais r\u00e1pido. Identificar um procedimento de alta demanda e baixa oferta na regi\u00e3o pode representar um novo canal de receita significativo sem aumentar a estrutura.',
        deliverables: [
          'Relat\u00f3rio de oportunidades de mercado',
          'An\u00e1lise de viabilidade (investimento vs. retorno)',
          'Plano de lan\u00e7amento do novo servi\u00e7o',
          'Estrat\u00e9gia de marketing para divulga\u00e7\u00e3o',
        ],
        playbook: [
          { step: 'Pesquisa de mercado', desc: 'Analisar demanda regional (Google Trends, keywords, concorrentes). Identificar gaps e tend\u00eancias.', time: 'Dias 1-5' },
          { step: 'An\u00e1lise de viabilidade', desc: 'Investimento necess\u00e1rio (equipamento, treinamento, certifica\u00e7\u00f5es). Proje\u00e7\u00e3o de retorno. Break-even.', time: 'Dias 6-8' },
          { step: 'Plano de lan\u00e7amento', desc: 'Estrat\u00e9gia de divulga\u00e7\u00e3o, pre\u00e7o introdut\u00f3rio, campanhas de lan\u00e7amento, meta de pacientes no primeiro trimestre.', time: 'Dias 9-12' },
        ],
      },
      {
        id: 'campanhas-gmn',
        title: 'Campanhas de Avalia\u00e7\u00f5es Google Meu Neg\u00f3cio',
        tag: null,
        executive: 'Estrat\u00e9gia estruturada para aumentar o volume e a nota das avalia\u00e7\u00f5es no Google. Inclui automa\u00e7\u00e3o de solicita\u00e7\u00e3o p\u00f3s-consulta, templates de resposta e protocolo para avalia\u00e7\u00f5es negativas.',
        value: 'A nota no Google \u00e9 o fator #1 de decis\u00e3o para 90% dos pacientes. Passar de 4.0 para 4.7 pode aumentar os agendamentos em 25%. Volume de avalia\u00e7\u00f5es recentes (últimos 3 meses) impacta diretamente o ranqueamento no Map Pack.',
        deliverables: [
          'Sistema autom\u00e1tico de solicita\u00e7\u00e3o de avalia\u00e7\u00e3o',
          'Templates de resposta (positivas e negativas)',
          'Protocolo de gest\u00e3o de crise (avalia\u00e7\u00f5es 1-2 estrelas)',
          'Relat\u00f3rio mensal de reputa\u00e7\u00e3o',
        ],
        playbook: [
          { step: 'Auditoria de reputa\u00e7\u00e3o', desc: 'Analisar nota atual, volume, tend\u00eancia, resposta a avalia\u00e7\u00f5es. Comparar com concorrentes. Identificar padr\u00f5es em avalia\u00e7\u00f5es negativas.', time: 'Dias 1-2' },
          { step: 'Automa\u00e7\u00e3o', desc: 'Configurar mensagem autom\u00e1tica p\u00f3s-consulta (WhatsApp) solicitando avalia\u00e7\u00e3o. Link direto para o perfil Google. Timing ideal: 2h ap\u00f3s a consulta.', time: 'Dias 3-5' },
          { step: 'Gest\u00e3o cont\u00ednua', desc: 'Responder 100% das avalia\u00e7\u00f5es em 24h. Para negativas: agradecer, pedir desculpas, levar para DM. Para positivas: agradecer e personalizar. Relat\u00f3rio mensal.', time: 'Cont\u00ednuo' },
        ],
      },
      {
        id: 'pesquisa-clima',
        title: 'Pesquisa de Clima Organizacional',
        tag: null,
        executive: 'Pesquisa an\u00f4nima com a equipe da cl\u00ednica para medir satisfa\u00e7\u00e3o, engajamento, identifica\u00e7\u00e3o de problemas internos e oportunidades de melhoria no ambiente de trabalho.',
        value: 'Equipe insatisfeita atende mal, e atendimento ruim \u00e9 a causa #1 de avalia\u00e7\u00f5es negativas. A pesquisa de clima identifica problemas antes que virem crises (turnover alto, fofoca, desalinhamento). \u00c9 tamb\u00e9m um sinal de que a gest\u00e3o se importa com a equipe.',
        deliverables: [
          'Question\u00e1rio de clima personalizado',
          'Aplica\u00e7\u00e3o an\u00f4nima (digital)',
          'Relat\u00f3rio de resultados com gr\u00e1ficos',
          'Plano de a\u00e7\u00e3o para pontos cr\u00edticos',
        ],
        playbook: [
          { step: 'Elaborar question\u00e1rio', desc: 'Adaptar para realidade da cl\u00ednica. Temas: satisfa\u00e7\u00e3o, comunica\u00e7\u00e3o, lideran\u00e7a, infraestrutura, reconhecimento. 20-30 perguntas (escala Likert + abertas).', time: 'Dias 1-2' },
          { step: 'Aplicar pesquisa', desc: 'Enviar link an\u00f4nimo. Prazo de 5 dias. Lembrete no dia 3. Meta: 80%+ de participa\u00e7\u00e3o.', time: 'Dias 3-8' },
          { step: 'An\u00e1lise e devolutiva', desc: 'Consolidar dados, identificar padr\u00f5es. Relat\u00f3rio visual. Apresentar ao gestor + plano de a\u00e7\u00e3o para itens cr\u00edticos.', time: 'Dias 9-12' },
        ],
      },
      {
        id: 'nps',
        title: 'Pesquisa de Satisfa\u00e7\u00e3o (NPS)',
        tag: null,
        executive: 'Medi\u00e7\u00e3o cont\u00ednua da satisfa\u00e7\u00e3o dos pacientes atrav\u00e9s do NPS (Net Promoter Score). Pergunta simples: "De 0 a 10, o quanto voc\u00ea recomendaria nossa cl\u00ednica?" + acompanhamento dos motivos.',
        value: 'NPS \u00e9 o termômetro mais confi\u00e1vel da sa\u00fade do neg\u00f3cio. Pacientes promotores (9-10) indicam 3-5 pessoas. Detratores (0-6) falam mal para 10+. Acompanhar NPS mensal permite corrigir problemas rapidamente e transformar detratores em promotores.',
        deliverables: [
          'Sistema de NPS automatizado (p\u00f3s-consulta)',
          'Dashboard de NPS em tempo real',
          'Relat\u00f3rio mensal com evolu\u00e7\u00e3o e insights',
          'Fluxo de recupera\u00e7\u00e3o de detratores',
        ],
        playbook: [
          { step: 'Configurar NPS', desc: 'Mensagem autom\u00e1tica 24h p\u00f3s-consulta via WhatsApp. Pergunta NPS + pergunta aberta (motivo da nota). Link para pesquisa r\u00e1pida.', time: 'Dias 1-3' },
          { step: 'Fluxo de a\u00e7\u00e3o', desc: 'Promotores (9-10): agradecer + pedir avalia\u00e7\u00e3o Google. Neutros (7-8): perguntar o que melhorar. Detratores (0-6): ligar em 24h para entender e resolver.', time: 'Dias 4-5' },
          { step: 'Monitoramento cont\u00ednuo', desc: 'Acompanhar NPS semanal/mensal. Identificar tend\u00eancias. Correlacionar com m\u00e9dico/procedimento/turno. Meta: NPS 70+.', time: 'Cont\u00ednuo' },
        ],
      },
    ],
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
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  )
}

function BaselineCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-[#f5f0ff] rounded-xl border border-[#e9e0f5] p-5 sm:p-6">
      <h3 className="font-bold text-[#272757] text-lg mb-2">{item.title}</h3>
      <p className="text-[#5a4a6b] text-sm leading-relaxed mb-4">{item.executive}</p>
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Por que gera valor</h4>
        <p className="text-[#120326] text-sm leading-relaxed">{item.value}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Entregas</h4>
        <ul className="space-y-1.5">
          {item.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#120326]">
              <svg className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-[#7B2CBF] font-bold text-sm hover:text-[#5A1D8E] transition-colors">
        <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        {expanded ? 'Ocultar playbook' : 'Ver mini playbook'}
      </button>
      {expanded && (
        <div className="mt-4 border-t border-[#e9e0f5] pt-4">
          <div className="space-y-3">
            {item.playbook.map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-[#7B2CBF]/10 flex items-center justify-center text-xs font-bold text-[#7B2CBF]">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-[#272757] text-sm">{p.step}</h4>
                    <span className="text-xs text-[#7B2CBF] bg-[#7B2CBF]/10 px-2 py-0.5 rounded-full font-semibold">{p.time}</span>
                  </div>
                  <p className="text-[#5a4a6b] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SubserviceCard({ item, depth = 0 }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={`bg-white rounded-xl border border-[#e9e0f5] p-5 sm:p-6 ${depth > 0 ? 'ml-4 sm:ml-6' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-bold text-[#272757] text-base sm:text-lg">{item.title}</h3>
        {item.tag && <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{item.tag}</span>}
      </div>
      <p className="text-[#5a4a6b] text-sm leading-relaxed mb-4">{item.executive}</p>
      <div className="bg-[#f5f0ff] rounded-lg p-4 mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Por que gera valor</h4>
        <p className="text-[#120326] text-sm leading-relaxed">{item.value}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Entregas</h4>
        <ul className="space-y-1.5">
          {item.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#120326]">
              <svg className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-[#7B2CBF] font-bold text-sm hover:text-[#5A1D8E] transition-colors">
        <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        {expanded ? 'Ocultar playbook' : 'Ver mini playbook'}
      </button>
      {expanded && (
        <div className="mt-4 border-t border-[#e9e0f5] pt-4">
          <div className="space-y-3">
            {item.playbook.map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-[#7B2CBF]/10 flex items-center justify-center text-xs font-bold text-[#7B2CBF]">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-[#272757] text-sm">{p.step}</h4>
                    <span className="text-xs text-[#7B2CBF] bg-[#7B2CBF]/10 px-2 py-0.5 rounded-full font-semibold">{p.time}</span>
                  </div>
                  <p className="text-[#5a4a6b] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CategorySection({ category }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="bg-white rounded-2xl border border-[#e9e0f5] overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#7B2CBF] text-white flex items-center justify-center">
              <CategoryIcon type={category.icon} />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#272757]">{category.title}</h2>
              {category.tag && <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">{category.tag}</span>}
            </div>
          </div>

          <p className="text-[#5a4a6b] leading-relaxed mb-5 mt-4">{category.executive}</p>

          <div className="bg-[#f5f0ff] rounded-xl p-5 mb-5">
            <h3 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Por que gera valor para cl\u00ednicas</h3>
            <p className="text-[#120326] leading-relaxed">{category.value}</p>
          </div>

          <div className="mb-5">
            <h3 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-3">Entregas principais</h3>
            <ul className="space-y-2">
              {category.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#120326]">
                  <svg className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-[#7B2CBF] font-bold text-sm hover:text-[#5A1D8E] transition-colors">
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            {expanded ? 'Ocultar playbook' : 'Ver mini playbook'}
          </button>

          {expanded && (
            <div className="mt-5 border-t border-[#e9e0f5] pt-5">
              <h3 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-4">Mini Playbook</h3>
              <div className="space-y-4">
                {category.playbook.map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-[#7B2CBF]/10 flex items-center justify-center text-xs font-bold text-[#7B2CBF]">{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-[#272757] text-sm">{p.step}</h4>
                        <span className="text-xs text-[#7B2CBF] bg-[#7B2CBF]/10 px-2 py-0.5 rounded-full font-semibold">{p.time}</span>
                      </div>
                      <p className="text-[#5a4a6b] text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {category.subservices && category.subservices.length > 0 && (
          <div className="border-t border-[#e9e0f5] bg-[#faf8ff] p-6 sm:p-8">
            <h3 className="text-sm font-bold text-[#5a4a6b] uppercase tracking-wide mb-4">Servi\u00e7os inclusos nesta categoria</h3>
            <div className="space-y-4">
              {category.subservices.map(sub => (
                <SubserviceCard key={sub.id} item={sub} depth={1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function WikiNav() {
  return (
    <nav className="hidden lg:block sticky top-20 w-64 shrink-0 self-start">
      <div className="bg-white rounded-2xl border border-[#e9e0f5] p-4">
        <h3 className="font-bold text-[#272757] text-sm mb-3">Categorias</h3>
        <ul className="space-y-1">
          {categories.map(c => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#5a4a6b] hover:bg-[#f5f0ff] hover:text-[#7B2CBF] transition-colors">
                <CategoryIcon type={c.icon} />
                <span>{c.title}</span>
                {c.tag && <span className="ml-auto text-[10px] text-amber-600 font-semibold">{c.tag}</span>}
              </a>
              {c.subservices && c.subservices.length > 0 && (
                <ul className="ml-8 mt-1 space-y-0.5">
                  {c.subservices.map(sub => (
                    <li key={sub.id}>
                      <a href={`#${sub.id}`} className="block px-2 py-1 rounded text-xs text-[#5a4a6b] hover:text-[#7B2CBF] hover:bg-[#f5f0ff] transition-colors truncate">
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#7B2CBF] text-white shadow-lg flex items-center justify-center hover:bg-[#5A1D8E] transition-colors"
        aria-label="Navegar"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[75vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#272757] text-lg">Navegar</h3>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="mb-4">
              <a href="#diagnostico" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-[#5a4a6b] hover:bg-[#f5f0ff]">Base: Diagn\u00f3stico Completo</a>
              <a href="#pesquisa" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-[#5a4a6b] hover:bg-[#f5f0ff]">Base: Pesquisa de Marketing</a>
            </div>
            <div className="border-t border-[#e9e0f5] pt-3">
              {categories.map(c => (
                <div key={c.id} className="mb-2">
                  <a href={`#${c.id}`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#272757] hover:bg-[#f5f0ff]">
                    <div className="w-7 h-7 rounded-lg bg-[#7B2CBF]/10 flex items-center justify-center">
                      <CategoryIcon type={c.icon} />
                    </div>
                    <span>{c.title}</span>
                    {c.tag && <span className="ml-auto text-[10px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">{c.tag}</span>}
                  </a>
                  {c.subservices && c.subservices.length > 0 && (
                    <div className="ml-9">
                      {c.subservices.map(sub => (
                        <a key={sub.id} href={`#${sub.id}`} onClick={() => setOpen(false)} className="block px-3 py-1.5 rounded text-xs text-[#5a4a6b] hover:text-[#7B2CBF] hover:bg-[#f5f0ff]">
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#e9e0f5]">
              <a href="#/" onClick={() => setOpen(false)} className="block text-center text-sm text-[#5a4a6b] hover:text-[#7B2CBF]">\u2190 Voltar ao site</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Wiki() {
  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e9e0f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7B2CBF] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="text-xl font-bold text-[#272757]">Pulso</span>
            <span className="text-sm text-[#5a4a6b] hidden sm:inline">/ Wiki de Servi\u00e7os</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#/" className="text-sm text-[#5a4a6b] hover:text-[#7B2CBF] transition-colors">\u2190 Voltar ao site</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 bg-[#7B2CBF] hover:bg-[#5A1D8E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Falar com Especialista
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#7B2CBF]/10 text-[#7B2CBF] text-xs font-semibold px-3 py-1 rounded-full mb-4">WIKI DE SERVI\u00c7OS</div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#272757] mb-4">Tudo que a Pulso pode fazer pela sua cl\u00ednica</h1>
            <p className="text-[#5a4a6b] text-lg max-w-2xl mx-auto">Cada servi\u00e7o explicado em detalhe: o que \u00e9, por que gera valor, o que entregamos e como executamos.</p>
          </div>

          {/* Baseline: included in all services */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#272757] text-white flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#272757]">Base de Todos os Servi\u00e7os</h2>
                <p className="text-sm text-[#5a4a6b]">Diagn\u00f3stico e pesquisa est\u00e3o inclu\u00eddos em qualquer servi\u00e7o contratado</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {baseline.map(b => <BaselineCard key={b.id} item={b} />)}
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-8 items-start">
            <WikiNav />
            <div className="flex-1 min-w-0 space-y-8">
              {categories.map(c => (
                <CategorySection key={c.id} category={c} />
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#7B2CBF] to-[#272757] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Quer saber qual servi\u00e7o \u00e9 ideal para voc\u00ea?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Comece pelo diagn\u00f3stico gratuito. Em 7 dias, voc\u00ea sabe exatamente o que precisa.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#7B2CBF] font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-xl">
              Quero o diagn\u00f3stico gratuito
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#e9e0f5] py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7B2CBF] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="font-bold text-[#272757]">Pulso</span>
            <span className="text-[#5a4a6b] text-sm">por Trion Marketing</span>
          </div>
          <p className="text-[#5a4a6b] text-sm">&copy; {new Date().getFullYear()} Trion Marketing. Todos os direitos reservados.</p>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}

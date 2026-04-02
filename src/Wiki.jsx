import { useState, useEffect } from 'react'

const baseline = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Completo',
    executive: 'Primeiro passo antes de qualquer ação de marketing. Funciona como um "check-up" da clínica: análise da situação comercial (preços, serviços, agenda, canais de venda) e presença digital (Google, Instagram, site, reputação online). Resultado: relatório com nota de 0 a 100 e plano de ação.',
    value: 'Sem diagnóstico, qualquer investimento em marketing é chute. O diagnóstico revela onde a clínica perde pacientes e entrega um plano priorizado. Funciona também como porta de entrada comercial — demonstra competência antes de pedir investimento.',
    deliverables: [
      'Relatório de Diagnóstico (PDF/DOCX, 10-15 páginas)',
      'Apresentação executiva (5-7 slides)',
      'Score de Posicionamento Digital (0-100) com benchmark de concorrentes',
      'Mapa de oportunidades priorizadas',
    ],
    playbook: [
      { step: 'Coleta de informações', desc: 'Briefing com o médico/gestor: serviços, preços, histórico, diferenciais, canais atuais, investimento em marketing. Formulário padronizado + call de 30min.', time: 'Dia 1' },
      { step: 'Auditoria digital', desc: 'Avaliar Google Meu Negócio, Instagram, site, diretórios (Doctoralia, TopDoctors). Completude, reviews, fotos, posição no Map Pack, SEO, velocidade.', time: 'Dias 2-3' },
      { step: 'Análise comercial', desc: 'Taxa de ocupação da agenda, ticket médio, recorrência, mix particular/convênio. Identificar gargalos (tempo de resposta WhatsApp, follow-up, no-show).', time: 'Dias 2-3' },
      { step: 'Benchmark concorrentes', desc: 'Mapear 3-5 concorrentes diretos: presença digital, nota Google, engajamento IG, posicionamento de preço.', time: 'Dia 4' },
      { step: 'Scoring e relatório', desc: 'Pontuar 0-100 em 3 plataformas (Google, IG, Site). Classificar: Crítico (0-40), Em desenvolvimento (41-70), Otimizado (71-100). Estimar receita perdida. Montar relatório + apresentação.', time: 'Dias 5-7' },
      { step: 'Apresentação ao cliente', desc: 'Reunião de 30-45min com achados, quick wins e plano recomendado. Foco na agenda (quantos pacientes a mais), não em métricas técnicas.', time: 'Dia 7' },
    ],
  },
  {
    id: 'pesquisa',
    title: 'Pesquisa de Marketing',
    executive: 'Inteligência por trás de todas as decisões. Identifica o paciente ideal do cliente, o que pesquisa no Google, quais concorrentes disputam esse público e em quais meses a demanda sobe ou cai. Com esses dados, cada real investido tem direção.',
    value: 'Sem pesquisa, o marketing é baseado em achismo. Com os dados, sabemos quantas pessoas buscam os serviços na região, quanto custa um clique e quais procedimentos têm alta demanda mas pouca oferta — oportunidades reais de crescimento.',
    deliverables: [
      'Relatório de Pesquisa (PDF/DOCX, 15-20 páginas)',
      'Planilha de keywords (50-100 termos com volume e CPC)',
      'Mapa de concorrentes (comparativo visual)',
      'Perfil de persona do paciente ideal',
    ],
    playbook: [
      { step: 'Definir persona', desc: 'Perfil demográfico + psicográfico do paciente ideal: idade, renda, dores, desejos, objeções, jornada de decisão.', time: 'Dias 1-2' },
      { step: 'Pesquisa de keywords', desc: 'Mapear 50-100 termos: volume mensal, CPC, dificuldade. Organizar por cluster de serviço. Identificar long-tails de baixa concorrência.', time: 'Dias 2-4' },
      { step: 'Análise de demanda', desc: 'Cruzar volume de busca com raio geográfico. Estimar mercado mensal em leads potenciais. Mapear sazonalidade.', time: 'Dias 3-5' },
      { step: 'Mapear concorrentes', desc: 'Analisar 5-10 concorrentes: presença digital, posicionamento de preço, volume de reviews, pontos fortes e fracos.', time: 'Dias 4-6' },
      { step: 'Consolidar relatório', desc: 'Documento final com personas, mapa de keywords, análise de concorrentes, oportunidades e recomendações estratégicas.', time: 'Dias 7-10' },
    ],
  },
]

const categories = [
  {
    id: 'trafego-pago',
    title: 'Tráfego Pago',
    icon: 'rocket',
    tag: null,
    executive: 'Compra de visibilidade no Google e Instagram para atrair pacientes qualificados. Gerenciamento de campanhas em Google Ads (para quem já está pesquisando) e Meta Ads (para quem ainda não sabe que precisa). Objetivo: gerar agendamentos a um custo previsível.',
    value: 'Enquanto o orgânico leva meses, anúncios geram leads na primeira semana. Um CPC de R$5 com 10% de conversão = R$50 por lead. Se 25% agenda e o ticket médio é R$500, cada R$1 investido retorna R$2,50. Com otimização contínua, esse número sobe para 5-10x em 90 dias.',
    deliverables: [
      'Campanhas ativas no Google Ads e/ou Meta Ads',
      'Landing pages por campanha',
      '4-8 criativos de anúncio/mês',
      'Dashboard de métricas em tempo real',
      'Relatório mensal (CPL, CPA, ROAS, CTR)',
      'Reunião mensal de alinhamento',
    ],
    playbook: [
      { step: 'Setup de contas', desc: 'Criar/acessar Google Ads + Business Manager (Meta). Instalar pixel e tags de conversão. Conectar GA4. Configurar eventos de conversão.', time: 'Dias 1-2' },
      { step: 'Campanhas Google', desc: 'Pesquisa (termos de alta intenção), Google Maps ads, Display/remarketing, extensões (sitelinks, callouts, localização, ligação).', time: 'Dias 2-4' },
      { step: 'Campanhas Meta', desc: 'Awareness, tráfego para LP/WhatsApp, leads (formulário nativo), remarketing, lookalike.', time: 'Dias 2-4' },
      { step: 'Otimização semanal', desc: 'Ajustar lances, pausar keywords ruins, negativar termos irrelevantes, testar novos públicos, realocar budget.', time: 'Contínuo' },
      { step: 'Relatório mensal', desc: 'Métricas-chave: CPL, CPA, ROAS, CTR. Comparar com mês anterior. Recomendações + reunião de 30min.', time: 'Mensal' },
    ],
    subservices: [
      {
        id: 'gmb',
        title: 'Google Meu Negócio',
        tag: null,
        executive: 'O Google Meu Negócio é o cartão de visitas da clínica no Google. Quando alguém pesquisa "dermatologista perto de mim", os 3 primeiros resultados no mapa (Map Pack) recebem a maioria dos cliques. Criação, otimização e manutenção do perfil para posicionar a clínica nessas posições.',
        value: '46% de todas as buscas no Google têm intenção local. Um perfil GMB otimizado gera ligações, rotas e visitas ao site sem custo por clique. Estar no top 3 do Maps é equivalente a estar na vitrine da rua mais movimentada da cidade.',
        deliverables: [
          'Perfil verificado e 100% preenchido',
          'Fotos profissionais (10-20 imagens)',
          'Posts semanais no Google (4-8/mês)',
          'Gestão de avaliações com templates de resposta',
          'Relatório mensal de insights (visualizações, cliques, ligações)',
        ],
        playbook: [
          { step: 'Verificar/criar perfil', desc: 'Criar com nome exato da clínica, endereço, telefone, horários. Solicitar verificação. Se existe: auditar com checklist de 30+ pontos.', time: 'Dias 1-3' },
          { step: 'Otimizar informações', desc: 'Categoria principal + secundárias. Descrição de 750 caracteres com palavras-chave. Atributos. URL do site, link de agendamento.', time: 'Dia 3' },
          { step: 'Upload de fotos', desc: 'Fachada, interior, equipe, antes/depois (quando CFM permitir). Mínimo 10, ideal 20+. Geotaggear.', time: 'Dia 4' },
          { step: 'Cadastrar serviços e Q&A', desc: 'Listar procedimentos como "serviços" com descrição. Preencher 10-15 perguntas frequentes proativamente.', time: 'Dia 5' },
          { step: 'Rotina mensal', desc: '1-2 posts/semana. Responder 100% das avaliações em 24h. Atualizar fotos (2-4 novas/mês). Relatório mensal.', time: 'Contínuo' },
        ],
      },
      {
        id: 'landing-page',
        title: 'Landing Page',
        tag: null,
        executive: 'Página única com um único objetivo: conversão. Enquanto o site institucional tem várias páginas, a LP foca em um procedimento ou campanha específica e direciona toda a atenção para uma ação: agendar.',
        value: 'Anúncios que direcionam para o site geral convertem 2-5%. Anúncios para uma LP específica convertem 8-15%. Cada landing page bem feita pode significar o dobro ou triplo de agendamentos com o mesmo investimento.',
        deliverables: [
          'Landing page publicada e conectada a campanhas',
          'Headline testada e copywriting persuasivo',
          'Formulário de captura ou botão WhatsApp',
          'A/B testing configurado (quando há volume)',
        ],
        playbook: [
          { step: 'Definir campanha', desc: 'Procedimento com melhor margem ou maior demanda. Definir oferta e urgência.', time: 'Dia 1' },
          { step: 'Copywriting', desc: 'Headline: problema + solução. 3-5 bullets de benefícios. Prova social. FAQ de 5-8 perguntas.', time: 'Dias 1-2' },
          { step: 'Design e desenvolvimento', desc: 'Layout de coluna única, sem menu. Hero com imagem/vídeo. CTA acima da dobra e repetido. Formulário curto.', time: 'Dias 2-4' },
          { step: 'Integração e teste', desc: 'Conectar formulário ao CRM/WhatsApp. Pixel de conversão. Testar em mobile. PageSpeed 90+.', time: 'Dias 5-7' },
        ],
      },
      {
        id: 'auditoria-comercial',
        title: 'Auditoria Comercial',
        tag: 'Aditivo no preço',
        executive: 'Análise do processo de vendas da clínica — do primeiro contato no WhatsApp até o pós-consulta. De nada adianta investir em marketing se a equipe demora 2 dias para responder, não tem script ou não faz follow-up. Muitas clínicas perdem 30-50% dos leads nessa etapa.',
        value: 'Reduzir o tempo de resposta de 4h para 15min pode dobrar a taxa de conversão. Implementar follow-up automatizado recupera 20-30% dos leads que não agendaram de primeira. A auditoria encontra dinheiro que a clínica já gasta, mas perde no atendimento.',
        deliverables: [
          'Relatório de Auditoria Comercial (PDF/DOCX)',
          'Score de atendimento (0-100 por etapa)',
          'Pack de scripts (WhatsApp, telefone, recepção)',
          'Fluxograma do funil de vendas',
          'Fluxo de automação (confirmação, lembrete, follow-up)',
          'Sessão de treinamento para recepção (1-2h)',
        ],
        playbook: [
          { step: 'Cliente oculto', desc: 'Entrar em contato como paciente via WhatsApp, telefone e formulário. Medir tempo de resposta, qualidade, se há script, se oferece agendamento.', time: 'Dias 1-3' },
          { step: 'Análise do funil', desc: 'Mapear cada etapa: lead entra → resposta → qualificação → agendamento → consulta → pós-consulta. Identificar onde caem leads.', time: 'Dias 3-5' },
          { step: 'Scripts e automações', desc: 'Scripts para WhatsApp, telefone e recepção. Fluxo de automação: confirmação 24h antes, lembrete 2h antes, pesquisa pós-consulta.', time: 'Dias 7-10' },
          { step: 'Treinamento', desc: 'Sessão de 1-2h com equipe. Entrega de relatório + scripts + fluxograma. Acompanhamento 2 semanas.', time: 'Dias 10-15' },
        ],
      },
      {
        id: 'criativos-anuncios',
        title: 'Criativos (Fotos e Vídeos)',
        tag: 'Para anúncios',
        executive: 'Peças visuais que alimentam as campanhas de anúncio: banners, vídeos curtos, carrosséis. Produção completa — do roteiro à edição final — para que o médico só precise gravar quando necessário.',
        value: 'Anúncios com vídeo têm CTR 2-3x maior que estáticos. Criativos novos a cada 2-3 semanas evitam fadiga de anúncio. Investir em criativos de qualidade reduz o custo por lead porque a plataforma premia melhor engajamento.',
        deliverables: [
          '10-20 peças estáticas/mês (banners, anúncios)',
          '4-8 vídeos editados/mês (Reels, anúncios)',
          'Roteiros para gravação pelo médico',
          'Direção de gravação (remota ou presencial)',
          'Legendas em todos os vídeos',
        ],
        playbook: [
          { step: 'Roteiros', desc: 'Storyboard para cada peça. Formato: hook (3s) + conteúdo + CTA. Para o médico: roteiros curtos, linguagem natural.', time: 'Dias 1-2' },
          { step: 'Gravação', desc: 'Presencial: dirigir gravação no consultório. Remota: enviar guia de gravação com celular (enquadramento, luz, áudio).', time: 'Dia 3' },
          { step: 'Edição', desc: 'Corte profissional, legendas obrigatórias, música, thumbnails. Formatos: 1:1 (feed), 9:16 (stories/reels), 16:9 (YouTube).', time: 'Dias 4-6' },
          { step: 'Teste A/B', desc: 'Mínimo 3 variações por conjunto. Renovar a cada 2-3 semanas. Banco organizado por tipo e campanha.', time: 'Contínuo' },
        ],
      },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media',
    icon: 'instagram',
    tag: null,
    executive: 'Gestão completa do Instagram da clínica: da otimização do perfil à produção de conteúdo, passando por Reels, Stories e interação com a comunidade. Objetivo: construir autoridade médica que converte em agendamentos.',
    value: '72% dos pacientes verificam o Instagram do médico antes de agendar. Um perfil ativo com conteúdo educativo, resultados e humanização gera confiança. O mix certo de conteúdo cria um ciclo de atração orgânica que complementa os anúncios.',
    deliverables: [
      'Perfil otimizado (bio, highlights, feed visual)',
      '12-20 posts/mês (feed + carrosséis)',
      '4-8 Reels/mês',
      '15-20 Stories/mês',
      'Calendário editorial mensal',
      'Gestão de comentários e DMs',
      'Relatório mensal de métricas',
    ],
    playbook: [
      { step: 'Setup do perfil', desc: 'Bio com CTA + link. Foto profissional. 5-8 highlights: Serviços, Resultados, Depoimentos, FAQ, Sobre, Dicas. 3 posts fixados.', time: 'Dias 1-3' },
      { step: 'Planejamento editorial', desc: 'Calendário mensal. Mix: 40% educativo, 25% resultados/prova social, 15% bastidores, 10% CTA, 10% tendências.', time: 'Mensal' },
      { step: 'Produção de conteúdo', desc: 'Carrosséis educativos, Reels 15-60s, Stories diários, prova social.', time: 'Contínuo' },
      { step: 'Publicação e engajamento', desc: 'Publicar nos melhores horários. Responder comentários em 4h e DMs em 2h. Engajamento ativo com perfis da região.', time: 'Diário' },
      { step: 'Análise mensal', desc: 'Relatório: alcance, engajamento (meta 2%+), crescimento, salvamentos, compartilhamentos. Ajustar mix.', time: 'Mensal' },
    ],
    subservices: [
      {
        id: 'criativos-social',
        title: 'Criativos (Fotos, Vídeos e Postagens com Edição)',
        tag: null,
        executive: 'Produção visual completa para redes sociais: posts de feed, carrosséis, vídeos curtos (Reels), Stories e artes finais editadas. Do briefing à entrega final, incluindo roteiro, direção, gravação e edição profissional.',
        value: 'Conteúdo visual de qualidade profissional aumenta o engajamento em 3-5x comparado a posts amadores. Vídeos geram 2x mais salvamentos e compartilhamentos que imagens estáticas. A consistência visual constrói reconhecimento de marca.',
        deliverables: [
          '10-20 peças estáticas/mês (posts, carrosséis)',
          '4-8 vídeos editados/mês (Reels, Stories)',
          'Roteiros para gravação pelo médico',
          'Direção de gravação (remota ou presencial)',
          'Edição com legendas, música e efeitos',
          'Templates padronizados na identidade visual',
        ],
        playbook: [
          { step: 'Inventário visual', desc: 'Coletar fotos/vídeos existentes. Avaliar qualidade. Definir o que precisa ser produzido.', time: 'Dia 1' },
          { step: 'Roteiros e briefings', desc: 'Criar roteiro para cada peça de vídeo. Para o médico: textos curtos, linguagem natural. Guia de cenário e luz.', time: 'Dias 2-3' },
          { step: 'Gravação', desc: 'Presencial no consultório ou remota com guia detalhado. Foco em naturalidade e autoridade.', time: 'Dia 4' },
          { step: 'Edição e entrega', desc: 'Corte, legendas (85% assistem sem som), música, transições, thumbnail. Formatos adaptados para cada plataforma.', time: 'Dias 5-7' },
        ],
      },
    ],
  },
  {
    id: 'site',
    title: 'Criação de Site (Portal)',
    icon: 'globe',
    tag: 'Adicional',
    executive: 'O site é a base de toda a estratégia digital. Não é um folder — é uma máquina de conversão. Sites mobile-first, rápidos, otimizados para Google e com foco em fazer o visitante agendar consulta.',
    value: '60% dos pacientes pesquisam online antes de escolher um médico. Um site lento, antigo ou sem botão de WhatsApp perde pacientes para concorrentes. Um site bem feito funciona 24h como vendedor: aparece no Google, transmite credibilidade e converte visitantes em agendamentos.',
    deliverables: [
      'Site institucional completo (6-8 páginas)',
      'Design responsivo (mobile-first)',
      'SEO on-page configurado (titles, metas, Schema.org)',
      'GA4 + Google Search Console + Meta Pixel',
      'Botão de WhatsApp flutuante',
      'Treinamento básico para equipe editar conteúdo',
    ],
    playbook: [
      { step: 'Briefing e wireframe', desc: 'Estrutura de páginas, hierarquia de informação, CTAs primários. Coletar textos, fotos, certificações. Validar wireframe.', time: 'Dias 1-3' },
      { step: 'Design e desenvolvimento', desc: 'Mobile-first. PageSpeed 85+. Cores e tipografia alinhadas com identidade visual. Páginas individuais por serviço (SEO).', time: 'Dias 4-10' },
      { step: 'Conteúdo e SEO', desc: 'Titles e meta descriptions únicos. Schema.org (LocalBusiness, MedicalClinic). Sitemap XML. Imagens otimizadas.', time: 'Dias 8-12' },
      { step: 'Integrações', desc: 'GA4 + Search Console + Meta Pixel + Google Ads tag. WhatsApp widget. Integração com Doctoralia/Calendly.', time: 'Dias 12-14' },
      { step: 'Conformidade CFM + LGPD', desc: 'Sem preços expostos, antes/depois só com consentimento, política de privacidade, cookies, opt-in em formulários.', time: 'Dia 14' },
      { step: 'Publicação e treinamento', desc: 'Deploy com SSL. Indexação no Google. Treinamento de 30min para equipe. Monitorar Core Web Vitals.', time: 'Dias 15-20' },
    ],
    subservices: [],
  },
  {
    id: 'ia-automacoes',
    title: 'Inteligência Artificial e Automações',
    icon: 'cpu',
    tag: 'Adicional',
    executive: 'Soluções de IA e automação para clínicas que querem escalar sem aumentar equipe. Chatbots que qualificam e agendam, notificações inteligentes e CRM automatizado — tudo funcionando 24h.',
    value: 'Automações reduzem custo operacional em 30-50% e eliminam erros humanos. Um bot no WhatsApp que responde em 15 segundos (vs. 4h da recepção) pode dobrar a taxa de conversão de leads em agendamentos. Notificações automáticas reduzem no-show em até 40%.',
    deliverables: [
      'Solução completa de automação implementada',
      'Dashboard de monitoramento',
      'Treinamento da equipe',
      'Suporte técnico mensal',
    ],
    playbook: [
      { step: 'Mapeamento de processos', desc: 'Identificar fluxos repetitivos: agendamento, confirmação, follow-up, cobrança, pesquisa de satisfação. Priorizar por impacto.', time: 'Dias 1-3' },
      { step: 'Configuração e testes', desc: 'Implementar automações escolhidas. Testar exaustivamente com cenários reais. Ajustar prompts e fluxos.', time: 'Dias 4-10' },
      { step: 'Go-live e treinamento', desc: 'Ativar em produção. Treinar equipe. Monitorar primeiras 2 semanas. Ajustes finos.', time: 'Dias 11-14' },
    ],
    subservices: [
      {
        id: 'bot-qualificacao',
        title: 'Bot de Qualificação e Agendamento',
        tag: null,
        executive: 'Chatbot inteligente no WhatsApp que atende pacientes 24h. Faz a triagem do interesse (procedimento, urgência, disponibilidade), qualifica o lead e agenda direto na agenda do médico — sem esperar a recepção.',
        value: 'Um bot responde em 15 segundos, enquanto a recepção leva em média 4h. Funciona fora do horário comercial (50% das buscas por médico acontecem à noite/fim de semana). Reduz carga da equipe e garante que nenhum lead é ignorado.',
        deliverables: [
          'Bot WhatsApp configurado e ativo 24h',
          'Fluxo de qualificação personalizado por procedimento',
          'Integração com agenda (Google Calendar, Doctoralia)',
          'Dashboard de leads qualificados',
          'Relatório mensal de conversões',
        ],
        playbook: [
          { step: 'Mapeamento de fluxo', desc: 'Definir perguntas de qualificação: procedimento de interesse, urgência, preferência de horário, convênio. Árvore de decisão por serviço.', time: 'Dias 1-2' },
          { step: 'Configuração do bot', desc: 'Criar persona de atendimento (tom profissional mas acolhedor). Configurar respostas, botões interativos, fallback para humano.', time: 'Dias 3-5' },
          { step: 'Integrações', desc: 'Conectar com agenda do médico, CRM, sistema de notificações. Configurar regras de encaminhamento (quente → humano imediato).', time: 'Dias 6-7' },
          { step: 'Teste e go-live', desc: 'Testar com cenários reais. Treinar equipe sobre o fluxo. Monitorar primeiras 2 semanas. Ajustar respostas com base em conversas reais.', time: 'Dias 8-14' },
        ],
      },
      {
        id: 'notificacoes',
        title: 'Notificações a Pacientes e Colaboradores',
        tag: null,
        executive: 'Sistema automatizado de notificações por WhatsApp para toda a jornada do paciente: confirmação de consulta, lembrete, preparo para exames, pós-consulta e retorno. Também para colaboradores: lembretes de tarefas e comunicação interna.',
        value: 'Notificações automáticas reduzem no-show em 30-40% (de 25% para 12-15%). Lembrete de retorno reativa 20-30% dos pacientes inativos. A equipe deixa de gastar horas ligando para confirmar e foca no atendimento presencial.',
        deliverables: [
          'Sistema de confirmação automática 24h antes',
          'Lembrete 2h antes da consulta',
          'Pesquisa de satisfação pós-consulta',
          'Lembrete de retorno automático',
          'Notificações internas para equipe',
        ],
        playbook: [
          { step: 'Mapear jornada', desc: 'Definir todos os pontos de contato: pré-consulta, dia da consulta, pós-consulta, retorno. Definir timing ideal de cada notificação.', time: 'Dias 1-2' },
          { step: 'Criar templates', desc: 'Escrever mensagens para cada momento. Tom profissional e acolhedor. Incluir botões interativos (confirmar/reagendar/cancelar).', time: 'Dias 3-4' },
          { step: 'Configurar automações', desc: 'Integrar com sistema de agenda. Configurar triggers e cronômetros. Testar com cenários reais.', time: 'Dias 5-7' },
          { step: 'Monitoramento', desc: 'Acompanhar taxa de no-show, taxa de confirmação, reativação de pacientes inativos. Ajustar mensagens mensalmente.', time: 'Contínuo' },
        ],
      },
      {
        id: 'crm',
        title: 'CRM',
        tag: null,
        executive: 'Sistema centralizado para gerenciar todos os leads e pacientes da clínica. Do primeiro contato ao pós-consulta, cada interação é registrada. O médico e a equipe têm visibilidade total do pipeline de vendas e do histórico de cada paciente.',
        value: 'Sem CRM, leads se perdem entre WhatsApp, telefone e e-mail. Com CRM, a clínica sabe exatamente quantos leads recebeu, quantos agendaram, quantos faltaram e por quê. Permite segmentação para campanhas (ex: pacientes que fizeram botox há 6 meses → lembrete de retorno).',
        deliverables: [
          'CRM implementado e configurado',
          'Pipeline de vendas personalizado (lead → contato → agendamento → consulta → retorno)',
          'Integração com WhatsApp e formulários',
          'Dashboard de métricas de vendas',
          'Treinamento da equipe (recepção + gestor)',
        ],
        playbook: [
          { step: 'Escolha e setup', desc: 'Selecionar CRM adequado (custo x funcionalidade). Configurar pipeline personalizado. Importar base de pacientes existente.', time: 'Dias 1-3' },
          { step: 'Integrações', desc: 'Conectar com WhatsApp (mensagens viram registros), formulários do site/LP, Google Ads (leads entram automaticamente), agenda.', time: 'Dias 4-7' },
          { step: 'Automações', desc: 'Lead novo → alerta para recepção. Lead sem resposta em 2h → escalação. Pós-consulta → pesquisa NPS. 6 meses → lembrete de retorno.', time: 'Dias 8-10' },
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
    executive: 'Consultoria estratégica para clínicas que querem ir além do marketing digital: melhorar processos internos, treinar equipe, inovar em serviços e medir a satisfação real dos pacientes. Complemento que transforma a clínica por dentro.',
    value: 'Marketing atrai pacientes, mas processos mal estruturados os perdem. Uma clínica com rituais de atendimento definidos, equipe treinada e NPS alto constrói reputação que reduz o custo de aquisição ao longo do tempo. O bônus: avaliações positivas no Google são o melhor marketing gratuito.',
    deliverables: [
      'Diagnóstico de processos e clima',
      'Plano de ação personalizado',
      'Sessões de treinamento',
      'Relatórios de NPS e clima',
    ],
    playbook: [
      { step: 'Diagnóstico interno', desc: 'Mapear processos atuais, entrevistar equipe, identificar gargalos e oportunidades de melhoria.', time: 'Dias 1-5' },
      { step: 'Plano de ação', desc: 'Priorizar ações por impacto vs. esforço. Definir responsáveis e prazos. Validar com gestor da clínica.', time: 'Dias 6-7' },
      { step: 'Implementação', desc: 'Executar o plano com suporte contínuo. Sessões quinzenais de acompanhamento.', time: 'Contínuo' },
    ],
    subservices: [
      {
        id: 'mapeamento-processo',
        title: 'Mapeamento de Processo',
        tag: null,
        executive: 'Documentação visual de todos os processos da clínica: desde como o lead é atendido até como o pós-consulta funciona. Identifica redundâncias, gargalos e etapas desnecessárias que atrasam o atendimento.',
        value: 'Processos mapeados permitem delegar com segurança (a clínica não depende de uma pessoa). Reduz erros, acelera o atendimento e facilita o treinamento de novos colaboradores. É o fundamento para qualquer automação futura.',
        deliverables: [
          'Fluxogramas visuais de cada processo',
          'Manual de operações (SOPs)',
          'Identificação de gargalos e recomendações',
          'Checklists de atendimento',
        ],
        playbook: [
          { step: 'Observação', desc: 'Acompanhar a rotina da clínica (presencial ou remoto). Entrevistar cada função. Documentar fluxo atual "como é".', time: 'Dias 1-3' },
          { step: 'Mapeamento', desc: 'Criar fluxogramas visuais (BPMN simplificado). Identificar gargalos, redundâncias e riscos.', time: 'Dias 4-5' },
          { step: 'Proposta "como deveria ser"', desc: 'Redesenhar processos otimizados. Criar SOPs e checklists. Validar com gestor.', time: 'Dias 6-7' },
        ],
      },
      {
        id: 'rituais',
        title: 'Definição de Rituais',
        tag: null,
        executive: 'Criação de rituais de gestão para a clínica: reuniões semanais de equipe, reviews mensais de métricas, feedbacks 1:1, planning de campanhas. Estrutura que transforma a clínica de "apagar incêndios" para "gestão profissional".',
        value: 'Clínicas que implementam rituais de gestão têm 40% menos rotatividade e 25% mais produtividade. A equipe sabe o que se espera, o médico tem visibilidade dos números e decisões são tomadas com dados, não com achismo.',
        deliverables: [
          'Calendário de rituais (semanal/mensal)',
          'Templates de reunião (pauta + ata)',
          'Dashboards de métricas por ritual',
          'Guia de implementação',
        ],
        playbook: [
          { step: 'Diagnóstico de gestão', desc: 'Entender como a clínica toma decisões hoje. Quais reuniões existem (se existem). Quais métricas acompanham.', time: 'Dias 1-2' },
          { step: 'Desenho dos rituais', desc: 'Definir frequência, participantes, pauta e entregáveis de cada ritual. Criar templates.', time: 'Dias 3-4' },
          { step: 'Implementação assistida', desc: 'Facilitar os primeiros 4 rituais junto com a equipe. Ajustar formato conforme feedback.', time: '4 semanas' },
        ],
      },
      {
        id: 'treinamento',
        title: 'Treinamento de Atendimento e Comercial',
        tag: null,
        executive: 'Capacitação da equipe de recepção e atendimento para converter mais leads em pacientes. Inclui scripts de abordagem, técnicas de venda consultiva adaptadas para saúde, e treinamento prático com simulações.',
        value: 'A recepção é o "vendedor" da clínica. Uma equipe treinada converte 30-40% dos leads em agendamentos (vs. 10-15% sem treinamento). O investimento em marketing só dá retorno completo quando o atendimento converte os leads que chegam.',
        deliverables: [
          'Pack de scripts (WhatsApp, telefone, presencial)',
          'Manual de atendimento',
          'Sessões de treinamento (2-4h)',
          'Simulações práticas com feedback',
          'Avaliação de desempenho pós-treinamento',
        ],
        playbook: [
          { step: 'Diagnóstico do atendimento', desc: 'Cliente oculto. Analisar conversas de WhatsApp. Identificar gaps (demora, falta de script, perda de leads).', time: 'Dias 1-3' },
          { step: 'Criar material', desc: 'Scripts para cada canal (WhatsApp, telefone, presencial). Fluxo de objeções. Frases proibidas. Técnicas de agendamento.', time: 'Dias 4-5' },
          { step: 'Treinamento', desc: 'Sessão teórica (1-2h) + simulações práticas (1-2h). Feedback individual. Reforço quinzenal.', time: 'Dia 6 + contínuo' },
        ],
      },
      {
        id: 'novos-servicos',
        title: 'Sugestão de Novos Serviços e Inovação',
        tag: null,
        executive: 'Análise de mercado para identificar novos procedimentos ou serviços que a clínica pode oferecer. Baseado em pesquisa de demanda, tendências, competência da equipe e viabilidade financeira.',
        value: 'Clínicas que renovam seu portfólio crescem 20-30% mais rápido. Identificar um procedimento de alta demanda e baixa oferta na região pode representar um novo canal de receita significativo sem aumentar a estrutura.',
        deliverables: [
          'Relatório de oportunidades de mercado',
          'Análise de viabilidade (investimento vs. retorno)',
          'Plano de lançamento do novo serviço',
          'Estratégia de marketing para divulgação',
        ],
        playbook: [
          { step: 'Pesquisa de mercado', desc: 'Analisar demanda regional (Google Trends, keywords, concorrentes). Identificar gaps e tendências.', time: 'Dias 1-5' },
          { step: 'Análise de viabilidade', desc: 'Investimento necessário (equipamento, treinamento, certificações). Projeção de retorno. Break-even.', time: 'Dias 6-8' },
          { step: 'Plano de lançamento', desc: 'Estratégia de divulgação, preço introdutório, campanhas de lançamento, meta de pacientes no primeiro trimestre.', time: 'Dias 9-12' },
        ],
      },
      {
        id: 'campanhas-gmn',
        title: 'Campanhas de Avaliações Google Meu Negócio',
        tag: null,
        executive: 'Estratégia estruturada para aumentar o volume e a nota das avaliações no Google. Inclui automação de solicitação pós-consulta, templates de resposta e protocolo para avaliações negativas.',
        value: 'A nota no Google é o fator #1 de decisão para 90% dos pacientes. Passar de 4.0 para 4.7 pode aumentar os agendamentos em 25%. Volume de avaliações recentes (últimos 3 meses) impacta diretamente o ranqueamento no Map Pack.',
        deliverables: [
          'Sistema automático de solicitação de avaliação',
          'Templates de resposta (positivas e negativas)',
          'Protocolo de gestão de crise (avaliações 1-2 estrelas)',
          'Relatório mensal de reputação',
        ],
        playbook: [
          { step: 'Auditoria de reputação', desc: 'Analisar nota atual, volume, tendência, resposta a avaliações. Comparar com concorrentes. Identificar padrões em avaliações negativas.', time: 'Dias 1-2' },
          { step: 'Automação', desc: 'Configurar mensagem automática pós-consulta (WhatsApp) solicitando avaliação. Link direto para o perfil Google. Timing ideal: 2h após a consulta.', time: 'Dias 3-5' },
          { step: 'Gestão contínua', desc: 'Responder 100% das avaliações em 24h. Para negativas: agradecer, pedir desculpas, levar para DM. Para positivas: agradecer e personalizar. Relatório mensal.', time: 'Contínuo' },
        ],
      },
      {
        id: 'pesquisa-clima',
        title: 'Pesquisa de Clima Organizacional',
        tag: null,
        executive: 'Pesquisa anônima com a equipe da clínica para medir satisfação, engajamento, identificação de problemas internos e oportunidades de melhoria no ambiente de trabalho.',
        value: 'Equipe insatisfeita atende mal, e atendimento ruim é a causa #1 de avaliações negativas. A pesquisa de clima identifica problemas antes que virem crises (turnover alto, fofoca, desalinhamento). É também um sinal de que a gestão se importa com a equipe.',
        deliverables: [
          'Questionário de clima personalizado',
          'Aplicação anônima (digital)',
          'Relatório de resultados com gráficos',
          'Plano de ação para pontos críticos',
        ],
        playbook: [
          { step: 'Elaborar questionário', desc: 'Adaptar para realidade da clínica. Temas: satisfação, comunicação, liderança, infraestrutura, reconhecimento. 20-30 perguntas (escala Likert + abertas).', time: 'Dias 1-2' },
          { step: 'Aplicar pesquisa', desc: 'Enviar link anônimo. Prazo de 5 dias. Lembrete no dia 3. Meta: 80%+ de participação.', time: 'Dias 3-8' },
          { step: 'Análise e devolutiva', desc: 'Consolidar dados, identificar padrões. Relatório visual. Apresentar ao gestor + plano de ação para itens críticos.', time: 'Dias 9-12' },
        ],
      },
      {
        id: 'nps',
        title: 'Pesquisa de Satisfação (NPS)',
        tag: null,
        executive: 'Medição contínua da satisfação dos pacientes através do NPS (Net Promoter Score). Pergunta simples: "De 0 a 10, o quanto você recomendaria nossa clínica?" + acompanhamento dos motivos.',
        value: 'NPS é o termômetro mais confiável da saúde do negócio. Pacientes promotores (9-10) indicam 3-5 pessoas. Detratores (0-6) falam mal para 10+. Acompanhar NPS mensal permite corrigir problemas rapidamente e transformar detratores em promotores.',
        deliverables: [
          'Sistema de NPS automatizado (pós-consulta)',
          'Dashboard de NPS em tempo real',
          'Relatório mensal com evolução e insights',
          'Fluxo de recuperação de detratores',
        ],
        playbook: [
          { step: 'Configurar NPS', desc: 'Mensagem automática 24h pós-consulta via WhatsApp. Pergunta NPS + pergunta aberta (motivo da nota). Link para pesquisa rápida.', time: 'Dias 1-3' },
          { step: 'Fluxo de ação', desc: 'Promotores (9-10): agradecer + pedir avaliação Google. Neutros (7-8): perguntar o que melhorar. Detratores (0-6): ligar em 24h para entender e resolver.', time: 'Dias 4-5' },
          { step: 'Monitoramento contínuo', desc: 'Acompanhar NPS semanal/mensal. Identificar tendências. Correlacionar com médico/procedimento/turno. Meta: NPS 70+.', time: 'Contínuo' },
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
    <div id={item.id} className="bg-[#f5f0ff] rounded-xl border border-[#e9e0f5] p-5 sm:p-6 scroll-mt-24">
      <h3 className="font-bold text-[#272757] text-lg mb-2">{item.title}</h3>
      <p className="text-[#5a4a6b] text-sm leading-relaxed mb-4">{item.executive}</p>
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Proposta de valor</h4>
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
    <div id={item.id} className={`bg-white rounded-xl border border-[#e9e0f5] p-5 sm:p-6 scroll-mt-24 ${depth > 0 ? 'ml-4 sm:ml-6' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-bold text-[#272757] text-base sm:text-lg">{item.title}</h3>
        {item.tag && <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{item.tag}</span>}
      </div>
      <p className="text-[#5a4a6b] text-sm leading-relaxed mb-4">{item.executive}</p>
      <div className="bg-[#f5f0ff] rounded-lg p-4 mb-4">
        <h4 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Proposta de valor</h4>
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
            <h3 className="text-xs font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Proposta de valor</h3>
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
            <h3 className="text-sm font-bold text-[#5a4a6b] uppercase tracking-wide mb-4">Serviços inclusos nesta categoria</h3>
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
        <h3 className="font-bold text-[#272757] text-sm mb-3">Índice</h3>
        <div className="mb-2 pb-2 border-b border-[#e9e0f5]">
          <p className="text-[10px] text-[#7B2CBF] font-bold uppercase tracking-wide px-3 mb-1">Base</p>
          {baseline.map(b => (
            <a key={b.id} href={`#${b.id}`} className="block px-3 py-1.5 rounded-lg text-sm text-[#5a4a6b] hover:bg-[#f5f0ff] hover:text-[#7B2CBF] transition-colors">{b.title}</a>
          ))}
        </div>
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
              <a href="#diagnostico" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-[#5a4a6b] hover:bg-[#f5f0ff]">Base: Diagnóstico Completo</a>
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7B2CBF] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="text-xl font-bold text-[#272757]">Pulso</span>
            <span className="text-sm text-[#5a4a6b] hidden sm:inline">/ Wiki de Serviços</span>
          </div>
          <span className="text-xs text-[#5a4a6b] bg-[#f5f0ff] px-3 py-1 rounded-full font-medium">Documento interno</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#7B2CBF]/10 text-[#7B2CBF] text-xs font-semibold px-3 py-1 rounded-full mb-4">WIKI DE SERVIÇOS</div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#272757] mb-4">Catálogo de serviços Pulso</h1>
            <p className="text-[#5a4a6b] text-lg max-w-2xl mx-auto">Referência interna com descrição, proposta de valor, entregas e playbook de cada serviço.</p>
          </div>

          {/* Baseline: included in all services */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#272757] text-white flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#272757]">Base de Todos os Serviços</h2>
                <p className="text-sm text-[#5a4a6b]">Diagnóstico e pesquisa estão incluídos em qualquer serviço contratado</p>
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
          <p className="text-[#5a4a6b] text-sm">Documento interno — uso restrito</p>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}

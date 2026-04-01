import { useState } from 'react'

const WHATSAPP_LINK = 'https://wa.me/5561999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Pulso'

const services = [
  {
    id: 'diagnostico',
    num: '01',
    title: 'Diagn\u00f3stico Completo',
    executive: 'O diagn\u00f3stico \u00e9 o primeiro passo antes de qualquer a\u00e7\u00e3o de marketing. Funciona como um "check-up" da cl\u00ednica: analisamos a situa\u00e7\u00e3o comercial (pre\u00e7os, servi\u00e7os, agenda, canais de venda) e a presen\u00e7a digital (Google, Instagram, site, reputação online). O resultado \u00e9 um relat\u00f3rio claro com nota de 0 a 100 e um plano do que precisa ser feito.',
    value: 'Sem diagn\u00f3stico, qualquer investimento em marketing \u00e9 chute. O m\u00e9dico descobre exatamente onde est\u00e1 perdendo pacientes (Google n\u00e3o otimizado, site lento, atendimento com falhas) e recebe um plano priorizado. Al\u00e9m disso, o diagn\u00f3stico gratuito funciona como porta de entrada comercial — demonstra compet\u00eancia antes de pedir dinheiro.',
    deliverables: [
      'Relat\u00f3rio de Diagn\u00f3stico (PDF/DOCX, 10-15 p\u00e1ginas)',
      'Apresenta\u00e7\u00e3o executiva (5-7 slides para o m\u00e9dico)',
      'Score de Posicionamento Digital (0-100) com benchmark de concorrentes',
      'Mapa de oportunidades priorizadas',
    ],
    playbook: [
      { step: 'Coleta de informa\u00e7\u00f5es', desc: 'Briefing com o m\u00e9dico/gestor: servi\u00e7os, pre\u00e7os, hist\u00f3rico, diferenciais, canais atuais, investimento em marketing. Use formul\u00e1rio padronizado + call de 30min.', time: 'Dia 1' },
      { step: 'Auditoria digital', desc: 'Avaliar Google Meu Neg\u00f3cio (completude, reviews, fotos, posição no Map Pack), Instagram (bio, highlights, engajamento, frequ\u00eancia), site (mobile, velocidade, SEO, CTAs), diret\u00f3rios (Doctoralia, TopDoctors).', time: 'Dias 2-3' },
      { step: 'An\u00e1lise comercial', desc: 'Calcular taxa de ocupa\u00e7\u00e3o da agenda, ticket m\u00e9dio, recorr\u00eancia, mix particular/conv\u00eanio. Identificar gargalos (tempo de resposta WhatsApp, follow-up, no-show).', time: 'Dias 2-3' },
      { step: 'Benchmark concorrentes', desc: 'Mapear 3-5 concorrentes diretos na regi\u00e3o: presen\u00e7a digital, nota Google, engajamento IG, posicionamento de pre\u00e7o.', time: 'Dia 4' },
      { step: 'Scoring e relat\u00f3rio', desc: 'Pontuar 0-100 em 3 plataformas (Google, IG, Site). Classificar: Cr\u00edtico (0-40), Em desenvolvimento (41-70), Otimizado (71-100). Estimar receita perdida por gaps. Montar relat\u00f3rio + apresenta\u00e7\u00e3o.', time: 'Dias 5-7' },
      { step: 'Apresenta\u00e7\u00e3o ao m\u00e9dico', desc: 'Reunião de 30-45min para apresentar achados, quick wins e plano recomendado. Focar na agenda (quantos pacientes a mais), n\u00e3o em m\u00e9tricas t\u00e9cnicas.', time: 'Dia 7' },
    ],
  },
  {
    id: 'pesquisa',
    num: '02',
    title: 'Pesquisa de Marketing',
    executive: 'A pesquisa de marketing \u00e9 a intelig\u00eancia por tr\u00e1s de todas as decis\u00f5es. Descobrimos quem \u00e9 o paciente ideal da cl\u00ednica, o que ele pesquisa no Google, quais concorrentes disputam esse p\u00fablico e em quais meses a demanda sobe ou cai. Com esses dados, cada real investido tem dire\u00e7\u00e3o.',
    value: 'Sem pesquisa, o marketing \u00e9 baseado em achismo. Com ela, o m\u00e9dico sabe exatamente quantas pessoas buscam seus servi\u00e7os na regi\u00e3o todo m\u00eas, quanto custa um clique no Google e quais procedimentos t\u00eam alta demanda mas pouca oferta — oportunidades reais de crescimento.',
    deliverables: [
      'Relat\u00f3rio de Pesquisa de Marketing (PDF/DOCX, 15-20 p\u00e1ginas)',
      'Planilha de keywords (Google Sheets, 50-100 termos com volume e CPC)',
      'Mapa de concorrentes (comparativo visual)',
      'Perfil de persona do paciente ideal',
    ],
    playbook: [
      { step: 'Definir persona', desc: 'Construir perfil demográfico + psicográfico do paciente ideal: idade, renda, dores, desejos, objeções, jornada de decisão (de "perceber o problema" até "agendar consulta").', time: 'Dias 1-2' },
      { step: 'Pesquisa de keywords', desc: 'Mapear 50-100 termos no Google Keyword Planner/Ubersuggest: volume mensal, CPC, KD (dificuldade). Organizar por cluster de serviço. Identificar long-tails de baixa concorrência.', time: 'Dias 2-4' },
      { step: 'An\u00e1lise de demanda', desc: 'Cruzar volume de busca com raio geográfico da clínica. Estimar TAM (total addressable market) mensal em leads potenciais. Mapear sazonalidade (verão para estética, inverno para tratamentos).', time: 'Dias 3-5' },
      { step: 'Mapear concorrentes', desc: 'Analisar 5-10 concorrentes: presença digital (Google, IG, site), posicionamento de preço, volume de reviews, pontos fortes e fracos. Montar quadro comparativo.', time: 'Dias 4-6' },
      { step: 'Identificar oportunidades', desc: 'Cruzar alta demanda + baixa oferta = oportunidades. Ex: "harmonização facial [bairro]" com 500 buscas/mês e nenhum concorrente ranqueado = oportunidade clara.', time: 'Dias 6-7' },
      { step: 'Consolidar relatório', desc: 'Montar documento final com personas, mapa de keywords, análise de concorrentes, oportunidades e recomendações estratégicas.', time: 'Dias 7-10' },
    ],
  },
  {
    id: 'gmb',
    num: '03',
    title: 'Google Meu Neg\u00f3cio',
    executive: 'O Google Meu Neg\u00f3cio (GMB) \u00e9 o cart\u00e3o de visitas da cl\u00ednica no Google. Quando algu\u00e9m pesquisa "dermatologista perto de mim", os 3 primeiros resultados no mapa (Map Pack) recebem a maioria dos cliques. Criamos, otimizamos e mantemos seu perfil para que a cl\u00ednica apare\u00e7a nessas posi\u00e7\u00f5es.',
    value: '46% de todas as buscas no Google t\u00eam inten\u00e7\u00e3o local. Um perfil GMB otimizado gera liga\u00e7\u00f5es, rotas e visitas ao site sem custo por clique. Para cl\u00ednicas que dependem de pacientes da regi\u00e3o, estar no top 3 do Maps \u00e9 equivalente a estar na vitrine da rua mais movimentada da cidade.',
    deliverables: [
      'Perfil verificado e 100% preenchido',
      'Fotos profissionais (10-20 imagens)',
      'Posts semanais no Google (4-8/m\u00eas)',
      'Gest\u00e3o de avalia\u00e7\u00f5es com templates de resposta',
      'Relat\u00f3rio mensal de insights (visualiza\u00e7\u00f5es, cliques, liga\u00e7\u00f5es)',
    ],
    playbook: [
      { step: 'Verificar/criar perfil', desc: 'Se não existe: criar com nome exato da clínica (sem keywords stuffing), endereço, telefone, horários. Solicitar verificação (cartão/vídeo/ligação). Se existe: auditar com checklist de 30+ pontos.', time: 'Dias 1-3' },
      { step: 'Otimizar informações', desc: 'Categoria principal + até 10 secundárias relevantes. Descrição de 750 caracteres com palavras-chave naturais. Atributos (acessibilidade, estacionamento, Wi-Fi). URL do site, link de agendamento.', time: 'Dia 3' },
      { step: 'Upload de fotos', desc: 'Fotos de fachada (entrada visível), interior (recepção, consultórios), equipe, antes/depois (quando CFM permitir). Mínimo 10, ideal 20+. Geotaggear quando possível.', time: 'Dia 4' },
      { step: 'Cadastrar serviços', desc: 'Listar todos os procedimentos como "serviços" com descrição e faixa de preço (quando permitido). Adicionar como "produtos" com fotos.', time: 'Dia 4' },
      { step: 'Configurar Q&A', desc: 'Preencher proativamente 10-15 perguntas frequentes (aceitam plano? estacionamento? horários? emergência?). Isso previne respostas incorretas de terceiros.', time: 'Dia 5' },
      { step: 'Rotina mensal', desc: '1-2 posts/semana (mix de educativo + promoções). Responder 100% das avaliações em até 24h (template para positivas e negativas). Atualizar fotos (2-4 novas/mês). Gerar relatório de insights mensal.', time: 'Contínuo' },
    ],
  },
  {
    id: 'site',
    num: '04',
    title: 'Cria\u00e7\u00e3o de Site',
    executive: 'O site \u00e9 a base de toda a estrat\u00e9gia digital. N\u00e3o \u00e9 um folder bonito — \u00e9 uma m\u00e1quina de convers\u00e3o. Criamos sites mobile-first, r\u00e1pidos, otimizados para Google e com foco em um objetivo: fazer o visitante agendar uma consulta.',
    value: '60% dos pacientes pesquisam online antes de escolher um m\u00e9dico. Um site lento, antigo ou sem bot\u00e3o de WhatsApp perde pacientes para concorrentes. Um site bem feito funciona 24h como vendedor: aparece no Google, transmite credibilidade e converte visitantes em agendamentos.',
    deliverables: [
      'Site institucional completo (6-8 p\u00e1ginas: Home, Sobre, Servi\u00e7os, Resultados, Depoimentos, Blog, Contato, FAQ)',
      'Design responsivo (mobile-first)',
      'SEO on-page configurado (titles, metas, Schema.org)',
      'GA4 + Google Search Console + Meta Pixel instalados',
      'Bot\u00e3o de WhatsApp flutuante',
      'Treinamento b\u00e1sico para equipe editar blog',
    ],
    playbook: [
      { step: 'Briefing e wireframe', desc: 'Definir estrutura de páginas, hierarquia de informação, CTAs primários. Coletar textos, fotos, certificações, depoimentos do médico. Validar wireframe antes de ir para design.', time: 'Dias 1-3' },
      { step: 'Design e desenvolvimento', desc: 'Mobile-first. PageSpeed 85+ mobile, LCP < 2.5s. Cores e tipografia alinhadas com identidade visual da clínica. Seções de serviço com páginas individuais (SEO).', time: 'Dias 4-10' },
      { step: 'Conteúdo e SEO', desc: 'Titles e meta descriptions únicos por página. H1 com keyword principal. Image ALTs descritivos. Schema.org (LocalBusiness, MedicalClinic, FAQ). Sitemap XML.', time: 'Dias 8-12' },
      { step: 'Integrações', desc: 'GA4 + Search Console + Meta Pixel + Google Ads tag. WhatsApp widget com mensagem pré-definida. Integração com Doctoralia/Calendly se aplicável.', time: 'Dias 12-14' },
      { step: 'Conformidade CFM', desc: 'Verificar: sem preços de consulta expostos, antes/depois só para estética com consentimento, depoimentos sem promessa de resultado, LGPD (política de privacidade, cookies, opt-in em formulários).', time: 'Dia 14' },
      { step: 'Publicação e treinamento', desc: 'Deploy com SSL. Indexação no Google (submit URL). Treinamento de 30min para equipe editar blog posts. Monitorar Core Web Vitals na primeira semana.', time: 'Dias 15-20' },
    ],
  },
  {
    id: 'landing-page',
    num: '05',
    title: 'Landing Page',
    executive: 'Uma landing page \u00e9 uma p\u00e1gina \u00fanica com um \u00fanico objetivo: convers\u00e3o. Enquanto o site institucional tem v\u00e1rias p\u00e1ginas e informa\u00e7\u00f5es, a LP foca em um procedimento ou campanha espec\u00edfica e direciona toda a aten\u00e7\u00e3o do visitante para uma a\u00e7\u00e3o: agendar.',
    value: 'An\u00fancios que direcionam para o site geral convertem 2-5%. An\u00fancios que direcionam para uma LP espec\u00edfica convertem 8-15%. Cada landing page bem feita pode significar o dobro ou triplo de agendamentos com o mesmo investimento em an\u00fancios.',
    deliverables: [
      'Landing page publicada e conectada a campanhas',
      'Headline testada e copywriting persuasivo',
      'Formul\u00e1rio de captura ou bot\u00e3o WhatsApp',
      'A/B testing configurado (quando h\u00e1 volume)',
    ],
    playbook: [
      { step: 'Definir procedimento/campanha', desc: 'Escolher o procedimento com melhor margem ou maior demanda. Definir oferta (avaliação gratuita, desconto primeira sessão, bônus). Definir urgência (vagas limitadas, promoção do mês).', time: 'Dia 1' },
      { step: 'Copywriting', desc: 'Headline: problema + solução em uma frase. Subheadline: benefício + prova. 3-5 bullets de benefícios (dor → solução). Prova social (reviews Google, número de pacientes). FAQ de 5-8 perguntas sobre o procedimento.', time: 'Dias 1-2' },
      { step: 'Design e desenvolvimento', desc: 'Layout de coluna única, sem menu de navegação (evitar distração). Hero com imagem/vídeo do resultado. CTA acima da dobra e repetido a cada 2 seções. Formulário curto: nome + telefone + procedimento.', time: 'Dias 2-4' },
      { step: 'Integração', desc: 'Conectar formulário ao CRM ou WhatsApp. Instalar pixel de conversão (Meta + Google). Configurar evento de conversão no GA4. URL limpa com UTMs para rastreamento.', time: 'Dia 4' },
      { step: 'Teste e publicação', desc: 'Testar em mobile (90%+ do tráfego em saúde é mobile). Verificar velocidade (PageSpeed 90+). Publicar e configurar A/B de headlines quando há volume suficiente.', time: 'Dias 5-7' },
    ],
  },
  {
    id: 'trafego-pago',
    num: '06',
    title: 'Tr\u00e1fego Pago (An\u00fancios)',
    executive: 'Tr\u00e1fego pago \u00e9 comprar visibilidade no Google e Instagram para atrair pacientes qualificados. Gerenciamos campanhas em Google Ads (para quem j\u00e1 est\u00e1 pesquisando) e Meta Ads (para quem ainda n\u00e3o sabe que precisa). O objetivo \u00e9 gerar agendamentos a um custo previs\u00edvel.',
    value: 'Enquanto o orgânico leva meses, anúncios geram leads já na primeira semana. Um CPC de R$5 com 10% de conversão = R$50 por lead. Se 25% agenda e o ticket médio é R$500, o ROAS é 2,5x — cada R$1 investido retorna R$2,50. Com otimização contínua, esse número sobe para 5-10x em 90 dias.',
    deliverables: [
      'Campanhas ativas no Google Ads e/ou Meta Ads',
      'Landing pages por campanha',
      '4-8 criativos de an\u00fancio/m\u00eas',
      'Dashboard de m\u00e9tricas em tempo real',
      'Relat\u00f3rio mensal (CPL, CPA, ROAS, CTR)',
      'Reuni\u00e3o mensal de alinhamento',
    ],
    playbook: [
      { step: 'Setup de contas', desc: 'Criar/acessar Google Ads + Business Manager (Meta). Instalar pixel e tags de conversão. Conectar GA4. Configurar eventos de conversão (formulário, WhatsApp click, ligação).', time: 'Dias 1-2' },
      { step: 'Estruturar campanhas Google', desc: 'Campanha de pesquisa: termos de alta intenção ("dentista implante [cidade]"). Campanha local: Google Maps ads. Display/remarketing para visitantes do site. Extensões: sitelinks, callouts, localização, ligação.', time: 'Dias 2-4' },
      { step: 'Estruturar campanhas Meta', desc: 'Awareness (alcance + frequência regional). Tráfego para LP ou WhatsApp. Leads (formulário nativo). Remarketing (interagiu com perfil/site). Lookalike (público semelhante à base de pacientes).', time: 'Dias 2-4' },
      { step: 'Criativos', desc: 'Mínimo 3 variações por conjunto de anúncios. Mix de estático + vídeo + carrossel. Renovar criativos a cada 2-3 semanas (fadiga de ad). Testar hooks diferentes (dor vs. resultado vs. autoridade).', time: 'Contínuo' },
      { step: 'Otimização semanal', desc: '2-3x por semana: ajustar lances, pausar keywords ruins, negativar termos irrelevantes, testar novos públicos, realocar budget entre campanhas que performam melhor.', time: 'Contínuo' },
      { step: 'Relatório mensal', desc: 'Métricas-chave: CPL (custo por lead), CPA (custo por agendamento), ROAS, CTR, impressões, cliques. Comparar com mês anterior. Recomendações para próximo mês. Reunião de 30min com o médico.', time: 'Mensal' },
    ],
  },
  {
    id: 'auditoria-comercial',
    num: '07',
    title: 'Auditoria Comercial',
    executive: 'A auditoria comercial analisa o processo de vendas da cl\u00ednica — do primeiro contato no WhatsApp at\u00e9 o p\u00f3s-consulta. De nada adianta investir em marketing se a equipe demora 2 dias para responder, n\u00e3o tem script, ou n\u00e3o faz follow-up. \u00c9 aqui que muitas cl\u00ednicas perdem 30-50% dos leads.',
    value: 'Reduzir o tempo de resposta de 4h para 15min pode dobrar a taxa de conversão. Implementar follow-up automatizado recupera 20-30% dos leads que não agendaram de primeira. A auditoria encontra dinheiro que a clínica já gasta para trazer o paciente, mas perde no atendimento.',
    deliverables: [
      'Relatório de Auditoria Comercial (PDF/DOCX)',
      'Score de atendimento (0-100 por etapa)',
      'Pack de scripts (WhatsApp, telefone, recepção)',
      'Fluxograma do funil de vendas',
      'Fluxo de automação (confirmação, lembrete, follow-up)',
      'Sessão de treinamento para recepção (1-2h)',
    ],
    playbook: [
      { step: 'Cliente oculto', desc: 'Entrar em contato com a clínica via WhatsApp, telefone e formulário como se fosse paciente. Medir: tempo de resposta, qualidade do atendimento, se há script, se oferece agendamento.', time: 'Dias 1-3' },
      { step: 'Análise do funil', desc: 'Mapear cada etapa: lead entra → resposta → qualificação → agendamento → confirmação → consulta → pós-consulta. Medir conversão entre cada etapa. Identificar onde caem leads.', time: 'Dias 3-5' },
      { step: 'Entrevista com equipe', desc: 'Conversar com recepção/atendimento: fluxo atual, dificuldades, ferramentas usadas, volume de contatos/dia. Identificar se há CRM, automações, métricas.', time: 'Dia 5' },
      { step: 'Benchmarking', desc: 'Comparar métricas da clínica com benchmarks do setor: tempo de resposta ideal <2h, taxa conversão lead→agendamento 25-40%, no-show <15%.', time: 'Dia 6' },
      { step: 'Scripts e automações', desc: 'Criar scripts de atendimento para WhatsApp (primeiro contato, follow-up, objeções), telefone e recepção. Montar fluxo de automação: confirmação 24h antes, lembrete 2h antes, pesquisa pós-consulta.', time: 'Dias 7-10' },
      { step: 'Treinamento e entrega', desc: 'Sessão de 1-2h com equipe de atendimento. Entregar relatório + scripts + fluxograma + automações. Acompanhar métricas nas primeiras 2 semanas para ajustes.', time: 'Dias 10-15' },
    ],
  },
  {
    id: 'social-media',
    num: '08',
    title: 'Social Media',
    executive: 'Gest\u00e3o completa do Instagram da cl\u00ednica: da otimiza\u00e7\u00e3o do perfil \u00e0 produ\u00e7\u00e3o de conte\u00fado, passando por Reels, Stories e intera\u00e7\u00e3o com a comunidade. O objetivo n\u00e3o \u00e9 acumular seguidores — \u00e9 construir autoridade m\u00e9dica que converte em agendamentos.',
    value: '72% dos pacientes verificam o Instagram do m\u00e9dico antes de agendar. Um perfil ativo com conte\u00fado educativo, resultados e humaniza\u00e7\u00e3o gera confian\u00e7a. O mix certo de conte\u00fado (40% educativo, 25% resultados, 15% bastidores, 10% CTA, 10% entretenimento) cria um ciclo de atração orgânica que complementa os anúncios.',
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
      { step: 'Setup do perfil', desc: 'Bio com CTA + link (site/Linktree). Foto profissional. 5-8 highlights organizados: Serviços, Resultados, Depoimentos, FAQ, Sobre, Dicas. 3 posts fixados estratégicos.', time: 'Dias 1-3' },
      { step: 'Planejamento editorial', desc: 'Calendário mensal com aprovação do médico. Mix: 40% educativo (autoridade), 25% resultados/prova social (confiança), 15% bastidores (conexão), 10% CTA (conversão), 10% tendências (alcance). Alinhar com sazonalidade e campanhas.', time: 'Mensal' },
      { step: 'Produção de conteúdo', desc: 'Posts educativos em carrossel (5-10 slides). Reels de 15-60s (procedimentos, dicas, bastidores). Stories diários (enquetes, bastidores, dicas rápidas). Prova social (depoimentos, avaliações Google).', time: 'Contínuo' },
      { step: 'Publicação e engajamento', desc: 'Publicar nos melhores horários (testar e otimizar). Responder comentários em até 4h. Responder DMs em até 2h. Engajamento ativo com perfis relevantes da região.', time: 'Diário' },
      { step: 'Análise e ajuste', desc: 'Relatório mensal: alcance, engajamento (meta 2%+), crescimento de seguidores, salvamentos, compartilhamentos. Identificar conteúdos que performaram melhor. Ajustar mix para próximo mês.', time: 'Mensal' },
    ],
  },
  {
    id: 'criativos',
    num: '09',
    title: 'Criativos (Fotos e V\u00eddeos)',
    executive: 'Criativos s\u00e3o as pe\u00e7as visuais que alimentam redes sociais e an\u00fancios: posts, banners, v\u00eddeos curtos, carross\u00e9is, an\u00fancios em v\u00eddeo. Produzimos tudo — do roteiro \u00e0 edi\u00e7\u00e3o final — para que o m\u00e9dico s\u00f3 precise gravar quando necess\u00e1rio.',
    value: 'An\u00fancios com v\u00eddeo t\u00eam CTR 2-3x maior que est\u00e1ticos. Criativos novos a cada 2-3 semanas evitam fadiga de an\u00fancio (quando o p\u00fablico para de clicar por ver sempre a mesma pe\u00e7a). Investir em criativos de qualidade reduz o custo por lead porque a plataforma premia an\u00fancios com melhor engajamento.',
    deliverables: [
      '10-20 pe\u00e7as est\u00e1ticas/m\u00eas (posts, banners, an\u00fancios)',
      '4-8 v\u00eddeos editados/m\u00eas (Reels, an\u00fancios)',
      'Roteiros para grava\u00e7\u00e3o pelo m\u00e9dico',
      'Dire\u00e7\u00e3o de grava\u00e7\u00e3o (remota ou presencial)',
      'Legendas em todos os v\u00eddeos',
      'Banco de criativos organizado',
    ],
    playbook: [
      { step: 'Inventário visual', desc: 'Coletar fotos/vídeos existentes. Avaliar qualidade. Definir o que precisa ser produzido. Listar procedimentos que precisam de conteúdo visual.', time: 'Dia 1' },
      { step: 'Roteiros', desc: 'Criar roteiro/storyboard para cada peça de vídeo. Formato: hook (3s) + conteúdo + CTA. Para o médico: roteiros de teleprompter curtos, linguagem natural. Para equipe: orientações de cenário e luz.', time: 'Dias 2-3' },
      { step: 'Gravação', desc: 'Presencial: dirigir gravação no consultório (postura, fala, cenário, iluminação). Remota: enviar roteiro + guia de gravação com celular (enquadramento, luz natural, áudio limpo).', time: 'Dia 4' },
      { step: 'Edição', desc: 'Corte profissional. Legendas obrigatórias (85% assistem sem som). Música de fundo. Transições suaves. Thumbnail atrativo. Formatos: 1:1 (feed), 9:16 (stories/reels), 16:9 (YouTube).', time: 'Dias 5-7' },
      { step: 'Organização e teste', desc: 'Banco de criativos organizado por tipo, serviço, campanha e data. Testar A/B em campanhas (mínimo 3 variações por conjunto). Renovar a cada 2-3 semanas.', time: 'Contínuo' },
    ],
  },
  {
    id: 'extras',
    num: '10',
    title: 'Servi\u00e7os Complementares',
    executive: 'Servi\u00e7os avan\u00e7ados para cl\u00ednicas que j\u00e1 t\u00eam a base digital resolvida e querem escalar: SEO org\u00e2nico (aparecer no Google sem pagar por clique), e-mail marketing e CRM (nutrir pacientes), gest\u00e3o de reputa\u00e7\u00e3o (manter nota alta) e intelig\u00eancia artificial (chatbot, qualifica\u00e7\u00e3o autom\u00e1tica).',
    value: 'SEO orgânico gera tráfego gratuito e sustentável — uma página que ranqueia bem traz pacientes por anos sem custo adicional. Email marketing reativa pacientes antigos (30% mais barato que adquirir novos). IA no WhatsApp faz triagem 24h, reduzindo carga da recepção. Reputação 4.7+ no Google é o fator #1 de decisão para pacientes.',
    deliverables: [
      'SEO: auditoria técnica + 2-4 blog posts/mês + relatório de posições',
      'Email/CRM: setup + automações + 2-4 campanhas/mês',
      'Reputação: monitoramento + estratégia de reviews + protocolo de crise',
      'IA: chatbot WhatsApp + qualificação automática de leads',
    ],
    playbook: [
      { step: 'SEO orgânico', desc: 'Auditoria técnica (Core Web Vitals, sitemap, Schema.org). Otimização on-page das 20 páginas mais importantes. Blog posts otimizados (1-2/semana). Link building (diretórios médicos, guest posts). Meta: tráfego orgânico +50% em 6 meses.', time: 'Contínuo' },
      { step: 'Email marketing / CRM', desc: 'Setup do CRM (organizar leads por procedimento e etapa). Automações: confirmação de consulta, lembrete 24h antes, pesquisa pós-consulta, aniversário, campanha de retorno. Newsletters mensais com dicas de saúde.', time: 'Setup 7d + contínuo' },
      { step: 'Gestão de reputação', desc: 'Monitorar Google, Doctoralia, Reclame Aqui, redes. Fluxo automatizado: SMS/WhatsApp pós-consulta pedindo avaliação. Responder 100% em 24h. Protocolo para avaliações negativas (resolução + resposta profissional). Meta: 4.7+ com volume crescente.', time: 'Contínuo' },
      { step: 'Inteligência artificial', desc: 'Chatbot WhatsApp para triagem: identificar serviço de interesse, urgência, disponibilidade. Score automático de leads (quente/morno/frio). Geração de rascunhos de posts e artigos com revisão humana. Dashboard com insights automáticos.', time: 'Setup 14d + contínuo' },
    ],
  },
]

function WikiNav({ activeId }) {
  return (
    <nav className="hidden lg:block sticky top-20 w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-[#e9e0f5] p-4">
        <h3 className="font-bold text-[#272757] text-sm mb-3">Servi\u00e7os</h3>
        <ul className="space-y-1">
          {services.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeId === s.id ? 'bg-[#7B2CBF]/10 text-[#7B2CBF] font-semibold' : 'text-[#5a4a6b] hover:bg-[#f5f0ff]'}`}
              >
                <span className="text-xs font-mono text-[#7B2CBF]/60">{s.num}</span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article id={service.id} className="bg-white rounded-2xl border border-[#e9e0f5] overflow-hidden scroll-mt-24">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono font-bold text-white bg-[#7B2CBF] px-2.5 py-1 rounded-lg">{service.num}</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#272757]">{service.title}</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">O que \u00e9</h3>
          <p className="text-[#5a4a6b] leading-relaxed">{service.executive}</p>
        </div>

        <div className="mb-6 bg-[#f5f0ff] rounded-xl p-5">
          <h3 className="text-sm font-bold text-[#7B2CBF] uppercase tracking-wide mb-2">Por que gera valor para cl\u00ednicas</h3>
          <p className="text-[#120326] leading-relaxed">{service.value}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#7B2CBF] uppercase tracking-wide mb-3">Entregas</h3>
          <ul className="space-y-2">
            {service.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#120326]">
                <svg className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[#7B2CBF] font-bold text-sm hover:text-[#5A1D8E] transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          {expanded ? 'Ocultar playbook' : 'Ver mini playbook de entrega'}
        </button>

        {expanded && (
          <div className="mt-6 border-t border-[#e9e0f5] pt-6">
            <h3 className="text-sm font-bold text-[#7B2CBF] uppercase tracking-wide mb-4">Mini Playbook</h3>
            <div className="space-y-4">
              {service.playbook.map((p, i) => (
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
    </article>
  )
}

export default function Wiki() {
  const [activeId, setActiveId] = useState(services[0].id)

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
            <a href="#/" className="text-sm text-[#5a4a6b] hover:text-[#7B2CBF] transition-colors">
              \u2190 Voltar ao site
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 bg-[#7B2CBF] hover:bg-[#5A1D8E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Falar com Especialista
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#7B2CBF]/10 text-[#7B2CBF] text-xs font-semibold px-3 py-1 rounded-full mb-4">WIKI DE SERVI\u00c7OS</div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#272757] mb-4">Tudo que a Pulso pode fazer pela sua cl\u00ednica</h1>
            <p className="text-[#5a4a6b] text-lg max-w-2xl mx-auto">Cada servi\u00e7o explicado em detalhe: o que \u00e9, por que gera valor, o que entregamos e como executamos.</p>
          </div>

          <div className="flex gap-8">
            <WikiNav activeId={activeId} />
            <div className="flex-1 space-y-6">
              {services.map(s => (
                <ServiceCard key={s.id} service={s} />
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
    </div>
  )
}

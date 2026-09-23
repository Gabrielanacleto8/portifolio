// =============================================================
//  CONTEÚDO DO PORTFÓLIO
//  Edite SOMENTE este arquivo para atualizar textos, skills e
//  projetos. O restante do site se monta sozinho a partir daqui.
// =============================================================

export const perfil = {
  nome: 'Gabriel Anacleto',
  iniciais: 'GA',
  // foto do cartão "Sobre mim"; se não carregar, aparecem as iniciais
  foto: 'assets/fotos/tdc-floripa-selfie.jpg',
  cargo: 'Desenvolvedor Júnior',
  formacao: 'Estudante de Engenharia de Software',
  status: 'Aberto a novas oportunidades',
  resumoCurto:
    'Desenvolvedor Júnior e estudante de Engenharia de Software. Trabalho com desenvolvimento e manutenção de sistemas, análise de requisitos e implementação de soluções.',
  sobre: [
    'Sou estudante de Engenharia de Software e atuo como Desenvolvedor Júnior, trabalhando com desenvolvimento e manutenção de sistemas, análise de requisitos e implementação de soluções.',
    'Tenho experiência em suporte, análise de sistemas e documentação de processos — uma base que me ajuda a entender o problema antes de escrever a primeira linha de código. Venho aprimorando continuamente meus conhecimentos em desenvolvimento de software.',
    'Busco evoluir tecnicamente, explorar novas tecnologias e contribuir com soluções eficientes, escaláveis e de qualidade.',
  ],
  // frase de uma linha usada no cartão de perfil do LinkedIn
  headline: 'Desenvolvedor Júnior · Estudante de Engenharia de Software · Desenvolvimento e manutenção de sistemas',
  email: 'bifarias2014@gmail.com',
  whatsapp: '(47) 99692-8831',
  // número no formato internacional, usado no link wa.me
  whatsappLink: 'https://wa.me/5547996928831',
  github: 'https://github.com/Gabrielanacleto8',
  githubUser: 'Gabrielanacleto8',
  linkedin: 'https://www.linkedin.com/in/gabriel-anacleto-01a98613b/',
  linkedinUser: 'in/gabriel-anacleto',
  // usado pelo badge oficial do LinkedIn (a parte final da URL do perfil)
  linkedinVanity: 'gabriel-anacleto-01a98613b',
  localizacao: 'Brasil · Remoto ou presencial',
};

export const trajetoria = [
  {
    etapa: 'Início',
    titulo: 'Suporte Técnico',
    desc: 'Primeiro contato com TI: atendimento ao usuário, diagnóstico e resolução de problemas no dia a dia da operação.',
  },
  {
    etapa: 'Evolução',
    titulo: 'Analista de Sistemas',
    desc: 'Análise de requisitos, homologação, acompanhamento de sistemas terceirizados e documentação de processos.',
  },
  {
    etapa: 'Hoje',
    titulo: 'Desenvolvedor Júnior',
    desc: 'Desenvolvimento e manutenção de sistemas, implementação de soluções e correções, sempre próximo da regra de negócio.',
    atual: true,
  },
  {
    etapa: 'Em curso',
    titulo: 'Engenharia de Software',
    desc: 'Graduação em andamento, com foco em boas práticas, arquitetura, banco de dados e qualidade de software.',
  },
];

// Cada habilidade usa:
//   logo:  chave de logos.js (marca oficial, ex.: 'javascript')
//   icone: chave de ícone de traço do icones.js, quando não existe marca
//   nivel: anotação sua para se organizar — não aparece na interface
export const habilidades = [
  {
    grupo: 'Desenvolvimento',
    icone: 'code',
    itens: [
      { nome: 'JavaScript', logo: 'javascript', nivel: 'solido' },
      { nome: 'Python',     logo: 'python',     nivel: 'solido' },
      { nome: 'PHP',        logo: 'php',        nivel: 'praticando' },
      { nome: 'Laravel',    logo: 'laravel',    nivel: 'praticando' },
      { nome: 'HTML5',      logo: 'html5',      nivel: 'solido' },
      { nome: 'CSS3',       logo: 'css3',       nivel: 'solido' },
      { nome: 'SQL',        icone: 'banco',     nivel: 'praticando' },
      { nome: 'API REST',   icone: 'chaves',    nivel: 'estudando' },
    ],
  },
  {
    grupo: 'Engenharia & Processos',
    icone: 'flow',
    itens: [
      { nome: 'Análise de Requisitos',     icone: 'requisitos', nivel: 'solido' },
      { nome: 'Manutenção de Sistemas',    icone: 'tool',       nivel: 'solido' },
      { nome: 'Documentação de Processos', icone: 'documento',  nivel: 'solido' },
      { nome: 'Suporte & Atendimento',     icone: 'suporte',    nivel: 'solido' },
    ],
  },
  {
    grupo: 'Ferramentas',
    icone: 'tool',
    itens: [
      { nome: 'Git',      logo: 'git',               nivel: 'solido' },
      { nome: 'GitHub',   logo: 'github',            nivel: 'solido' },
      { nome: 'Linux',    logo: 'linux',             nivel: 'solido' },
      { nome: 'VS Code',  logo: 'visualstudiocode',  nivel: 'solido' },
      { nome: 'Postman',  logo: 'postman',           nivel: 'estudando' },
    ],
  },
];

// -------------------------------------------------------------
//  FOTOS
//  Galeria de eventos, estudos e bastidores.
//
//  Para adicionar: coloque o arquivo em assets/fotos/ e acrescente
//  uma entrada aqui. As categorias da barra lateral são montadas a
//  partir do campo "categoria" — não precisa cadastrar em outro lugar.
//
//  Exemplo:
//  {
//    arquivo: 'assets/fotos/meetup-js.jpg',
//    titulo: 'Meetup de JavaScript',
//    descricao: 'Primeiro meetup presencial, falando sobre APIs REST.',
//    categoria: 'Eventos',
//    data: 'Março de 2026',
//  },
// -------------------------------------------------------------
export const fotos = [
  {
    arquivo: 'assets/fotos/tdc-floripa-selfie.jpg',
    titulo: 'TDC Floripa 2026',
    descricao: 'Credenciado e pronto para um dia inteiro de palestras no The Developer\'s Conference.',
    categoria: 'Eventos',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/tdc-floripa-palestra.jpg',
    titulo: 'Auditório principal',
    descricao: 'Palestra lotada no palco principal do TDC Floripa.',
    categoria: 'Eventos',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/tdc-floripa-painel.jpg',
    titulo: '#thedevconf',
    descricao: 'Painel dos mantenedores e patrocinadores do TDC 2026.',
    categoria: 'Eventos',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/tdc-floripa-trilhas.jpg',
    titulo: 'Trilhas do evento',
    descricao: 'Arquitetura Java, Software Security e Quality Engineering de Produto — difícil escolher.',
    categoria: 'Eventos',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/tdc-floripa-notebook.jpg',
    titulo: 'Documentando entre palestras',
    descricao: 'Aproveitando o intervalo para atualizar minha documentação profissional.',
    categoria: 'Bastidores',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/tdc-floripa-brinde.jpg',
    titulo: 'Brinde impresso em 3D',
    descricao: 'Chaveiro em impressão 3D que ganhei no evento.',
    categoria: 'Bastidores',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/certificado-tdc-software-security.png',
    titulo: 'Certificado — Trilha Software Security',
    descricao: 'Participação na Trilha Software Security do TDC 2026 Florianópolis, 8 horas de duração no CentroSul.',
    categoria: 'Certificações',
    data: 'Julho de 2026',
  },
  {
    arquivo: 'assets/fotos/aula-neo4j-python.jpg',
    titulo: 'Neo4j com Python',
    descricao: 'Aula de banco de dados em grafo: CRUD de nós e relacionamentos no Neo4j usando Python.',
    categoria: 'Estudos',
  },
  {
    arquivo: 'assets/fotos/lab-leds-protoboard.jpg',
    titulo: 'LEDs na protoboard',
    descricao: 'Montagem de circuito com LEDs e resistores no laboratório de eletrônica.',
    categoria: 'Estudos',
  },
  {
    arquivo: 'assets/fotos/lab-circuito-capacitor.jpg',
    titulo: 'Circuito RC com botão',
    descricao: 'Carga e descarga de capacitor acionando um LED por push-button.',
    categoria: 'Estudos',
  },
  {
    arquivo: 'assets/fotos/lab-osciloscopio-gerador.jpg',
    titulo: 'Osciloscópio e gerador de sinais',
    descricao: 'Medições com gerador de funções e osciloscópio na bancada do laboratório.',
    categoria: 'Estudos',
  },
];

// -------------------------------------------------------------
//  PROJETOS
//  Para adicionar imagens: coloque os arquivos em assets/projetos/
//  e liste os caminhos em "imagens". Se a lista ficar vazia, o
//  card mostra um espaço reservado — nada quebra.
//  Ex.: imagens: ['assets/projetos/crud-1.png', 'assets/projetos/crud-2.png']
// -------------------------------------------------------------
export const projetos = [
  {
    id: 'producao-mecanica',
    titulo: 'Controle de Produção de Oficina Mecânica',
    badge: 'Em desenvolvimento',
    tipo: 'dev',
    resumo: 'Mede o tempo de produção dos mecânicos e o tempo dos veículos na oficina.',
    desc: 'Sistema de controle de produção para oficina mecânica que mede duas coisas: o tempo de produção de cada mecânico e o tempo de cada veículo dentro da oficina. Do lado do veículo, acompanha a ordem de serviço do pátio à entrega — quanto tempo passou em serviço, parado no box, aguardando peça ou na sala de montagem — e compara cada serviço com o tempo previsto. Do lado da produção, mostra por período as horas trabalhadas, ociosas e de descanso de cada mecânico.',
    destaques: [
      'Linha do tempo da OS mostrando onde foi o tempo do veículo',
      'Comparativo de previsto x realizado por serviço, com alerta de tempo excedido',
      'Painel por mecânico com controle de horas, linha do dia e serviços concluídos',
    ],
    tags: ['PHP', 'Laravel', 'JavaScript', 'React', 'MySQL'],
    imagens: [
      'assets/projetos/producao-mecanica-os.jpg',
      'assets/projetos/producao-mecanica-mecanico.jpg',
    ],
    link: '',
    linkLabel: '',
  },
  {
    id: 'crud',
    titulo: 'CRUD Full-Stack',
    badge: 'Em desenvolvimento',
    tipo: 'dev',
    resumo: 'Aplicação completa de cadastro com frontend e API REST.',
    desc: 'Aplicação CRUD completa explorando a integração entre um frontend em JavaScript/HTML/CSS e um backend com API REST. O foco é praticar organização de código, separação de responsabilidades, validação de dados e persistência em banco.',
    destaques: [
      'Operações de criar, listar, editar e excluir integradas à API',
      'Validação de formulários e tratamento de erros',
      'Estrutura de pastas pensada para crescer sem virar bagunça',
    ],
    tags: ['JavaScript', 'Python', 'HTML', 'CSS', 'MySQL', 'Supabase'],
    imagens: ['assets/projetos/crud-estoque-produtos.png'],
    destaque: true,
    link: 'https://github.com/Gabrielanacleto8',
    linkLabel: 'Ver no GitHub',
  },
];

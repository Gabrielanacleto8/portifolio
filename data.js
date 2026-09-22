// =============================================================
//  CONTEÚDO DO PORTFÓLIO
//  Edite SOMENTE este arquivo para atualizar textos, skills e
//  projetos. O restante do site se monta sozinho a partir daqui.
// =============================================================

export const perfil = {
  nome: 'Gabriel Anacleto',
  iniciais: 'GA',
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
    tags: ['JavaScript', 'HTML/CSS', 'API REST', 'SQL'],
    imagens: [],
    destaque: true,
    link: 'https://github.com/Gabrielanacleto8',
    linkLabel: 'Ver no GitHub',
  },
  {
    id: 'manutencao',
    titulo: 'Manutenção e Evolução de Sistemas',
    badge: 'Trabalho atual',
    tipo: 'dev',
    resumo: 'Correções, melhorias e novas rotinas em sistemas em produção.',
    desc: 'Atuação diária no desenvolvimento e na manutenção de sistemas já em produção: investigação de falhas relatadas pelos usuários, correção de bugs, ajustes de regra de negócio e implementação de novas rotinas a partir de requisitos levantados com as áreas.',
    destaques: [
      'Levantamento de requisitos junto às áreas de negócio',
      'Correção de falhas com análise de causa raiz',
      'Consultas SQL para apuração e correção de dados',
    ],
    tags: ['Análise de Requisitos', 'SQL', 'Manutenção', 'Suporte N2'],
    imagens: [],
    link: '',
    linkLabel: '',
  },
  {
    id: 'qa',
    titulo: 'Plano de Testes — Sistema ERP',
    badge: 'Qualidade',
    tipo: 'qa',
    resumo: 'Casos de teste, homologação e relatórios de falha.',
    desc: 'Documentação de casos de teste, cenários de homologação e relatórios de falha para um sistema ERP em ambiente controlado, garantindo que cada entrega chegasse ao usuário final já validada.',
    destaques: [
      'Casos de teste cobrindo os fluxos críticos do sistema',
      'Relatórios de falha objetivos, com passos de reprodução',
      'Acompanhamento das correções até a homologação',
    ],
    tags: ['QA', 'Homologação', 'Documentação'],
    imagens: [],
    link: 'https://github.com/Gabrielanacleto8',
    linkLabel: 'Ver detalhes',
  },
  {
    id: 'python',
    titulo: 'Scripts Python — Automação',
    badge: 'Estudos',
    tipo: 'estudo',
    resumo: 'Automação de tarefas repetitivas e manipulação de dados.',
    desc: 'Coleção de scripts em Python para automatizar tarefas repetitivas e tratar dados — leitura e escrita de planilhas, organização de arquivos e pequenas rotinas que economizam tempo no dia a dia.',
    destaques: [
      'Leitura e tratamento de planilhas e arquivos CSV',
      'Rotinas de organização automática de arquivos',
      'Código comentado, pensado também como material de estudo',
    ],
    tags: ['Python', 'Automação', 'Dados'],
    imagens: [],
    link: 'https://github.com/Gabrielanacleto8',
    linkLabel: 'Ver no GitHub',
  },
];

// =============================================================
//  Portfólio — Gabriel Anacleto
//  React 18 + htm (sem build, sem node_modules).
//  O conteúdo vem todo de data.js.
// =============================================================

import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import htm from 'https://esm.sh/htm@3.1.1';

import { perfil, trajetoria, habilidades, projetos } from './data.js';
import { logos } from './logos.js';

const html = htm.bind(React.createElement);

/* ---------------------------------------------------------------
   Ícones (SVG inline — nenhuma dependência externa)
--------------------------------------------------------------- */
const svg = (d, extra = {}) => (props = {}) => html`
  <svg viewBox="0 0 24 24" width=${props.size || 18} height=${props.size || 18}
       fill="none" stroke="currentColor" strokeWidth=${extra.w || 1.7}
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    ${d.map((p, i) => html`<path key=${i} d=${p} />`)}
  </svg>`;

const Ico = {
  user:   svg(['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8']),
  code:   svg(['m16 18 6-6-6-6', 'm8 6-6 6 6 6']),
  folder: svg(['M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z']),
  mail:   svg(['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6']),
  github: svg(['M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.4-3.8 1.4a13 13 0 0 0-7 0C6.3 1 5.2 1.4 5.2 1.4A4.9 4.9 0 0 0 5 5a5.2 5.2 0 0 0-1.4 3.7c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 18v4']),
  linkedin: svg(['M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8z', 'M6 9H2v12h4z', 'M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4']),
  search: svg(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16', 'm21 21-4.3-4.3']),
  flow:   svg(['M5 3v4a2 2 0 0 0 2 2h4', 'M13 15h4a2 2 0 0 1 2 2v4', 'M3 3h4v4H3z', 'M17 17h4v4h-4z', 'M9 11h6v2H9z']),
  tool:   svg(['M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.8 2.8 0 0 1-4-4z', 'M14.7 6.3 18 3l3 3-3.3 3.3']),
  sun:    svg(['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10', 'M12 1v2', 'M12 21v2', 'M4.2 4.2l1.4 1.4', 'M18.4 18.4l1.4 1.4', 'M1 12h2', 'M21 12h2', 'M4.2 19.8l1.4-1.4', 'M18.4 5.6l1.4-1.4']),
  moon:   svg(['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z']),
  wifi:   svg(['M5 12.5a10 10 0 0 1 14 0', 'M8.5 16a5 5 0 0 1 7 0', 'M12 19.5h.01', 'M1.5 9a15 15 0 0 1 21 0']),
  battery: svg(['M2 7h15a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2z', 'M22 11v2']),
  arrow:  svg(['M5 12h14', 'm12 5 7 7-7 7']),
  layers: svg(['m12 2 9 5-9 5-9-5z', 'm3 12 9 5 9-5', 'm3 17 9 5 9-5']),
  send:   svg(['m22 2-7 20-4-9-9-4z', 'M22 2 11 13']),
  pin:    svg(['M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5']),

  // usados nas habilidades que não têm logo oficial
  banco: svg(['M12 3c4.4 0 8 1.1 8 2.5S16.4 8 12 8 4 6.9 4 5.5 7.6 3 12 3z',
              'M20 5.5v13c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-13',
              'M20 12c0 1.4-3.6 2.5-8 2.5S4 13.4 4 12']),
  chaves: svg(['M8 4a4 4 0 0 0-4 4v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a4 4 0 0 0 4 4',
               'M16 4a4 4 0 0 1 4 4v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a4 4 0 0 1-4 4']),
  requisitos: svg(['M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z',
                   'M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2',
                   'm9 13 2 2 4-4']),
  documento: svg(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
                  'M14 2v6h6', 'M8 13h6', 'M8 17h4']),
  bug: svg(['M8 6a4 4 0 0 1 8 0', 'M6 11a6 6 0 0 1 12 0v2a6 6 0 0 1-12 0z',
            'M3 11h3', 'M18 11h3', 'M4 18h2.6', 'M17.4 18H20', 'm5.5 6 1.8 1.8', 'm18.5 6-1.8 1.8']),
  suporte: svg(['M4 13v-1a8 8 0 0 1 16 0v1',
                'M5 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2z',
                'M19 13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3']),
};

// Logo de marca: traçado preenchido, na cor oficial (com variação para o
// tema escuro quando a cor original desaparece no fundo).
function LogoMarca({ chave, tamanho = 30, tema }) {
  const l = logos[chave];
  if (!l) return null;
  const cor = tema === 'dark' && l.corEscuro ? l.corEscuro : l.cor;
  return html`
    <svg viewBox="0 0 24 24" width=${tamanho} height=${tamanho} fill=${cor}
         role="img" aria-label=${l.nome}>
      <title>${l.nome}</title>
      <path d=${l.d} />
    </svg>`;
}

/* ---------------------------------------------------------------
   Seções e atalhos do Dock
--------------------------------------------------------------- */
const SECOES = [
  { id: 'sobre',       nome: 'Sobre',       icone: 'user',   cor: 'linear-gradient(145deg,#2f9bff,#0060df)' },
  { id: 'habilidades', nome: 'Habilidades', icone: 'code',   cor: 'linear-gradient(145deg,#96a0ad,#4a545f)' },
  { id: 'projetos',    nome: 'Projetos',    icone: 'folder', cor: 'linear-gradient(145deg,#54d4e8,#1b7f95)' },
  { id: 'contato',     nome: 'Contato',     icone: 'mail',   cor: 'linear-gradient(145deg,#7d7bee,#4341c4)' },
];

const LINKS = [
  { id: 'github',   nome: 'GitHub',   icone: 'github',   href: perfil.github,   cor: 'linear-gradient(145deg,#59626d,#23282e)' },
  { id: 'linkedin', nome: 'LinkedIn', icone: 'linkedin', href: perfil.linkedin, cor: 'linear-gradient(145deg,#3b9be8,#0a66c2)' },
  { id: 'email',    nome: 'E-mail',   icone: 'send',     href: 'mailto:' + perfil.email, cor: 'linear-gradient(145deg,#5ab6ff,#0a84ff)' },
];

const NIVEIS = {
  solido:     { rotulo: 'Sólido',     cor: '#30d158' },
  praticando: { rotulo: 'Praticando', cor: '#0a84ff' },
  estudando:  { rotulo: 'Estudando',  cor: '#8e97a3' },
};

const irPara = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------------------------------------------------------------
   Hooks utilitários
--------------------------------------------------------------- */
function useTema() {
  const [tema, setTema] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try { localStorage.setItem('ga-theme', tema); } catch (e) {}
  }, [tema]);
  return [tema, () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState('sobre');
  useEffect(() => {
    const onScroll = () => {
      let atual = '';
      SECOES.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) atual = id;
      });
      setAtiva(atual);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ativa;
}

// Revela a janela quando ela entra na tela. A checagem é feita na mão
// (scroll + resize) em vez de IntersectionObserver: é previsível e garante
// que o conteúdo nunca fique preso em opacity: 0 se algo falhar.
function useRevelar() {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let vivo = true;
    const checar = () => {
      if (!vivo) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        setVisivel(true);
        limpar();
      }
    };
    const limpar = () => {
      vivo = false;
      window.removeEventListener('scroll', checar);
      window.removeEventListener('resize', checar);
    };

    window.addEventListener('scroll', checar, { passive: true });
    window.addEventListener('resize', checar);
    requestAnimationFrame(checar);

    return limpar;
  }, []);

  return [ref, visivel];
}

/* ---------------------------------------------------------------
   Menu Bar
--------------------------------------------------------------- */
function MenuBar({ tema, alternarTema, abrirSpotlight, ativa }) {
  const [hora, setHora] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setHora(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const relogio = hora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dia = hora.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });

  return html`
    <header className="menubar">
      <div className="mb-brand">
        <span className="mb-mark">GA</span>
        <span className="mb-nome">${perfil.nome}</span>
      </div>
      <nav className="mb-menus">
        ${SECOES.map((s) => html`
          <button key=${s.id} className=${ativa === s.id ? 'active' : ''} onClick=${() => irPara(s.id)}>
            ${s.nome}
          </button>`)}
      </nav>
      <div className="mb-right">
        <button className="mb-key" onClick=${abrirSpotlight} title="Buscar (Ctrl + K)">
          <${Ico.search} size=${13} /> <span>K</span>
        </button>
        <button onClick=${alternarTema} title=${tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
                aria-label="Alternar tema">
          ${tema === 'dark' ? html`<${Ico.sun} size=${15} />` : html`<${Ico.moon} size=${15} />`}
        </button>
        <span className="mb-status"><${Ico.wifi} size=${15} /></span>
        <span className="mb-status"><${Ico.battery} size=${15} /></span>
        <span className="mb-clock"><span className="mb-dia">${dia} </span>${relogio}</span>
      </div>
    </header>`;
}

/* ---------------------------------------------------------------
   Janela reutilizável (com os três botões do macOS)
--------------------------------------------------------------- */
function Window({ id, titulo, subtitulo, extra, children }) {
  const [ref, visivel] = useRevelar();
  const [min, setMin] = useState(false);
  const [anim, setAnim] = useState('');   // 'saindo' (genie) | 'entrando'
  const [zoom, setZoom] = useState(false);
  const [shake, setShake] = useState(false);

  const fechar = () => { setShake(true); setTimeout(() => setShake(false), 420); };

  // Minimizar/restaurar em duas etapas: primeiro a animação, depois o estado.
  const alternarMin = () => {
    if (anim) return;                     // ignora cliques durante a animação
    if (min) { setMin(false); setAnim('entrando'); }
    else setAnim('saindo');
  };

  const concluir = useCallback(() => {
    setAnim((a) => {
      if (a === 'saindo') setMin(true);
      return '';
    });
  }, []);

  const fimDaAnimacao = (e) => {
    if (e.target === e.currentTarget) concluir();
  };

  // Rede de segurança: se o animationend não chegar (aba em segundo plano,
  // movimento reduzido, navegador antigo), conclui na marra — senão a janela
  // ficaria travada com o conteúdo invisível.
  useEffect(() => {
    if (!anim) return;
    const t = setTimeout(concluir, 600);
    return () => clearTimeout(t);
  }, [anim, concluir]);

  const classes = [
    'window',
    visivel && 'visible',
    min && 'minimized',
    anim && 'anim-' + anim,
    zoom && 'zoomed',
    shake && 'shake',
  ].filter(Boolean).join(' ');

  return html`
    <section className="section" id=${id}>
      <div className=${classes} ref=${ref}>
        <div className="titlebar">
          <div className="lights">
            <button className="light light-red" onClick=${fechar}
                    aria-label="Fechar (esta não fecha)"><span>×</span></button>
            <button className="light light-yellow" onClick=${alternarMin}
                    aria-label=${min ? 'Restaurar janela' : 'Minimizar janela'}><span>−</span></button>
            <button className="light light-green" onClick=${() => setZoom(!zoom)}
                    aria-label=${zoom ? 'Reduzir janela' : 'Ampliar janela'}><span>+</span></button>
          </div>
          <span className="tb-title">${titulo}</span>
          ${subtitulo && html`<span className="tb-sub">— ${subtitulo}</span>`}
          <div className="tb-right">
            ${min
              ? html`<button className="tb-restaurar" onClick=${alternarMin}>restaurar</button>`
              : extra}
          </div>
        </div>
        ${!min && html`
          <div className="win-body" onAnimationEnd=${fimDaAnimacao}>${children}</div>`}
      </div>
    </section>`;
}

/* ---------------------------------------------------------------
   Hero
--------------------------------------------------------------- */
function Terminal() {
  const linhas = [
    { tipo: 'cmd', texto: 'whoami' },
    { tipo: 'out', texto: perfil.nome.toLowerCase().replace(' ', '-') },
    { tipo: 'cmd', texto: 'cat perfil.json' },
    { tipo: 'json', texto: [
      ['cargo', perfil.cargo],
      ['formacao', 'Engenharia de Software'],
      ['foco', 'Desenvolvimento & Manutenção'],
      ['stack', 'JavaScript · Python · SQL'],
      ['status', 'Aprendendo todo dia'],
    ] },
    { tipo: 'cmd', texto: 'echo $OBJETIVO' },
    { tipo: 'out', texto: 'soluções eficientes, escaláveis e de qualidade' },
  ];

  return html`
    <div className="terminal">
      <div className="titlebar">
        <div className="lights">
          <span className="light light-red"></span>
          <span className="light light-yellow"></span>
          <span className="light light-green"></span>
        </div>
        <span className="tb-title">gabriel — zsh — 80×24</span>
      </div>
      <div className="term-body">
        ${linhas.map((l, i) => {
          if (l.tipo === 'cmd') return html`
            <div className="term-line" key=${i}>
              <span className="term-prompt">➜</span> <span className="term-path">~</span> ${l.texto}
            </div>`;
          if (l.tipo === 'out') return html`<div className="term-line term-out" key=${i}>${l.texto}</div>`;
          return html`
            <div key=${i}>
              <div className="term-line term-out">{</div>
              ${l.texto.map(([k, v]) => html`
                <div className="term-line term-out" key=${k}>
                  ${'  '}<span className="term-key">"${k}"</span>: "${v}",
                </div>`)}
              <div className="term-line term-out">}</div>
            </div>`;
        })}
        <div className="term-line">
          <span className="term-prompt">➜</span> <span className="term-path">~</span> <span className="caret"></span>
        </div>
      </div>
    </div>`;
}

function Hero() {
  return html`
    <section className="hero" id="inicio">
      <div className="hero-grid">
        <div>
          <p className="hero-status"><span className="pulse"></span> ${perfil.status}</p>
          <h1 className="hero-title">
            Olá, sou<br />
            <span className="grad">${perfil.nome}</span>
          </h1>
          <p className="hero-role">
            <strong>${perfil.cargo}</strong> e ${perfil.formacao.toLowerCase()}.
            Desenvolvimento e manutenção de sistemas, análise de requisitos
            e implementação de soluções.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick=${() => irPara('projetos')}>
              Ver projetos <${Ico.arrow} size=${16} />
            </button>
            <button className="btn btn-ghost" onClick=${() => irPara('contato')}>Entre em contato</button>
          </div>
          <div className="hero-chips">
            ${['JavaScript', 'Python', 'SQL', 'HTML/CSS', 'Git', 'Análise de Requisitos'].map(
              (t) => html`<span className="chip" key=${t}>${t}</span>`
            )}
          </div>
        </div>
        <${Terminal} />
      </div>
    </section>`;
}

/* ---------------------------------------------------------------
   Sobre
--------------------------------------------------------------- */
function Sobre() {
  return html`
    <${Window} id="sobre" titulo="Sobre" subtitulo="perfil profissional">
      <p className="eyebrow">Quem está por trás do código</p>
      <h2 className="win-title">Do suporte ao <span className="grad">desenvolvimento</span></h2>

      <div className="sobre-grid">
        <div className="sobre-text">
          ${perfil.sobre.map((p, i) => html`<p key=${i}>${p}</p>`)}

          <div className="timeline">
            ${trajetoria.map((t) => html`
              <div className=${'tl-item' + (t.atual ? ' atual' : '')} key=${t.titulo}>
                <div className="tl-dot"><i></i></div>
                <div>
                  <span className="tl-etapa">${t.etapa}</span>
                  <p className="tl-titulo">${t.titulo}</p>
                  <p className="tl-desc">${t.desc}</p>
                </div>
              </div>`)}
          </div>
        </div>

        <aside className="card-perfil">
          <div className="avatar">${perfil.iniciais}</div>
          <p className="nome">${perfil.nome}</p>
          <p className="cargo">${perfil.cargo}</p>
          <p className="local">${perfil.localizacao}</p>
          <div className="mini-stats">
            <div className="mini-stat"><b>Jr.</b><span>Dev atual</span></div>
            <div className="mini-stat"><b>Eng.</b><span>Software</span></div>
            <div className="mini-stat"><b>3+</b><span>Cargos em TI</span></div>
          </div>
          <a className="btn btn-primary" style=${{ width: '100%', justifyContent: 'center' }}
             href=${'mailto:' + perfil.email}>Vamos conversar</a>
        </aside>
      </div>
    <//>`;
}

/* ---------------------------------------------------------------
   Habilidades
--------------------------------------------------------------- */
function Habilidades({ tema }) {
  const [grupo, setGrupo] = useState('todos');
  const visiveis = grupo === 'todos' ? habilidades : habilidades.filter((g) => g.grupo === grupo);
  const total = habilidades.reduce((n, g) => n + g.itens.length, 0);

  return html`
    <${Window} id="habilidades" titulo="Habilidades" subtitulo="o que eu uso no dia a dia"
               extra=${html`<span>${total} itens</span>`}>
      <p className="eyebrow">Stack & competências</p>
      <h2 className="win-title">Ferramentas do <span className="grad">ofício</span></h2>

      <div className="finder">
        <div className="finder-side">
          <p className="lbl">Categorias</p>
          <button className=${grupo === 'todos' ? 'on' : ''} onClick=${() => setGrupo('todos')}>
            <${Ico.layers} size=${15} /> Todas
          </button>
          ${habilidades.map((g) => html`
            <button key=${g.grupo} className=${grupo === g.grupo ? 'on' : ''} onClick=${() => setGrupo(g.grupo)}>
              ${React.createElement(Ico[g.icone], { size: 15 })} ${g.grupo}
            </button>`)}
        </div>

        <div className="finder-main">
          ${visiveis.map((g) => html`
            <div key=${g.grupo} style=${{ marginBottom: '18px' }}>
              ${grupo === 'todos' && html`<p className="eyebrow" style=${{ marginBottom: '12px' }}>${g.grupo}</p>`}
              <div className="apps">
                ${g.itens.map((it) => html`
                  <div className="app-tile" key=${it.nome} title=${it.nome}>
                    <div className="app-icon">
                      ${it.logo
                        ? html`<${LogoMarca} chave=${it.logo} tema=${tema} />`
                        : React.createElement(Ico[it.icone], { size: 27 })}
                    </div>
                    <p className="app-name">${it.nome}</p>
                    <span className="app-nivel" style=${{ color: NIVEIS[it.nivel].cor }}>
                      ${NIVEIS[it.nivel].rotulo}
                    </span>
                  </div>`)}
              </div>
            </div>`)}

          <div className="legenda">
            ${Object.values(NIVEIS).map((n) => html`
              <span key=${n.rotulo}><i style=${{ background: n.cor }}></i>${n.rotulo}</span>`)}
          </div>
        </div>
      </div>
    <//>`;
}

/* ---------------------------------------------------------------
   Projetos + Quick Look
--------------------------------------------------------------- */
function Shot({ projeto, className }) {
  const [erro, setErro] = useState(false);
  const temImagem = projeto.imagens && projeto.imagens.length > 0 && !erro;

  return html`
    <div className=${'shot ' + (className || '')}>
      ${temImagem
        ? html`<img src=${projeto.imagens[0]} alt=${'Captura do projeto ' + projeto.titulo}
                     loading="lazy" onError=${() => setErro(true)} />`
        : html`
          <div className="shot-empty">
            <span className="plus">+</span>
            <span>Espaço reservado para imagem</span>
            <code>assets/projetos/${projeto.id}.png</code>
          </div>`}
      ${temImagem && projeto.imagens.length > 1 &&
        html`<span className="shot-count">${projeto.imagens.length} imagens</span>`}
    </div>`;
}

function CardProjeto({ projeto, onAbrir }) {
  return html`
    <button className=${'proj-card' + (projeto.destaque ? ' destaque' : '')} onClick=${() => onAbrir(projeto)}>
      <${Shot} projeto=${projeto} />
      <div className="proj-body">
        <div className="proj-head">
          <span className="proj-title">${projeto.titulo}</span>
          <span className=${'badge badge-' + projeto.tipo}>${projeto.badge}</span>
        </div>
        <p className="proj-desc">${projeto.resumo}</p>
        <div className="proj-tags">
          ${projeto.tags.map((t) => html`<span className="chip" key=${t}>${t}</span>`)}
        </div>
        <span className="proj-open">Abrir detalhes <${Ico.arrow} size=${14} /></span>
      </div>
    </button>`;
}

function QuickLook({ projeto, onFechar }) {
  const [i, setI] = useState(0);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onFechar(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onFechar]);

  const imagens = erro ? [] : (projeto.imagens || []);

  return html`
    <div className="ql-backdrop" onClick=${onFechar} role="dialog" aria-modal="true" aria-label=${projeto.titulo}>
      <div className="ql" onClick=${(e) => e.stopPropagation()}>
        <div className="titlebar">
          <div className="lights">
            <button className="light light-red" onClick=${onFechar} aria-label="Fechar"><span>×</span></button>
            <span className="light light-yellow"></span>
            <span className="light light-green"></span>
          </div>
          <span className="tb-title">${projeto.titulo}</span>
          <div className="tb-right"><span>esc para fechar</span></div>
        </div>

        <div className="ql-body">
          ${imagens.length > 0
            ? html`
              <${React.Fragment}>
              <div className="ql-shot">
                <img src=${imagens[i]} alt=${'Imagem ' + (i + 1) + ' do projeto ' + projeto.titulo}
                     onError=${() => setErro(true)} />
              </div>
              ${imagens.length > 1 && html`
                <div className="ql-thumbs">
                  ${imagens.map((src, n) => html`
                    <button key=${src} className=${n === i ? 'on' : ''} onClick=${() => setI(n)}
                            aria-label=${'Ver imagem ' + (n + 1)}>
                      <img src=${src} alt="" />
                    </button>`)}
                </div>`}
              <//>`
            : html`
              <div className="ql-shot">
                <div className="shot-empty" style=${{ position: 'relative', minHeight: '220px' }}>
                  <span className="plus">+</span>
                  <span>Adicione imagens deste projeto em <code>assets/projetos/</code></span>
                  <code>data.js → projetos → imagens: ['assets/projetos/${projeto.id}-1.png']</code>
                </div>
              </div>`}

          <div className="proj-head" style=${{ marginBottom: '10px' }}>
            <span className=${'badge badge-' + projeto.tipo}>${projeto.badge}</span>
            ${projeto.tags.map((t) => html`<span className="chip" key=${t}>${t}</span>`)}
          </div>

          <p style=${{ color: 'var(--text-2)' }}>${projeto.desc}</p>

          <ul className="ql-lista">
            ${projeto.destaques.map((d) => html`
              <li key=${d}><span className="tick">✓</span><span>${d}</span></li>`)}
          </ul>

          <div style=${{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            ${projeto.link && html`
              <a className="btn btn-primary btn-sm" href=${projeto.link} target="_blank" rel="noopener">
                ${projeto.linkLabel || 'Abrir'} <${Ico.arrow} size=${14} />
              </a>`}
            <button className="btn btn-ghost btn-sm" onClick=${onFechar}>Fechar</button>
          </div>
        </div>
      </div>
    </div>`;
}

function Projetos({ setAberto }) {
  return html`
    <${Window} id="projetos" titulo="Projetos" subtitulo="galeria"
               extra=${html`<span>${projetos.length} itens</span>`}>
      <p className="eyebrow">Portfólio</p>
      <h2 className="win-title">O que eu <span className="grad">construí</span></h2>
      <p style=${{ color: 'var(--text-2)', marginBottom: '22px', maxWidth: '44rem' }}>
        Clique em um card para ver os detalhes, as imagens e o que foi feito em cada projeto.
      </p>

      <div className="proj-grid">
        ${projetos.map((p) => html`<${CardProjeto} key=${p.id} projeto=${p} onAbrir=${setAberto} />`)}
      </div>
    <//>`;
}

/* ---------------------------------------------------------------
   Contato
--------------------------------------------------------------- */
function Contato() {
  const [form, setForm] = useState({ nome: '', assunto: '', msg: '' });
  const mudar = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const assunto = form.assunto || `Contato pelo portfólio${form.nome ? ' — ' + form.nome : ''}`;
    const corpo = `${form.msg}\n\n—\n${form.nome}`;
    window.location.href =
      `mailto:${perfil.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  };

  const itens = [
    { ico: 'mail', label: 'E-mail', val: perfil.email, href: 'mailto:' + perfil.email, cor: 'linear-gradient(145deg,#5ab6ff,#0a84ff)' },
    { ico: 'linkedin', label: 'LinkedIn', val: perfil.linkedinUser, href: perfil.linkedin, cor: 'linear-gradient(145deg,#3b9be8,#0a66c2)' },
    { ico: 'github', label: 'GitHub', val: perfil.githubUser, href: perfil.github, cor: 'linear-gradient(145deg,#59626d,#23282e)' },
    { ico: 'pin', label: 'Localização', val: perfil.localizacao, href: null, cor: 'linear-gradient(145deg,#7d7bee,#4341c4)' },
  ];

  return html`
    <${Window} id="contato" titulo="Contato" subtitulo="nova mensagem">
      <p className="eyebrow">Vamos conversar</p>
      <h2 className="win-title">Aberto a <span className="grad">oportunidades</span></h2>
      <p style=${{ color: 'var(--text-2)', marginBottom: '24px', maxWidth: '44rem' }}>
        Vagas, colaborações ou troca de conhecimento — respondo todas as mensagens.
      </p>

      <div className="contato-grid">
        <div className="contato-lista">
          ${itens.map((it) => {
            const conteudo = html`
              <${React.Fragment}>
                <span className="contato-ico" style=${{ background: it.cor }}>
                  ${React.createElement(Ico[it.ico], { size: 17 })}
                </span>
                <span>
                  <span className="contato-label">${it.label}</span>
                  <span className="contato-val" style=${{ display: 'block' }}>${it.val}</span>
                </span>
              <//>`;
            return it.href
              ? html`<a className="contato-item" key=${it.label} href=${it.href}
                        target=${it.href.startsWith('http') ? '_blank' : undefined} rel="noopener">${conteudo}</a>`
              : html`<div className="contato-item" key=${it.label}>${conteudo}</div>`;
          })}
        </div>

        <div className="mail">
          <div className="mail-head">Para: ${perfil.email}</div>
          <form onSubmit=${enviar}>
            <div className="field">
              <label htmlFor="c-nome">Seu nome</label>
              <input id="c-nome" value=${form.nome} onChange=${mudar('nome')} placeholder="Como posso te chamar?" />
            </div>
            <div className="field">
              <label htmlFor="c-assunto">Assunto</label>
              <input id="c-assunto" value=${form.assunto} onChange=${mudar('assunto')} placeholder="Oportunidade, projeto, dúvida..." />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Mensagem</label>
              <textarea id="c-msg" rows="4" value=${form.msg} onChange=${mudar('msg')} placeholder="Escreva sua mensagem..."></textarea>
            </div>
            <button className="btn btn-primary" type="submit" style=${{ justifyContent: 'center' }}>
              Enviar <${Ico.send} size=${15} />
            </button>
          </form>
        </div>
      </div>
    <//>`;
}

/* ---------------------------------------------------------------
   Dock (com efeito de magnificação)
--------------------------------------------------------------- */
const MAG_RAIO = 110;   // distância (px) em que o ícone começa a crescer
const MAG_FORCA = 0.42; // quanto ele cresce quando o cursor está em cima

function DockItem({ nome, icone, cor, href, onClick, on, mouseX }) {
  const ref = useRef(null);
  const [escala, setEscala] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mouseX == null) return setEscala(1);
    const r = el.getBoundingClientRect();
    const d = Math.abs(mouseX - (r.left + r.width / 2));
    setEscala(d > MAG_RAIO ? 1 : 1 + MAG_FORCA * (1 - d / MAG_RAIO));
  }, [mouseX]);

  const conteudo = html`
    <${React.Fragment}>
      <span className="dock-tip">${nome}</span>
      <span className="dock-icon"
            style=${{ background: cor, transform: `scale(${escala}) translateY(${(escala - 1) * -12}px)` }}>
        ${React.createElement(Ico[icone], { size: 23 })}
      </span>
      <span className="dock-dot"></span>
    <//>`;

  return href
    ? html`<a className=${'dock-item' + (on ? ' on' : '')} ref=${ref} href=${href}
              target="_blank" rel="noopener" aria-label=${nome}>${conteudo}</a>`
    : html`<button className=${'dock-item' + (on ? ' on' : '')} ref=${ref}
              onClick=${onClick} aria-label=${nome}>${conteudo}</button>`;
}

function Dock({ ativa, tema, alternarTema }) {
  const [mouseX, setMouseX] = useState(null);

  return html`
    <div className="dock-wrap">
      <div className="dock"
           onMouseMove=${(e) => setMouseX(e.clientX)}
           onMouseLeave=${() => setMouseX(null)}>
        ${SECOES.map((s) => html`
          <${DockItem} key=${s.id} ...${s} mouseX=${mouseX} on=${ativa === s.id} onClick=${() => irPara(s.id)} />`)}
        <span className="dock-sep"></span>
        ${LINKS.map((l) => html`<${DockItem} key=${l.id} ...${l} mouseX=${mouseX} />`)}
        <span className="dock-sep"></span>
        <${DockItem} nome=${tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
                     icone=${tema === 'dark' ? 'sun' : 'moon'} mouseX=${mouseX}
                     cor="linear-gradient(145deg,#96a0ad,#3c434c)" onClick=${alternarTema} />
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------------
   Spotlight (Ctrl/⌘ + K)
--------------------------------------------------------------- */
function Spotlight({ onFechar, onAbrirProjeto }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const base = useMemo(() => [
    ...SECOES.map((s) => ({ tipo: 'Seção', nome: s.nome, icone: s.icone, cor: s.cor, acao: () => irPara(s.id) })),
    ...projetos.map((p) => ({ tipo: 'Projeto', nome: p.titulo, icone: 'folder', cor: 'linear-gradient(145deg,#54d4e8,#1b7f95)', acao: () => onAbrirProjeto(p) })),
    ...habilidades.flatMap((g) => g.itens.map((i) => ({ tipo: g.grupo, nome: i.nome, icone: 'code', cor: 'linear-gradient(145deg,#96a0ad,#4a545f)', acao: () => irPara('habilidades') }))),
    ...LINKS.map((l) => ({ tipo: 'Link', nome: l.nome, icone: l.icone, cor: l.cor, acao: () => window.open(l.href, '_blank', 'noopener') })),
  ], [onAbrirProjeto]);

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const res = q ? base.filter((r) => norm(r.nome + ' ' + r.tipo).includes(norm(q))) : base.slice(0, 8);

  const executar = useCallback((r) => { if (r) { r.acao(); onFechar(); } }, [onFechar]);

  const onKey = (e) => {
    if (e.key === 'Escape') return onFechar();
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, res.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); executar(res[sel]); }
  };

  return html`
    <div className="spot-backdrop" onClick=${onFechar}>
      <div className="spot" onClick=${(e) => e.stopPropagation()}>
        <div className="spot-input">
          <${Ico.search} size=${20} />
          <input ref=${inputRef} value=${q} placeholder="Buscar seções, projetos, tecnologias..."
                 onChange=${(e) => { setQ(e.target.value); setSel(0); }} onKeyDown=${onKey}
                 aria-label="Busca" />
        </div>
        ${res.length === 0
          ? html`<p className="spot-vazio">Nada encontrado para "${q}"</p>`
          : html`
            <ul className="spot-list">
              ${res.map((r, n) => html`
                <li key=${r.tipo + r.nome} className=${n === sel ? 'sel' : ''} onMouseEnter=${() => setSel(n)}>
                  <button onClick=${() => executar(r)}>
                    <span className="spot-ico" style=${{ background: r.cor }}>
                      ${React.createElement(Ico[r.icone], { size: 14 })}
                    </span>
                    <span>${r.nome}</span>
                    <span className="spot-meta">${r.tipo}</span>
                  </button>
                </li>`)}
            </ul>`}
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   App
--------------------------------------------------------------- */
function App() {
  const [tema, alternarTema] = useTema();
  const ativa = useSecaoAtiva();
  const [spot, setSpot] = useState(false);
  const [projetoAberto, setProjetoAberto] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSpot((s) => !s); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const abrirProjeto = useCallback((p) => setProjetoAberto(p), []);

  return html`
    <${React.Fragment}>
      <${MenuBar} tema=${tema} alternarTema=${alternarTema} ativa=${ativa} abrirSpotlight=${() => setSpot(true)} />

      <main className="desktop">
        <${Hero} />
        <${Sobre} />
        <${Habilidades} tema=${tema} />
        <${Projetos} setAberto=${abrirProjeto} />
        <${Contato} />
      </main>

      <footer className="footer">
        <p>Feito por <strong>${perfil.nome}</strong> — HTML, CSS e React, sem framework de build.</p>
        <p>Dica: aperte <kbd>Ctrl</kbd> + <kbd>K</kbd> para buscar. © ${new Date().getFullYear()}</p>
      </footer>

      <${Dock} ativa=${ativa} tema=${tema} alternarTema=${alternarTema} />

      ${spot && html`<${Spotlight} onFechar=${() => setSpot(false)} onAbrirProjeto=${abrirProjeto} />`}
      ${projetoAberto && html`<${QuickLook} projeto=${projetoAberto} onFechar=${() => setProjetoAberto(null)} />`}
    <//>`;
}

createRoot(document.getElementById('root')).render(html`<${App} />`);

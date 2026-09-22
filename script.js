// =============================================================
//  Portfólio — Gabriel Anacleto
//  Uma área de trabalho no estilo macOS: menu bar, Dock e um
//  gerenciador de janelas. Cada recurso do portfólio é um app.
//
//  script.js -> sistema (área de trabalho, janelas, Dock, busca)
//  apps.js   -> conteúdo de cada janela
//  data.js   -> textos, habilidades e projetos
// =============================================================

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import htm from 'https://esm.sh/htm@3.1.1';

import { perfil, projetos, habilidades, fotos } from './data.js';
import { Ico } from './icones.js';
import { Sobre, Habilidades, Projetos, Projeto, Fotos, Terminal, Contato, LinkedIn, GitHub } from './apps.js';

const html = htm.bind(React.createElement);

/* ---------------------------------------------------------------
   Aplicativos disponíveis

   w/h são o tamanho inicial da janela; ela é ajustada se não couber
   na tela. "multipla" permite várias janelas do mesmo app (o caso
   dos projetos, que abrem um por vez).
--------------------------------------------------------------- */
const APPS = {
  sobre: {
    nome: 'Sobre mim', subtitulo: 'perfil profissional', icone: 'user',
    cor: 'linear-gradient(145deg,#2f9bff,#0060df)', w: 820, h: 580, comp: Sobre,
  },
  habilidades: {
    nome: 'Habilidades', subtitulo: 'o que eu uso no dia a dia', icone: 'code',
    cor: 'linear-gradient(145deg,#96a0ad,#4a545f)', w: 840, h: 600, comp: Habilidades,
  },
  projetos: {
    nome: 'Projetos', subtitulo: 'galeria', icone: 'folder',
    cor: 'linear-gradient(145deg,#54d4e8,#1b7f95)', w: 880, h: 620, comp: Projetos,
  },
  fotos: {
    nome: 'Fotos', subtitulo: 'eventos e estudos', icone: 'imagem',
    cor: 'linear-gradient(145deg,#ff9a6b,#e8506b)', w: 860, h: 620, comp: Fotos,
  },
  contato: {
    nome: 'Contato', subtitulo: 'nova mensagem', icone: 'mail',
    cor: 'linear-gradient(145deg,#7d7bee,#4341c4)', w: 760, h: 560, comp: Contato,
  },
  terminal: {
    nome: 'Terminal', subtitulo: 'zsh', icone: 'terminal',
    cor: 'linear-gradient(145deg,#4a545f,#1c2127)', w: 620, h: 430, comp: Terminal, escuro: true,
  },
  linkedin: {
    nome: 'LinkedIn', subtitulo: 'perfil profissional', icone: 'linkedin',
    cor: 'linear-gradient(145deg,#3b9be8,#0a66c2)', w: 700, h: 640, comp: LinkedIn,
  },
  github: {
    nome: 'GitHub', subtitulo: 'perfil e repositórios', icone: 'github',
    cor: 'linear-gradient(145deg,#59626d,#23282e)', w: 700, h: 640, comp: GitHub,
  },
  projeto: {
    nome: 'Projeto', subtitulo: '', icone: 'folder',
    cor: 'linear-gradient(145deg,#54d4e8,#1b7f95)', w: 780, h: 640, comp: Projeto, multipla: true,
  },
};

// ordem em que aparecem no Dock
const DOCK = ['sobre', 'habilidades', 'projetos', 'fotos', 'terminal', 'contato', 'linkedin', 'github'];

const MENUBAR = 30;   // altura da barra superior
const DOCK_H = 96;    // espaço reservado para o Dock

/* ---------------------------------------------------------------
   Hooks
--------------------------------------------------------------- */
function useTema() {
  const [tema, setTema] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try { localStorage.setItem('ga-theme', tema); } catch (e) {}
  }, [tema]);
  return [tema, useCallback(() => setTema((t) => (t === 'dark' ? 'light' : 'dark')), [])];
}

// Em telas pequenas não há arrastar nem sobreposição: cada janela
// ocupa a tela inteira, como um app de celular.
function useCompacto() {
  const consulta = '(max-width: 820px), (max-height: 520px)';
  const [compacto, setCompacto] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const aoMudar = (e) => setCompacto(e.matches);
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);
  return compacto;
}

function useRelogio() {
  const [agora, setAgora] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setAgora(new Date()), 10000);
    return () => clearInterval(t);
  }, []);
  return agora;
}

/* ---------------------------------------------------------------
   Barra de menu
--------------------------------------------------------------- */
function Menu({ rotulo, itens, aberto, aoAbrir, negrito }) {
  return html`
    <div className=${'menu' + (aberto ? ' aberto' : '')}>
      <button className=${negrito ? 'menu-gatilho forte' : 'menu-gatilho'}
              onClick=${() => aoAbrir(false)}
              onMouseEnter=${() => aoAbrir(true)}>
        ${rotulo}
      </button>
      ${aberto && html`
        <ul className="menu-lista">
          ${itens.map((it, i) => (it.separador
            ? html`<li key=${'s' + i} className="menu-sep"></li>`
            : html`
              <li key=${it.rotulo}>
                <button disabled=${it.inativo} onClick=${it.acao}>
                  <span>${it.rotulo}</span>
                  ${it.atalho && html`<span className="menu-atalho">${it.atalho}</span>`}
                </button>
              </li>`))}
        </ul>`}
    </div>`;
}

function MenuBar({ tema, alternarTema, abrirSpotlight, appAtivo, temJanelas, abrirApp,
                   aoOrganizar, aoMinimizar, aoFechar, aoFecharTudo }) {
  const agora = useRelogio();
  const [menu, setMenu] = useState(null);
  const relogio = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dia = agora.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });

  // fecha ao clicar fora
  useEffect(() => {
    if (!menu) return;
    const fora = () => setMenu(null);
    document.addEventListener('click', fora);
    return () => document.removeEventListener('click', fora);
  }, [menu]);

  const usar = (fn) => () => { setMenu(null); fn && fn(); };
  const nomeApp = appAtivo ? APPS[appAtivo].nome : perfil.nome.split(' ')[0];

  const menus = [
    {
      rotulo: nomeApp, negrito: true, itens: [
        { rotulo: 'Sobre mim', acao: usar(() => abrirApp('sobre')) },
        { separador: true },
        { rotulo: 'Fechar janela', atalho: 'Esc', inativo: !appAtivo, acao: usar(aoFechar) },
      ],
    },
    {
      rotulo: 'Ir', itens: [
        ...DOCK.map((id) => ({ rotulo: APPS[id].nome, acao: usar(() => abrirApp(id)) })),
        { separador: true },
        { rotulo: 'Buscar…', atalho: 'Ctrl K', acao: usar(abrirSpotlight) },
      ],
    },
    {
      rotulo: 'Janela', itens: [
        { rotulo: 'Minimizar', inativo: !appAtivo, acao: usar(aoMinimizar) },
        { rotulo: 'Organizar em grade', inativo: !temJanelas, acao: usar(aoOrganizar) },
        { separador: true },
        { rotulo: 'Fechar todas', inativo: !temJanelas, acao: usar(aoFecharTudo) },
      ],
    },
    {
      rotulo: 'Ajuda', itens: [
        { rotulo: 'GitHub', acao: usar(() => abrirApp('github')) },
        { rotulo: 'LinkedIn', acao: usar(() => abrirApp('linkedin')) },
        { separador: true },
        { rotulo: 'Enviar e-mail', acao: usar(() => { window.location.href = 'mailto:' + perfil.email; }) },
      ],
    },
  ];

  return html`
    <header className="menubar" onClick=${(e) => e.stopPropagation()}>
      <span className="mb-mark">GA</span>
      <nav className="mb-menus">
        ${menus.map((m) => html`
          <${Menu} key=${m.rotulo} rotulo=${m.rotulo} itens=${m.itens} negrito=${m.negrito}
                   aberto=${menu === m.rotulo}
                   aoAbrir=${(hover) => setMenu((a) => (hover ? (a ? m.rotulo : a) : (a === m.rotulo ? null : m.rotulo)))} />`)}
      </nav>

      <div className="mb-right">
        <button className="mb-key" onClick=${abrirSpotlight} title="Buscar (Ctrl + K)">
          <${Ico.search} size=${13} /> <span>K</span>
        </button>
        <button onClick=${alternarTema} aria-label="Alternar tema"
                title=${tema === 'dark' ? 'Tema claro' : 'Tema escuro'}>
          ${tema === 'dark' ? html`<${Ico.sun} size=${15} />` : html`<${Ico.moon} size=${15} />`}
        </button>
        <span className="mb-status"><${Ico.wifi} size=${15} /></span>
        <span className="mb-status"><${Ico.battery} size=${15} /></span>
        <span className="mb-clock"><span className="mb-dia">${dia} </span>${relogio}</span>
      </div>
    </header>`;
}

/* ---------------------------------------------------------------
   Janela

   A posição e o tamanho ficam aqui dentro: assim arrastar uma janela
   não re-renderiza as outras. O gerenciador guarda só o que ele
   precisa saber (ordem, foco, minimizada).
--------------------------------------------------------------- */
function Janela({ janela, tema, compacto, focada, aoFocar, aoFechar, aoMinimizar, abrirApp }) {
  const def = APPS[janela.app];
  const [pos, setPos] = useState(() => ({ x: janela.x, y: janela.y }));
  const [tam, setTam] = useState(() => ({ w: janela.w, h: janela.h }));
  const [max, setMax] = useState(false);
  const anterior = useRef(null);
  const arrasto = useRef(null);
  const [arrastando, setArrastando] = useState(false);

  // minimizar/restaurar em duas etapas para a animação aparecer
  const [estado, setEstado] = useState('aberta');
  const corpoRef = useRef(null);
  // deslocamento até o Dock, para a janela ser sugada na direção certa
  const [genie, setGenie] = useState({ '--gx': '0px', '--gy': '0px' });

  const mirarNoDock = useCallback(() => {
    const el = corpoRef.current;
    const dock = document.querySelector('.dock');
    if (!el || !dock) return;
    const j = el.getBoundingClientRect();
    const d = dock.getBoundingClientRect();
    // no macOS a janela é sugada para o canto onde ela vai descansar
    setGenie({
      '--gx': Math.round(d.right - 34 - (j.left + j.width / 2)) + 'px',
      '--gy': Math.round(d.top + 24 - j.bottom) + 'px',
    });
  }, []);
  useEffect(() => {
    if (janela.min && estado === 'aberta') { mirarNoDock(); setEstado('minimizando'); }
    else if (!janela.min && estado === 'minimizada') setEstado('restaurando');
  }, [janela.min, estado, mirarNoDock]);

  useEffect(() => {
    if (estado !== 'minimizando' && estado !== 'restaurando') return;
    const t = setTimeout(() => setEstado(estado === 'minimizando' ? 'minimizada' : 'aberta'), 510);
    return () => clearTimeout(t);
  }, [estado]);

  // mantém a janela dentro da tela quando ela muda de tamanho
  useEffect(() => {
    const aoRedimensionar = () => {
      setPos((p) => limitar(p.x, p.y, tam.w));
      setTam((t) => ({
        w: Math.min(t.w, window.innerWidth - 24),
        h: Math.min(t.h, window.innerHeight - MENUBAR - DOCK_H),
      }));
    };
    window.addEventListener('resize', aoRedimensionar);
    return () => window.removeEventListener('resize', aoRedimensionar);
  }, [tam.w]);

  // pelo menos um pedaço da barra de título fica sempre alcançável
  function limitar(x, y, largura) {
    return {
      x: Math.min(Math.max(x, 100 - largura), window.innerWidth - 100),
      y: Math.min(Math.max(y, MENUBAR), window.innerHeight - 60),
    };
  }

  const alternarMax = () => {
    if (compacto) return;
    if (max) {
      if (anterior.current) { setPos(anterior.current.pos); setTam(anterior.current.tam); }
      setMax(false);
    } else {
      anterior.current = { pos, tam };
      setPos({ x: 12, y: MENUBAR + 8 });
      setTam({ w: window.innerWidth - 24, h: window.innerHeight - MENUBAR - DOCK_H - 8 });
      setMax(true);
    }
  };

  // --- arrastar pela barra de título ---
  const aoPressionar = (e) => {
    aoFocar();
    if (compacto || max || e.button !== 0) return;
    if (e.target.closest('.luz')) return;   // os botões não arrastam
    e.currentTarget.setPointerCapture(e.pointerId);
    arrasto.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    setArrastando(true);
  };
  const aoMover = (e) => {
    if (!arrasto.current) return;
    setPos(limitar(e.clientX - arrasto.current.dx, e.clientY - arrasto.current.dy, tam.w));
  };
  const aoSoltar = (e) => {
    if (!arrasto.current) return;
    arrasto.current = null;
    setArrastando(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // --- redimensionar pelo canto ---
  const redimensiona = useRef(null);
  const aoPressionarCanto = (e) => {
    if (compacto) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    redimensiona.current = { x: e.clientX, y: e.clientY, w: tam.w, h: tam.h };
  };
  const aoMoverCanto = (e) => {
    const r = redimensiona.current;
    if (!r) return;
    setTam({
      w: Math.max(360, Math.min(r.w + (e.clientX - r.x), window.innerWidth - pos.x - 8)),
      h: Math.max(240, Math.min(r.h + (e.clientY - r.y), window.innerHeight - pos.y - 8)),
    });
  };
  const aoSoltarCanto = (e) => {
    redimensiona.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (estado === 'minimizada') return null;

  const classes = [
    'janela',
    focada || estado === 'minimizando' ? 'focada' : 'atras',
    arrastando && 'arrastando',
    max && 'maximizada',
    janela.fechando && 'fechando',
    estado === 'minimizando' && 'minimizando',
    estado === 'restaurando' && 'restaurando',
    def.escuro && 'janela-escura',
  ].filter(Boolean).join(' ');

  const estilo = compacto
    ? { zIndex: janela.z, ...genie }
    : { left: pos.x, top: pos.y, width: tam.w, height: tam.h, zIndex: janela.z, ...genie };

  const titulo = janela.params.projeto ? janela.params.projeto.titulo : def.nome;

  return html`
    <section className=${classes} style=${estilo} ref=${corpoRef} onMouseDown=${aoFocar}
             role="dialog" aria-label=${titulo}>
      <header className="janela-barra" onPointerDown=${aoPressionar}
              onPointerMove=${aoMover} onPointerUp=${aoSoltar} onPointerCancel=${aoSoltar}
              onDoubleClick=${alternarMax}>
        <div className="luzes">
          <button className="luz luz-vermelha" onClick=${aoFechar} aria-label="Fechar"><span>×</span></button>
          <button className="luz luz-amarela" onClick=${aoMinimizar} aria-label="Minimizar"><span>−</span></button>
          <button className="luz luz-verde" onClick=${alternarMax}
                  aria-label=${max ? 'Restaurar tamanho' : 'Ampliar'}><span>+</span></button>
        </div>
        <span className="janela-tituloes">
          <span className="janela-titulo">${titulo}</span>
          ${def.subtitulo && !janela.params.projeto &&
            html`<span className="janela-sub">${def.subtitulo}</span>`}
        </span>
      </header>

      <div className="janela-corpo">
        ${React.createElement(def.comp, { tema, abrirApp, params: janela.params })}
      </div>

      ${!compacto && !max && html`
        <span className="janela-canto" onPointerDown=${aoPressionarCanto}
              onPointerMove=${aoMoverCanto} onPointerUp=${aoSoltarCanto}
              onPointerCancel=${aoSoltarCanto} aria-hidden="true"></span>`}
    </section>`;
}

/* ---------------------------------------------------------------
   Dock
--------------------------------------------------------------- */
const MAG_RAIO = 110;
const MAG_FORCA = 0.42;

function DockItem({ nome, icone, cor, href, onClick, aberto, mouseX }) {
  const ref = useRef(null);
  const [escala, setEscala] = useState(1);

  useEffect(() => {
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
    ? html`<a className="dock-item" ref=${ref} href=${href} target="_blank" rel="noopener"
              aria-label=${nome}>${conteudo}</a>`
    : html`<button className=${'dock-item' + (aberto ? ' on' : '')} ref=${ref}
              onClick=${onClick} aria-label=${nome}>${conteudo}</button>`;
}

function Dock({ abertos, abrirApp, tema, alternarTema, minimizadas, aoRestaurar }) {
  const [mouseX, setMouseX] = useState(null);

  return html`
    <div className="dock-wrap">
      <div className="dock"
           onMouseMove=${(e) => setMouseX(e.clientX)}
           onMouseLeave=${() => setMouseX(null)}>
        ${DOCK.map((id) => html`
          <${DockItem} key=${id} nome=${APPS[id].nome} icone=${APPS[id].icone} cor=${APPS[id].cor}
                       mouseX=${mouseX} aberto=${abertos.has(id)} onClick=${() => abrirApp(id)} />`)}
        <span className="dock-sep"></span>
        <${DockItem} nome=${tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
                     icone=${tema === 'dark' ? 'sun' : 'moon'} mouseX=${mouseX}
                     cor="linear-gradient(145deg,#96a0ad,#3c434c)" onClick=${alternarTema} />

        ${minimizadas.length > 0 && html`
          <${React.Fragment}>
            <span className="dock-sep"></span>
            ${minimizadas.map((m) => html`
              <button className="dock-item dock-min" key=${m.id} onClick=${() => aoRestaurar(m.id)}
                      aria-label=${'Restaurar ' + m.titulo}>
                <span className="dock-tip">${m.titulo}</span>
                <span className="dock-icon dock-icon-min" style=${{ background: APPS[m.app].cor }}>
                  ${React.createElement(Ico[APPS[m.app].icone], { size: 17 })}
                </span>
                <span className="dock-dot"></span>
              </button>`)}
          <//>`}
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   Área de trabalho: identificação e atalhos
--------------------------------------------------------------- */
function AreaDeTrabalho({ abrirApp, vazia }) {
  const atalhos = [
    { app: 'projetos', rotulo: 'Projetos' },
    { app: 'sobre', rotulo: 'Sobre mim' },
    { app: 'contato', rotulo: 'Contato' },
  ];

  return html`
    <div className="area">
      <div className=${'placa' + (vazia ? '' : ' recuada')}>
        <p className="placa-status"><span className="pulse"></span> ${perfil.status}</p>
        <h1 className="placa-nome">${perfil.nome}</h1>
        <p className="placa-cargo">${perfil.cargo} · ${perfil.formacao}</p>
        <p className="placa-dica">
          Abra os aplicativos no Dock ou aperte <kbd>Ctrl</kbd> <kbd>K</kbd> para buscar.
        </p>
      </div>

      <div className="atalhos">
        ${atalhos.map((a) => html`
          <button className="atalho" key=${a.app} onClick=${() => abrirApp(a.app)}>
            <span className="atalho-icone" style=${{ background: APPS[a.app].cor }}>
              ${React.createElement(Ico[APPS[a.app].icone], { size: 21 })}
            </span>
            <span className="atalho-rotulo">${a.rotulo}</span>
          </button>`)}
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   Busca (Spotlight)
--------------------------------------------------------------- */
function Spotlight({ onFechar, abrirApp }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const campo = useRef(null);

  useEffect(() => { campo.current && campo.current.focus(); }, []);

  const base = useMemo(() => [
    ...DOCK.map((id) => ({
      tipo: 'Aplicativo', nome: APPS[id].nome, icone: APPS[id].icone, cor: APPS[id].cor,
      acao: () => abrirApp(id),
    })),
    ...projetos.map((p) => ({
      tipo: 'Projeto', nome: p.titulo, icone: 'folder', cor: APPS.projetos.cor,
      acao: () => abrirApp('projeto', { projeto: p }),
    })),
    ...fotos.map((f) => ({
      tipo: 'Foto', nome: f.titulo, icone: 'imagem', cor: APPS.fotos.cor,
      acao: () => abrirApp('fotos'),
    })),
    ...habilidades.flatMap((g) => g.itens.map((i) => ({
      tipo: g.grupo, nome: i.nome, icone: 'code', cor: APPS.habilidades.cor,
      acao: () => abrirApp('habilidades'),
    }))),
  ], [abrirApp]);

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const res = q ? base.filter((r) => norm(r.nome + ' ' + r.tipo).includes(norm(q))) : base.slice(0, 8);

  const executar = useCallback((r) => { if (r) { r.acao(); onFechar(); } }, [onFechar]);

  const aoTeclar = (e) => {
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
          <input ref=${campo} value=${q} placeholder="Buscar aplicativos, projetos, tecnologias..."
                 onChange=${(e) => { setQ(e.target.value); setSel(0); }} onKeyDown=${aoTeclar}
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
   Sistema — gerencia as janelas abertas
--------------------------------------------------------------- */
function Sistema() {
  const [tema, alternarTema] = useTema();
  const compacto = useCompacto();
  const [janelas, setJanelas] = useState([]);
  const [spot, setSpot] = useState(false);
  const z = useRef(10);
  const seq = useRef(0);
  const frenteRef = useRef(null);  // id da janela da frente, para o atalho Esc

  const focar = useCallback((id) => {
    setJanelas((atual) => {
      const alvo = atual.find((j) => j.id === id);
      // sem o teste de "min", restaurar a janela mais alta não faria nada
      if (!alvo || (alvo.z === z.current && !alvo.min)) return atual;
      z.current += 1;
      return atual.map((j) => (j.id === id ? { ...j, z: z.current, min: false } : j));
    });
  }, []);

  const abrirApp = useCallback((appId, params = {}) => {
    const def = APPS[appId];
    if (!def) return;

    setJanelas((atual) => {
      const mesma = def.multipla
        ? atual.find((j) => j.app === appId && j.params.projeto?.id === params.projeto?.id)
        : atual.find((j) => j.app === appId);

      z.current += 1;
      if (mesma) {
        return atual.map((j) => (j.id === mesma.id ? { ...j, z: z.current, min: false, fechando: false } : j));
      }

      // largura/altura que cabem na tela, e posição em cascata
      const w = Math.min(def.w, window.innerWidth - 40);
      const h = Math.min(def.h, window.innerHeight - MENUBAR - DOCK_H - 20);
      const passo = atual.length % 6;
      seq.current += 1;

      return [...atual, {
        id: 'j' + seq.current,
        app: appId,
        params,
        x: Math.max(12, Math.round((window.innerWidth - w) / 2) - 90 + passo * 34),
        y: MENUBAR + 20 + passo * 28,
        w, h, z: z.current, min: false, fechando: false,
      }];
    });
  }, []);

  const fechar = useCallback((id) => {
    setJanelas((atual) => atual.map((j) => (j.id === id ? { ...j, fechando: true } : j)));
    setTimeout(() => setJanelas((atual) => atual.filter((j) => j.id !== id)), 200);
  }, []);

  const minimizar = useCallback((id) => {
    setJanelas((atual) => atual.map((j) => (j.id === id ? { ...j, min: !j.min } : j)));
  }, []);

  const fecharTudo = useCallback(() => {
    setJanelas((atual) => atual.map((j) => ({ ...j, fechando: true })));
    setTimeout(() => setJanelas([]), 200);
  }, []);

  // Organiza tudo em grade — útil quando várias janelas se sobrepõem.
  const organizar = useCallback(() => {
    setJanelas((atual) => {
      const vivas = atual.filter((j) => !j.fechando);
      const colunas = Math.ceil(Math.sqrt(vivas.length));
      const linhas = Math.ceil(vivas.length / colunas);
      const larg = Math.floor((window.innerWidth - 24) / colunas);
      const alt = Math.floor((window.innerHeight - MENUBAR - DOCK_H) / linhas);
      let i = -1;
      return atual.map((j) => {
        if (j.fechando) return j;
        i += 1;
        return {
          ...j, min: false,
          x: 12 + (i % colunas) * larg,
          y: MENUBAR + 8 + Math.floor(i / colunas) * alt,
          w: larg - 14, h: alt - 14,
          // muda a identidade da janela para ela renascer na nova posição
          id: j.id, reposicionar: (j.reposicionar || 0) + 1,
        };
      });
    });
  }, []);

  useEffect(() => {
    const aoTeclar = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpot((s) => !s);
        return;
      }
      // Esc fecha a janela da frente, desde que a busca esteja fechada
      // e o foco não esteja num campo de texto.
      if (e.key === 'Escape' && !spot) {
        const alvo = document.activeElement;
        if (alvo && alvo.matches('input, textarea')) return;
        if (frenteRef.current) fechar(frenteRef.current);
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [spot, fechar]);

  const visiveis = janelas.filter((j) => !j.min && !j.fechando);
  const topo = visiveis.reduce((a, j) => (!a || j.z > a.z ? j : a), null);
  frenteRef.current = topo && topo.id;
  const abertos = new Set(janelas.filter((j) => !j.fechando).map((j) => j.app));
  const minimizadas = janelas.filter((j) => j.min && !j.fechando).map((j) => ({
    id: j.id,
    app: j.app,
    titulo: j.params.projeto ? j.params.projeto.titulo : APPS[j.app].nome,
  }));

  // no celular só a janela do topo aparece, como um app em tela cheia
  // As minimizadas continuam montadas: a própria Janela se remove quando a
  // animação termina. Se filtrássemos aqui, o genie nunca chegaria a rodar.
  const naTela = compacto ? (topo ? [topo] : []) : janelas;

  return html`
    <${React.Fragment}>
      <${MenuBar} tema=${tema} alternarTema=${alternarTema} abrirSpotlight=${() => setSpot(true)}
                  appAtivo=${topo && topo.app} temJanelas=${visiveis.length > 0}
                  abrirApp=${abrirApp} aoOrganizar=${organizar} aoFecharTudo=${fecharTudo}
                  aoFechar=${() => topo && fechar(topo.id)}
                  aoMinimizar=${() => topo && minimizar(topo.id)} />

      <${AreaDeTrabalho} abrirApp=${abrirApp} vazia=${visiveis.length === 0} />

      ${naTela.map((j) => html`
        <${Janela} key=${j.id + ':' + (j.reposicionar || 0)} janela=${j} tema=${tema} compacto=${compacto}
                   focada=${topo && topo.id === j.id}
                   aoFocar=${() => focar(j.id)}
                   aoFechar=${() => fechar(j.id)}
                   aoMinimizar=${() => minimizar(j.id)}
                   abrirApp=${abrirApp} />`)}

      <${Dock} abertos=${abertos} abrirApp=${abrirApp} tema=${tema} alternarTema=${alternarTema}
               minimizadas=${minimizadas} aoRestaurar=${focar} />

      ${spot && html`<${Spotlight} onFechar=${() => setSpot(false)} abrirApp=${abrirApp} />`}
    <//>`;
}

createRoot(document.getElementById('root')).render(html`<${Sistema} />`);

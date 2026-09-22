// =============================================================
//  Aplicativos — o conteúdo de cada janela do "sistema".
//  Cada função aqui é o miolo de uma janela; a moldura (barra de
//  título, arrastar, minimizar) fica no gerenciador, em script.js.
// =============================================================

import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.3.1';
import htm from 'https://esm.sh/htm@3.1.1';

import { perfil, trajetoria, habilidades, projetos, fotos } from './data.js';
import { Ico, LogoMarca } from './icones.js';

const html = htm.bind(React.createElement);

/* ---------------------------------------------------------------
   Sobre mim
--------------------------------------------------------------- */
export function Sobre() {
  return html`
    <div className="app-conteudo">
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
    </div>`;
}

/* ---------------------------------------------------------------
   Habilidades — navegação por categorias, como o Finder
--------------------------------------------------------------- */
export function Habilidades({ tema }) {
  const [grupo, setGrupo] = useState('todos');
  const visiveis = grupo === 'todos' ? habilidades : habilidades.filter((g) => g.grupo === grupo);

  return html`
    <div className="app-split">
      <aside className="app-side">
        <p className="lbl">Categorias</p>
        <button className=${grupo === 'todos' ? 'on' : ''} onClick=${() => setGrupo('todos')}>
          <${Ico.layers} size=${15} /> Todas
        </button>
        ${habilidades.map((g) => html`
          <button key=${g.grupo} className=${grupo === g.grupo ? 'on' : ''} onClick=${() => setGrupo(g.grupo)}>
            ${React.createElement(Ico[g.icone], { size: 15 })} ${g.grupo}
          </button>`)}
      </aside>

      <div className="app-main">
        ${visiveis.map((g) => html`
          <div key=${g.grupo} style=${{ marginBottom: '20px' }}>
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
                </div>`)}
            </div>
          </div>`)}
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   Projetos — galeria; cada projeto abre na própria janela
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

export function Projetos({ abrirApp }) {
  return html`
    <div className="app-conteudo">
      <p className="eyebrow">Portfólio</p>
      <h2 className="win-title">O que eu <span className="grad">construí</span></h2>
      <p className="app-intro">
        Clique em um projeto para abrir os detalhes em uma nova janela.
      </p>

      <div className="proj-grid">
        ${projetos.map((p) => html`
          <${CardProjeto} key=${p.id} projeto=${p}
                          onAbrir=${() => abrirApp('projeto', { projeto: p })} />`)}
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   Um projeto em detalhe
--------------------------------------------------------------- */
export function Projeto({ params }) {
  const projeto = params.projeto;
  const [i, setI] = useState(0);
  const [erro, setErro] = useState(false);
  const imagens = erro ? [] : (projeto.imagens || []);

  return html`
    <div className="app-conteudo">
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
            <div className="shot-empty" style=${{ position: 'relative', minHeight: '200px' }}>
              <span className="plus">+</span>
              <span>Adicione imagens deste projeto em <code>assets/projetos/</code></span>
              <code>data.js → projetos → imagens: ['assets/projetos/${projeto.id}-1.png']</code>
            </div>
          </div>`}

      <div className="proj-head" style=${{ margin: '18px 0 12px' }}>
        <span className=${'badge badge-' + projeto.tipo}>${projeto.badge}</span>
        ${projeto.tags.map((t) => html`<span className="chip" key=${t}>${t}</span>`)}
      </div>

      <p style=${{ color: 'var(--text-2)' }}>${projeto.desc}</p>

      <ul className="ql-lista">
        ${projeto.destaques.map((d) => html`
          <li key=${d}><span className="tick">✓</span><span>${d}</span></li>`)}
      </ul>

      ${projeto.link && html`
        <a className="btn btn-primary btn-sm" href=${projeto.link} target="_blank" rel="noopener">
          ${projeto.linkLabel || 'Abrir'} <${Ico.arrow} size=${14} />
        </a>`}
    </div>`;
}

/* ---------------------------------------------------------------
   Terminal
--------------------------------------------------------------- */
export function Terminal() {
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
    </div>`;
}

/* ---------------------------------------------------------------
   Contato
--------------------------------------------------------------- */
export function Contato({ abrirApp }) {
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
    { ico: 'linkedin', label: 'LinkedIn', val: perfil.linkedinUser, app: 'linkedin', cor: 'linear-gradient(145deg,#3b9be8,#0a66c2)' },
    { ico: 'github', label: 'GitHub', val: perfil.githubUser, app: 'github', cor: 'linear-gradient(145deg,#59626d,#23282e)' },
    { ico: 'pin', label: 'Localização', val: perfil.localizacao, cor: 'linear-gradient(145deg,#7d7bee,#4341c4)' },
  ];

  return html`
    <div className="app-conteudo">
      <p className="eyebrow">Vamos conversar</p>
      <h2 className="win-title">Aberto a <span className="grad">oportunidades</span></h2>
      <p className="app-intro">
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
            if (it.app) {
              return html`<button className="contato-item" key=${it.label}
                                  onClick=${() => abrirApp(it.app)}>${conteudo}</button>`;
            }
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
    </div>`;
}

/* ---------------------------------------------------------------
   LinkedIn

   Esta janela mostra o perfil do LinkedIn e nada mais — trajetória e
   competências já são o app "Sobre mim".

   O badge oficial é o único jeito sancionado de exibir o perfil real
   dentro de outro site. Não é um iframe apontando para o linkedin.com
   (isso o X-Frame-Options bloqueia): o script deles busca o HTML por
   JSONP e escreve num iframe local. Exige perfil público.

   Se o LinkedIn não responder, entra no lugar um cartão estático com
   os mesmos campos que o badge mostraria.
--------------------------------------------------------------- */
const BADGE_SRC = 'https://platform.linkedin.com/badges/js/profile.js';
const BADGE_TIMEOUT = 6000;

function CartaoEstatico() {
  return html`
    <article className="li-cartao">
      <div className="li-capa"></div>
      <div className="li-cartao-corpo">
        <div className="li-avatar">${perfil.iniciais}</div>
        <h2 className="li-nome">${perfil.nome}</h2>
        <p className="li-headline">${perfil.headline}</p>
        <p className="li-local"><${Ico.pin} size=${13} /> ${perfil.localizacao}</p>
        <p className="li-url">linkedin.com/${perfil.linkedinUser}</p>
      </div>
    </article>`;
}

export function LinkedIn({ tema }) {
  const palco = useRef(null);
  const [estado, setEstado] = useState('carregando'); // carregando | pronto | indisponivel

  useEffect(() => {
    const alvo = palco.current;
    if (!alvo) return;
    setEstado('carregando');

    // O script varre a página uma vez ao carregar. Como a janela abre
    // depois, chamamos LIRenderAll() — a API oficial para isso.
    if (window.LIRenderAll) {
      window.LIRenderAll();
    } else {
      const s = document.createElement('script');
      s.src = BADGE_SRC;
      s.async = true;
      s.defer = true;
      s.onerror = () => setEstado('indisponivel');
      document.body.appendChild(s);
    }

    // O badge não avisa quando falha, então checamos se o iframe apareceu.
    const inicio = Date.now();
    const timer = setInterval(() => {
      if (alvo.querySelector('iframe')) {
        setEstado('pronto');
        clearInterval(timer);
      } else if (Date.now() - inicio > BADGE_TIMEOUT) {
        setEstado('indisponivel');
        clearInterval(timer);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [tema]);

  return html`
    <div className=${'li-app estado-' + estado}>
      <div className="li-palco" ref=${palco}>
        <div className="badge-base LI-profile-badge"
             key=${tema}
             data-locale="pt_BR"
             data-size="medium"
             data-theme=${tema === 'dark' ? 'dark' : 'light'}
             data-type="VERTICAL"
             data-vanity=${perfil.linkedinVanity}
             data-version="v1">
          <a className="badge-base__link LI-simple-link"
             href=${perfil.linkedin} target="_blank" rel="noopener">${perfil.nome}</a>
        </div>

        ${estado === 'carregando' && html`
          <p className="li-aviso">Carregando perfil do LinkedIn…</p>`}
        ${estado === 'indisponivel' && html`<${CartaoEstatico} />`}
      </div>

      <div className="li-acoes">
        <a className="btn btn-primary btn-sm" href=${perfil.linkedin} target="_blank" rel="noopener">
          <${Ico.linkedin} size=${15} /> Abrir perfil completo
        </a>
      </div>
    </div>`;
}

/* ---------------------------------------------------------------
   GitHub

   Diferente do LinkedIn, o GitHub tem API pública com CORS liberado,
   então aqui o perfil é buscado ao vivo: foto, bio, números e os
   repositórios mais recentes.

   Sem autenticação o limite é de 60 requisições por hora por IP. Se
   estourar (ou a rede falhar), entra um cartão estático no lugar.
--------------------------------------------------------------- */
const GH_API = 'https://api.github.com';

// cores oficiais das linguagens, para o pontinho ao lado do repositório
const COR_LINGUAGEM = {
  JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c',
  TypeScript: '#3178c6', Java: '#b07219', Shell: '#89e051', PHP: '#4F5D95',
  'C#': '#178600', C: '#555555', 'C++': '#f34b7d', Go: '#00ADD8', SQL: '#e38c00',
};

function CartaoGitHubEstatico() {
  return html`
    <article className="gh-cartao">
      <div className="gh-avatar-vazio">${perfil.iniciais}</div>
      <h2 className="gh-nome">${perfil.nome}</h2>
      <p className="gh-login">@${perfil.githubUser}</p>
      <p className="gh-aviso">
        Não consegui carregar o perfil agora. Pode ser o limite de requisições
        do GitHub ou a rede — o perfil continua acessível no botão abaixo.
      </p>
    </article>`;
}

export function GitHub() {
  const [dados, setDados] = useState(null);
  const [repos, setRepos] = useState([]);
  const [estado, setEstado] = useState('carregando'); // carregando | pronto | indisponivel

  useEffect(() => {
    let vivo = true;
    const usuario = perfil.githubUser;

    Promise.all([
      fetch(`${GH_API}/users/${usuario}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(`${GH_API}/users/${usuario}/repos?sort=updated&per_page=8`)
        .then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([perfilGh, lista]) => {
        if (!vivo) return;
        setDados(perfilGh);
        setRepos(Array.isArray(lista) ? lista : []);
        setEstado('pronto');
      })
      .catch(() => vivo && setEstado('indisponivel'));

    return () => { vivo = false; };
  }, []);

  const data = (iso) => new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

  return html`
    <div className="gh-app">
      ${estado === 'carregando' && html`
        <div className="gh-carregando">
          <span className="gh-spin"></span>
          <p>Carregando perfil do GitHub…</p>
        </div>`}

      ${estado === 'indisponivel' && html`<${CartaoGitHubEstatico} />`}

      ${estado === 'pronto' && dados && html`
        <${React.Fragment}>
          <header className="gh-topo">
            <img className="gh-avatar" src=${dados.avatar_url} alt=${'Foto de ' + (dados.name || dados.login)} />
            <div className="gh-id">
              <h2 className="gh-nome">${dados.name || dados.login}</h2>
              <p className="gh-login">@${dados.login}</p>
              ${dados.bio && html`<p className="gh-bio">${dados.bio}</p>`}
              <p className="gh-numeros">
                <span><b>${dados.public_repos}</b> repositórios</span>
                <span><b>${dados.followers}</b> seguidores</span>
                <span>no GitHub desde <b>${data(dados.created_at)}</b></span>
              </p>
            </div>
          </header>

          ${repos.length > 0 && html`
            <section className="gh-repos">
              <h3 className="gh-secao">Repositórios recentes</h3>
              <ul>
                ${repos.map((r) => html`
                  <li key=${r.id}>
                    <a href=${r.html_url} target="_blank" rel="noopener">
                      <span className="gh-repo-nome">${r.name}</span>
                      ${r.description && html`<span className="gh-repo-desc">${r.description}</span>`}
                      <span className="gh-repo-meta">
                        ${r.language && html`
                          <span className="gh-lang">
                            <i style=${{ background: COR_LINGUAGEM[r.language] || 'var(--text-3)' }}></i>
                            ${r.language}
                          </span>`}
                        ${r.stargazers_count > 0 && html`<span>★ ${r.stargazers_count}</span>`}
                        <span>atualizado em ${data(r.updated_at)}</span>
                      </span>
                    </a>
                  </li>`)}
              </ul>
            </section>`}
        <//>`}

      <div className="gh-acoes">
        <a className="btn btn-primary btn-sm" href=${perfil.github} target="_blank" rel="noopener">
          <${Ico.github} size=${15} /> Abrir perfil no GitHub
        </a>
      </div>
    </div>`;
}


/* ---------------------------------------------------------------
   Fotos — galeria de eventos, estudos e bastidores

   As categorias da barra lateral saem das próprias fotos, então
   basta cadastrar a foto em data.js para a categoria aparecer.
--------------------------------------------------------------- */
function Miniatura({ foto, onAbrir }) {
  const [erro, setErro] = useState(false);

  return html`
    <button className="foto-tile" onClick=${onAbrir} title=${foto.titulo}>
      ${erro
        ? html`
          <span className="foto-quebrada">
            <span className="plus">!</span>
            <code>${foto.arquivo}</code>
          </span>`
        : html`<img src=${foto.arquivo} alt=${foto.titulo} loading="lazy"
                    onError=${() => setErro(true)} />`}
      <span className="foto-legenda">${foto.titulo}</span>
    </button>`;
}

function Visor({ lista, indice, aoFechar, aoTrocar }) {
  const foto = lista[indice];
  const [erro, setErro] = useState(false);

  useEffect(() => { setErro(false); }, [indice]);

  useEffect(() => {
    const aoTeclar = (e) => {
      if (e.key === 'ArrowRight') { e.stopPropagation(); aoTrocar(1); }
      if (e.key === 'ArrowLeft') { e.stopPropagation(); aoTrocar(-1); }
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aoTrocar]);

  return html`
    <div className="visor" onClick=${aoFechar}>
      <div className="visor-quadro" onClick=${(e) => e.stopPropagation()}>
        ${erro
          ? html`<div className="visor-erro">Não encontrei <code>${foto.arquivo}</code></div>`
          : html`<img src=${foto.arquivo} alt=${foto.titulo} onError=${() => setErro(true)} />`}

        ${lista.length > 1 && html`
          <${React.Fragment}>
            <button className="visor-seta esq" onClick=${() => aoTrocar(-1)} aria-label="Foto anterior">
              <${Ico.anterior} size=${20} />
            </button>
            <button className="visor-seta dir" onClick=${() => aoTrocar(1)} aria-label="Próxima foto">
              <${Ico.proximo} size=${20} />
            </button>
          <//>`}

        <div className="visor-info">
          <p className="visor-titulo">${foto.titulo}</p>
          ${foto.descricao && html`<p className="visor-desc">${foto.descricao}</p>`}
          <p className="visor-meta">
            ${foto.categoria}${foto.data ? ' · ' + foto.data : ''}
            ${lista.length > 1 && html`<span> · ${indice + 1} de ${lista.length}</span>`}
          </p>
        </div>

        <button className="visor-fechar" onClick=${aoFechar} aria-label="Fechar">×</button>
      </div>
    </div>`;
}

export function Fotos() {
  const [categoria, setCategoria] = useState('todas');
  const [aberta, setAberta] = useState(null);

  const categorias = [...new Set(fotos.map((f) => f.categoria).filter(Boolean))];
  const lista = categoria === 'todas' ? fotos : fotos.filter((f) => f.categoria === categoria);

  const trocar = (passo) =>
    setAberta((i) => (i === null ? i : (i + passo + lista.length) % lista.length));

  // Sem fotos cadastradas, mostra algo apresentável para quem visita.
  // As instruções de como cadastrar estão em assets/fotos/LEIA-ME.md.
  if (fotos.length === 0) {
    return html`
      <div className="fotos-vazio">
        <span className="fotos-vazio-icone"><${Ico.imagem} size=${30} /></span>
        <h2>Galeria em construção</h2>
        <p>
          Em breve, registros de eventos, cursos, certificações e bastidores
          do que estou estudando.
        </p>
      </div>`;
  }

  return html`
    <div className="app-split">
      <aside className="app-side">
        <p className="lbl">Biblioteca</p>
        <button className=${categoria === 'todas' ? 'on' : ''} onClick=${() => { setCategoria('todas'); setAberta(null); }}>
          <${Ico.imagem} size=${15} /> Todas as fotos
        </button>
        ${categorias.map((c) => html`
          <button key=${c} className=${categoria === c ? 'on' : ''}
                  onClick=${() => { setCategoria(c); setAberta(null); }}>
            <${Ico.folder} size=${15} /> ${c}
          </button>`)}
      </aside>

      <div className="app-main">
        <p className="eyebrow">${lista.length} ${lista.length === 1 ? 'foto' : 'fotos'}</p>
        <div className="fotos-grid">
          ${lista.map((f, i) => html`
            <${Miniatura} key=${f.arquivo} foto=${f} onAbrir=${() => setAberta(i)} />`)}
        </div>
      </div>

      ${aberta !== null && html`
        <${Visor} lista=${lista} indice=${aberta}
                  aoFechar=${() => setAberta(null)} aoTrocar=${trocar} />`}
    </div>`;
}

# Portfólio — Gabriel Anacleto

Portfólio em forma de **área de trabalho**, inspirada no macOS: barra de menu,
Dock e janelas que abrem, arrastam, redimensionam, minimizam e fecham. Cada
recurso do portfólio é um "aplicativo".

## Arquivos

| Arquivo | O que faz |
|---|---|
| `index.html` | Casca mínima: papel de parede, ponto de montagem e fallback sem JS |
| `script.js` | **O sistema** — área de trabalho, gerenciador de janelas, Dock, barra de menu e busca |
| `apps.js` | **Os aplicativos** — o conteúdo de cada janela |
| `data.js` | **O conteúdo** — textos, trajetória, habilidades e projetos |
| `icones.js` | Ícones da interface e o componente que desenha os logos |
| `logos.js` | Traçados dos logos das tecnologias (Simple Icons, embutidos) |
| `style.css` | Todo o visual |
| `assets/projetos/` | Imagens dos projetos |
| `assets/fotos/` | Fotos da galeria (eventos, estudos) |

## Como editar

Quase tudo que você vai querer mudar está em **`data.js`**:

- `perfil` — nome, cargo, textos, e-mail e links
- `trajetoria` — a linha do tempo da carreira
- `habilidades` — tecnologias por categoria (`nivel`: `solido`, `praticando`
  ou `estudando`)
- `projetos` — os cards da galeria, incluindo a lista `imagens`
- `fotos` — a galeria de eventos, estudos e certificações

Para telas dos projetos, veja `assets/projetos/LEIA-ME.md`.
Para a galeria de fotos, veja `assets/fotos/LEIA-ME.md`.

### O app Fotos

Galeria de eventos, cursos, certificações e bastidores. As categorias da
barra lateral se montam sozinhas a partir do campo `categoria` de cada foto —
não há lista para manter em outro lugar.

Clicar numa foto abre o visor dentro da própria janela, com legenda e
navegação pelas setas do teclado.

Enquanto a lista `fotos` estiver vazia, o app mostra "Galeria em construção"
— apresentável para quem visita. Se você não pretende adicionar fotos tão
cedo, dá para tirar `'fotos'` da lista `DOCK` em `script.js` e o app some da
barra.

### Adicionar um aplicativo novo

1. Escreva o componente do conteúdo em `apps.js` e exporte.
2. Registre em `APPS`, no topo do `script.js`:

```js
curriculo: {
  nome: 'Currículo', subtitulo: 'PDF', icone: 'documento',
  cor: 'linear-gradient(145deg,#7d7bee,#4341c4)',
  w: 700, h: 560, comp: Curriculo,
},
```

3. Inclua o id na lista `DOCK` para ele aparecer na barra.

Campos opcionais: `multipla: true` permite várias janelas do mesmo app (é o
caso dos projetos, que abrem um por vez) e `escuro: true` deixa a janela com
fundo escuro nos dois temas (usado pelo Terminal).

### Adicionar uma tecnologia

Se tem logo oficial, pegue o traçado em [simpleicons.org](https://simpleicons.org),
copie o `d` do `<path>` e acrescente em `logos.js`:

```js
docker: { nome: 'Docker', cor: '#2496ED', corEscuro: null, d: 'M13.98 11.08h...' },
```

Depois referencie em `data.js`: `{ nome: 'Docker', logo: 'docker', nivel: 'estudando' }`.

Sem logo oficial (SQL, API REST, competências de processo), use `icone:` no
lugar de `logo:`, apontando para um ícone do objeto `Ico` em `icones.js`.

## Como usar a interface

Ao entrar, a área de trabalho está **vazia** — quem abre os aplicativos é o
visitante, pelo Dock, pelos atalhos da mesa ou pela barra de menu.

- **Dock** — abre os aplicativos; o pontinho marca o que está aberto
- **Barra de menu** — o nome do app em foco, mais os menus *Ir*, *Janela* e
  *Ajuda*, com as ações do sistema
- **Botões da janela** — vermelho fecha, amarelo minimiza, verde amplia
- **Minimizar** — a janela é sugada na diagonal até o Dock, no efeito *genie*
  do macOS, e vira um ícone à direita da barra; clicar nele restaura e traz a
  janela para a frente
- **Arrastar** — pela barra de título; duplo clique nela também amplia
- **Redimensionar** — pelo canto inferior direito
- **Organizar** — aparece na barra de menu com 2+ janelas e distribui tudo em grade
- **Ctrl + K** — busca aplicativos, projetos e tecnologias
- **Esc** — fecha a janela da frente
- **Atalhos da mesa** — no canto superior direito

Como no macOS, a janela inativa fica com as luzes apagadas e o título esmaecido.

Em telas pequenas não há sobreposição: cada janela ocupa a tela inteira, como
um app de celular, e o Dock troca entre elas.

## Os aplicativos de perfil

### GitHub

O GitHub tem API pública com CORS liberado, então esta janela busca o perfil
**ao vivo**: foto, bio, número de repositórios, seguidores e os 8
repositórios mais recentes, com a cor da linguagem.

Nada é configurado aqui — tudo vem de `perfil.githubUser`, em `data.js`.
Como a bio e os repositórios saem direto do GitHub, **o que você escreve lá
aparece aqui**; vale manter a bio alinhada com o resto do portfólio.

Sem autenticação o GitHub permite 60 requisições por hora por IP. Se estourar
ou a rede falhar, entra um cartão estático com o nome, o usuário e o link.

### LinkedIn

Esta janela mostra **só o perfil do LinkedIn** — trajetória e competências já
são o app "Sobre mim", então não se repetem aqui.

Ela carrega o **badge oficial do LinkedIn**, com o perfil real e a foto. O
badge não é um iframe apontando para o linkedin.com — isso o `X-Frame-Options`
deles bloqueia. O script deles busca o HTML por JSONP e escreve num iframe
local.

O badge **só aparece se o seu perfil estiver público** (LinkedIn →
Configurações → Visibilidade → Editar perfil público e URL). Se depois de uns
6 segundos ele não vier — perfil fechado, bloqueador de rastreadores ou rede
sem acesso — entra no lugar um cartão estático com os mesmos campos que o
badge mostraria.

O `data-vanity` vem de `perfil.linkedinVanity`, em `data.js`.

## Como rodar localmente

O site usa módulos ES (`import`), então **não funciona abrindo o arquivo
direto pelo navegador** (`file://`). Suba um servidor local:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## Publicação

São arquivos estáticos — Vercel, Netlify, GitHub Pages ou qualquer hospedagem
simples, sem build. O `portifolio.json` guarda a regra de rewrite.

React e htm vêm de CDN (`esm.sh`), então é preciso ter internet na primeira
carga da página.

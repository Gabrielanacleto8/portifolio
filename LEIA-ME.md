# Portfólio — Gabriel Anacleto

Portfólio pessoal com interface inspirada no macOS: menu bar, janelas com os
três botões, Dock com magnificação, busca estilo Spotlight e tema claro/escuro.

## Arquivos

| Arquivo | O que faz |
|---|---|
| `index.html` | Estrutura mínima: wallpaper, ponto de montagem do React e fallback sem JS |
| `style.css` | Todo o visual (tokens de cor, janelas, Dock, responsivo) |
| `script.js` | Componentes React que montam a página |
| `data.js` | **Conteúdo** — textos, trajetória, habilidades e projetos |
| `logos.js` | Traçados dos logos das tecnologias (Simple Icons, embutidos) |
| `assets/projetos/` | Imagens dos projetos |

## Como editar

Quase tudo que você vai querer mudar está em **`data.js`**:

- `perfil` — nome, cargo, textos do "Sobre", e-mail e links
- `trajetoria` — a linha do tempo da carreira
- `habilidades` — tecnologias, agrupadas por categoria (`nivel`: `solido`,
  `praticando` ou `estudando`)
- `projetos` — cards da galeria, incluindo a lista `imagens`

Para adicionar fotos dos projetos, veja `assets/projetos/LEIA-ME.md`.

### Adicionar uma tecnologia nova

Se a tecnologia tem logo oficial, pegue o traçado em
[simpleicons.org](https://simpleicons.org), copie o `d` do `<path>` e
acrescente uma entrada em `logos.js`:

```js
docker: {
  nome: 'Docker',
  cor: '#2496ED',       // cor da marca (tema claro)
  corEscuro: null,      // variação p/ tema escuro, se a original sumir no fundo
  d: 'M13.98 11.08h...',
},
```

Depois é só referenciar em `data.js`:

```js
{ nome: 'Docker', logo: 'docker', nivel: 'estudando' }
```

Se não existir logo (caso de SQL, API REST e das competências de processo),
use `icone:` em vez de `logo:` apontando para um dos ícones de traço
definidos no objeto `Ico`, em `script.js`.

## Como rodar localmente

O site usa módulos ES (`import`), então **não funciona abrindo o arquivo
direto pelo navegador** (`file://`). Suba um servidor local:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou, se preferir Node:

```bash
npx serve .
```

## Publicação

São arquivos estáticos — funciona em Vercel, Netlify, GitHub Pages ou
qualquer hospedagem simples, sem build. O `portifolio.json` guarda a regra de
rewrite usada na hospedagem.

O React e o htm vêm de CDN (`esm.sh`), então é preciso ter internet na
primeira carga da página.

## Atalhos

- `Ctrl` + `K` — abre a busca (Spotlight)
- `Esc` — fecha a busca ou os detalhes de um projeto
- Os botões amarelo e verde das janelas minimizam e ampliam de verdade
  (minimizar usa uma animação parecida com o efeito *genie* do macOS)

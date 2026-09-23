// =============================================================
//  Ícones da interface e logos das tecnologias
// =============================================================

import React from 'https://esm.sh/react@18.3.1';
import htm from 'https://esm.sh/htm@3.1.1';
import { logos } from './logos.js';

const html = htm.bind(React.createElement);

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
  whatsapp: svg(['M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9', 'M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1']),
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

// ícones extras usados pelas janelas do sistema
Ico.terminal = svg(['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
                    'm7 9 3 3-3 3', 'M13 15h4']);
Ico.minimizar = svg(['M5 12h14']);
Ico.ampliar = svg(['M4 14v6h6', 'M20 10V4h-6', 'm4 20 7-7', 'm20 4-7 7']);
Ico.fechar = svg(['M6 6l12 12', 'M18 6 6 18']);
Ico.janelas = svg(['M3 5h8v6H3z', 'M13 5h8v6h-8z', 'M3 13h8v6H3z', 'M13 13h8v6h-8z']);
Ico.imagem = svg(['M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
                  'M8.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3',
                  'm3.5 17 4.5-4.5 3.5 3.5L15 12l5.5 5.5']);
Ico.anterior = svg(['m15 18-6-6 6-6']);
Ico.proximo = svg(['m9 18 6-6-6-6']);

export { Ico, LogoMarca, svg };

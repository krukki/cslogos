# CS LOGOS v3 — redesign "Cápsula de Stickers"

## Por quê
O usuário acha o site feio, principalmente no celular: visual apagado e sem graça, textos e botões
pequenos. Quer um site moderno e chamativo, com mais times e informações de títulos.

## Decisões do usuário
- **Direção visual:** B · Cápsula de Stickers (protótipo aprovado): fundo creme, cards como adesivos com
  borda preta grossa e sombra dura, leve inclinação, detalhe holográfico, tipografia display pesada.
- **Efeito de adesivo:** médio — cards levemente tortos; ao passar o mouse/tocar, o card endireita e levanta.
- **Tema claro/escuro:** segue o sistema na primeira visita; botão troca e o site lembra a escolha.
- **Menu no celular:** barra inferior fixa com ícones grandes (Início, Times, Quiz, Tema).
- **Página do time:** logos primeiro → logo atual grande, linha do tempo, comparador, títulos, cores, história.
- **Home:** título curto, adesivo de destaque com uma logo antiga sorteada a cada visita, busca, filtros e grade.
- **Mantém:** quiz, comparador antes/depois, amostras de cor (copiar hex).
- **Remove:** "Opinião do autor" (campo `opinion` sai dos dados e da página).
- **Novo:** seção "Títulos" por time — Majors + grandes títulos, com ano (3–8 itens por time).
- **Times novos (10):** Heroic, The MongolZ, paiN, Legacy, Eternal Fire, ENCE, BIG, 3DMAX, Complexity, TSM
  (total: 26).

## Abordagem
Só há um caminho sensato: manter a arquitetura atual (dados em `js/teams.js`, páginas montadas por JS,
sem build, GitHub Pages) e reescrever HTML/CSS e os templates em `js/*.js`. Trocar para um framework
(React/Astro) acrescentaria build e dependências sem ganho para um site deste tamanho.

## Design
- **Fontes:** Bricolage Grotesque (títulos, 600/800) + Inter (texto), Google Fonts.
- **Tokens (claro):** fundo `#F3EFE6`, tinta `#141414`, papel `#FFFFFF`, destaque amarelo `#FFF07A`,
  holográfico em gradiente cônico (rosa→lilás→azul→verde→amarelo). **Escuro:** fundo `#121212`,
  papel `#1D1D1D`, borda/sombra `#F3EFE6`, mesmo amarelo. Tudo via variáveis CSS em `:root` e
  `[data-theme]`.
- **Adesivo de logo:** círculo com fundo escuro fixo (logos claras e escuras ficam legíveis nos dois
  temas), anel branco e contorno de tinta. Logos pretas (FURIA etc.) recebem anel claro e fundo cinza
  para não sumirem.
- **Acessibilidade no celular:** texto base 17px, alvos de toque ≥ 48px, contraste AA nos dois temas,
  foco visível, `prefers-reduced-motion` desliga inclinação/animações, barra inferior com rótulos de texto
  além dos ícones, safe-area do iPhone (`env(safe-area-inset-bottom)`).
- **Regiões:** Europa, Leste Europeu, Brasil, Américas (antiga "América do Norte"), Ásia (nova, MongolZ).
- **Dados:** cada time ganha `titles: [{ year, name, major?: true }]`; `opinion` é removido.
- **Logos novas:** Liquipedia (variantes darkmode), WebP ≤ 640px, mesmo script de conversão.

## Fora do escopo
Votação de logos, galeria geral, contas/backend.

## Verificação
`tests/smoke.js` atualizado (26 times, títulos, tema, barra inferior, sem `opinion`), screenshots em
390px e 1280px nos dois temas, checagem de contraste e de alvos de toque ≥ 48px.

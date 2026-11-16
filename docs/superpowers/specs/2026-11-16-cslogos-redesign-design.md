# CS LOGOS — auditoria e plano de melhorias

## Contexto
Site estático (GitHub Pages: krukki.github.io/cslogos) em HTML/CSS puro, sem JS.
`index.html` com grid de 8 times + `pages/<time>.html` (NAVI, Astralis, SK, Fnatic, MOUZ, FaZe, NiP, MIBR),
cada uma com história, design da logo e uma linha do tempo das logos. CSS único em `css/style.css`
(tema "HUD de CS": dourado T / azul CT, Teko + Rajdhani + JetBrains Mono).
O usuário pediu: analisar, apontar tudo que pode mudar, perguntar o que adicionar e melhorar.

## Auditoria (o que encontrei)

### 1. Bugs / HTML quebrado
- `index.html:7` favicon aponta para `cs2.png` (não existe na raiz) → deve ser `assets/cs2.png`.
- `index.html` tem um `</a>` sobrando depois do card da Fnatic.
- Comentário esquecido "Repeat structure for SK Gaming, Fnatic, NiP, VP, C9, Liquid, FaZe, iBUYPOWER".
- Menu da home: "01 · Início" recarrega a página em vez de subir ao topo.
- Todas as páginas têm `<title>CS LOGOS</title>` — deveria ser "NAVI — CS LOGOS" etc.

### 2. Textos alternativos (alt) errados ou faltando
- Home: `alt="NAVI 364663 Logo"`.
- astralis.html: alt diz "Logo da NAVI usada de 2009 a 2020".
- fnatic.html: 2004 sem alt; 2011 e 2020 dizem "NAVI".
- nip.html: logo de 2000 diz "usada de 2012 a 2021"; a de 2006 e a de 2012 dizem "Logo atual… 2021".
- mibr.html: logo de 2003 sem alt. sk.html: "usada de 2009 a 2020".

### 3. Conteúdo / revisão
- Erros de digitação: "Esranha" (nip), espaço duplo em "Uma pequena  simplificação" (fnatic).
- Tom inconsistente: textos enciclopédicos misturados com "Uma bosta", "Feita no paint", "a minha preferida".
- Descrições curtas demais em alguns itens ("A logo atual da NAVI.", "Logo atual.").
- Dados a verificar: SK (fundada 1997, mas timeline diz "2009 — primeira e única logo"; SK teve logos antes);
  MIBR tem dois itens "2018" e "2018 - Atual" (datas sobrepostas); Fnatic 2011 usa arquivo `fnatic2015.png`;
  ano do rebrand atual da NAVI.
- Páginas de time sem eyebrow/subtítulo, sem conquistas (Majors) e sem navegação para outros times.

### 4. Visual / UX
- Hover do card da home: `border-color` não muda (fica igual ao padrão) — falta o destaque.
- CSS pronto mas não usado no HTML: `.corner` e `.card-underline` nos cards da home, `.hero-rule span`
  (animação "sweep"), `.brand-mark`, `data-side="T/CT"` (sem estilo).
- Classes confusas: `.team-logo1`, `.team-logo2`, `.logo-branca` (fazem a mesma coisa: logo branca).
- Paleta de cores aparece só como texto ("Preto, Amarelo…") — poderia ter amostras de cor.
- Mobile: texto do painel da timeline fica muito estreito; "2021 - Atual" quebra em duas linhas.
- Footer com contraste baixo (`--text-faint #545c6b` sobre `#0a0b0e` ≈ 2.9:1, abaixo do WCAG AA 4.5:1).
- Sem favicon/branding consistente, sem página 404.

### 5. Performance
- Imagens pesadas: `navi2011.png` 805 KB, `fnatic2004.png` 223 KB (2400 px), `faze2016.png` e
  `fnatic2015.png` 3840×2160, `nipnow.png` 2027 px — tudo exibido a no máx. 320 px.
- `<img>` sem `width`/`height` (layout pula ao carregar) e sem `loading="lazy"`.

### 6. SEO / compartilhamento
- Sem `<meta name="description">`, sem Open Graph (preview no Discord/WhatsApp/Twitter).
- README praticamente vazio ("c o o l s i t e").

### 7. Manutenção
- 8 páginas quase idênticas copiadas à mão (navbar, footer, 4 `<span class="corner">` por item).
  Cada time novo = copiar ~100 linhas e corrigir à mão (origem dos alts errados).

## Decisões do usuário
- Comentários pessoais → legenda neutra + linha separada "Opinião do autor" com estilo próprio.
- Funcionalidades: navegação entre times + busca/filtro, comparador antes/depois, paleta de cores visual, quiz.
- Times novos (8): Vitality, G2, FURIA, Imperial, Liquid, Cloud9, Virtus.pro, Spirit.
- Estrutura: um arquivo de dados + JS (sem build, continua 100% GitHub Pages).
- Logos novas: baixar da web (Wikimedia Commons / Liquipedia), converter para WebP; espaço reservado só se não achar.

## Abordagem
Dados em `js/teams.js` como `window.TEAMS = [...]` (script comum, não `fetch` de JSON → funciona também
abrindo o arquivo direto no navegador). Uma página modelo `team.html?t=<slug>` monta tudo a partir dos dados.
As 8 URLs antigas `pages/<slug>.html` viram redirecionamentos, então links já compartilhados continuam funcionando.
Limitação aceita: o conteúdo das páginas de time depende de JS (previews de link mostram só os dados genéricos do site).

### Formato de cada time (`js/teams.js`)
```js
{ slug: "navi", name: "NAVI", fullName: "Natus Vincere", founded: 2009, country: "Ucrânia",
  region: "CEI", colors: [{ name: "Amarelo", hex: "#FFE500" }, ...],
  history: "…", logoDesign: "…",
  logos: [{ years: "2009–2021", src: "assets/navi-2009.webp", alt: "…", caption: "…",
            opinion: "…" /* opcional */, invert: false /* true = renderizar em branco */ }] }
```

## Arquivos
**Novos**
- `js/teams.js`: dados dos 16 times (8 migrados dos HTML atuais com correções + 8 novos).
- `js/common.js`: navbar/footer compartilhados, helper `escapeHTML`, ícone de canto (`.corner`).
- `js/home.js`: renderiza o grid na home; busca por nome; filtro por região (chips: Todas / Europa / CEI / Brasil / América do Norte).
- `team.html` + `js/team.js`: hero (nome, nome completo, fundação, país), **amostras de cor com hex**
  (clicar copia o código), história, design, **comparador antes/depois** (slider arrastável com `<input type=range>`,
  primeira vs. última logo, só se houver ≥2), linha do tempo (legenda + "Opinião do autor"), **anterior/próximo**.
  Atualiza `document.title` e a meta description. Slug inválido → mensagem + link para a home.
- `quiz.html` + `js/quiz.js`: 10 rodadas; mostra uma logo (de preferência não atual), 4 opções de time,
  feedback certo/errado, placar final, "jogar de novo" e recorde salvo em `localStorage` (com try/catch).
- `404.html`: página de "não encontrado" no estilo do site.
- `docs/superpowers/specs/2026-11-16-cslogos-redesign-design.md`: este design registrado no repositório.

**Alterados**
- `index.html`: corrigir favicon (`assets/cs2.png`), remover `</a>` sobrando e comentário velho, adicionar meta
  description + Open Graph, link "Quiz" no menu, campo de busca + chips, grid vazio preenchido por `home.js`,
  `<noscript>` com aviso. "Início" passa a ser `#top`.
- `css/style.css`: unificar `.team-logo1/.team-logo2/.logo-branca` → `.logo--invert`; destacar borda no hover
  do card (`--gold-dim`); usar de verdade os cantos de mira, `.card-underline` e a animação do `.hero-rule span`;
  `--text-faint` com contraste ≥4.5:1 em textos; novos estilos (busca/chips, amostras de cor, comparador, opinião,
  anterior/próximo, quiz); no mobile, painel da timeline com mais largura e ano sem quebra.
- `pages/*.html` (8): substituir por redirecionamento (`<meta http-equiv="refresh">` + `location.replace`) para
  `../team.html?t=<slug>`.
- `assets/`: redimensionar todas as logos para no máx. 640 px e converter para WebP (Pillow); renomear no padrão
  `<slug>-<ano>.webp`; apagar os originais pesados (ex.: `navi2011.png` 805 KB). Atributos `width`/`height` +
  `loading="lazy"` gerados pelo JS.
- `README.md`: o que é o site, link, como adicionar um time (editar `js/teams.js` + colocar a logo em `assets/`).

## Conteúdo
- Corrigir todos os alts (gerados automaticamente a partir de nome + anos, com texto próprio quando preciso).
- Corrigir "Esranha" e o espaço duplo; mover "Uma bosta", "Feita no paint", "a minha preferida", "Esranha" para `opinion`
  e escrever legendas neutras e informativas no lugar.
- Pesquisar (WebSearch) e corrigir: logos e datas da SK (desde 1997), sobreposição 2018/"2018 - Atual" da MIBR,
  ano das logos da Fnatic (o arquivo `fnatic2015` está como 2011) e ano do rebrand da NAVI.
- 8 times novos: história, design da logo, cores (hex) e linha do tempo, pesquisados na web, no mesmo tom do resto do site.

## Bloqueio de rede (logos novas)
A política de rede deste ambiente bloqueia `upload.wikimedia.org`, `commons.wikimedia.org` e `liquipedia.net` (403).
Na implementação, vou propor um ambiente pessoal "cslogos" que libera só esses hosts (o usuário aprova num cartão).
Se for recusado, uso espaços reservados ("logo em breve" com o nome do arquivo esperado) e listo o que falta.

## Ordem de execução (commits no branch `claude/magical-mccarthy-w0zi46`)
1. Registrar o design em `docs/superpowers/specs/`; depois `superpowers:writing-plans` para o plano detalhado.
2. Infra de dados: `teams.js` com os 8 times atuais (corrigidos), `common.js`, `home.js`, `team.html`/`team.js`, redirecionamentos.
3. CSS: limpeza, contraste, cards, mobile.
4. Otimização das imagens.
5. Recursos: busca/filtro, cores, comparador, anterior/próximo, quiz, 404.
6. Times novos (pesquisa + logos).
7. SEO/README. Revisão (`superpowers:requesting-code-review`) e push.

## Verificação
- Script Playwright (no scratchpad): abre `index.html`, cada `team.html?t=<slug>` (16), `quiz.html`, `404.html`
  e os 8 `pages/*.html`; falha se houver erro no console, imagem com `naturalWidth === 0` ou redirecionamento quebrado.
- Testes de interação: a busca filtra o grid, os chips filtram por região, o slider do comparador move,
  o quiz completa 10 rodadas e mostra o placar.
- Screenshots em 1280 px e 390 px da home, de 2 páginas de time e do quiz, revisados visualmente (sem scroll horizontal).
- Contraste dos textos ≥4.5:1 (calculado a partir dos tokens) e nenhuma `<img>` sem alt.
- Tamanho total de `assets/` antes/depois.

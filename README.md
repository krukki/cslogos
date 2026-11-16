# CS LOGOS

Arquivo não oficial da identidade visual do Counter-Strike competitivo: a evolução das logos dos
maiores times, do 1.6 ao CS2.

**Site:** https://krukki.github.io/cslogos/

## O que tem no site

- **Visual “Cápsula de Stickers”:** cada time é um adesivo; tema claro/escuro (segue o sistema e lembra a escolha);
  no celular, menu numa barra fixa embaixo da tela.
- **Times:** grade com busca, filtro por região e uma logo antiga sorteada a cada visita.
- **Página de cada time:** linha do tempo das logos, comparador “antes e depois”, títulos e Majors,
  cores oficiais (clique para copiar o código hex), história e design.
- **Quiz:** 10 rodadas para adivinhar de qual time é cada logo, com recorde salvo no navegador.

## Estrutura

```
index.html        home (grade de times)
team.html         página modelo de time — team.html?t=navi
quiz.html         quiz "adivinhe a logo"
404.html          página de erro do GitHub Pages
css/style.css     todo o visual
js/teams.js       ← DADOS DE TODOS OS TIMES
js/theme.js       tema claro/escuro (carrega no <head>)
js/common.js      funções compartilhadas
js/home.js        grade, busca e filtros
js/team.js        monta a página do time
js/quiz.js        lógica do quiz
assets/           logos em WebP (até 640 px)
pages/*.html      redirecionamentos dos endereços antigos
tests/smoke.js    teste automático (Playwright)
```

Não tem build: é só HTML, CSS e JavaScript. Dá para abrir o `index.html` direto no navegador.

## Como adicionar um time

1. Coloque as logos em `assets/` com o nome `<time>-<ano>.webp` (por exemplo `furia-2017.webp`).
   Prefira PNG/WebP com fundo transparente e no máximo 640 px no lado maior.
2. Abra `js/teams.js`, copie o bloco de um time e troque os dados:
   - `slug` — código curto usado no endereço (`team.html?t=furia`);
   - `region` — `Europa`, `Leste Europeu`, `Brasil`, `Américas` ou `Ásia`;
   - `colors` — nome e código hex de cada cor;
   - `titles` — `{ year, name, major }`, do mais recente ao mais antigo (`major: true` só para Majors vencidos);
   - `logos` — em ordem cronológica (a última é a atual), com `years`, `src`, `w`, `h` e `caption`.
     Use `light: true` para logos escuras (aparecem sobre fundo claro) e `invert: true` para pintá-las de branco.
     Sem `src`, o site mostra “Logo em breve”.
3. Pronto: o time aparece na home, no quiz e na navegação anterior/próximo.

## Testes

```
node tests/smoke.js
```

Abre todas as páginas em um navegador sem interface e verifica imagens quebradas, erros de JavaScript,
busca, filtros, comparador, quiz, tema, tamanho dos botões no celular e redirecionamentos.

## Créditos

Logos são marcas registradas de suas respectivas organizações. Parte das imagens vem da
[Liquipedia](https://liquipedia.net/counterstrike/).

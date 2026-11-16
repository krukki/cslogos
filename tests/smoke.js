/* Teste de fumaça do CS LOGOS.
   Uso: node tests/smoke.js   (precisa do Playwright instalado globalmente ou no projeto)
   Abre todas as páginas via file:// e falha se algo quebrar. */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const url = (p) => 'file://' + path.join(ROOT, p);

// Lê os dados do site da mesma forma que o navegador.
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/teams.js'), 'utf8'), sandbox);
const TEAMS = sandbox.window.TEAMS;

let failures = 0;
function check(cond, msg) {
  if (cond) { console.log('  ok   ' + msg); }
  else { failures++; console.log('  FAIL ' + msg); }
}

async function openPage(browser, p, viewport) {
  const page = await browser.newPage({ viewport: viewport || { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(m.text()); });
  page.on('requestfailed', (r) => { if (r.url().startsWith('file:')) errors.push('falhou: ' + r.url()); });
  await page.goto(url(p));
  await page.waitForLoadState('load');
  return { page, errors };
}

async function brokenImages(page) {
  return page.$$eval('img', (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')));
}

async function imagesWithoutAlt(page) {
  return page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src')));
}

async function noHorizontalScroll(page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
}

(async () => {
  const browser = await chromium.launch();

  // ---------- dados ----------
  console.log('dados');
  const slugs = new Set();
  TEAMS.forEach((t) => {
    check(!slugs.has(t.slug), `slug único: ${t.slug}`);
    slugs.add(t.slug);
    check(['Europa', 'Leste Europeu', 'Brasil', 'Américas', 'Ásia'].includes(t.region), `${t.slug}: região válida (${t.region})`);
    check(t.logos.length >= 1, `${t.slug}: tem logos`);
    t.logos.forEach((l) => {
      if (l.src) check(fs.existsSync(path.join(ROOT, l.src)), `${t.slug}: arquivo existe ${l.src}`);
      check(!!l.caption, `${t.slug}: legenda em ${l.years}`);
    });
    t.colors.forEach((c) => check(/^#[0-9A-F]{6}$/.test(c.hex), `${t.slug}: hex válido ${c.hex}`));
    check(Array.isArray(t.titles), `${t.slug}: tem lista de títulos`);
    check(t.logos.every((l) => !('opinion' in l)), `${t.slug}: sem opinião do autor`);
  });

  // ---------- home ----------
  console.log('home');
  {
    const { page, errors } = await openPage(browser, 'index.html');
    check((await page.$$('.team-card')).length === TEAMS.length, `home mostra ${TEAMS.length} cards`);
    check((await brokenImages(page)).length === 0, 'home sem imagens quebradas');
    check((await imagesWithoutAlt(page)).length === 0, 'home: toda <img> tem alt');
    const favicon = await page.$eval('link[rel=icon]', (l) => l.href);
    check(fs.existsSync(new URL(favicon).pathname), 'favicon existe');

    await page.fill('#team-search', 'navi');
    check((await page.$$('.team-card:visible')).length === 1, 'busca "navi" → 1 card');
    await page.fill('#team-search', 'virtuspro');
    check((await page.$$('.team-card:visible')).length === 1, 'busca "virtuspro" acha Virtus.pro');
    await page.fill('#team-search', 'vp');
    check((await page.$$('.team-card:visible')).length === 1, 'busca pelo apelido "vp"');
    await page.fill('#team-search', 'ngal');
    check((await page.$$('.team-card:visible')).length === 0, 'busca não junta campos ("ngal" não acha SK)');
    await page.fill('#team-search', 'FÚRIA');
    check((await page.$$('.team-card:visible')).length === 1, 'busca com acento/maiúscula "FÚRIA"');
    await page.fill('#team-search', 'zzzz');
    check(await page.isVisible('#empty-state'), 'busca sem resultado mostra estado vazio');
    await page.click('#clear-filters');
    check((await page.$$('.team-card:visible')).length === TEAMS.length, 'limpar filtros mostra todos');

    await page.click('[data-region-filter="Brasil"]');
    const br = TEAMS.filter((t) => t.region === 'Brasil').length;
    check((await page.$$('.team-card:visible')).length === br, `chip Brasil → ${br} cards`);
    check((await page.textContent('#result-count')).includes(String(br)), 'contador atualiza');
    const featHref = await page.getAttribute('#featured', 'href');
    check(TEAMS.some((t) => featHref === `team.html?t=${t.slug}`), 'adesivo sorteado aponta para um time existente');
    check(await page.$eval('#featured img', (i) => i.complete && i.naturalWidth > 0), 'logo sorteada carregou');
    await page.click('[data-region-filter="Ásia"]');
    const asia = TEAMS.filter((t) => t.region === 'Ásia').length;
    check((await page.$$('.team-card:visible')).length === asia, `chip Ásia → ${asia} cards`);
    check(errors.length === 0, 'home sem erros no console ' + errors.join(' | '));
    await page.close();
  }

  // ---------- páginas de time ----------
  console.log('times');
  for (let i = 0; i < TEAMS.length; i++) {
    const t = TEAMS[i];
    const { page, errors } = await openPage(browser, `team.html?t=${t.slug}`);
    check((await page.textContent('#team-root h1')).trim() === t.fullName, `${t.slug}: h1 = ${t.fullName}`);
    check((await page.title()).includes(t.name), `${t.slug}: <title> tem o nome`);
    check((await page.$$('.logo-timeline > li')).length === t.logos.length, `${t.slug}: ${t.logos.length} itens na linha do tempo`);
    check((await page.$$('.title-item')).length === t.titles.length, `${t.slug}: ${t.titles.length} títulos`);
    check(!!(await page.$('#h-titulos')) === (t.titles.length > 0), `${t.slug}: seção de títulos só quando há títulos`);
    check((await page.$$('.opinion')).length === 0, `${t.slug}: sem "Opinião do autor"`);
    const order = await page.$$eval('.team-section > h2', (hs) => hs.map((h) => h.id));
    const expected = ['h-logos'].concat(t.logos.length >= 2 ? ['h-compare'] : [], t.titles.length ? ['h-titulos'] : [], ['h-cores', 'h-historia', 'h-design']);
    check(JSON.stringify(order) === JSON.stringify(expected), `${t.slug}: ordem das seções (logos primeiro)`);
    check((await page.$$('.swatch')).length === t.colors.length, `${t.slug}: ${t.colors.length} amostras de cor`);
    check(!!(await page.$('.compare')) === (t.logos.length >= 2), `${t.slug}: comparador só com 2+ logos`);
    check((await brokenImages(page)).length === 0, `${t.slug}: sem imagens quebradas`);
    check((await imagesWithoutAlt(page)).length === 0, `${t.slug}: toda <img> tem alt`);
    const prev = TEAMS[(i - 1 + TEAMS.length) % TEAMS.length];
    const next = TEAMS[(i + 1) % TEAMS.length];
    check((await page.getAttribute('.pager-link--prev', 'href')) === `team.html?t=${prev.slug}`, `${t.slug}: anterior = ${prev.slug}`);
    check((await page.getAttribute('.pager-link--next', 'href')) === `team.html?t=${next.slug}`, `${t.slug}: próximo = ${next.slug}`);
    check(errors.length === 0, `${t.slug}: sem erros ` + errors.join(' | '));
    await page.close();
  }

  // ---------- interações da página de time ----------
  console.log('interações');
  {
    const multi = TEAMS.find((t) => t.logos.length >= 2);
    const { page } = await openPage(browser, `team.html?t=${multi.slug}`);
    await page.$eval('.compare-range', (r) => { r.value = '20'; r.dispatchEvent(new Event('input')); });
    check((await page.$eval('.compare', (b) => b.style.getPropertyValue('--pos'))) === '20%', 'comparador move para 20%');
    await page.click('.swatch');
    await page.waitForTimeout(200);
    check((await page.textContent('.swatch-status')).includes(multi.colors[0].hex), 'clicar na cor mostra o hex');
    await page.close();

    const single = TEAMS.find((t) => t.logos.length === 1);
    if (single) {
      const r = await openPage(browser, `team.html?t=${single.slug}`);
      check(!(await r.page.$('.compare')) && r.errors.length === 0, `${single.slug}: 1 logo, sem comparador e sem erro`);
      await r.page.close();
    }
  }

  // ---------- slug inválido ----------
  {
    const { page, errors } = await openPage(browser, 'team.html?t=%20NAVI%20');
    check((await page.textContent('#team-root h1')).trim() === 'Natus Vincere' && errors.length === 0, 'slug com maiúsculas/espaços funciona');
    await page.close();
  }
  for (const q of ['team.html?t=nao-existe', 'team.html']) {
    const { page, errors } = await openPage(browser, q);
    check((await page.textContent('h1')).includes('Time não encontrado') && errors.length === 0, `${q}: mostra "Time não encontrado"`);
    await page.close();
  }

  // ---------- redirecionamentos antigos ----------
  console.log('redirecionamentos');
  for (const s of ['navi', 'astralis', 'sk', 'fnatic', 'mouz', 'faze', 'nip', 'mibr']) {
    const page = await browser.newPage();
    await page.goto(url(`pages/${s}.html`));
    await page.waitForURL(/team\.html\?t=/);
    check(page.url().endsWith(`team.html?t=${s}`), `pages/${s}.html → team.html?t=${s}`);
    await page.close();
  }

  // ---------- quiz ----------
  console.log('quiz');
  {
    const { page, errors } = await openPage(browser, 'quiz.html');
    for (let r = 0; r < 10; r++) {
      const opts = await page.$$eval('.quiz-option', (b) => b.map((x) => x.dataset.slug));
      check(opts.length === 4 && new Set(opts).size === 4, `rodada ${r + 1}: 4 opções distintas`);
      check((await brokenImages(page)).length === 0, `rodada ${r + 1}: imagem carregou`);
      const inside = await page.evaluate(() => {
        const st = document.querySelector('.quiz-stage').getBoundingClientRect();
        const im = document.querySelector('.quiz-stage img');
        if (!im) return true;
        const r = im.getBoundingClientRect();
        return r.top >= st.top - 1 && r.bottom <= st.bottom + 1 && r.left >= st.left - 1 && r.right <= st.right + 1;
      });
      check(inside, `rodada ${r + 1}: logo cabe no quadro`);
      await page.click('.quiz-option >> nth=0');
      check((await page.$$('.quiz-option.is-correct')).length === 1, `rodada ${r + 1}: exatamente 1 correta marcada`);
      await page.click('.quiz-next');
    }
    check(/\d+\/10/.test(await page.textContent('.quiz-score')), 'placar final X/10');
    check(await page.isVisible('.quiz-restart'), 'botão jogar de novo');
    await page.click('.quiz-restart');
    check((await page.textContent('.quiz-hud strong')).trim() === '1', 'reinicia na rodada 1');
    check(errors.length === 0, 'quiz sem erros ' + errors.join(' | '));
    await page.close();
  }

  // ---------- quiz com imagem quebrada ----------
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.route(/\.webp$/, (route) => route.abort());
    await page.goto(url('quiz.html'));
    await page.click('.quiz-option >> nth=0');
    await page.click('.quiz-next');
    check((await page.$$('.quiz-option')).length === 4 && errors.length === 0, 'quiz segue funcionando sem imagens');
    await page.close();
  }

  // ---------- 404 ----------
  {
    const { page, errors } = await openPage(browser, '404.html');
    check((await page.textContent('h1')).includes('adesivo') && errors.length === 0, '404 renderiza');
    await page.close();
  }

  // ---------- tema claro/escuro ----------
  console.log('tema');
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(url('index.html'));
    check((await page.getAttribute('html', 'data-theme')) === 'dark', 'primeira visita segue o sistema (escuro)');
    await page.click('.bottom-nav [data-theme-toggle]');
    check((await page.getAttribute('html', 'data-theme')) === 'light', 'botão troca para claro');
    await page.goto(url('team.html?t=navi'));
    check((await page.getAttribute('html', 'data-theme')) === 'light', 'escolha é lembrada em outra página');
    await ctx.close();
  }

  // ---------- celular: barra inferior e alvos de toque ----------
  console.log('alvos de toque');
  for (const p of ['index.html', `team.html?t=${TEAMS[0].slug}`, 'quiz.html']) {
    const { page } = await openPage(browser, p, { width: 390, height: 844 });
    check(await page.isVisible('.bottom-nav'), `${p}: barra inferior visível no celular`);
    const small = await page.$$eval('.bottom-nav a, .bottom-nav button, .chip, .quiz-option, .swatch, .btn, .pager-link, .back-link, #team-search',
      (els) => els.filter((e) => e.offsetParent !== null && e.getBoundingClientRect().height < 48).map((e) => e.className || e.id));
    check(small.length === 0, `${p}: alvos de toque com 48px ou mais ` + small.join(','));
    const navH = await page.$eval('.bottom-nav', (n) => n.getBoundingClientRect().height);
    const pad = await page.$eval('body', (b) => parseFloat(getComputedStyle(b).paddingBottom));
    check(pad >= navH - 1, `${p}: conteúdo não fica escondido atrás da barra`);
    await page.close();
  }
  {
    const { page } = await openPage(browser, 'index.html', { width: 1280, height: 900 });
    check(!(await page.isVisible('.bottom-nav')) && (await page.isVisible('.top-nav')), 'desktop: menu no topo, sem barra inferior');
    await page.close();
  }

  // ---------- mobile ----------
  console.log('mobile');
  for (const p of ['index.html', `team.html?t=${TEAMS[0].slug}`, 'quiz.html', '404.html']) {
    const { page } = await openPage(browser, p, { width: 360, height: 780 });
    check(await noHorizontalScroll(page), `${p}: sem scroll horizontal em 360px`);
    await page.close();
  }

  await browser.close();
  console.log(failures ? `\n${failures} falha(s)` : '\ntudo certo');
  process.exit(failures ? 1 : 0);
})();

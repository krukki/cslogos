/* CS LOGOS — página de um time (team.html?t=<slug>). */
(function () {
  'use strict';

  var CS = window.CS;
  var esc = CS.esc;
  var root = document.getElementById('team-root');
  if (!root) return;

  var slug = new URLSearchParams(window.location.search).get('t') || '';
  var team = CS.findTeam(slug);

  function setMeta(title, description) {
    document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }

  if (!team) {
    setMeta('Time não encontrado — CS LOGOS', 'Esse time não está no arquivo do CS LOGOS.');
    root.innerHTML =
      '<section class="not-found">' +
        '<p class="eyebrow">// erro 404 · time desconhecido</p>' +
        '<h1>Time não encontrado</h1>' +
        '<p>' + (slug ? 'Não existe nenhum time com o código “' + esc(slug) + '” no arquivo.' : 'Nenhum time foi informado no endereço.') +
        ' Volte para a lista e escolha um dos times disponíveis.</p>' +
        '<a class="btn btn--primary" href="index.html#teams">Ver todos os times</a>' +
      '</section>';
    return;
  }

  var logos = team.logos;
  var first = logos[0];
  var last = CS.currentLogo(team);

  setMeta(team.name + ' — história das logos · CS LOGOS',
    'A evolução das logos da ' + team.fullName + ' no Counter-Strike: ' + logos.length +
    (logos.length === 1 ? ' versão' : ' versões') + ', cores, história e design.');

  /* ---------- seções ---------- */

  function hero() {
    return '<header class="team-hero">' +
      '<div class="team-hero-logo">' + CS.logoImg(team, last, { eager: true }) + '</div>' +
      '<p class="eyebrow">// ' + esc(team.country) + ' · desde ' + esc(team.founded) + '</p>' +
      '<h1>' + esc(team.fullName) + '</h1>' +
      '<ul class="team-meta">' +
        '<li>Fundação <strong>' + esc(team.founded) + '</strong></li>' +
        '<li>País <strong>' + esc(team.country) + '</strong></li>' +
        '<li>Logos <strong>' + logos.length + '</strong></li>' +
      '</ul>' +
    '</header>';
  }

  function colors() {
    if (!team.colors || !team.colors.length) return '';
    return '<section class="info-block" aria-labelledby="h-cores">' +
      '<h2 id="h-cores">Cores</h2>' +
      '<ul class="swatches">' + team.colors.map(function (c) {
        return '<li><button type="button" class="swatch" data-hex="' + esc(c.hex) + '" style="--swatch:' + esc(c.hex) + '"' +
          ' aria-label="Copiar código da cor ' + esc(c.name) + ', ' + esc(c.hex) + '">' +
          '<span class="swatch-chip" aria-hidden="true"></span>' +
          '<span class="swatch-text"><span class="swatch-name">' + esc(c.name) + '</span>' +
          '<span class="swatch-hex">' + esc(c.hex) + '</span></span>' +
        '</button></li>';
      }).join('') + '</ul>' +
      '<p class="swatch-status" role="status" aria-live="polite"></p>' +
    '</section>';
  }

  function textBlock(id, title, body) {
    return '<section class="info-block" aria-labelledby="' + id + '">' +
      '<h2 id="' + id + '">' + title + '</h2><p>' + esc(body) + '</p></section>';
  }

  function compare() {
    if (logos.length < 2) return '';
    return '<section class="info-block" aria-labelledby="h-compare">' +
      '<h2 id="h-compare">Antes e depois</h2>' +
      '<div class="compare">' +
        '<div class="compare-pane compare-before">' + CS.logoImg(team, first) + '</div>' +
        '<div class="compare-pane compare-after">' + CS.logoImg(team, last) + '</div>' +
        '<div class="compare-handle" aria-hidden="true"></div>' +
        '<input class="compare-range" type="range" min="0" max="100" value="50"' +
          ' aria-label="Arraste para comparar a logo de ' + esc(first.years) + ' com a de ' + esc(last.years) + '">' +
      '</div>' +
      '<div class="compare-labels" aria-hidden="true"><span>← ' + esc(first.years) + '</span><span>' + esc(last.years) + ' →</span></div>' +
    '</section>';
  }

  function timeline() {
    return '<section class="info-block" aria-labelledby="h-timeline">' +
      '<h2 id="h-timeline">Linha do tempo das logos</h2>' +
      '<ol class="logo-timeline">' + logos.map(function (logo) {
        return '<li class="timeline-item">' +
          '<span class="timeline-year">' + esc(logo.years) + '</span>' +
          '<div class="timeline-body"><div class="timeline-panel">' + CS.corners() +
            CS.logoImg(team, logo) +
            '<p>' + esc(logo.caption) + '</p>' +
            (logo.opinion ? '<p class="opinion"><span class="opinion-label">Opinião do autor</span>' + esc(logo.opinion) + '</p>' : '') +
          '</div></div>' +
        '</li>';
      }).join('') + '</ol>' +
    '</section>';
  }

  function pager() {
    var list = CS.teams;
    var i = list.indexOf(team);
    var prev = list[(i - 1 + list.length) % list.length];
    var next = list[(i + 1) % list.length];
    function link(t, dir) {
      var img = CS.logoImg(t, CS.currentLogo(t), { alt: '' });
      var text = '<span class="pager-text"><span class="pager-dir">' + (dir === 'prev' ? '← Anterior' : 'Próximo →') +
        '</span><span class="pager-name">' + esc(t.name) + '</span></span>';
      return '<a class="pager-link pager-link--' + dir + '" href="' + CS.teamUrl(t) + '" rel="' + dir + '">' +
        (dir === 'prev' ? img + text : text + img) + '</a>';
    }
    return '<nav class="team-pager" aria-label="Outros times">' + link(prev, 'prev') + link(next, 'next') + '</nav>';
  }

  root.innerHTML = hero() + colors() +
    textBlock('h-historia', 'Histórico do time', team.history) +
    textBlock('h-design', 'Design da logo', team.logoDesign) +
    compare() + timeline() + pager();

  /* ---------- interações ---------- */

  var status = root.querySelector('.swatch-status');
  var statusTimer;
  Array.prototype.forEach.call(root.querySelectorAll('.swatch'), function (btn) {
    btn.addEventListener('click', function () {
      var hex = btn.getAttribute('data-hex');
      function say(msg) {
        if (!status) return;
        status.textContent = msg;
        clearTimeout(statusTimer);
        statusTimer = setTimeout(function () { status.textContent = ''; }, 2500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).then(
          function () { say('Copiado: ' + hex); },
          function () { say('Código da cor: ' + hex); }
        );
      } else {
        say('Código da cor: ' + hex);
      }
    });
  });

  var box = root.querySelector('.compare');
  if (box) {
    var range = box.querySelector('.compare-range');
    var update = function () { box.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', update);
    update();
  }
})();

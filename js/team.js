/* CS LOGOS — página de um time (team.html?t=<slug>).
   Ordem: adesivo + nome → linha do tempo das logos → antes e depois → títulos → cores → história. */
(function () {
  'use strict';

  var CS = window.CS;
  var esc = CS.esc;
  var root = document.getElementById('team-root');
  if (!root) return;

  var slug = (new URLSearchParams(window.location.search).get('t') || '').trim().toLowerCase();
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
        '<h1>Time não encontrado</h1>' +
        '<p>' + (slug ? 'Nenhum time do arquivo usa o código “' + esc(slug) + '”.' : 'O endereço não diz qual time abrir.') +
        ' Escolha um na lista de times.</p>' +
        '<div class="actions"><a class="btn btn--accent" href="index.html#times">Ver todos os times</a></div>' +
      '</section>';
    return;
  }

  var logos = team.logos;
  var first = logos[0];
  var last = CS.currentLogo(team);
  var majors = CS.majorCount(team);

  setMeta(team.name + ' — história das logos · CS LOGOS',
    'A evolução das logos da ' + team.fullName + ' no Counter-Strike: ' + logos.length +
    (logos.length === 1 ? ' versão' : ' versões') + ', títulos, cores e história.');

  /* ---------- seções ---------- */

  function hero() {
    return '<header class="team-hero">' +
      CS.sticker(team, last, { eager: true, alt: 'Logo atual da ' + team.name }) +
      '<h1>' + esc(team.fullName) + '</h1>' +
      '<ul class="facts">' +
        '<li>' + esc(team.country) + '</li>' +
        '<li>Fundada em <strong>' + esc(team.founded) + '</strong></li>' +
        '<li><strong>' + logos.length + '</strong> ' + (logos.length === 1 ? 'logo' : 'logos') + '</li>' +
        (majors ? '<li class="fact-major"><strong>' + majors + '</strong> ' + (majors === 1 ? 'Major' : 'Majors') + '</li>' : '') +
      '</ul>' +
    '</header>';
  }

  function section(id, title, body) {
    return '<section class="team-section" aria-labelledby="' + id + '"><h2 id="' + id + '">' + title + '</h2>' + body + '</section>';
  }

  function timeline() {
    return section('h-logos', logos.length === 1 ? 'A logo' : 'As logos, em ordem',
      '<ol class="logo-timeline">' + logos.map(function (logo) {
        return '<li><article class="logo-card">' +
          '<span class="tape">' + esc(logo.years) + '</span>' +
          '<div class="logo-frame' + (logo.light ? ' logo-frame--light' : '') + '">' + CS.logoImg(team, logo) + '</div>' +
          '<p>' + esc(logo.caption) + '</p>' +
        '</article></li>';
      }).join('') + '</ol>');
  }

  function compare() {
    if (logos.length < 2) return '';
    return section('h-compare', 'Antes e depois',
      '<div class="compare">' +
        '<div class="compare-pane compare-before' + (first.light ? ' is-light' : '') + '">' + CS.logoImg(team, first) + '</div>' +
        '<div class="compare-pane compare-after' + (last.light ? ' is-light' : '') + '">' + CS.logoImg(team, last) + '</div>' +
        '<div class="compare-handle" aria-hidden="true"></div>' +
        '<input class="compare-range" type="range" min="0" max="100" value="50"' +
          ' aria-label="Arraste para comparar a logo de ' + esc(first.years) + ' com a de ' + esc(last.years) + '">' +
      '</div>' +
      '<div class="compare-labels" aria-hidden="true"><span>' + esc(first.years) + '</span><span>' + esc(last.years) + '</span></div>');
  }

  function titles() {
    var list = team.titles || [];
    if (!list.length) return '';
    return section('h-titulos', 'Títulos e campanhas',
      '<ul class="titles">' + list.map(function (t) {
        return '<li class="title-item">' +
          '<span class="title-year">' + esc(t.year) + '</span>' +
          '<span class="title-name">' + esc(t.name) + '</span>' +
          (t.major ? '<span class="badge-major">Major</span>' : '<span></span>') +
        '</li>';
      }).join('') + '</ul>');
  }

  function colors() {
    if (!team.colors || !team.colors.length) return '';
    return section('h-cores', 'Cores',
      '<ul class="swatches">' + team.colors.map(function (c) {
        return '<li><button type="button" class="swatch" data-hex="' + esc(c.hex) + '" style="--swatch:' + esc(c.hex) + '"' +
          ' aria-label="Copiar código da cor ' + esc(c.name) + ', ' + esc(c.hex) + '">' +
          '<span class="swatch-chip" aria-hidden="true"></span>' +
          '<span class="swatch-text"><span class="swatch-name">' + esc(c.name) + '</span>' +
          '<span class="swatch-hex">' + esc(c.hex) + '</span></span>' +
        '</button></li>';
      }).join('') + '</ul>' +
      '<p class="swatch-status" role="status" aria-live="polite"></p>');
  }

  function story() {
    return section('h-historia', 'História', '<p class="prose">' + esc(team.history) + '</p>') +
      section('h-design', 'Sobre o design', '<p class="prose">' + esc(team.logoDesign) + '</p>');
  }

  function pager() {
    var list = CS.teams;
    var i = list.indexOf(team);
    var prev = list[(i - 1 + list.length) % list.length];
    var next = list[(i + 1) % list.length];
    function link(t, dir) {
      return '<a class="pager-link pager-link--' + dir + '" href="' + CS.teamUrl(t) + '" rel="' + dir + '">' +
        CS.sticker(t, CS.currentLogo(t), { alt: '' }) +
        '<span class="pager-text"><span class="pager-dir">' + (dir === 'prev' ? 'Anterior' : 'Próximo') +
        '</span><span class="pager-name">' + esc(t.name) + '</span></span></a>';
    }
    return '<nav class="team-pager" aria-label="Outros times">' + link(prev, 'prev') + link(next, 'next') + '</nav>';
  }

  root.innerHTML = hero() + timeline() + compare() + titles() + colors() + story() + pager();

  /* ---------- interações ---------- */

  var status = root.querySelector('.swatch-status');
  var statusTimer;
  function say(msg) {
    if (!status) return;
    status.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { status.textContent = ''; }, 2500);
  }
  Array.prototype.forEach.call(root.querySelectorAll('.swatch'), function (btn) {
    btn.addEventListener('click', function () {
      var hex = btn.getAttribute('data-hex');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).then(
          function () { say('Código ' + hex + ' copiado'); },
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
    var update = function () {
      box.style.setProperty('--pos', range.value + '%');
      range.setAttribute('aria-valuetext', range.value + '% mostrando a logo de ' + first.years + ', ' +
        (100 - range.value) + '% mostrando a de ' + last.years);
    };
    range.addEventListener('input', update);
    update();
  }
})();

/* CS LOGOS — home: adesivo sorteado, grade de times, busca e filtro por região. */
(function () {
  'use strict';

  var CS = window.CS;
  var grid = document.getElementById('team-grid');
  var search = document.getElementById('team-search');
  var chips = document.querySelectorAll('[data-region-filter]');
  var count = document.getElementById('result-count');
  var live = document.getElementById('result-live');
  var empty = document.getElementById('empty-state');
  if (!grid) return;

  var activeRegion = 'all';
  var announceTimer;

  /* ---------- adesivo holográfico: uma logo aposentada sorteada a cada visita ---------- */
  function pickFeatured(teams) {
    var retired = [], current = [];
    teams.forEach(function (team) {
      team.logos.forEach(function (logo, i) {
        if (!logo.src) return;
        (i < team.logos.length - 1 ? retired : current).push({ team: team, logo: logo });
      });
    });
    var pool = retired.length ? retired : current;
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  var featured = document.getElementById('featured');
  var pick = pickFeatured(CS.teams);
  if (featured && pick) {
    featured.href = CS.teamUrl(pick.team);
    featured.setAttribute('aria-label', 'Logo sorteada: ' + pick.team.name + ', ' + pick.logo.years + '. Ver a página do time.');
    var face = featured.querySelector('.sticker-face');
    if (pick.logo.light) face.style.background = 'var(--plate-light)';
    face.innerHTML = CS.logoImg(pick.team, pick.logo, { eager: true, alt: '' });
    featured.querySelector('.featured-caption').innerHTML =
      '<strong>' + CS.esc(pick.team.name) + '</strong>logo de ' + CS.esc(pick.logo.years);
  }

  /* ---------- grade ---------- */
  /** Cada campo normalizado separadamente, para a busca não "colar" o fim de um no começo de outro. */
  function haystack(team) {
    return [team.name, team.fullName, team.country].concat(team.aliases || []).map(CS.norm);
  }

  function cardHTML(team) {
    var n = team.logos.length;
    var majors = CS.majorCount(team);
    var meta = n + (n === 1 ? ' logo' : ' logos') + (majors ? ', ' + majors + (majors === 1 ? ' Major' : ' Majors') : '');
    return '<li><a href="' + CS.teamUrl(team) + '" class="team-card" data-slug="' + CS.esc(team.slug) + '">' +
      CS.sticker(team, CS.currentLogo(team), { alt: '' }) +
      '<h3>' + CS.esc(team.name) + '</h3>' +
      '<span class="meta">' + CS.esc(team.country) + '</span>' +
      '<span class="meta">' + meta + '</span>' +
    '</a></li>';
  }

  grid.innerHTML = CS.teams.map(cardHTML).join('');
  var items = Array.prototype.slice.call(grid.children);
  var index = CS.teams.map(function (t) { return { region: t.region, text: haystack(t) }; });

  function apply() {
    var q = CS.norm(search ? search.value : '');
    var shown = 0;
    items.forEach(function (li, i) {
      var t = index[i];
      var ok = (activeRegion === 'all' || t.region === activeRegion) &&
        (!q || t.text.some(function (field) { return field.indexOf(q) !== -1; }));
      li.hidden = !ok;
      if (ok) shown++;
    });
    var label = shown + (shown === 1 ? ' time' : ' times');
    if (count) count.textContent = label;
    // anuncia para leitores de tela só quando a digitação pausa
    clearTimeout(announceTimer);
    announceTimer = setTimeout(function () {
      if (live) live.textContent = label + (shown === 1 ? ' encontrado' : ' encontrados');
    }, 600);
    if (empty) empty.hidden = shown !== 0;
  }

  function setRegion(region) {
    activeRegion = region;
    Array.prototype.forEach.call(chips, function (c) {
      c.setAttribute('aria-pressed', c.getAttribute('data-region-filter') === region ? 'true' : 'false');
    });
    apply();
  }

  if (search) search.addEventListener('input', apply);
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () { setRegion(chip.getAttribute('data-region-filter')); });
  });

  var clear = document.getElementById('clear-filters');
  if (clear) {
    clear.addEventListener('click', function () {
      if (search) search.value = '';
      setRegion('all');
      if (search) search.focus();
    });
  }

  apply();
})();

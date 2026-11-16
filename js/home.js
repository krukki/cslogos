/* CS LOGOS — home: grid de times com busca e filtro por região. */
(function () {
  'use strict';

  var CS = window.CS;
  var grid = document.getElementById('team-grid');
  var search = document.getElementById('team-search');
  var chips = document.querySelectorAll('[data-region-filter]');
  var count = document.getElementById('result-count');
  var empty = document.getElementById('empty-state');
  if (!grid) return;

  var activeRegion = 'all';

  function haystack(team) {
    return CS.norm([team.name, team.fullName, team.country].concat(team.aliases || []).join(' '));
  }

  function cardHTML(team) {
    var logo = CS.currentLogo(team);
    return '<a href="' + CS.teamUrl(team) + '" class="team-card" data-slug="' + CS.esc(team.slug) + '">' +
      CS.corners() +
      '<div class="team-logo-wrap">' + CS.logoImg(team, logo, { cls: 'team-logo', alt: '' }) + '</div>' +
      '<h3>' + CS.esc(team.name) + '</h3>' +
      '<span class="card-underline" aria-hidden="true"></span>' +
      '<span class="team-card-meta">' + CS.esc(team.country) + ' · ' + team.logos.length +
        (team.logos.length === 1 ? ' logo' : ' logos') + '</span>' +
    '</a>';
  }

  grid.innerHTML = CS.teams.map(cardHTML).join('');
  var cards = Array.prototype.slice.call(grid.children);
  var index = CS.teams.map(function (t) { return { region: t.region, text: haystack(t) }; });

  function apply() {
    var q = CS.norm(search ? search.value : '');
    var shown = 0;
    cards.forEach(function (card, i) {
      var t = index[i];
      var ok = (activeRegion === 'all' || t.region === activeRegion) && (!q || t.text.indexOf(q) !== -1);
      card.hidden = !ok;
      card.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    if (count) count.textContent = shown + (shown === 1 ? ' time' : ' times');
    if (empty) empty.hidden = shown !== 0;
  }

  if (search) search.addEventListener('input', apply);

  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      activeRegion = chip.getAttribute('data-region-filter');
      Array.prototype.forEach.call(chips, function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      apply();
    });
  });

  var clear = document.getElementById('clear-filters');
  if (clear) {
    clear.addEventListener('click', function () {
      if (search) search.value = '';
      activeRegion = 'all';
      Array.prototype.forEach.call(chips, function (c) {
        c.setAttribute('aria-pressed', c.getAttribute('data-region-filter') === 'all' ? 'true' : 'false');
      });
      apply();
      if (search) search.focus();
    });
  }

  apply();
})();

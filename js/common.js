/* CS LOGOS — helpers compartilhados entre home, página de time e quiz.
   Depende de js/teams.js (window.TEAMS) carregado antes. */
(function () {
  'use strict';

  var TEAMS = window.TEAMS || [];

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  /** Escapa texto para inserir em HTML. */
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }

  /** Normaliza para busca: minúsculas, sem acentos e sem pontuação ("Virtus.pro" → "virtuspro"). */
  function norm(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  function findTeam(slug) {
    for (var i = 0; i < TEAMS.length; i++) {
      if (TEAMS[i].slug === slug) return TEAMS[i];
    }
    return null;
  }

  function currentLogo(team) {
    return team.logos[team.logos.length - 1];
  }

  function defaultAlt(team, logo) {
    return 'Logo da ' + team.name + ' (' + logo.years + ')';
  }

  /**
   * HTML de uma logo. Sem `src` → bloco "Logo em breve".
   * opts: { cls, eager, alt }
   */
  function logoImg(team, logo, opts) {
    opts = opts || {};
    var alt = opts.alt != null ? opts.alt : (logo.alt || defaultAlt(team, logo));
    if (!logo.src) {
      return '<div class="logo-placeholder" role="img" aria-label="' + esc(alt) + ' — imagem em breve">Logo em breve</div>';
    }
    var cls = [opts.cls || '', logo.invert ? 'logo--invert' : ''].join(' ').trim();
    return '<img src="' + esc(logo.src) + '"' +
      ' alt="' + esc(alt) + '"' +
      (logo.w ? ' width="' + logo.w + '" height="' + logo.h + '"' : '') +
      (opts.eager ? '' : ' loading="lazy"') +
      ' decoding="async"' +
      (cls ? ' class="' + cls + '"' : '') + '>';
  }

  /** Adesivo redondo com a logo. Logos marcadas com `light: true` usam fundo claro. */
  function sticker(team, logo, opts) {
    opts = opts || {};
    return '<span class="sticker' + (logo.light ? ' sticker--light' : '') + (opts.cls ? ' ' + opts.cls : '') + '">' +
      logoImg(team, logo, { alt: opts.alt, eager: opts.eager }) + '</span>';
  }

  /** Quantidade de Majors vencidos (títulos com major: true). */
  function majorCount(team) {
    return (team.titles || []).filter(function (t) { return t.major; }).length;
  }

  function teamUrl(team) {
    return 'team.html?t=' + encodeURIComponent(team.slug);
  }

  /** Embaralha uma cópia do array (Fisher–Yates). */
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /** localStorage sem quebrar em modo privado / bloqueado. */
  var store = {
    get: function (key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* ignorado */ }
    }
  };

  window.CS = {
    teams: TEAMS,
    esc: esc,
    norm: norm,
    findTeam: findTeam,
    currentLogo: currentLogo,
    logoImg: logoImg,
    sticker: sticker,
    majorCount: majorCount,
    teamUrl: teamUrl,
    shuffle: shuffle,
    store: store
  };
})();

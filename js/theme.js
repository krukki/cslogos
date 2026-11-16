/* CS LOGOS — tema claro/escuro.
   Carregado de forma síncrona no <head> para aplicar o tema antes da primeira pintura.
   Primeira visita: segue o sistema. Depois do clique no botão, a escolha fica salva. */
(function () {
  'use strict';

  var KEY = 'cslogos.theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try {
      var v = window.localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) { return null; }
  }

  function system() {
    return media && media.matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#17161A' : '#F1ECDF');
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      b.setAttribute('aria-label', theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
      var label = b.querySelector('.theme-label');
      if (label) label.textContent = theme === 'dark' ? 'Claro' : 'Escuro';
    }
  }

  function get() { return root.getAttribute('data-theme') || stored() || system(); }

  function set(theme) {
    try { window.localStorage.setItem(KEY, theme); } catch (e) { /* modo privado */ }
    apply(theme);
  }

  apply(stored() || system());

  // Se a pessoa nunca escolheu, acompanha mudanças do sistema.
  if (media && media.addEventListener) {
    media.addEventListener('change', function () { if (!stored()) apply(system()); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(get());
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest && ev.target.closest('[data-theme-toggle]');
      if (btn) set(get() === 'dark' ? 'light' : 'dark');
    });
  });

  window.CSTheme = { get: get, set: set };
})();

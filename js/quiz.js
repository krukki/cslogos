/* CS LOGOS — quiz "adivinhe a logo". */
(function () {
  'use strict';

  var CS = window.CS;
  var esc = CS.esc;
  var root = document.getElementById('quiz-root');
  if (!root) return;

  var ROUNDS = 10;
  var OPTIONS = 4;
  var BEST_KEY = 'cslogos.quiz.best';

  /** Todas as logos com imagem; as antigas vêm primeiro (são mais difíceis e mais interessantes). */
  function buildQuestions() {
    var old = [], current = [];
    CS.teams.forEach(function (team) {
      team.logos.forEach(function (logo, i) {
        if (!logo.src) return;
        (i < team.logos.length - 1 ? old : current).push({ team: team, logo: logo });
      });
    });
    var pool = CS.shuffle(old).concat(CS.shuffle(current));
    var picked = pool.slice(0, ROUNDS);
    return CS.shuffle(picked).map(function (q) {
      var others = CS.shuffle(CS.teams.filter(function (t) { return t !== q.team; })).slice(0, OPTIONS - 1);
      q.options = CS.shuffle(others.concat([q.team]));
      return q;
    });
  }

  var questions, round, score;

  function best() {
    var v = parseInt(CS.store.get(BEST_KEY), 10);
    return isNaN(v) ? 0 : v;
  }

  function start() {
    questions = buildQuestions();
    round = 0;
    score = 0;
    renderRound();
  }

  function renderRound() {
    var q = questions[round];
    var total = questions.length;
    root.innerHTML =
      '<div class="quiz-hud"><span>Rodada <strong>' + (round + 1) + '</strong> / ' + total + '</span>' +
        '<span>Acertos <strong class="quiz-points">' + score + '</strong></span></div>' +
      '<div class="quiz-progress" aria-hidden="true"><span style="width:' + (round / total * 100) + '%"></span></div>' +
      '<div class="quiz-stage">' + CS.logoImg(q.team, q.logo, { eager: true, alt: 'Logo misteriosa da rodada ' + (round + 1) }) + '</div>' +
      '<ul class="quiz-options">' + q.options.map(function (t) {
        return '<li><button type="button" class="quiz-option" data-slug="' + esc(t.slug) + '">' + esc(t.name) + '</button></li>';
      }).join('') + '</ul>' +
      '<div class="quiz-feedback" role="status" aria-live="polite"></div>';

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-option'), function (btn) {
      btn.addEventListener('click', function () { answer(btn); });
    });
    var firstBtn = root.querySelector('.quiz-option');
    if (round > 0 && firstBtn) firstBtn.focus();
  }

  function answer(btn) {
    var q = questions[round];
    var right = btn.getAttribute('data-slug') === q.team.slug;
    if (right) score++;

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-option'), function (b) {
      b.disabled = true;
      if (b.getAttribute('data-slug') === q.team.slug) b.classList.add('is-correct');
      else if (b === btn) b.classList.add('is-wrong');
    });
    root.querySelector('.quiz-points').textContent = score;

    var last = round === questions.length - 1;
    var fb = root.querySelector('.quiz-feedback');
    fb.innerHTML =
      '<p class="' + (right ? 'ok' : 'bad') + '">' + (right ? 'Certo! ' : 'Errou! ') +
        'Essa é a logo da <strong>' + esc(q.team.name) + '</strong> (' + esc(q.logo.years) + ').</p>' +
      '<button type="button" class="btn btn--primary quiz-next">' + (last ? 'Ver resultado' : 'Próxima →') + '</button>';
    var next = fb.querySelector('.quiz-next');
    next.addEventListener('click', function () {
      round++;
      if (round < questions.length) renderRound(); else renderResult();
    });
    next.focus();
  }

  function renderResult() {
    var total = questions.length;
    var record = best();
    var isRecord = score > record;
    if (isRecord) CS.store.set(BEST_KEY, String(score));
    var msg = score === total ? 'Perfeito. Você conhece cada sticker do jogo.'
      : score >= total * 0.7 ? 'Mandou bem! Olho de quem abre muita cápsula.'
      : score >= total * 0.4 ? 'Nada mal. Vale dar uma volta pelas linhas do tempo.'
      : 'Hora de estudar o arquivo de logos!';
    root.innerHTML =
      '<section class="quiz-result">' +
        '<p class="eyebrow">// fim de jogo</p>' +
        '<p class="quiz-score">' + score + '/' + total + '</p>' +
        '<p>' + msg + '</p>' +
        '<p>' + (isRecord ? 'Novo recorde!' : 'Seu recorde: ' + Math.max(record, score) + '/' + total) + '</p>' +
        '<div class="hero-actions">' +
          '<button type="button" class="btn btn--primary quiz-restart">Jogar de novo</button>' +
          '<a class="btn" href="index.html#teams">Ver os times</a>' +
        '</div>' +
      '</section>';
    var restart = root.querySelector('.quiz-restart');
    restart.addEventListener('click', start);
    restart.focus();
  }

  start();
})();

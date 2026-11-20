(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;
  let audioUnlocked = false;
  let isPlaying = false;

  const audioEl = document.getElementById('audio');
  const btnPlay = document.getElementById('btn-play');
  const progressBar = document.getElementById('progress-bar');
  const playerTitle = document.getElementById('player-title');
  const counter = document.getElementById('nav-counter');
  const dotsContainer = document.getElementById('nav-dots');
  const unlockBanner = document.getElementById('audio-unlock');
  const btnUnlock = document.getElementById('btn-unlock');

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });
  const dots = Array.from(dotsContainer.children);

  function updateUI() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    counter.textContent = `${current + 1} / ${total}`;
    playerTitle.textContent = `Narration — Slide ${current + 1}`;
  }

  function loadAudio(index) {
    const src = slides[index].dataset.audio;
    if (!src) return;
    audioEl.src = src;
    audioEl.load();
    progressBar.style.width = '0%';
  }

  function playCurrent() {
    if (!audioUnlocked) return;
    audioEl.play().then(() => {
      isPlaying = true;
      btnPlay.textContent = '❚❚';
    }).catch(() => {
      isPlaying = false;
      btnPlay.textContent = '▶';
    });
  }

  function pauseCurrent() {
    audioEl.pause();
    isPlaying = false;
    btnPlay.textContent = '▶';
  }

  function goTo(index) {
    if (index < 0 || index >= total) return;
    pauseCurrent();
    current = index;
    updateUI();
    loadAudio(current);
    if (audioUnlocked) {
      setTimeout(playCurrent, 180);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.getElementById('btn-prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('btn-next').addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (e.key === ' ') {
        if (isPlaying) pauseCurrent(); else playCurrent();
      } else {
        goTo(current + 1);
      }
    }
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  btnPlay.addEventListener('click', () => {
    if (!audioUnlocked) {
      unlockAudio();
      return;
    }
    if (isPlaying) pauseCurrent(); else playCurrent();
  });

  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      progressBar.style.width = (audioEl.currentTime / audioEl.duration * 100) + '%';
    }
  });
  audioEl.addEventListener('ended', () => {
    isPlaying = false;
    btnPlay.textContent = '▶';
    progressBar.style.width = '0%';
  });

  function unlockAudio() {
    audioUnlocked = true;
    unlockBanner.classList.add('hidden');
    loadAudio(current);
    playCurrent();
  }
  btnUnlock.addEventListener('click', unlockAudio);

  loadAudio(0);
  updateUI();

  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }, { passive: true });
})();

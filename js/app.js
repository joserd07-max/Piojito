(() => {
  const cfg = window.PIOJITO || {};
  const name = cfg.name || "Piojito";
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = name);
  const makeFlowers = (selector, amount) => {
    const bed = document.querySelector(selector);
    if (!bed) return;
    for (let i = 0; i < amount; i++) {
      const f = document.createElement("i");
      f.className = "flower";
      f.setAttribute("aria-hidden", "true");
      const bloom = document.createElement("img");
      bloom.src = "assets/flowers/purple-tulip.svg";
      bloom.alt = "";
      bloom.draggable = false;
      f.appendChild(bloom);
      bed.appendChild(f);
    }
  };
  makeFlowers(".hero-flowers", 5);
  makeFlowers(".final-flowers", 5);
  makeFlowers(".ending-flowers", 5);

  const letter = document.getElementById("letter-content");
  const paragraphs = Array.isArray(cfg.letter) ? cfg.letter : [];
  if (paragraphs.length) {
    paragraphs.forEach(line => { const p = document.createElement("p"); p.textContent = line; letter.append(p); });
  } else {
    const p = document.createElement("p");
    p.textContent = "Agrega aquí el mensaje completo en js/config.js para que esta carta sea solo tuya.";
    letter.append(p);
  }

  const slot = document.getElementById("youtube-slot");
  const youtubeUrl = (cfg.youtubeUrl || "").trim();
  const videoMatch = youtubeUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|watch\?v=))([A-Za-z0-9_-]{11})/i);
  if (slot && videoMatch) {
    const videoId = videoMatch[1];
    const playerMount = document.createElement("div");
    playerMount.id = "youtube-player";
    slot.replaceChildren(playerMount);
    const soundButton = document.createElement("button");
    soundButton.type = "button";
    soundButton.className = "youtube-sound";
    soundButton.textContent = "Activar sonido ♫";
    soundButton.setAttribute("aria-pressed", "false");
    const playerNote = document.createElement("p");
    playerNote.className = "youtube-note";
    playerNote.textContent = "Al entrar en esta sección se activa el sonido. Si el navegador lo bloquea, toca el botón.";
    slot.append(soundButton, playerNote);

    let player = null;
    let soundOn = false;
    let soundRequested = false;
    const setSound = (enabled) => {
      soundOn = enabled;
      soundButton.textContent = enabled ? "Silenciar ♫" : "Activar sonido ♫";
      soundButton.setAttribute("aria-pressed", String(enabled));
      if (!player) { soundRequested = enabled; return; }
      if (enabled) { player.unMute(); player.setVolume(100); player.playVideo(); }
      else { player.mute(); }
    };
    soundButton.addEventListener("click", () => setSound(!soundOn));
    const musicSection = document.getElementById("cancion");
    if (musicSection && "IntersectionObserver" in window) {
      let sectionVisible = false;
      const musicObserver = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.target === musicSection && entry.isIntersecting);
        if (visible && !sectionVisible) setSound(true);
        sectionVisible = visible;
      }, { threshold: 0.55 });
      musicObserver.observe(musicSection);
    }

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player || player) return;
      const playerVars = { autoplay: 0, controls: 1, playsinline: 1, rel: 0 };
      if (location.protocol === "http:" || location.protocol === "https:") playerVars.origin = location.origin;
      player = new YT.Player("youtube-player", {
        width: "100%", height: "200", videoId,
        playerVars,
        events: {
          onReady: event => {
            event.target.mute();
            if (soundRequested) { event.target.unMute(); event.target.setVolume(100); }
            event.target.playVideo();
          },
          onAutoplayBlocked: () => { player.mute(); soundOn = false; soundButton.textContent = "Activar sonido ♫"; soundButton.setAttribute("aria-pressed", "false"); playerNote.textContent = "El navegador bloqueó el inicio automático. Toca reproducir en el video."; }
        }
      });
    };
    window.onYouTubeIframeAPIReady = createPlayer;
    const api = document.createElement("script");
    api.src = "https://www.youtube.com/iframe_api";
    api.async = true;
    document.head.appendChild(api);
  } else if (slot) {
    slot.innerHTML = '<p class="muted">Enlace de YouTube no reconocido.<br>Revisa js/config.js ♡</p>';
  }
  const canvas = document.querySelector(".sky");
  const ctx = canvas.getContext("2d");
  let w, h, points = [];
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    points = Array.from({length: Math.min(75, Math.floor(w * h / 9000))}, () => ({x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.35+.35, a: Math.random(), speed: Math.random()*.007+.002}));
  };
  let frameId;
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    for (const p of points) {
      p.a += p.speed; const alpha = .18 + (Math.sin(p.a)+1)*.25;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = `rgba(240,208,255,${alpha})`; ctx.fill();
    }
    frameId = requestAnimationFrame(draw);
  };
  resize();
  if (cfg.motion !== false && !matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
  addEventListener("resize", () => { cancelAnimationFrame(frameId); resize(); if(cfg.motion !== false && !matchMedia("(prefers-reduced-motion: reduce)").matches) draw(); }, {passive:true});
})();

















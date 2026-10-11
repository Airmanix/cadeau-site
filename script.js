(function () {
  "use strict";

  var C = window.CONFIG || {};
  var M = window.MEDIA || { photos: [], videos: [] };
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.textContent = html;
    return e;
  }
  function text(id, value) { var n = $(id); if (n) n.textContent = value || ""; }

  /* ---------- Textes ---------- */
  document.title = (C.name ? C.name + " — " : "") + "Un cadeau pour toi";
  text("eyebrow", C.eyebrow);
  text("name", C.name);
  text("subtitle", C.subtitle);

  var cd = C.candles || {};
  text("gateTitle", cd.title);
  text("gateHint", cd.hint);

  var L = C.letter || {};
  text("envHint", L.hint);
  text("letterGreeting", L.greeting);
  text("letterSign", L.signature);
  var body = $("letterBody");
  (L.paragraphs || []).forEach(function (p) { body.appendChild(el("p", "", p)); });

  var G = C.gallery || {}, V = C.videos || {}, MS = C.messages || {}, W = C.wishes || {};
  text("galEyebrow", G.eyebrow); text("galTitle", G.title); text("galIntro", G.intro);
  text("vidEyebrow", V.eyebrow); text("vidTitle", V.title); text("vidIntro", V.intro);
  text("msgEyebrow", MS.eyebrow); text("msgTitle", MS.title);
  text("wishTitle", W.title);
  text("finale", C.finale);
  text("footer", C.footer);

  /* ---------- Pétales ---------- */
  if (!reduce) {
    var pet = $("petals");
    for (var i = 0; i < 16; i++) {
      var p = el("span", "petal");
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 12 + Math.random() * 14 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      p.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
      p.style.transform = "scale(" + (0.6 + Math.random() * 0.9) + ")";
      pet.appendChild(p);
    }
  }

  /* ---------- Étoiles (section bougies) ---------- */
  var stars = document.querySelector(".stars");
  for (var s = 0; s < 40; s++) {
    var st = el("i", "star");
    st.style.left = Math.random() * 100 + "%";
    st.style.top = Math.random() * 100 + "%";
    st.style.animationDelay = -Math.random() * 3 + "s";
    stars.appendChild(st);
  }

  /* ---------- Confettis ---------- */
  var canvas = $("confetti"), ctx = canvas.getContext("2d"), bits = [], running = false;
  function sizeCanvas() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; }
  sizeCanvas(); addEventListener("resize", sizeCanvas);
  var colors = ["#c2185b", "#e8478b", "#f8dbe6", "#6f8fd0", "#dfe8f7", "#b8924a", "#3f6b4f", "#ffffff"];

  function burst(x, y, n) {
    if (reduce) return;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      bits.push({
        x: x * devicePixelRatio, y: y * devicePixelRatio,
        vx: Math.cos(a) * v * devicePixelRatio, vy: (Math.sin(a) * v - 5) * devicePixelRatio,
        w: (6 + Math.random() * 6) * devicePixelRatio, h: (3 + Math.random() * 5) * devicePixelRatio,
        r: Math.random() * 6, vr: (Math.random() - .5) * .4,
        c: colors[(Math.random() * colors.length) | 0], life: 140 + Math.random() * 60
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits = bits.filter(function (b) { return b.life > 0 && b.y < canvas.height + 40; });
    bits.forEach(function (b) {
      b.vy += .28 * devicePixelRatio; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr; b.life--;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
      ctx.globalAlpha = Math.min(1, b.life / 40); ctx.fillStyle = b.c;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
    });
    if (bits.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }

  /* ---------- Musique ---------- */
  var audio = null, musicBtn = $("musicBtn");
  if (C.music) {
    audio = new Audio(C.music); audio.loop = true; audio.volume = .55;
    musicBtn.hidden = false;
    musicBtn.addEventListener("click", function () {
      if (audio.paused) { audio.play().catch(function () {}); musicBtn.classList.add("on"); }
      else { audio.pause(); musicBtn.classList.remove("on"); }
    });
  }
  function startMusic() {
    if (audio && audio.paused) { audio.play().then(function () { musicBtn.classList.add("on"); }).catch(function () {}); }
  }

  /* ---------- Bougies ---------- */
  var content = $("content"), gate = $("gate");
  var unlocked = false;

  function unlock() {
    if (unlocked) return; unlocked = true;
    content.hidden = false;
    setupReveal();
    var r = gate.getBoundingClientRect();
    burst(innerWidth / 2, r.top + r.height / 2, 140);
    setTimeout(function () { burst(innerWidth * .25, innerHeight * .5, 80); burst(innerWidth * .75, innerHeight * .5, 80); }, 350);
    setTimeout(function () {
      $("letterSection").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 1300);
  }

  if (cd.enabled === false) {
    gate.hidden = true;
    unlock();
    $("hero").querySelector(".scroll-hint").setAttribute("href", "#letterSection");
  } else {
    var box = $("candles"), left = cd.count || 3;
    for (var k = 0; k < left; k++) {
      var c = el("div", "candle");
      c.setAttribute("role", "button"); c.setAttribute("tabindex", "0"); c.setAttribute("aria-label", "Souffler la bougie");
      c.appendChild(el("div", "flame")); c.appendChild(el("div", "smoke"));
      c.appendChild(el("div", "wick")); c.appendChild(el("div", "wax"));
      var blow = (function (node) {
        return function () {
          if (node.classList.contains("out")) return;
          node.classList.add("out"); left--; startMusic();
          if (navigator.vibrate) navigator.vibrate(20);
          if (left === 0) { $("gateHint").textContent = "Joyeux moment ✨"; setTimeout(unlock, 700); }
        };
      })(c);
      c.addEventListener("click", blow);
      c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); } });
      box.appendChild(c);
    }
  }

  /* ---------- Enveloppe ---------- */
  var env = $("envelope"), letter = $("letter");
  env.addEventListener("click", function () {
    env.classList.add("open"); $("envHint").style.visibility = "hidden";
    burst(innerWidth / 2, innerHeight * .4, 60);
    setTimeout(function () {
      letter.hidden = false;
      letter.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }, 1100);
  });

  /* ---------- Galerie ---------- */
  var photos = (M.photos || []).slice();
  var gal = $("gallery");

  if (photos.length) {
    photos.forEach(function (ph, idx) {
      var fig = el("figure", "photo reveal");
      fig.tabIndex = 0;
      var img = new Image();
      img.loading = "lazy"; img.decoding = "async"; img.alt = ph.caption || "Photo souvenir"; img.src = ph.src;
      img.addEventListener("error", function () { fig.remove(); });
      fig.appendChild(img);
      if (ph.caption) fig.appendChild(el("figcaption", "", ph.caption));
      fig.addEventListener("click", function () { openLb(idx); });
      fig.addEventListener("keydown", function (e) { if (e.key === "Enter") openLb(idx); });
      gal.appendChild(fig);
    });
  } else {
    ["t1", "t2", "t3", "t4", "t2", "t1", "t4", "t3"].forEach(function (t) {
      var f = el("figure", "photo ph " + t + " reveal");
      var d = el("div", "", "Ta photo ici"); d.appendChild(el("small", "", "dossier photos/"));
      f.appendChild(d); gal.appendChild(f);
    });
  }

  /* ---------- Vidéos ---------- */
  var vids = M.videos || [], vbox = $("videos");
  if (vids.length) {
    vids.forEach(function (v) {
      var card = el("div", "video-card reveal");
      var vid = document.createElement("video");
      vid.controls = true; vid.playsInline = true; vid.preload = "metadata";
      vid.setAttribute("playsinline", "");
      if (v.poster) vid.poster = v.poster;
      vid.src = v.src + (v.poster ? "" : "#t=0.3");
      vid.addEventListener("play", function () {
        document.querySelectorAll(".video-card video").forEach(function (o) { if (o !== vid) o.pause(); });
        if (audio && !audio.paused) { audio.pause(); musicBtn.classList.remove("on"); }
      });
      card.appendChild(vid);
      if (v.title) card.appendChild(el("p", "", v.title));
      vbox.appendChild(card);
    });
  } else {
    for (var q = 0; q < 2; q++) {
      var cardP = el("div", "video-card reveal");
      var ph = el("div", "vph");
      var inner = el("div");
      inner.appendChild(el("b", "", "▶"));
      inner.appendChild(el("span", "", "Ta vidéo ici (dossier videos/)"));
      ph.appendChild(inner); cardP.appendChild(ph); vbox.appendChild(cardP);
    }
  }

  /* ---------- Messages & vœux ---------- */
  var mbox = $("messages");
  (MS.items || []).forEach(function (m) {
    var d = el("blockquote", "msg reveal");
    d.appendChild(el("p", "", m.text));
    d.appendChild(el("span", "from", m.from));
    mbox.appendChild(d);
  });
  var wbox = $("wishes");
  (W.items || []).forEach(function (w) {
    var d = el("div", "wish reveal");
    d.appendChild(el("div", "ico", w.icon)); d.appendChild(el("p", "", w.text));
    wbox.appendChild(d);
  });

  /* ---------- Apparition au scroll ---------- */
  function setupReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { targets.forEach(function (t) { t.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var sibs = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
          e.target.style.transitionDelay = Math.min(sibs % 4, 3) * 90 + "ms";
          e.target.classList.add("in"); io.unobserve(e.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Lightbox ---------- */
  var lb = $("lightbox"), lbImg = $("lbImg"), cur = 0;
  function show() {
    var ph = photos[cur];
    lbImg.src = ph.src; lbImg.alt = ph.caption || "";
    text("lbCap", ph.caption || "");
    text("lbCount", (cur + 1) + " / " + photos.length);
  }
  function openLb(i) { cur = i; show(); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  function step(d) { cur = (cur + d + photos.length) % photos.length; show(); }
  $("lbClose").addEventListener("click", closeLb);
  $("lbPrev").addEventListener("click", function () { step(-1); });
  $("lbNext").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  var tx = 0;
  lb.addEventListener("touchstart", function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- Rejouer ---------- */
  $("replay").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();

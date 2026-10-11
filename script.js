(function () {
  "use strict";

  var C = window.CONFIG || {};
  var M = window.MEDIA || { photos: [], videos: [] };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function setText(id, v) { var n = $(id); if (n) n.textContent = v || ""; }
  function pick(pool, i) { return pool && pool.length ? pool[i % pool.length] : ""; }

  /* ---------- Icônes (SVG, pas d'emoji) ---------- */
  var SVG = {
    play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="16" r="2.5"/>'
  };
  function icon(name) {
    var s = el("span", "ico");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + SVG[name] + "</svg>";
    return s;
  }
  function putIcon(id, name) { var b = $(id); if (b) b.appendChild(icon(name)); }
  ["ringPrev:left", "ringNext:right", "photoPrev:left", "photoNext:right", "videoPrev:left", "videoNext:right",
   "lbPrev:left", "lbNext:right", "lbClose:close", "vdClose:close", "letterClose:close", "musicBtn:music"
  ].forEach(function (s) { var p = s.split(":"); putIcon(p[0], p[1]); });

  /* ---------- Textes ---------- */
  var name = C.name || "";
  document.title = name ? "Pour " + name + " — un hommage de tes amis" : document.title;
  var sp = C.splash || {}, H = C.hero || {}, N = C.nav || {};
  setText("splashName", name); setText("splashLine", sp.line); setText("enter", sp.button || "Entrer");
  setText("brand", C.brand); setText("heroName", name);
  setText("heroTag", H.tagline); setText("heroText", H.text);
  setText("ctaMem", H.primary); setText("ctaLetter", H.secondary);
  setText("navMem", N.memories); setText("navVid", N.videos); setText("navMsg", N.messages); setText("navLetter", N.letter);
  setText("photosTitle", (C.photos || {}).title); setText("photosIntro", (C.photos || {}).intro);
  setText("videosTitle", (C.videos || {}).title); setText("videosIntro", (C.videos || {}).intro);
  setText("msgTitle", (C.messages || {}).title);
  var F = C.finale || {};
  setText("finaleTitle", F.title); setText("finaleText", F.text); setText("credit", F.footer); setText("replay", F.replay);

  var Lt = C.letter || {};
  setText("letterGreeting", Lt.greeting); setText("letterSign", Lt.signature);
  (Lt.paragraphs || []).forEach(function (t) { $("letterBody").appendChild(el("p", "", t)); });

  /* ---------- Données médias + titres accrocheurs ---------- */
  var PT = (C.titles || {}).photos || [], VT = (C.titles || {}).videos || [];
  var HUES = [335, 225, 305, 205, 345, 262, 322, 215];

  var photos = (M.photos || []).map(function (p, i) {
    return { src: p.src, title: p.title || p.caption || pick(PT, i) };
  });
  var realPhotos = photos.length > 0;
  if (!realPhotos) {
    for (var i = 0; i < 8; i++) photos.push({ src: "", title: pick(PT, i), hue: HUES[i % HUES.length] });
  }
  var viewable = [];
  photos.forEach(function (p) { if (p.src) { p.vi = viewable.length; viewable.push(p); } });

  var videos = (M.videos || []).map(function (v, i) {
    return { src: v.src, title: v.title || pick(VT, i), poster: v.poster };
  });
  if (!videos.length) {
    for (var j = 0; j < 3; j++) videos.push({ src: "", title: pick(VT, j), hue: HUES[(j * 3) % HUES.length] });
  }

  function placeholder(p, label) {
    var d = el("div", "ph");
    d.style.setProperty("--h", p.hue || 335);
    d.appendChild(el("span", "", label));
    return d;
  }

  /* ---------- Écran d'entrée ---------- */
  var splash = $("splash"), enter = $("enter"), entered = false;
  function enterSite() {
    if (entered) return; entered = true;
    splash.classList.add("leave");
    document.body.classList.remove("splashing");
    startMusic();
    if (!reduce) vel = -9; // l'anneau s'élance puis ralentit
    setTimeout(function () { splash.hidden = true; }, 950);
    window.scrollTo(0, 0);
  }
  enter.addEventListener("click", enterSite);
  try { enter.focus({ preventScroll: true }); } catch (e) {}

  /* ---------- Navigation ---------- */
  var nav = $("nav");
  function onScroll() { nav.classList.toggle("solid", window.scrollY > 40); }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

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
    if (audio && audio.paused) audio.play().then(function () { musicBtn.classList.add("on"); }).catch(function () {});
  }
  function pauseMusic() { if (audio && !audio.paused) { audio.pause(); musicBtn.classList.remove("on"); } }

  /* ---------- Fond de l'accueil ---------- */
  if (viewable.length) {
    $("heroPhoto").style.backgroundImage = 'url("' + encodeURI(viewable[0].src) + '")';
  }

  /* ---------- Anneau 3D ---------- */
  var ringEl = $("ring"), stage = $("stage");
  var panels = [], N3 = 0, STEP = 0, R = 0;
  var angle = 0, vel = 0, goal = null, dragging = false, onScreen = true, moved = 0;
  var AUTO = reduce ? 0 : -0.1;

  function buildRing() {
    var list = [], n = photos.length;
    if (n > 10) { for (var k = 0; k < 10; k++) list.push(photos[Math.floor(k * n / 10)]); }
    else list = photos.slice();
    while (list.length < 6) list = list.concat(photos.slice(0, 6 - list.length));
    N3 = list.length; STEP = 360 / N3;
    list.forEach(function (p) {
      var d = el("div", "panel");
      d.tabIndex = 0; d.setAttribute("role", "button");
      d.setAttribute("aria-label", p.src ? "Agrandir : " + p.title : p.title);
      if (p.src) {
        var im = new Image(); im.alt = ""; im.decoding = "async"; im.draggable = false; im.src = p.src;
        im.addEventListener("error", function () { im.replaceWith(placeholder(p, "Photo")); });
        d.appendChild(im);
      } else d.appendChild(placeholder(p, "Ta photo ici"));
      d.appendChild(el("span", "panel-title", p.title));
      d.addEventListener("click", function () { if (moved > 6) return; if (p.src) openLb(p.vi); });
      d.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); d.click(); } });
      ringEl.appendChild(d); panels.push(d);
    });
    layout();
  }
  function layout() {
    var w = panels[0].offsetWidth || 180;
    R = Math.round((w / 2) / Math.tan(Math.PI / N3) + 18);
    panels.forEach(function (d, i) { d.style.transform = "rotateY(" + (i * STEP) + "deg) translateZ(" + R + "px)"; });
    render();
  }
  function render() {
    ringEl.style.transform = "translateZ(" + (-R) + "px) rotateY(" + angle + "deg)";
    for (var i = 0; i < panels.length; i++) {
      var a = (i * STEP + angle) * Math.PI / 180;
      panels[i].style.setProperty("--f", ((Math.cos(a) + 1) / 2).toFixed(3));
    }
  }
  var lastT = 0;
  function frame(t) {
    var dt = Math.min(40, (t - lastT) || 16); lastT = t; var k = dt / 16.67;
    if (onScreen && !dragging && N3) {
      if (goal !== null) {
        angle += (goal - angle) * Math.min(1, .12 * k);
        if (Math.abs(goal - angle) < .05) { angle = goal; goal = null; }
      } else {
        angle += vel * k;
        vel += (AUTO - vel) * Math.min(1, .02 * k);
      }
      render();
    }
    requestAnimationFrame(frame);
  }
  function snap(dir) { goal = Math.round(angle / STEP) * STEP + dir * STEP; vel = 0; }
  $("ringPrev").addEventListener("click", function () { snap(1); });
  $("ringNext").addEventListener("click", function () { snap(-1); });

  var sx = 0, sa = 0, lx = 0, lt = 0;
  stage.addEventListener("pointerdown", function (e) {
    if (e.button > 0) return;
    dragging = true; moved = 0; sx = lx = e.clientX; sa = angle; lt = performance.now(); vel = 0; goal = null;
  });
  addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
    angle = sa + dx * .3;
    var now = performance.now(), dtm = Math.max(1, now - lt);
    var v = ((e.clientX - lx) * .3) / (dtm / 16.67);
    vel = Math.max(-25, Math.min(25, vel * .6 + v * .4));
    lx = e.clientX; lt = now; render();
  });
  function endDrag() { dragging = false; }
  addEventListener("pointerup", endDrag);
  addEventListener("pointercancel", endDrag);
  stage.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { snap(1); e.preventDefault(); }
    if (e.key === "ArrowRight") { snap(-1); e.preventDefault(); }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; }).observe(stage);
  }
  addEventListener("resize", function () { if (N3) layout(); });
  buildRing();
  requestAnimationFrame(frame);

  /* ---------- Rangées horizontales ---------- */
  function wireTrack(trackId, prevId, nextId) {
    var tr = $(trackId), pv = $(prevId), nx = $(nextId);
    function upd() {
      pv.disabled = tr.scrollLeft < 4;
      nx.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
    }
    function go(d) { tr.scrollBy({ left: d * tr.clientWidth * .8, behavior: reduce ? "auto" : "smooth" }); }
    pv.addEventListener("click", function () { go(-1); });
    nx.addEventListener("click", function () { go(1); });
    tr.addEventListener("scroll", function () { requestAnimationFrame(upd); }, { passive: true });
    addEventListener("resize", upd); upd();
  }

  // Photos
  var pt = $("photoTrack");
  photos.forEach(function (p) {
    var b = el("button", "card photo-card"); b.type = "button";
    b.setAttribute("aria-label", p.src ? "Agrandir la photo : " + p.title : p.title);
    if (p.src) {
      var im = new Image(); im.loading = "lazy"; im.decoding = "async"; im.alt = ""; im.src = p.src;
      im.addEventListener("error", function () { im.replaceWith(placeholder(p, "Photo")); });
      b.appendChild(im);
      b.addEventListener("click", function () { openLb(p.vi); });
    } else { b.appendChild(placeholder(p, "Ta photo ici")); b.disabled = true; }
    b.appendChild(el("span", "card-title", p.title));
    pt.appendChild(b);
  });
  wireTrack("photoTrack", "photoPrev", "photoNext");

  // Vidéos
  var vt = $("videoTrack");
  videos.forEach(function (v) {
    var b = el("button", "card video-card"); b.type = "button";
    b.setAttribute("aria-label", "Regarder la vidéo : " + v.title);
    if (v.src) {
      var vid = document.createElement("video");
      vid.muted = true; vid.playsInline = true; vid.preload = "metadata"; vid.setAttribute("playsinline", "");
      vid.setAttribute("tabindex", "-1"); vid.setAttribute("aria-hidden", "true");
      if (v.poster) vid.poster = v.poster;
      vid.src = v.src + (v.poster ? "" : "#t=0.5");
      b.appendChild(vid);
      b.addEventListener("click", function () { openVideo(v); });
    } else { b.appendChild(placeholder(v, "Ta vidéo ici")); b.disabled = true; }
    var pl = el("span", "play"); pl.appendChild(icon("play")); b.appendChild(pl);
    b.appendChild(el("span", "card-title", v.title));
    vt.appendChild(b);
  });
  wireTrack("videoTrack", "videoPrev", "videoNext");

  /* ---------- Fenêtres ---------- */
  function wireDialog(d) {
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  }
  var lb = $("lb"), vd = $("vd"), ld = $("letterDlg");
  [lb, vd, ld].forEach(wireDialog);
  $("lbClose").addEventListener("click", function () { lb.close(); });
  $("vdClose").addEventListener("click", function () { vd.close(); });
  $("letterClose").addEventListener("click", function () { ld.close(); });

  // Visionneuse photo
  var cur = 0;
  function showLb() {
    var p = viewable[cur];
    $("lbImg").src = p.src; $("lbImg").alt = p.title;
    setText("lbTitle", p.title);
    setText("lbCount", (cur + 1) + " sur " + viewable.length);
  }
  function openLb(i) { cur = i; showLb(); if (!lb.open) lb.showModal(); }
  function stepLb(d) { cur = (cur + d + viewable.length) % viewable.length; showLb(); }
  $("lbPrev").addEventListener("click", function () { stepLb(-1); });
  $("lbNext").addEventListener("click", function () { stepLb(1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });
  var tx = 0;
  lb.addEventListener("touchstart", function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Lecteur vidéo
  function openVideo(v) {
    var wrap = $("vdWrap"); wrap.textContent = "";
    var vid = document.createElement("video");
    vid.controls = true; vid.autoplay = true; vid.playsInline = true; vid.setAttribute("playsinline", "");
    vid.src = v.src; wrap.appendChild(vid);
    setText("vdTitle", v.title);
    pauseMusic();
    vd.showModal();
  }
  vd.addEventListener("close", function () { $("vdWrap").textContent = ""; });

  // Lettre
  function openLetter() { ld.showModal(); }
  $("ctaLetter").addEventListener("click", openLetter);
  $("navLetter").addEventListener("click", openLetter);

  /* ---------- Messages (lecteur de citations) ---------- */
  var items = (C.messages || {}).items || [];
  var tabs = $("tabs"), quote = $("quotePanel"), tabEls = [];
  items.forEach(function (m, i) {
    var b = el("button", "tab"); b.type = "button";
    b.setAttribute("role", "tab"); b.id = "tab" + i; b.tabIndex = -1;
    b.setAttribute("aria-selected", "false"); b.setAttribute("aria-controls", "quotePanel");
    var av = el("span", "avatar");
    if (m.avatar) {
      var im = new Image(); im.alt = ""; im.loading = "lazy"; im.src = m.avatar;
      im.addEventListener("error", function () { im.remove(); av.textContent = (m.from || "?").charAt(0); });
      av.appendChild(im);
    } else av.textContent = (m.from || "?").charAt(0).toUpperCase();
    b.appendChild(av); b.appendChild(el("span", "", m.from));
    b.addEventListener("click", function () { selectMsg(i, false); });
    tabs.appendChild(b); tabEls.push(b);
  });
  function selectMsg(i, focus) {
    tabEls.forEach(function (t, k) {
      var on = k === i; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1;
    });
    setText("quoteText", items[i].text); setText("quoteWho", items[i].from);
    quote.setAttribute("aria-labelledby", "tab" + i);
    quote.classList.remove("swap"); void quote.offsetWidth; quote.classList.add("swap");
    if (focus) tabEls[i].focus();
  }
  tabs.addEventListener("keydown", function (e) {
    var i = tabEls.indexOf(document.activeElement); if (i < 0) return;
    var n = tabEls.length, t = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") t = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") t = (i - 1 + n) % n;
    if (e.key === "Home") t = 0;
    if (e.key === "End") t = n - 1;
    if (t !== null) { e.preventDefault(); selectMsg(t, true); }
  });
  if (items.length) selectMsg(0, false); else $("mots").hidden = true;

  /* ---------- Retour en haut ---------- */
  $("replay").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();

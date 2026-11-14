/* =========================================================
   Portofolio — Muhammad Rayhan Adriansyah
   ========================================================= */

/* ---------- Ubah data kontak di sini ---------- */
const CONTACTS = [
  { label: "Email",    value: "nama@email.com",           href: "mailto:nama@email.com", copy: true },
  { label: "GitHub",   value: "github.com/username",      href: "https://github.com/username" },
  { label: "LinkedIn", value: "linkedin.com/in/username", href: "https://www.linkedin.com/in/username" },
];

/* ---------- Data contoh untuk demo GeoMap (wilayah Banten) ---------- */
const OFFICES = [
  { name: "Kantor Pos Serang",        kec: "Serang",        kota: "Kota Serang",       kodepos: "42111", lat: -6.1185, lng: 106.1530, layanan: ["Surat & paket", "Pos Express", "Wesel", "Pembayaran tagihan"] },
  { name: "Kantor Pos Cilegon",       kec: "Jombang",       kota: "Kota Cilegon",      kodepos: "42411", lat: -6.0047, lng: 106.0503, layanan: ["Surat & paket", "Pos Express", "Pembayaran tagihan"] },
  { name: "Kantor Pos Pandeglang",    kec: "Pandeglang",    kota: "Kab. Pandeglang",   kodepos: "42211", lat: -6.3089, lng: 106.1040, layanan: ["Surat & paket", "Wesel", "Penyaluran bansos"] },
  { name: "Kantor Pos Rangkasbitung", kec: "Rangkasbitung", kota: "Kab. Lebak",        kodepos: "42311", lat: -6.3570, lng: 106.2500, layanan: ["Surat & paket", "Pos Express", "Wesel"] },
  { name: "Kantor Pos Kragilan",      kec: "Kragilan",      kota: "Kab. Serang",       kodepos: "42184", lat: -6.1530, lng: 106.2960, layanan: ["Surat & paket", "Pembayaran tagihan"] },
  { name: "Kantor Pos Ciruas",        kec: "Ciruas",        kota: "Kab. Serang",       kodepos: "42182", lat: -6.1200, lng: 106.2290, layanan: ["Surat & paket", "Wesel"] },
  { name: "Kantor Pos Anyer",         kec: "Anyar",         kota: "Kab. Serang",       kodepos: "42166", lat: -6.0700, lng: 105.8870, layanan: ["Surat & paket", "Pembayaran tagihan"] },
  { name: "Kantor Pos Balaraja",      kec: "Balaraja",      kota: "Kab. Tangerang",    kodepos: "15610", lat: -6.1970, lng: 106.4500, layanan: ["Surat & paket", "Pos Express", "Pembayaran tagihan"] },
  { name: "Kantor Pos Merak",         kec: "Pulomerak",     kota: "Kota Cilegon",      kodepos: "42438", lat: -5.9330, lng: 106.0030, layanan: ["Surat & paket", "Pos Express"] },
  { name: "Kantor Pos Baros",         kec: "Baros",         kota: "Kab. Serang",       kodepos: "42173", lat: -6.2260, lng: 106.2150, layanan: ["Surat & paket", "Wesel"] },
  { name: "Kantor Pos Petir",         kec: "Petir",         kota: "Kab. Serang",       kodepos: "42172", lat: -6.2530, lng: 106.2890, layanan: ["Surat & paket"] },
  { name: "Kantor Pos Labuan",        kec: "Labuan",        kota: "Kab. Pandeglang",   kodepos: "42264", lat: -6.3750, lng: 105.8300, layanan: ["Surat & paket", "Penyaluran bansos"] },
];
const HOURS = { weekday: [8, 15], saturday: [8, 12] }; // Sen–Jum 08.00–15.00, Sab 08.00–12.00

/* ---------- Kota untuk pin di hero ---------- */
const CITIES = [
  ["Banda Aceh", 5.55, 95.32], ["Medan", 3.59, 98.67], ["Padang", -0.95, 100.35],
  ["Palembang", -2.99, 104.76], ["Serang", -6.12, 106.15], ["Jakarta", -6.2, 106.85],
  ["Bandung", -6.91, 107.61], ["Semarang", -6.97, 110.42], ["Surabaya", -7.25, 112.75],
  ["Denpasar", -8.65, 115.22], ["Kupang", -10.17, 123.6], ["Pontianak", -0.03, 109.33],
  ["Balikpapan", -1.24, 116.85], ["Makassar", -5.14, 119.42], ["Manado", 1.47, 124.84],
  ["Ambon", -3.69, 128.18], ["Jayapura", -2.53, 140.72],
];
const NETWORK = ["Banda Aceh", "Medan", "Padang", "Palembang", "Serang", "Jakarta", "Bandung", "Semarang", "Surabaya", "Denpasar", "Kupang", "Makassar", "Balikpapan", "Pontianak"];
const NETWORK_2 = ["Makassar", "Manado", "Ambon", "Jayapura"];

/* =========================================================
   Utilitas
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PIN_SVG = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M11 0C4.9 0 0 4.8 0 10.8 0 18.6 11 30 11 30s11-11.4 11-19.2C22 4.8 17.1 0 11 0z" fill="currentColor"/><circle cx="11" cy="10.6" r="4" fill="#F2F4F1"/></svg>';

document.documentElement.classList.add("js");
$("[data-year]").textContent = new Date().getFullYear();

function toDMS(value, pos, neg) {
  const hemi = value >= 0 ? pos : neg;
  const v = Math.abs(value);
  let d = Math.floor(v);
  let m = Math.round((v - d) * 60);
  if (m === 60) { d += 1; m = 0; }
  return `${d}°${String(m).padStart(2, "0")}′ ${hemi}`;
}
const fmtCoord = (lat, lng) => `${toDMS(lat, "LU", "LS")}, ${toDMS(lng, "BT", "BB")}`;

let toastTimer;
function toast(msg) {
  const t = $(".toast");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), 2600);
}

function haversine(a, b) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
const fmtKm = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km < 10 ? 1 : 0).replace(".", ",")} km`);

function makePin(extraClass = "") {
  const el = document.createElement("span");
  el.className = `pin ${extraClass}`.trim();
  el.innerHTML = PIN_SVG;
  return el;
}

/* =========================================================
   Peta topografi: value noise + marching squares
   ========================================================= */
function makeNoise(seed) {
  const hash = (x, y) => {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 982451653);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  const noise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  return (x, y) => {
    let v = 0, amp = 0.55, f = 1, total = 0;
    for (let o = 0; o < 4; o++) { v += noise(x * f, y * f) * amp; total += amp; amp *= 0.5; f *= 2.03; }
    return v / total;
  };
}

/**
 * Menggambar peta topografi ke canvas.
 * Mengembalikan fungsi draw(progress 0..1) untuk animasi masuk.
 */
function buildTopo(canvas, { seed = 7, scale = 360, cell = 12, levels = 12, sea = 0.42, offsetX = 0, offsetY = 0, shape = null } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const field = makeNoise(seed);
  const cols = Math.ceil(w / cell) + 2, rows = Math.ceil(h / cell) + 2;
  const v = new Float32Array(cols * rows);
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++)
    {
      const n = field((i * cell + offsetX) / scale, (j * cell + offsetY) / scale);
      v[j * cols + i] = shape ? shape(i * cell, j * cell, n) : n;
    }

  // Bidang warna (laut / daratan) — gambar resolusi rendah lalu diperhalus
  const base = document.createElement("canvas");
  base.width = cols; base.height = rows;
  const bctx = base.getContext("2d");
  const img = bctx.createImageData(cols, rows);
  for (let k = 0; k < v.length; k++) {
    const e = v[k], p = k * 4;
    if (e < sea) {
      const t = Math.max(0, (sea - e) / sea);
      img.data[p] = 211 - t * 30; img.data[p + 1] = 227 - t * 20; img.data[p + 2] = 230 - t * 12;
    } else {
      const t = Math.min(1, (e - sea) / (1 - sea));
      img.data[p] = 242 - t * 18; img.data[p + 1] = 244 - t * 14; img.data[p + 2] = 241 - t * 18;
    }
    img.data[p + 3] = 255;
  }
  bctx.putImageData(img, 0, 0);

  // Garis kontur
  const paths = [];
  for (let l = 0; l < levels; l++) {
    const L = sea + (l / levels) * (0.82 - sea) - 0.0001;
    const path = new Path2D();
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const tl = v[j * cols + i], tr = v[j * cols + i + 1];
        const bl = v[(j + 1) * cols + i], br = v[(j + 1) * cols + i + 1];
        const idx = (tl > L) << 3 | (tr > L) << 2 | (br > L) << 1 | (bl > L);
        if (idx === 0 || idx === 15) continue;
        const x = i * cell, y = j * cell;
        const lerp = (a, b) => (L - a) / (b - a);
        const T = [x + lerp(tl, tr) * cell, y];
        const R = [x + cell, y + lerp(tr, br) * cell];
        const B = [x + lerp(bl, br) * cell, y + cell];
        const Lf = [x, y + lerp(tl, bl) * cell];
        const seg = (a, b) => { path.moveTo(a[0], a[1]); path.lineTo(b[0], b[1]); };
        switch (idx) {
          case 1: case 14: seg(Lf, B); break;
          case 2: case 13: seg(B, R); break;
          case 3: case 12: seg(Lf, R); break;
          case 4: case 11: seg(T, R); break;
          case 6: case 9: seg(T, B); break;
          case 7: case 8: seg(T, Lf); break;
          case 5: seg(T, R); seg(Lf, B); break;
          case 10: seg(T, Lf); seg(B, R); break;
        }
      }
    }
    paths.push(path);
  }

  return function draw(progress = 1) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.min(1, progress * 1.6);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(base, 0, 0, cols * cell, rows * cell);
    ctx.lineJoin = "round";
    paths.forEach((p, i) => {
      const appear = Math.max(0, Math.min(1, progress * (levels + 3) - i));
      if (!appear) return;
      ctx.globalAlpha = appear;
      ctx.strokeStyle = i === 0 ? "#8FAAB0" : (i % 4 === 0 ? "#A3B6AD" : "#C3D0C9");
      ctx.lineWidth = i === 0 ? 1.3 : (i % 4 === 0 ? 1.1 : 0.8);
      ctx.stroke(p);
    });
    ctx.globalAlpha = 1;
  };
}

function animate(duration, fn, done) {
  if (reduceMotion) { fn(1); done && done(); return; }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    fn(1 - Math.pow(1 - t, 3));
    if (t < 1) requestAnimationFrame(tick); else done && done();
  };
  requestAnimationFrame(tick);
}

/* =========================================================
   Header & menu
   ========================================================= */
const header = $(".site-header");
const toggle = $(".menu-toggle");
const nav = $("#nav-menu");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  $(".sr-only", toggle).textContent = open ? "Tutup menu" : "Buka menu";
  document.body.style.overflow = open ? "hidden" : "";
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });

// Tautan aktif sesuai section
const navLinks = $$(".nav a");
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("section[id]").forEach((s) => io.observe(s));

/* =========================================================
   Rute scroll
   ========================================================= */
const routeEl = $(".route");
const stopsEl = $(".route__stops");
const sections = $$("[data-stop]");
const routeDone = $(".route__done");
const routeMarker = $(".route__marker");
const topbar = $(".topbar-progress span");
let stopPositions = [];

function layoutStops() {
  const max = document.documentElement.scrollHeight - innerHeight;
  stopsEl.innerHTML = "";
  stopPositions = sections.map((s) => {
    const p = Math.min(1, Math.max(0, (s.offsetTop - innerHeight * 0.35) / max));
    const li = document.createElement("li");
    li.style.top = `${p * 100}%`;
    li.innerHTML = `<span>${s.dataset.stop}</span>`;
    stopsEl.appendChild(li);
    return p;
  });
}

function onScroll() {
  const y = scrollY;
  header.classList.toggle("is-scrolled", y > 20);
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, y / max) : 0;
  routeDone.style.strokeDashoffset = String(100 - p * 100);
  routeMarker.style.top = `${p * 100}%`;
  topbar.style.transform = `scaleX(${p})`;
  const lis = $$("li", stopsEl);
  let current = 0;
  stopPositions.forEach((sp, i) => { if (p >= sp - 0.001) current = i; });
  lis.forEach((li, i) => {
    li.classList.toggle("is-passed", stopPositions[i] <= p + 0.001);
    li.classList.toggle("is-current", i === current);
  });
}
addEventListener("scroll", onScroll, { passive: true });

/* =========================================================
   Hero: peta, pin kota, crosshair koordinat
   ========================================================= */
const hero = $(".hero");
const heroCanvas = $(".hero__map");
const heroPins = $(".hero__pins");
const crossX = $(".hero__cross-x");
const crossY = $(".hero__cross-y");
const coordEl = $("[data-coord]");
const userHeroPins = [];

// Proyeksi sederhana Indonesia (lon 94–142, lat 7 s/d -12) ke area hero
function heroFrame() {
  const w = hero.clientWidth, h = hero.clientHeight;
  if (w < 760) {
    const top = $(".hero__inner").offsetTop, y0 = 80;
    return { x: w * 0.07, y: y0, w: w * 0.86, h: Math.max(110, top - y0 - 56) };
  }
  return { x: w * 0.4, y: h * 0.16, w: w * 0.56, h: h * 0.58 };
}
const LON0 = 94, LON1 = 142, LAT0 = 7, LAT1 = -12;
function project(lat, lng) {
  const f = heroFrame();
  return { x: f.x + ((lng - LON0) / (LON1 - LON0)) * f.w, y: f.y + ((LAT0 - lat) / (LAT0 - LAT1)) * f.h };
}
function unproject(x, y) {
  const f = heroFrame();
  return { lng: LON0 + ((x - f.x) / f.w) * (LON1 - LON0), lat: LAT0 - ((y - f.y) / f.h) * (LAT0 - LAT1) };
}

let drawHero;
function renderHero(animateIn) {
  drawHero = buildTopo(heroCanvas, { seed: 11, scale: Math.max(300, hero.clientWidth / 3.4), cell: 12, levels: 13, sea: 0.4 });
  if (animateIn) animate(1600, drawHero); else drawHero(1);
}

function placeCityPins(animateIn) {
  heroPins.innerHTML = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "hero-links");
  heroPins.appendChild(svg);

  const pos = {};
  CITIES.forEach(([name, lat, lng], i) => {
    const p = project(lat, lng);
    pos[name] = p;
    const pin = makePin(animateIn ? "is-drop" : "");
    pin.style.left = `${p.x}px`;
    pin.style.top = `${p.y}px`;
    if (name === "Serang") {
      pin.insertAdjacentHTML("beforeend", '<span class="pin__label">Serang</span>');
      pin.style.zIndex = 2;
    } else {
      pin.style.width = "16px"; pin.style.height = "22px"; pin.style.margin = "-22px 0 0 -8px";
    }
    if (animateIn) pin.style.animationDelay = `${700 + i * 70}ms`;
    heroPins.appendChild(pin);
  });

  const curve = (names) => names.map((n, i) => {
    const p = pos[n];
    if (i === 0) return `M${p.x},${p.y}`;
    const q = pos[names[i - 1]];
    const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2 - Math.abs(p.x - q.x) * 0.18;
    return `Q${mx},${my} ${p.x},${p.y}`;
  }).join(" ");
  [NETWORK, NETWORK_2].forEach((list) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", curve(list));
    svg.appendChild(path);
    if (animateIn && !reduceMotion) {
      path.style.opacity = "0";
      path.style.transition = "opacity 1.2s ease 2.2s";
      requestAnimationFrame(() => requestAnimationFrame(() => (path.style.opacity = "")));
    }
  });

  userHeroPins.forEach((u) => {
    const p = project(u.lat, u.lng);
    u.el.style.left = `${p.x}px`;
    u.el.style.top = `${p.y}px`;
    heroPins.appendChild(u.el);
  });
}

hero.addEventListener("pointermove", (e) => {
  if (e.pointerType === "touch") return;
  const r = hero.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  hero.classList.add("is-hover");
  crossX.style.transform = `translateY(${y}px)`;
  crossY.style.transform = `translateX(${x}px)`;
  const g = unproject(x, y);
  coordEl.textContent = fmtCoord(g.lat, g.lng);
});
hero.addEventListener("pointerleave", () => {
  hero.classList.remove("is-hover");
  coordEl.textContent = fmtCoord(-6.12, 106.15);
});
hero.addEventListener("click", (e) => {
  if (e.target.closest(".hero__inner, a, button")) return;
  const r = hero.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  const g = unproject(x, y);
  const pin = makePin("pin--user is-drop");
  pin.insertAdjacentHTML("beforeend", '<span class="pin__ripple"></span>');
  pin.style.left = `${x}px`;
  pin.style.top = `${y}px`;
  heroPins.appendChild(pin);
  userHeroPins.push({ ...g, el: pin });
  if (userHeroPins.length > 10) userHeroPins.shift().el.remove();
  coordEl.textContent = fmtCoord(g.lat, g.lng);
  toast(`Titik ditandai di ${fmtCoord(g.lat, g.lng)}`);
});

/* =========================================================
   Demo GeoMap
   ========================================================= */
const demo = {
  map: $(".demo__map"),
  canvas: $(".demo__canvas"),
  pins: $(".demo__pins"),
  links: $(".demo__links"),
  you: $(".demo__you"),
  list: $(".demo__list"),
  empty: $(".demo__empty"),
  card: $(".demo__card"),
  input: $("#demo-search"),
  query: "",
  active: null,
  user: null,
  pinEls: [],
};
const BOX = { lng0: 105.78, lng1: 106.52, lat0: -5.9, lat1: -6.44 };

function demoFrame() {
  const w = demo.map.clientWidth, h = demo.map.clientHeight;
  const pad = 0.1;
  const dLng = BOX.lng1 - BOX.lng0, dLat = BOX.lat0 - BOX.lat1;
  const s = Math.min((w * (1 - pad * 2)) / dLng, (h * (1 - pad * 2)) / dLat);
  return { s, ox: (w - dLng * s) / 2, oy: (h - dLat * s) / 2 };
}
const dProject = (lat, lng) => { const f = demoFrame(); return { x: f.ox + (lng - BOX.lng0) * f.s, y: f.oy + (BOX.lat0 - lat) * f.s }; };
const dUnproject = (x, y) => { const f = demoFrame(); return { lng: BOX.lng0 + (x - f.ox) / f.s, lat: BOX.lat0 - (y - f.oy) / f.s }; };

// Garis pantai Banten yang disederhanakan (Selat Sunda di barat, Laut Jawa di utara)
const lerpTable = (t, x) => {
  if (x <= t[0][0]) return t[0][1];
  for (let k = 1; k < t.length; k++) {
    if (x <= t[k][0]) { const [x0, y0] = t[k - 1], [x1, y1] = t[k]; return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0); }
  }
  return t[t.length - 1][1];
};
const WEST_COAST = [[-6.6, 105.78], [-6.45, 105.79], [-6.38, 105.805], [-6.2, 105.84], [-6.07, 105.865], [-5.98, 105.95], [-5.9, 105.99], [-5.7, 106.0]]; // [lat, lng] (lat naik)
const NORTH_COAST = [[105.9, -5.89], [106.0, -5.905], [106.08, -5.94], [106.16, -5.975], [106.24, -5.975], [106.32, -5.98], [106.45, -5.99], [106.7, -5.985]]; // [lng, lat]
function bantenShape(px, py, n) {
  const g = dUnproject(px, py);
  const dW = g.lng - lerpTable(WEST_COAST, g.lat);
  const dN = lerpTable(NORTH_COAST, g.lng) - g.lat;
  const land = Math.min(dW, dN);
  const inland = Math.max(0, -6.15 - g.lat); // makin ke selatan makin tinggi
  return 0.3 + 0.42 * n + Math.max(-0.6, Math.min(0.2, land * 7)) + Math.min(0.18, inland * 0.6);
}

function isOpen(now = new Date()) {
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  if (d === 0) return false;
  const [a, b] = d === 6 ? HOURS.saturday : HOURS.weekday;
  return h >= a && h < b;
}

function renderDemoMap() {
  buildTopo(demo.canvas, { seed: 3, scale: 200, cell: 8, levels: 10, sea: 0.36, shape: bantenShape })(1);
  demo.pins.innerHTML = "";
  demo.pinEls = OFFICES.map((o, i) => {
    const p = dProject(o.lat, o.lng);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pin";
    btn.innerHTML = PIN_SVG;
    btn.style.left = `${p.x}px`;
    btn.style.top = `${p.y}px`;
    btn.setAttribute("aria-label", o.name);
    btn.addEventListener("click", (e) => { e.stopPropagation(); select(i); });
    demo.pins.appendChild(btn);
    return btn;
  });
  placeYou();
  updateDemo();
}

function placeYou() {
  if (!demo.user) { demo.you.hidden = true; return; }
  const p = dProject(demo.user.lat, demo.user.lng);
  demo.you.hidden = false;
  demo.you.style.left = `${p.x}px`;
  demo.you.style.top = `${p.y}px`;
}

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
function highlight(text, q) {
  if (!q) return text;
  const i = norm(text).indexOf(q);
  if (i < 0) return text;
  return `${text.slice(0, i)}<mark>${text.slice(i, i + q.length)}</mark>${text.slice(i + q.length)}`;
}

function results() {
  const q = norm(demo.query.trim());
  let items = OFFICES.map((o, i) => ({ o, i, d: demo.user ? haversine(demo.user, o) : null }))
    .filter(({ o }) => !q || [o.name, o.kec, o.kota, o.kodepos].some((f) => norm(f).includes(q)));
  if (demo.user) items.sort((a, b) => a.d - b.d);
  return { items, q };
}

function updateDemo() {
  const { items, q } = results();
  const visible = new Set(items.map((r) => r.i));
  const nearest = demo.user && items.length ? items[0].i : null;

  demo.pinEls.forEach((el, i) => {
    el.classList.toggle("is-dim", !visible.has(i));
    el.classList.toggle("is-active", demo.active === i);
    el.classList.toggle("is-nearest", nearest === i);
  });

  demo.list.innerHTML = "";
  items.forEach(({ o, i, d }) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" class="demo__item" role="option" aria-selected="${demo.active === i}">
      <b>${highlight(o.name, q)}</b>
      <small>Kec. ${highlight(o.kec, q)}, ${highlight(o.kota, q)} ${highlight(o.kodepos, q)}</small>
      ${d != null ? `<em>${fmtKm(d)}</em>` : ""}
    </button>`;
    li.firstElementChild.addEventListener("click", () => select(i, true));
    demo.list.appendChild(li);
  });
  demo.empty.hidden = items.length > 0;
  drawLink();
}

function drawLink() {
  demo.links.innerHTML = "";
  if (!demo.user || demo.active == null) return;
  const a = dProject(demo.user.lat, demo.user.lng);
  const o = OFFICES[demo.active];
  const b = dProject(o.lat, o.lng);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
  line.setAttribute("x2", b.x); line.setAttribute("y2", b.y - 14);
  demo.links.appendChild(line);
}

function select(i, fromList = false) {
  demo.active = i;
  const o = OFFICES[i];
  const open = isOpen();
  const dist = demo.user ? haversine(demo.user, o) : null;
  const origin = demo.user ? `&origin=${demo.user.lat.toFixed(5)},${demo.user.lng.toFixed(5)}` : "";
  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}${origin}`;
  demo.card.hidden = false;
  demo.card.innerHTML = `
    <button class="demo__close" type="button" aria-label="Tutup detail">×</button>
    <h4>${o.name}</h4>
    <p>Kec. ${o.kec}, ${o.kota} ${o.kodepos}</p>
    <dl>
      <dt>Status</dt><dd>${open ? "Buka sekarang" : "Tutup sekarang"}</dd>
      <dt>Jam</dt><dd>Sen–Jum 08.00–15.00, Sab 08.00–12.00</dd>
      <dt>Koordinat</dt><dd>${o.lat.toFixed(4)}, ${o.lng.toFixed(4)}</dd>
      ${dist != null ? `<dt>Jarak</dt><dd>${fmtKm(dist)} dari titik Anda</dd>` : ""}
    </dl>
    <ul class="chips">${o.layanan.map((l) => `<li>${l}</li>`).join("")}</ul>
    <a class="btn btn--solid btn--small" href="${routeUrl}" target="_blank" rel="noopener">Buka rute di Google Maps</a>`;
  $(".demo__close", demo.card).addEventListener("click", () => {
    demo.card.hidden = true;
    demo.active = null;
    updateDemo();
    demo.pinEls[i].focus();
  });
  updateDemo();
  if (fromList && innerWidth <= 860) demo.map.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
}

function setUser(pos, message) {
  demo.user = pos;
  placeYou();
  const { items } = results();
  if (items.length) select(items[0].i);
  else updateDemo();
  if (message) toast(message);
}

demo.input.addEventListener("input", () => { demo.query = demo.input.value; updateDemo(); });

demo.map.addEventListener("click", (e) => {
  if (e.target.closest(".pin, .demo__card")) return;
  const r = demo.map.getBoundingClientRect();
  setUser(dUnproject(e.clientX - r.left, e.clientY - r.top));
  toast(demo.active != null ? `Terdekat dari titik Anda: ${OFFICES[demo.active].name}` : "Posisi Anda sudah ditandai");
});

$("[data-locate]").addEventListener("click", () => {
  if (!("geolocation" in navigator)) { toast("Browser ini tidak mendukung lokasi. Ketuk peta untuk menandai posisi."); return; }
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const g = { lat: coords.latitude, lng: coords.longitude };
      const inside = g.lng >= BOX.lng0 && g.lng <= BOX.lng1 && g.lat <= BOX.lat0 && g.lat >= BOX.lat1;
      if (inside) setUser(g, "Lokasi Anda ditemukan");
      else toast("Lokasi Anda di luar area demo (Banten). Ketuk peta untuk menandai posisi.");
    },
    () => toast("Akses lokasi ditolak. Ketuk peta untuk menandai posisi Anda."),
    { enableHighAccuracy: false, timeout: 8000 }
  );
});

/* =========================================================
   Kontak
   ========================================================= */
const contactList = $("[data-contacts]");
CONTACTS.forEach((c) => {
  const li = document.createElement("li");
  const external = c.href.startsWith("http");
  li.innerHTML = `
    <div class="contact__item">
      <span>${c.label}</span>
      <a href="${c.href}" ${external ? 'target="_blank" rel="noopener"' : ""}><strong>${c.value}</strong></a>
      ${c.copy ? `<button type="button" class="contact__copy">Salin</button>` : "<span></span>"}
    </div>`;
  const btn = $(".contact__copy", li);
  if (btn) btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(c.value); toast("Email disalin"); }
    catch { toast(`Salin manual: ${c.value}`); }
  });
  contactList.appendChild(li);
});
$$(".contact__item a").forEach((a) => (a.style.textDecoration = "none"));

/* =========================================================
   Init & resize
   ========================================================= */
function init() {
  renderHero(true);
  placeCityPins(true);
  renderDemoMap();
  layoutStops();
  onScroll();
  requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
}

let lastW = innerWidth, resizeTimer;
addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Abaikan resize vertikal kecil (address bar mobile)
    const widthChanged = innerWidth !== lastW;
    lastW = innerWidth;
    if (widthChanged || !matchMedia("(pointer: coarse)").matches) {
      renderHero(false);
      placeCityPins(false);
    }
    renderDemoMap();
    if (demo.active != null) drawLink();
    layoutStops();
    onScroll();
  }, 150);
});

let started = false;
const start = () => { if (!started) { started = true; init(); } };
if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
addEventListener("load", start);
setTimeout(start, 1500);

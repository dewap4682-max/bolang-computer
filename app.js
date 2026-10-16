/* ==========================================================================
   app.js — Interaksi website servis (tanpa library eksternal)
   Data diambil dari config.js (window.SITE)
   ========================================================================== */
(() => {
  'use strict';

  const S = window.SITE || {};
  const B = S.bisnis || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#0d9488', '#e11d48', '#d97706', '#0891b2', '#4f46e5', '#16a34a'];

  /* ------------------------------------------------------------------
     Utilitas
     ------------------------------------------------------------------ */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtNum = (n, dec = 0) => {
    const [int, frac] = Number(n).toFixed(dec).split('.');
    const dotted = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return frac ? `${dotted},${frac}` : dotted;
  };
  const fmtRp = (n) => 'Rp' + fmtNum(n);
  const fmtJam = (s) => String(s || '').replace(':', '.');
  const icon = (name, cls = '') => `<svg class="ic${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const fillName = (t) => String(t || '').replace(/\{nama\}/g, B.nama || '');
  const waNumber = () => String(B.whatsapp || '').replace(/\D/g, '');
  const waUrl = (text) => `https://wa.me/${waNumber()}${text ? '?text=' + encodeURIComponent(text) : ''}`;
  const telHref = () => {
    let d = String(B.teleponTampil || B.whatsapp || '').replace(/\D/g, '');
    if (d.startsWith('0')) d = '62' + d.slice(1);
    return 'tel:+' + d;
  };
  const catById = (id) => (S.kategori || []).find((k) => k.id === id) || { id, nama: '', warna: 'blue' };
  const initials = (name) => String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const colorFor = (str) => { let h = 0; for (const ch of String(str)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return AVATAR_COLORS[h % AVATAR_COLORS.length]; };
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const toMin = (s) => { const [h, m] = String(s).split(':').map(Number); return h * 60 + (m || 0); };
  const pad2 = (n) => String(n).padStart(2, '0');
  const addDays = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
  const dayOfISO = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); };
  const smoothScrollTo = (el) => el && el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  const restartAnim = (el, cls) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  const priceHTML = (r) => {
    if (!r.min) return '<span class="pl-free">Gratis</span>';
    let s = r.mulai ? '<small>mulai </small>' : '';
    s += fmtRp(r.min);
    if (r.max) s += ' – ' + fmtNum(r.max);
    if (r.satuan) s += `<small> ${esc(r.satuan)}</small>`;
    return s;
  };

  /* ------------------------------------------------------------------
     Toast (notifikasi kecil)
     ------------------------------------------------------------------ */
  function toast(msg, type = 'success', action = null) {
    const wrap = $('#toasts');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', 'status');
    const ic = type === 'error' ? 'alert' : type === 'info' ? 'info' : 'check-circle';
    el.innerHTML = `${icon(ic)}<span>${esc(msg)}</span>${action ? `<a class="toast__action" href="${esc(action.href)}">${esc(action.label)}</a>` : ''}`;
    wrap.appendChild(el);
    while (wrap.children.length > 3) wrap.firstElementChild.remove();
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 350); }, 3400);
  }

  /* ------------------------------------------------------------------
     Data usaha -> elemen [data-bind] & [data-href]
     ------------------------------------------------------------------ */
  function hoursSummary() {
    const jam = B.jamBuka || [];
    const groups = [];
    [1, 2, 3, 4, 5, 6, 0].forEach((i) => {
      const d = jam[i];
      if (!d) return;
      const key = d.buka ? `${fmtJam(d.buka)}–${fmtJam(d.tutup)}` : 'Tutup';
      const last = groups[groups.length - 1];
      if (last && last.key === key) { last.to = d.hari; last.n++; } else groups.push({ key, from: d.hari, to: d.hari, n: 1 });
    });
    if (groups.length === 1 && groups[0].n === 7 && groups[0].key !== 'Tutup') return `Setiap hari ${groups[0].key} WIB`;
    return groups.map((g) => `${g.from === g.to ? g.from : g.from + '–' + g.to} ${g.key}`).join(' · ');
  }

  function bindBusiness() {
    const R = S.rating || {};
    const values = {
      nama: B.nama, subLogo: B.subLogo, kota: B.kota, telepon: B.teleponTampil, email: B.email,
      alamat: B.alamat, area: B.areaLayanan, pengumuman: S.pengumuman,
      radius: B.radiusGratisKm != null ? String(B.radiusGratisKm) : '',
      ratingNilai: R.nilai, ratingJumlah: R.jumlah, ratingSumber: R.sumber,
      jamRingkas: hoursSummary(), tahun: String(new Date().getFullYear())
    };
    $$('[data-bind]').forEach((el) => {
      const v = values[el.dataset.bind];
      if (v != null && v !== '') el.textContent = v;
    });

    $$('[data-href]').forEach((el) => {
      const type = el.dataset.href;
      let href = '';
      if (type === 'wa') href = waUrl(fillName(el.dataset.waText || 'Halo {nama}, saya mau tanya soal servis.'));
      else if (type === 'tel') href = telHref();
      else if (type === 'mail') {
        href = B.email ? 'mailto:' + B.email : '';
        (el.closest('li') || el).hidden = !href;
      }
      else if (type === 'maps') href = B.mapsLink || '';
      else if (B.sosial && Object.prototype.hasOwnProperty.call(B.sosial, type)) href = B.sosial[type] || '';
      if (!href) { if (B.sosial && type in B.sosial) el.hidden = true; return; }
      el.setAttribute('href', href);
      if (/^https?:/i.test(href)) { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
    });

    // Judul halaman (SEO) ditulis langsung di <title> index.html — sengaja tidak diubah lewat JavaScript
  }

  function injectSchema() {
    if (document.querySelector('script[type="application/ld+json"][data-static]')) return; // sudah ada versi statis di index.html
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const rows = Object.values(S.daftarHarga || {}).reduce((a, b) => a.concat(b || []), []);
    const lo = rows.map((r) => r.min).filter((n) => n > 0);
    const hi = rows.map((r) => r.max || r.min).filter((n) => n > 0);
    const sameAs = Object.values(B.sosial || {}).filter(Boolean);
    const alamat = String(B.alamat || '');
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: B.nama,
      description: 'Servis laptop & PC gaming, rakit PC, upgrade, install ulang, recovery data, servis konsol, printer, jaringan & CCTV.',
      telephone: telHref().replace('tel:', ''),
      email: B.email || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: alamat.split(',')[0].trim() || undefined,
        addressLocality: B.kotaResmi || B.kota,
        addressRegion: 'Jawa Tengah',
        postalCode: (alamat.match(/\b\d{5}\b/) || [])[0],
        addressCountry: 'ID'
      },
      areaServed: B.areaLayanan,
      priceRange: lo.length ? `${fmtRp(Math.min(...lo))} – ${fmtRp(Math.max(...hi))}` : undefined,
      openingHoursSpecification: (B.jamBuka || []).map((d, i) => (d && d.buka ? { '@type': 'OpeningHoursSpecification', dayOfWeek: days[i], opens: d.buka, closes: d.tutup } : null)).filter(Boolean),
      sameAs: sameAs.length ? sameAs : undefined
    };
    if (/^https?:/i.test(location.href)) data.url = location.href.split('#')[0];
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------
     Header, navigasi aktif, menu mobile, tombol ke atas
     ------------------------------------------------------------------ */
  function initHeader() {
    const header = $('#header');
    const toTop = $('#toTop');
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (toTop) toTop.classList.toggle('is-visible', y > 700);
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    const links = $$('.nav__link');
    const map = new Map();
    links.forEach((a) => {
      const sec = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (sec) map.set(sec, a);
    });
    if ('IntersectionObserver' in window && map.size) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.classList.remove('is-active'));
          const a = map.get(en.target);
          if (a) a.classList.add('is-active');
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      map.forEach((_, sec) => io.observe(sec));
    }
  }

  function initMobileMenu() {
    const btn = $('.nav-toggle');
    if (!btn) return;
    const setOpen = (open) => {
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    };
    btn.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    $$('#nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', (e) => {
      if (document.body.classList.contains('nav-open') && !e.target.closest('#header')) setOpen(false);
    });
    window.addEventListener('resize', debounce(() => { if (window.innerWidth > 1080) setOpen(false); }, 150));
  }

  /* ------------------------------------------------------------------
     Animasi muncul saat scroll
     ------------------------------------------------------------------ */
  function initReveal() {
    const els = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------
     Statistik (angka berjalan) & marquee merek
     ------------------------------------------------------------------ */
  function initStats() {
    const wrap = $('[data-stats]');
    if (!wrap) return;
    wrap.innerHTML = (S.statistik || []).map((s) => `
      <div class="stat">
        <div class="stat__num" data-count="${s.angka}" data-dec="${s.desimal || 0}" data-suffix="${esc(s.akhiran || '')}">${fmtNum(s.angka, s.desimal || 0)}${esc(s.akhiran || '')}</div>
        <div class="stat__label">${esc(s.label)}</div>
      </div>`).join('');
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = +el.dataset.dec;
      const suf = el.dataset.suffix;
      const t0 = performance.now();
      const dur = 1700;
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmtNum(target * eased, dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    $$('.stat__num', wrap).forEach((n) => { n.textContent = fmtNum(0, +n.dataset.dec) + n.dataset.suffix; io.observe(n); });
  }

  function initBrands() {
    const track = $('[data-brands]');
    if (!track) return;
    const items = (S.merek || []).map((m) => `<li>${esc(m)}</li>`).join('');
    track.innerHTML = `<ul class="marquee__list">${items}</ul><ul class="marquee__list" aria-hidden="true">${items}</ul>`;
  }

  /* ------------------------------------------------------------------
     Layanan: filter kategori + kartu + modal detail
     ------------------------------------------------------------------ */
  let activeCat = 'semua';

  function serviceCardHTML(l) {
    const c = catById(l.kategori);
    const price = l.hargaLabel
      ? `<small>Biaya</small><strong>${esc(l.hargaLabel)}</strong>`
      : `<small>Mulai</small><strong>${fmtRp(l.harga)}</strong>`;
    return `
      <article class="service-card tint-${esc(c.warna)}" data-id="${esc(l.id)}" data-cat="${esc(l.kategori)}">
        ${l.populer ? '<span class="badge badge--hot">Populer</span>' : ''}
        <div class="service-card__icon">${icon(l.ikon || 'wrench')}</div>
        <h3 class="service-card__title">${esc(l.nama)}</h3>
        <p class="service-card__desc">${esc(l.ringkas)}</p>
        <ul class="service-card__points">${(l.poin || []).map((p) => `<li>${icon('check')}<span>${esc(p)}</span></li>`).join('')}</ul>
        <button type="button" class="service-card__more" data-detail="${esc(l.id)}">Detail & rincian harga${icon('arrow-right')}</button>
        <div class="service-card__foot">
          <div class="service-card__price">${price}${l.catatanHarga ? `<em>${esc(l.catatanHarga)}</em>` : ''}</div>
          <button type="button" class="btn btn--primary btn--sm" data-book="${esc(l.id)}" aria-label="Booking ${esc(l.nama)}">${icon('calendar')}Booking</button>
        </div>
      </article>`;
  }

  function setServiceFilter(cat) {
    activeCat = cat;
    $$('[data-service-filter] .chip').forEach((b) => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });
    let i = 0;
    $$('[data-services] .service-card').forEach((card) => {
      const show = cat === 'semua' || card.dataset.cat === cat;
      card.hidden = !show;
      card.classList.remove('anim-in');
      if (show && !reduceMotion) {
        void card.offsetWidth;
        card.style.animationDelay = `${Math.min(i++, 8) * 45}ms`;
        card.classList.add('anim-in');
      }
    });
  }

  function initServices() {
    const filterEl = $('[data-service-filter]');
    const grid = $('[data-services]');
    if (!grid) return;
    const list = S.layanan || [];
    const cats = [{ id: 'semua', nama: 'Semua Layanan' }].concat(S.kategori || []);

    filterEl.innerHTML = cats.map((c) => {
      const n = c.id === 'semua' ? list.length : list.filter((l) => l.kategori === c.id).length;
      if (!n) return '';
      const on = c.id === activeCat;
      return `<button type="button" class="chip${on ? ' is-active' : ''}" role="tab" aria-selected="${on}" data-cat="${esc(c.id)}">${esc(c.nama)}<span class="chip__count">${n}</span></button>`;
    }).join('');
    grid.innerHTML = list.map(serviceCardHTML).join('');

    filterEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cat]');
      if (btn) setServiceFilter(btn.dataset.cat);
    });

    grid.addEventListener('click', (e) => {
      const book = e.target.closest('[data-book]');
      if (book) {
        const l = list.find((x) => x.id === book.dataset.book);
        if (l) addToBooking(l.nama, { perangkat: l.perangkat, scroll: true });
        return;
      }
      const card = e.target.closest('.service-card');
      if (card) openServiceModal(card.dataset.id);
    });

    $$('[data-filter-link]').forEach((a) => a.addEventListener('click', () => setServiceFilter(a.dataset.filterLink)));
  }

  function relatedPrices(l) {
    const data = S.daftarHarga || {};
    const keys = (l.terkait || []).map((k) => k.toLowerCase());
    let rows = [];
    if (keys.length) {
      Object.keys(data).forEach((cat) => {
        (data[cat] || []).forEach((r) => {
          const t = r.item.toLowerCase();
          if (keys.some((k) => t.includes(k)) && !rows.includes(r)) rows.push(r);
        });
      });
    }
    if (!rows.length) rows = (data[l.kategori] || []).slice(0, 5);
    return rows.slice(0, 6);
  }

  function openServiceModal(id) {
    const l = (S.layanan || []).find((x) => x.id === id);
    const dlg = $('#serviceModal');
    if (!l || !dlg) return;
    const c = catById(l.kategori);
    const rows = relatedPrices(l);
    const iconEl = $('[data-sm-icon]', dlg);
    iconEl.className = `modal__icon tint-${c.warna}`;
    iconEl.innerHTML = icon(l.ikon || 'wrench');
    $('[data-sm-cat]', dlg).textContent = c.nama;
    $('[data-sm-title]', dlg).textContent = l.nama;
    $('[data-sm-body]', dlg).innerHTML = `
      <p class="sm-desc">${esc(l.detail || l.ringkas)}</p>
      <div class="info-grid">
        <div><small>Harga</small><strong>${l.hargaLabel ? esc(l.hargaLabel) : 'Mulai ' + fmtRp(l.harga)}</strong></div>
        <div><small>Pengerjaan</small><strong>${esc(l.durasi || '-')}</strong></div>
        <div><small>Garansi</small><strong>${esc(l.garansi || '-')}</strong></div>
      </div>
      <h4 class="sm-sub">Yang Anda dapatkan</h4>
      <ul class="check-list">${(l.poin || []).map((p) => `<li>${icon('check')}<span>${esc(p)}</span></li>`).join('')}</ul>
      ${rows.length ? `<h4 class="sm-sub">Rincian estimasi harga</h4>
      <ul class="mini-prices">${rows.map((r) => `<li><span>${esc(r.item)}${r.catatan ? ` <small class="pl-note">${esc(r.catatan)}</small>` : ''}</span><span class="pl-price">${priceHTML(r)}</span></li>`).join('')}</ul>` : ''}
      ${l.catatanHarga ? `<p class="pl-note" style="margin-top:.8rem">* ${esc(l.catatanHarga)}</p>` : ''}`;
    $('[data-sm-book]', dlg).onclick = () => { closeDialog(dlg); addToBooking(l.nama, { perangkat: l.perangkat, scroll: true }); };
    $('[data-sm-wa]', dlg).href = waUrl(`Halo ${B.nama}, saya mau tanya tentang layanan "${l.nama}".`);
    openDialog(dlg);
  }

  /* ------------------------------------------------------------------
     Paket perawatan (toggle Laptop / PC)
     ------------------------------------------------------------------ */
  let pkgDevice = 'laptop';

  function initPackages() {
    const wrap = $('[data-packages]');
    if (!wrap) return;
    const render = () => {
      wrap.innerHTML = (S.paket || []).map((p) => `
        <article class="package${p.populer ? ' package--featured' : ''}">
          ${p.populer ? `<span class="package__badge">${icon('zap')}Paling Laris</span>` : ''}
          <div class="package__top"><h3>${esc(p.nama)}</h3><span class="package__garansi">${icon('shield')}Garansi ${esc(p.garansi)}</span></div>
          <p class="package__desc">${esc(p.deskripsi)}</p>
          <div class="package__price"><span class="package__cur">Rp</span><span class="package__amount">${fmtNum(p.harga[pkgDevice])}</span></div>
          <ul class="package__features">${(p.fitur[pkgDevice] || []).map((f, i) => `<li style="animation-delay:${i * 40}ms">${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
          <button type="button" class="btn ${p.populer ? 'btn--primary' : 'btn--outline'} btn--block" data-package="${esc(p.id)}">Pilih ${esc(p.nama)}${icon('arrow-right')}</button>
        </article>`).join('');
    };
    render();

    const toggles = $$('[data-package-toggle] [data-device]');
    toggles.forEach((btn) => btn.addEventListener('click', () => {
      if (btn.dataset.device === pkgDevice) return;
      pkgDevice = btn.dataset.device;
      toggles.forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
      render();
      if (!reduceMotion) restartAnim(wrap, 'is-switching');
    }));

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-package]');
      if (!btn) return;
      const p = (S.paket || []).find((x) => x.id === btn.dataset.package);
      if (!p) return;
      const label = `Paket ${p.nama} (${pkgDevice === 'laptop' ? 'Laptop' : 'PC'}) – ${fmtRp(p.harga[pkgDevice])}`;
      addToBooking(label, { perangkat: pkgDevice === 'laptop' ? 'Laptop Gaming' : 'PC Gaming / Desktop', scroll: true });
    });
  }

  /* ------------------------------------------------------------------
     Daftar harga lengkap: tab kategori + pencarian
     ------------------------------------------------------------------ */
  let setPriceTab = () => {};

  function initPriceList() {
    const tabsEl = $('[data-price-tabs]');
    const tbody = $('[data-price-rows]');
    const search = $('[data-price-search]');
    const empty = $('[data-price-empty]');
    const table = $('.price-table');
    if (!tbody) return;

    const data = S.daftarHarga || {};
    const cats = (S.kategori || []).filter((c) => (data[c.id] || []).length);
    let tab = cats.length ? cats[0].id : null;
    let query = '';

    tabsEl.innerHTML = cats.map((c) => `<button type="button" class="tab${c.id === tab ? ' is-active' : ''}" role="tab" aria-selected="${c.id === tab}" data-tab="${esc(c.id)}">${esc(c.nama)}</button>`).join('');

    const highlight = (text, q) => {
      const safe = esc(text);
      if (!q) return safe;
      const re = new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      return safe.replace(re, (m) => `<mark>${m}</mark>`);
    };

    const render = () => {
      const q = query.trim();
      const ql = q.toLowerCase();
      const rows = q
        ? cats.flatMap((c) => (data[c.id] || [])
            .filter((r) => `${r.item} ${r.catatan || ''} ${c.nama}`.toLowerCase().includes(ql))
            .map((r) => Object.assign({}, r, { _cat: c.nama })))
        : (data[tab] || []);
      tabsEl.classList.toggle('is-searching', !!q);
      tbody.innerHTML = rows.map((r, i) => {
        const picked = selected.includes(r.item);
        return `
        <tr style="animation-delay:${Math.min(i, 10) * 25}ms">
          <td><span class="pl-item">${highlight(r.item, q)}</span>${r._cat ? `<span class="pl-cat">${esc(r._cat)}</span>` : ''}${r.catatan ? `<small class="pl-note">${esc(r.catatan)}</small>` : ''}</td>
          <td class="pl-price">${priceHTML(r)}</td>
          <td class="pl-time">${icon('clock')}${esc(r.durasi || '-')}</td>
          <td class="pl-action"><button type="button" class="btn btn--outline btn--xs${picked ? ' is-picked' : ''}" data-pick="${esc(r.item)}" aria-pressed="${picked}">${icon(picked ? 'check' : 'plus')}<span>${picked ? 'Dipilih' : 'Pilih'}</span></button></td>
        </tr>`;
      }).join('');
      empty.hidden = rows.length > 0;
      table.hidden = rows.length === 0;
    };

    setPriceTab = (id) => {
      if (!data[id]) return;
      tab = id;
      if (query) { query = ''; search.value = ''; }
      $$('.tab', tabsEl).forEach((b) => { const on = b.dataset.tab === id; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); });
      render();
    };

    tabsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-tab]'); if (b) setPriceTab(b.dataset.tab); });
    search.addEventListener('input', () => { query = search.value; render(); });
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('[data-pick]');
      if (!b) return;
      const item = b.dataset.pick;
      if (selected.includes(item)) { removeFromBooking(item); toast(`"${item}" dihapus dari booking`, 'info'); }
      else addToBooking(item);
    });
    $$('[data-price-tab-link]').forEach((a) => a.addEventListener('click', () => setPriceTab(a.dataset.priceTabLink)));

    render();
  }

  /* ------------------------------------------------------------------
     Testimoni (carousel)
     ------------------------------------------------------------------ */
  function starsHTML(n) {
    let s = '<span class="stars" aria-label="Rating ' + n + ' dari 5">';
    for (let i = 1; i <= 5; i++) s += `<svg class="ic${i > n ? ' is-off' : ''}" aria-hidden="true"><use href="#i-star"></use></svg>`;
    return s + '</span>';
  }

  function initTestimonials() {
    const track = $('[data-testi-track]');
    if (!track) return;
    const list = S.testimoni || [];
    const dotsEl = $('[data-testi-dots]');
    const viewport = track.parentElement;
    const carousel = track.closest('.carousel');

    track.innerHTML = list.map((t, i) => `
      <article class="testi" aria-roledescription="slide" aria-label="${i + 1} dari ${list.length}">
        <svg class="testi__quote" aria-hidden="true"><use href="#i-quote"></use></svg>
        ${starsHTML(t.rating || 5)}
        <p class="testi__text">“${esc(t.teks)}”</p>
        <span class="testi__tag">${icon('wrench')}${esc(t.layanan)}</span>
        <div class="testi__author">
          <span class="avatar" style="background:${colorFor(t.nama)}" aria-hidden="true">${esc(initials(t.nama))}</span>
          <div><div class="testi__name">${esc(t.nama)}</div><div class="testi__meta">${esc(t.perangkat)} · ${esc(t.lokasi)}</div></div>
        </div>
      </article>`).join('');

    const slides = $$('.testi', track);
    if (!slides.length) return;
    let index = 0;
    let perView = 3;
    let timer = null;
    let hovering = false;

    const getPerView = () => parseInt(getComputedStyle(track).getPropertyValue('--per-view'), 10) || 1;
    const maxIndex = () => Math.max(0, slides.length - perView);
    const buildDots = () => {
      dotsEl.innerHTML = Array.from({ length: maxIndex() + 1 }, (_, i) => `<button type="button" data-i="${i}" aria-label="Tampilkan testimoni ${i + 1}"></button>`).join('');
    };
    const update = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const w = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(${-index * (w + gap)}px)`;
      $$('button', dotsEl).forEach((d, i) => { d.classList.toggle('is-active', i === index); d.setAttribute('aria-current', i === index ? 'true' : 'false'); });
      slides.forEach((s, i) => { const vis = i >= index && i < index + perView; s.setAttribute('aria-hidden', String(!vis)); s.inert = !vis; });
    };
    const go = (i) => { const m = maxIndex(); index = i > m ? 0 : i < 0 ? m : i; update(); };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const start = () => { stop(); if (!reduceMotion && !hovering && !document.hidden) timer = setInterval(() => go(index + 1), 5500); };

    $('[data-testi-prev]').addEventListener('click', () => { go(index - 1); start(); });
    $('[data-testi-next]').addEventListener('click', () => { go(index + 1); start(); });
    dotsEl.addEventListener('click', (e) => { const d = e.target.closest('[data-i]'); if (d) { go(+d.dataset.i); start(); } });
    carousel.addEventListener('mouseenter', () => { hovering = true; stop(); });
    carousel.addEventListener('mouseleave', () => { hovering = false; start(); });
    carousel.addEventListener('focusin', () => { hovering = true; stop(); });
    carousel.addEventListener('focusout', () => { hovering = false; start(); });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { go(index + 1); } else if (e.key === 'ArrowLeft') { go(index - 1); }
    });

    let x0 = null;
    let y0 = null;
    viewport.addEventListener('pointerdown', (e) => { x0 = e.clientX; y0 = e.clientY; });
    viewport.addEventListener('pointerup', (e) => {
      if (x0 == null) return;
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { go(index + (dx < 0 ? 1 : -1)); start(); }
      x0 = null;
    });
    viewport.addEventListener('pointercancel', () => { x0 = null; });

    window.addEventListener('resize', debounce(() => {
      const pv = getPerView();
      if (pv !== perView) { perView = pv; buildDots(); }
      index = Math.min(index, maxIndex());
      update();
    }, 150));

    perView = getPerView();
    buildDots();
    update();
    start();
  }

  /* ------------------------------------------------------------------
     FAQ (accordion + pencarian)
     ------------------------------------------------------------------ */
  function initFAQ() {
    const list = $('[data-faq-list]');
    if (!list) return;
    const faq = S.faq || [];
    const search = $('[data-faq-search]');
    const empty = $('[data-faq-empty]');

    list.innerHTML = faq.map((f, i) => `
      <div class="faq-item${i === 0 ? ' is-open' : ''}">
        <h3><button type="button" class="faq-q" id="faq-q-${i}" aria-expanded="${i === 0}" aria-controls="faq-a-${i}"><span>${esc(f.q)}</span><span class="faq-icon">${icon('plus')}</span></button></h3>
        <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div class="faq-a__inner"><p>${esc(f.a)}</p></div></div>
      </div>`).join('');

    list.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-q');
      if (!q) return;
      const item = q.closest('.faq-item');
      const open = !item.classList.contains('is-open');
      $$('.faq-item.is-open', list).forEach((it) => {
        if (it !== item) { it.classList.remove('is-open'); $('.faq-q', it).setAttribute('aria-expanded', 'false'); }
      });
      item.classList.toggle('is-open', open);
      q.setAttribute('aria-expanded', String(open));
    });

    if (search) search.addEventListener('input', () => {
      const ql = search.value.trim().toLowerCase();
      let shown = 0;
      $$('.faq-item', list).forEach((it, i) => {
        const f = faq[i];
        const match = !ql || `${f.q} ${f.a}`.toLowerCase().includes(ql);
        it.hidden = !match;
        if (match) shown++;
      });
      empty.hidden = shown > 0;
    });
  }

  /* ------------------------------------------------------------------
     Booking: pilihan layanan (chips), validasi, pesan WhatsApp
     ------------------------------------------------------------------ */
  const selected = [];
  let bookingAttempted = false;
  let validateLayanan = () => {};
  let resetBooking = () => {};

  function renderChips() {
    const wrap = $('#bk-chips');
    if (!wrap) return;
    wrap.innerHTML = selected.map((l) => `<span class="svc-chip"><span>${esc(l)}</span><button type="button" data-remove="${esc(l)}" aria-label="Hapus ${esc(l)}">${icon('x')}</button></span>`).join('');
    const count = $('#bk-count');
    if (count) count.textContent = selected.length ? `${selected.length} layanan dipilih` : '';
  }

  function syncPickButtons() {
    $$('[data-pick]').forEach((b) => {
      const on = selected.includes(b.dataset.pick);
      if (b.classList.contains('is-picked') === on) return;
      b.classList.toggle('is-picked', on);
      b.setAttribute('aria-pressed', String(on));
      b.innerHTML = icon(on ? 'check' : 'plus') + `<span>${on ? 'Dipilih' : 'Pilih'}</span>`;
    });
  }

  function syncSelection() {
    renderChips();
    syncPickButtons();
    if (bookingAttempted) validateLayanan();
  }

  function addToBooking(label, opts = {}) {
    const exists = selected.includes(label);
    if (!exists) selected.push(label);
    const dev = $('#bk-perangkat');
    if (opts.perangkat && dev && !dev.value && [...dev.options].some((o) => o.value === opts.perangkat)) dev.value = opts.perangkat;
    syncSelection();
    if (opts.scroll) {
      smoothScrollTo($('#booking'));
      setTimeout(() => restartAnim($('[data-field="layanan"]'), 'flash'), reduceMotion ? 0 : 500);
    }
    if (!opts.silent) {
      toast(exists ? `"${label}" sudah ada di form booking` : `"${label}" ditambahkan ke booking`, exists ? 'info' : 'success', opts.scroll ? null : { label: 'Isi form', href: '#booking' });
    }
  }

  function removeFromBooking(label) {
    const i = selected.indexOf(label);
    if (i > -1) selected.splice(i, 1);
    syncSelection();
  }

  function makeCode() {
    const prefix = (String(B.nama || 'SRV').replace(/[^a-z]/gi, '').slice(0, 3) || 'SRV').toUpperCase();
    const ymd = jakartaNow().iso.replace(/-/g, '').slice(2);
    return `${prefix}-${ymd}-${Math.floor(100 + Math.random() * 900)}`;
  }

  function formatTanggal(iso) {
    if (!iso) return '-';
    const [y, m, d] = iso.split('-').map(Number);
    return `${HARI[dayOfISO(iso)]}, ${d} ${BULAN[m - 1]} ${y}`;
  }

  function buildMessage(d) {
    const lines = [
      `Halo ${B.nama}, saya mau booking servis 🙏`,
      '',
      `*Kode Booking:* ${d.kode}`,
      `*Nama:* ${d.nama}`,
      `*No. WhatsApp:* ${d.wa}`,
      `*Perangkat:* ${d.perangkat}${d.merek ? ' – ' + d.merek : ''}`
    ];
    if (d.layanan.length) {
      lines.push('*Layanan:*');
      d.layanan.forEach((l) => lines.push(`• ${l}`));
    }
    if (d.keluhan) lines.push(`*Keluhan:* ${d.keluhan}`);
    lines.push(`*Metode:* ${d.metodeLabel}`);
    if (d.metode !== 'antar' && d.alamat) lines.push(`*Alamat:* ${d.alamat}`);
    lines.push(`*Jadwal:* ${formatTanggal(d.tanggal)}${d.jam ? ', sekitar pukul ' + d.jam + ' WIB' : ' (jam fleksibel)'}`);
    lines.push('', 'Mohon info ketersediaan jadwalnya. Terima kasih!');
    return lines.join('\n');
  }

  function copyText(text, container) {
    const legacy = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        (container || document.body).appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch (e) { return false; }
    };
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => legacy());
    }
    return Promise.resolve(legacy());
  }

  function openBookingModal(d) {
    const dlg = $('#bookingModal');
    if (!dlg) return;
    const msg = buildMessage(d);
    $('[data-bm-code]', dlg).textContent = d.kode;
    $('[data-bm-message]', dlg).innerHTML = esc(msg).replace(/\*(.+?)\*/g, '<strong>$1</strong>');
    const now = new Date();
    $('[data-bm-time]', dlg).textContent = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

    const send = $('[data-bm-send]', dlg);
    const sendLabel = $('span', send);
    send.href = waUrl(msg);
    send.onclick = () => {
      dlg.dataset.sent = '1';
      sendLabel.textContent = 'Membuka WhatsApp…';
      setTimeout(() => { sendLabel.textContent = 'Kirim ke WhatsApp'; }, 2500);
    };

    const copy = $('[data-bm-copy]', dlg);
    const copyLabel = $('span', copy);
    copy.onclick = () => copyText(msg, dlg).then((ok) => {
      copyLabel.textContent = ok ? 'Tersalin!' : 'Gagal menyalin';
      setTimeout(() => { copyLabel.textContent = 'Salin pesan'; }, 2000);
    });

    dlg.dataset.sent = '';
    const tw = $('#toasts');
    if (tw) tw.innerHTML = '';
    openDialog(dlg);
  }

  function initBooking() {
    const form = $('#bookingForm');
    if (!form) return;

    // Opsi jenis perangkat
    const dev = $('#bk-perangkat');
    dev.innerHTML = '<option value="">Pilih jenis perangkat…</option>' + (S.perangkat || []).map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join('');

    // Opsi tambah layanan
    const add = $('#bk-tambah');
    const groups = (S.kategori || []).map((c) => {
      const items = (S.layanan || []).filter((l) => l.kategori === c.id);
      return items.length ? `<optgroup label="${esc(c.nama)}">${items.map((l) => `<option value="${esc(l.nama)}">${esc(l.nama)}</option>`).join('')}</optgroup>` : '';
    }).join('');
    const paket = (S.paket || []).flatMap((p) => ['laptop', 'pc'].map((d) => {
      const v = `Paket ${p.nama} (${d === 'laptop' ? 'Laptop' : 'PC'}) – ${fmtRp(p.harga[d])}`;
      return `<option value="${esc(v)}">${esc(v)}</option>`;
    })).join('');
    add.innerHTML = '<option value="">+ Tambah layanan…</option>' + groups +
      (paket ? `<optgroup label="Paket Perawatan">${paket}</optgroup>` : '') +
      '<optgroup label="Lainnya"><option value="Belum tahu – minta diagnosa dulu">Belum tahu – minta diagnosa dulu</option></optgroup>';
    add.addEventListener('change', () => {
      if (!add.value) return;
      addToBooking(add.value, { silent: true });
      add.value = '';
    });
    $('#bk-chips').addEventListener('click', (e) => {
      const b = e.target.closest('[data-remove]');
      if (b) removeFromBooking(b.dataset.remove);
    });

    // Tanggal & jam — selalu mengikuti waktu toko (WIB) & jam buka hari itu
    const date = $('#bk-tanggal');
    const jam = $('#bk-jam');
    const hint = $('#bk-tanggal-hint');
    const jamHari = (iso) => (B.jamBuka || [])[dayOfISO(iso)];
    // Hari ini masih bisa dibooking bila toko buka & paling lambat 1 jam sebelum tutup
    const todayBookable = () => {
      const now = jakartaNow();
      const j = jamHari(now.iso);
      return !!(j && j.buka && now.min < toMin(j.tutup) - 60);
    };
    const firstBookable = () => {
      const now = jakartaNow();
      for (let i = 0; i <= 30; i++) {
        const d = addDays(now.iso, i);
        const j = jamHari(d);
        if (j && j.buka && (i > 0 || todayBookable())) return d;
      }
      return now.iso;
    };
    const setDateBounds = () => {
      const now = jakartaNow();
      date.min = now.iso;
      date.max = addDays(now.iso, 30);
    };
    setDateBounds();
    date.value = firstBookable();
    const buildSlots = () => {
      const now = jakartaNow();
      const d = date.value || now.iso;
      const j = jamHari(d);
      const prev = jam.value;
      let opts = '<option value="">Fleksibel / kapan saja</option>';
      if (j && j.buka) {
        const isToday = d === now.iso;
        for (let h = Math.floor(toMin(j.buka) / 60); h < Math.ceil(toMin(j.tutup) / 60); h++) {
          if (isToday && h * 60 <= now.min) continue;
          const v = pad2(h) + '.00';
          opts += `<option value="${v}">${v} WIB</option>`;
        }
        hint.textContent = `Buka ${fmtJam(j.buka)}–${fmtJam(j.tutup)} WIB pada hari ${HARI[dayOfISO(d)]}`;
      } else {
        hint.textContent = 'Kami tutup pada hari tersebut, silakan pilih tanggal lain.';
      }
      jam.innerHTML = opts;
      if ([...jam.options].some((o) => o.value === prev)) jam.value = prev;
    };
    date.addEventListener('change', buildSlots);
    buildSlots();

    // Metode servis
    const methods = $$('input[name="metode"]', form);
    const alamatField = $('#field-alamat');
    const getMethod = () => (methods.find((r) => r.checked) || { value: 'antar' }).value;
    const methodLabel = () => {
      const r = methods.find((x) => x.checked);
      return r ? $('strong', r.closest('.method')).textContent : 'Antar ke toko';
    };
    const syncMethod = () => {
      methods.forEach((r) => r.closest('.method').classList.toggle('is-checked', r.checked));
      alamatField.hidden = getMethod() === 'antar';
    };
    methods.forEach((r) => {
      r.addEventListener('change', syncMethod);
      r.addEventListener('focus', () => {
        let kb = true;
        try { kb = r.matches(':focus-visible'); } catch (e) { /* browser lama */ }
        if (kb) r.closest('.method').classList.add('has-focus');
      });
      r.addEventListener('blur', () => r.closest('.method').classList.remove('has-focus'));
    });
    syncMethod();

    // Validasi
    const rules = {
      nama: () => form.nama.value.trim().length >= 2 || 'Nama minimal 2 huruf',
      wa: () => /^(?:\+?62|0)8\d{7,12}$/.test(form.wa.value.replace(/[\s.()-]/g, '')) || 'Masukkan nomor WhatsApp yang valid, mis. 0812 3456 7890',
      perangkat: () => !!form.perangkat.value || 'Pilih jenis perangkat',
      layanan: () => selected.length > 0 || form.keluhan.value.trim().length >= 5 || 'Pilih minimal satu layanan atau tuliskan keluhan Anda',
      alamat: () => getMethod() === 'antar' || form.alamat.value.trim().length >= 8 || 'Alamat lengkap diperlukan untuk antar-jemput / home service',
      tanggal: () => {
        const v = form.tanggal.value;
        if (!v) return 'Pilih tanggal servis';
        setDateBounds();
        if (v < date.min) return 'Tanggal tidak boleh sebelum hari ini';
        if (v > date.max) return 'Booking maksimal 30 hari ke depan';
        const j = jamHari(v);
        if (!(j && j.buka)) return 'Kami tutup pada hari tersebut';
        if (v === date.min && !todayBookable()) return 'Booking untuk hari ini sudah ditutup, silakan pilih tanggal lain';
        return true;
      }
    };
    const setError = (name, msg) => {
      const field = $(`[data-field="${name}"]`, form);
      if (!field) return;
      field.classList.toggle('has-error', !!msg);
      const er = $('.field__error span', field);
      if (er) er.textContent = msg || '';
      $$('.input', field).forEach((inp) => inp.setAttribute('aria-invalid', msg ? 'true' : 'false'));
    };
    const validate = (name) => {
      if (!rules[name]) return true;
      const r = rules[name]();
      setError(name, r === true ? '' : r);
      return r === true;
    };
    validateLayanan = () => validate('layanan');

    const onEdit = (e) => {
      if (!bookingAttempted) return;
      const f = e.target.closest('[data-field]');
      if (f) validate(f.dataset.field);
      if (e.target.name === 'keluhan') validate('layanan');
      if (e.target.name === 'metode') validate('alamat');
    };
    form.addEventListener('input', onEdit);
    form.addEventListener('change', onEdit);
    $$('input.input, textarea.input', form).forEach((inp) => inp.addEventListener('blur', () => {
      const f = inp.closest('[data-field]');
      if (f && inp.value.trim()) validate(f.dataset.field);
    }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingAttempted = true;
      const ok = Object.keys(rules).map(validate).every(Boolean);
      if (!ok) {
        const first = $('.field.has-error', form);
        if (first) {
          first.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
          const inp = $('input:not([type=radio]), select, textarea', first);
          if (inp) setTimeout(() => inp.focus({ preventScroll: true }), 350);
        }
        toast('Mohon lengkapi data yang ditandai merah', 'error');
        return;
      }
      openBookingModal({
        kode: makeCode(),
        nama: form.nama.value.trim(),
        wa: form.wa.value.trim(),
        perangkat: form.perangkat.value,
        merek: form.merek.value.trim(),
        layanan: selected.slice(),
        keluhan: form.keluhan.value.trim(),
        metode: getMethod(),
        metodeLabel: methodLabel(),
        alamat: form.alamat.value.trim(),
        tanggal: form.tanggal.value,
        jam: form.jam.value
      });
    });

    resetBooking = () => {
      form.reset();
      selected.length = 0;
      bookingAttempted = false;
      setDateBounds();
      date.value = firstBookable();
      buildSlots();
      syncMethod();
      $$('.field.has-error', form).forEach((f) => f.classList.remove('has-error'));
      syncSelection();
    };
  }

  /* ------------------------------------------------------------------
     Status buka/tutup (WIB) + tabel jam operasional
     ------------------------------------------------------------------ */
  function jakartaNow() {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',
        weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      const get = (t) => (parts.find((p) => p.type === t) || {}).value;
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      const hour = parseInt(get('hour'), 10) % 24;
      const iso = `${get('year')}-${get('month')}-${get('day')}`;
      if (day < 0 || isNaN(hour) || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error('format');
      return { day, min: hour * 60 + parseInt(get('minute'), 10), iso };
    } catch (e) {
      const d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes(), iso: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}` };
    }
  }

  function openStatus() {
    const jam = B.jamBuka || [];
    const now = jakartaNow();
    const t = jam[now.day];
    if (t && t.buka) {
      const o = toMin(t.buka);
      const c = toMin(t.tutup);
      if (now.min >= o && now.min < c) {
        return { open: true, day: now.day, text: c - now.min <= 60 ? `Buka · segera tutup pukul ${fmtJam(t.tutup)} WIB` : `Buka sekarang · sampai ${fmtJam(t.tutup)} WIB` };
      }
      if (now.min < o) return { open: false, day: now.day, text: `Tutup · buka hari ini pukul ${fmtJam(t.buka)} WIB` };
    }
    for (let i = 1; i <= 7; i++) {
      const j = jam[(now.day + i) % 7];
      if (j && j.buka) return { open: false, day: now.day, text: `Tutup · buka ${i === 1 ? 'besok' : j.hari} pukul ${fmtJam(j.buka)} WIB` };
    }
    return { open: false, day: now.day, text: 'Sedang tutup' };
  }

  function initOpenStatus() {
    const apply = () => {
      const st = openStatus();
      $$('[data-open-status]').forEach((el) => {
        el.classList.toggle('is-open', st.open);
        el.classList.toggle('is-closed', !st.open);
        const t = $('.status-text', el);
        if (t) t.textContent = st.text;
      });
      const tb = $('[data-hours]');
      if (tb) {
        tb.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((i) => {
          const d = (B.jamBuka || [])[i];
          if (!d) return '';
          const today = i === st.day;
          return `<tr class="${today ? 'is-today' : ''}"><td>${esc(d.hari)}${today ? '<span class="today-badge">Hari ini</span>' : ''}</td><td>${d.buka ? `${fmtJam(d.buka)} – ${fmtJam(d.tutup)}` : 'Tutup'}</td></tr>`;
        }).join('');
      }
    };
    apply();
    setInterval(apply, 60 * 1000);
  }

  /* ------------------------------------------------------------------
     Peta (dimuat saat diklik agar halaman tetap ringan)
     ------------------------------------------------------------------ */
  function initMap() {
    const btn = $('[data-load-map]');
    if (!btn || !B.mapsEmbed) { if (btn) btn.hidden = true; return; }
    btn.addEventListener('click', () => {
      const box = btn.closest('.map');
      if ($('iframe', box)) return;
      const f = document.createElement('iframe');
      f.src = B.mapsEmbed;
      f.title = `Peta lokasi ${B.nama || ''}`;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      box.appendChild(f);
    });
  }

  /* ------------------------------------------------------------------
     Dialog (modal)
     ------------------------------------------------------------------ */
  function openDialog(dlg) {
    if (!dlg) return;
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute('open', '');
  }

  function closeDialog(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close();
    else { dlg.removeAttribute('open'); dlg.dispatchEvent(new Event('close')); }
  }

  function initDialogs() {
    $$('dialog.modal').forEach((dlg) => {
      dlg.addEventListener('click', (e) => { if (e.target === dlg) closeDialog(dlg); });
      $$('[data-close]', dlg).forEach((b) => b.addEventListener('click', () => closeDialog(dlg)));
    });
    const bm = $('#bookingModal');
    if (bm) bm.addEventListener('close', () => {
      if (bm.dataset.sent) {
        bm.dataset.sent = '';
        resetBooking();
        toast('Terima kasih! Tim kami akan segera membalas di WhatsApp.', 'success');
      }
    });
  }

  /* ------------------------------------------------------------------
     Inisialisasi
     ------------------------------------------------------------------ */
  /* Peringatan jika config.js hilang / ada salah ketik saat diedit */
  function initConfigWarning() {
    const err = window.__configError;
    if (window.SITE && !err) return;
    const bar = document.createElement('div');
    bar.setAttribute('role', 'alert');
    bar.style.cssText = 'position:relative;z-index:2000;background:#fef3c7;color:#78350f;border-bottom:1px solid #fcd34d;padding:.85rem 1.25rem;font-size:.92rem;line-height:1.55;font-weight:500;text-align:center';
    bar.innerHTML = err && err !== 'tidak ditemukan'
      ? `⚠️ <strong>config.js</strong> tidak bisa dibaca karena ada salah ketik <strong>${esc(err)}</strong>. Biasanya karena tanda koma <strong>,</strong> kutip <strong>"</strong> atau kurung yang terhapus. Perbaiki baris itu, atau unggah ulang config.js yang lama.`
      : '⚠️ File <strong>config.js</strong> tidak ditemukan. Pastikan config.js sudah diunggah ke GitHub, di tempat yang sama dengan index.html.';
    document.body.insertBefore(bar, document.body.firstChild);
    console.error('[config.js]', err || 'window.SITE tidak tersedia');
  }

  function init() {
    window.__siteReady = true;
    [
      initConfigWarning, bindBusiness, injectSchema, initHeader, initMobileMenu, initStats, initBrands,
      initServices, initPackages, initPriceList, initTestimonials, initFAQ,
      initBooking, initOpenStatus, initMap, initDialogs, initReveal
    ].forEach((fn) => {
      try { fn(); } catch (err) { console.error(`[${fn.name}]`, err); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

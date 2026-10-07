/* =========================================================
   SSAG Partners: site script
   ---------------------------------------------------------
   ✏️  EDIT YOUR DETAILS HERE. Everything on the page reads from CONFIG.
   ========================================================= */
const CONFIG = {
  // WhatsApp number in international format: country code + number, digits only.
  // Example: India +91 98765 43210  ->  '919876543210'
  whatsappNumber: '910000000000',

  phoneDisplay: '+91 00000 00000',
  phoneLink: '+910000000000',
  email: 'info@example.com',
  address: 'Office address, Pune, Maharashtra 411001',
  hours: 'Mon–Sat, 10:00 am – 7:00 pm',

  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    youtube: 'https://www.youtube.com/',
  },
};

/* ---------------------------------------------------------
   ✏️  PROPERTY LISTINGS
   These are SAMPLE listings. Replace them with your real ones.
   deal: 'sale' or 'rent'
   image: any file in assets/img/
   --------------------------------------------------------- */
const LISTINGS = [
  // ---- Flats ----
  { id: 'FL-101', category: 'flats', deal: 'sale', title: '2 BHK Apartment', location: 'Baner, Pune', price: '₹95 Lakh', facts: [['bed', '2 BHK'], ['area', '1,050 sq ft'], ['tag', 'Ready to move']], image: 'flats.jpg' },
  { id: 'FL-102', category: 'flats', deal: 'sale', title: '3 BHK Apartment', location: 'Kharadi, Pune', price: '₹1.45 Cr', facts: [['bed', '3 BHK'], ['area', '1,420 sq ft'], ['tag', 'Gated society']], image: 'flats.jpg' },
  { id: 'FL-103', category: 'flats', deal: 'sale', title: '3 BHK Premium Flat', location: 'Kothrud, Pune', price: '₹1.8 Cr', facts: [['bed', '3 BHK'], ['area', '1,600 sq ft'], ['tag', 'Under construction']], image: 'interior.jpg' },
  { id: 'FL-201', category: 'flats', deal: 'rent', title: '1 BHK Apartment', location: 'Hinjewadi Phase 1, Pune', price: '₹18,000', priceNote: '/month', facts: [['bed', '1 BHK'], ['area', '620 sq ft'], ['tag', 'Semi-furnished']], image: 'flats.jpg' },
  { id: 'FL-202', category: 'flats', deal: 'rent', title: '2 BHK Apartment', location: 'Wakad, Pune', price: '₹26,000', priceNote: '/month', facts: [['bed', '2 BHK'], ['area', '980 sq ft'], ['tag', 'Family preferred']], image: 'interior.jpg' },
  { id: 'FL-203', category: 'flats', deal: 'rent', title: '2 BHK Furnished Flat', location: 'Viman Nagar, Pune', price: '₹35,000', priceNote: '/month', facts: [['bed', '2 BHK'], ['area', '1,100 sq ft'], ['tag', 'Fully furnished']], image: 'flats.jpg' },

  // ---- Plots & Land ----
  { id: 'PL-101', category: 'plots', deal: 'sale', title: 'Residential NA Plot', location: 'Hinjewadi Phase 3, Pune', price: '₹62 Lakh', facts: [['area', '2,500 sq ft'], ['tag', 'Clear title']], image: 'plots.jpg' },
  { id: 'PL-102', category: 'plots', deal: 'sale', title: 'Corner Residential Plot', location: 'Wagholi, Pune', price: '₹38 Lakh', facts: [['area', '1,800 sq ft'], ['tag', 'Road-facing']], image: 'plots.jpg' },
  { id: 'PL-103', category: 'plots', deal: 'sale', title: 'Agricultural Land', location: 'Mulshi, Pune District', price: '₹85 Lakh', facts: [['area', '1 acre'], ['tag', 'Water access']], image: 'plots.jpg' },
  { id: 'PL-104', category: 'plots', deal: 'sale', title: 'Industrial Plot', location: 'Chakan, Pune', price: '₹2.4 Cr', facts: [['area', '10,000 sq ft'], ['tag', 'Near MIDC']], image: 'plots.jpg' },

  // ---- Commercial ----
  { id: 'CM-101', category: 'commercial', deal: 'sale', title: 'Retail Shop', location: 'FC Road, Pune', price: '₹1.1 Cr', facts: [['area', '450 sq ft'], ['tag', 'Ground floor']], image: 'commercial.jpg' },
  { id: 'CM-102', category: 'commercial', deal: 'sale', title: 'Office Space', location: 'Kharadi, Pune', price: '₹2.6 Cr', facts: [['area', '2,000 sq ft'], ['tag', 'IT corridor']], image: 'commercial.jpg' },
  { id: 'CM-201', category: 'commercial', deal: 'rent', title: 'Furnished Office', location: 'Baner, Pune', price: '₹85,000', priceNote: '/month', facts: [['area', '1,200 sq ft'], ['tag', '20 workstations']], image: 'commercial.jpg' },
  { id: 'CM-202', category: 'commercial', deal: 'rent', title: 'Showroom', location: 'Wakad, Pune', price: '₹2.2 Lakh', priceNote: '/month', facts: [['area', '2,800 sq ft'], ['tag', 'Main road']], image: 'commercial.jpg' },
  { id: 'CM-203', category: 'commercial', deal: 'rent', title: 'Warehouse', location: 'Chakan, Pune', price: '₹3.5 Lakh', priceNote: '/month', facts: [['area', '15,000 sq ft'], ['tag', 'Truck access']], image: 'plots.jpg' },
];

const CATEGORIES = {
  flats: {
    label: 'Flats', service: 'Flats', image: 'flats.jpg',
    modes: [
      { key: 'sale', label: 'Buy' },
      { key: 'rent', label: 'Rent' },
      { key: 'owner', label: 'Sell / Rent out' },
    ],
    owner: {
      title: ['Sell or rent out', 'your flat'],
      text: 'Reach serious buyers and tenants without the hassle. We handle pricing, marketing, site visits and the paperwork.',
      ticks: ['Free price estimate for your area', 'Verified buyers and tenants only', 'Help with agreements and registration'],
    },
  },
  plots: {
    label: 'Plots & Land', service: 'Plots & Land', image: 'plots.jpg',
    modes: [
      { key: 'sale', label: 'Buy' },
      { key: 'owner', label: 'Sell' },
    ],
    owner: {
      title: ['Sell your', 'plot or land'],
      text: 'From small residential plots to large land parcels, we find the right buyer and help with the title and documents.',
      ticks: ['Title and 7/12 extract checks', 'Valuation based on current local prices', 'Discreet, well-screened buyers'],
    },
  },
  commercial: {
    label: 'Commercial', service: 'Commercial Property', image: 'commercial.jpg',
    modes: [
      { key: 'sale', label: 'Buy' },
      { key: 'rent', label: 'Rent' },
      { key: 'owner', label: 'Sell / Lease out' },
    ],
    owner: {
      title: ['Sell or lease', 'commercial space'],
      text: 'Offices, shops, showrooms and warehouses. We match your space with businesses that are ready to move in.',
      ticks: ['Corporate and retail tenant network', 'Lease terms and rent advice', 'Help with agreements and paperwork'],
    },
  },
};

/* ========================================================= */

document.documentElement.classList.add('js');
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (name, cls = 'ic') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

function waLink(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function openWhatsApp(message) {
  const url = waLink(message);
  const win = window.open(url, '_blank', 'noopener');
  if (!win) window.location.href = url; // pop-up blocked: open in this tab instead
  return url;
}

/* ---------- Fill in config values ---------- */
function applyConfig() {
  $$('[data-config="phone"]').forEach((el) => (el.textContent = CONFIG.phoneDisplay));
  $$('[data-config="email"]').forEach((el) => (el.textContent = CONFIG.email));
  $$('[data-config="address"]').forEach((el) => (el.textContent = CONFIG.address));
  $$('[data-config="hours"]').forEach((el) => (el.textContent = CONFIG.hours));
  $$('[data-config-href]').forEach((el) => {
    const key = el.dataset.configHref;
    if (key === 'tel') el.href = `tel:${CONFIG.phoneLink}`;
    else if (key === 'mailto') el.href = `mailto:${CONFIG.email}`;
    else if (CONFIG.social[key]) el.href = CONFIG.social[key];
  });
  $$('.js-wa').forEach((el) => {
    el.href = waLink(el.dataset.waMsg || 'Hi SSAG Partners, I have an enquiry.');
    el.target = '_blank';
    el.rel = 'noopener';
  });
  $('#year').textContent = new Date().getFullYear();

  // Structured data for local search
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SSAG Partners',
    description: 'Architect services, interior design, and help to buy, sell or rent flats, plots and commercial property in Pune.',
    telephone: CONFIG.phoneLink,
    email: CONFIG.email,
    address: { '@type': 'PostalAddress', streetAddress: CONFIG.address, addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    areaServed: 'Pune, Maharashtra',
    sameAs: Object.values(CONFIG.social),
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

/* ---------- Listings ---------- */
function listingCard(l) {
  const isRent = l.deal === 'rent';
  const facts = l.facts.map(([ic, txt]) => `<li>${icon(ic)}${escapeHtml(txt)}</li>`).join('');
  return `
    <article class="listing">
      <div class="listing__media">
        <img src="assets/img/${l.image}" alt="${escapeHtml(l.title)} in ${escapeHtml(l.location)}" loading="lazy" width="800" height="500">
        <span class="badge ${isRent ? 'badge--rent' : ''}">${isRent ? 'For Rent' : 'For Sale'}</span>
        <span class="listing__ref">Ref ${escapeHtml(l.id)}</span>
      </div>
      <div class="listing__body">
        <p class="listing__price">${escapeHtml(l.price)} ${l.priceNote ? `<small>${escapeHtml(l.priceNote)}</small>` : ''}</p>
        <h4 class="listing__title">${escapeHtml(l.title)}</h4>
        <p class="listing__loc">${icon('pin')}${escapeHtml(l.location)}</p>
        <ul class="listing__facts">${facts}</ul>
        <div class="listing__actions">
          <a class="btn btn--whatsapp btn--sm" href="${waLink(listingMessage(l))}" target="_blank" rel="noopener">
            ${icon('whatsapp')} Enquire
          </a>
          <button class="btn btn--ghost btn--sm" type="button" data-callback="${escapeHtml(l.id)}">Call me back</button>
        </div>
      </div>
    </article>`;
}

function listingMessage(l) {
  return `Hi SSAG Partners, I'm interested in this property:\n\n*${l.title}* (Ref ${l.id})\n${l.location}\n${l.deal === 'rent' ? 'For Rent' : 'For Sale'}: ${l.price}${l.priceNote || ''}\n\nPlease share more details.`;
}

function ownerPanel(catKey) {
  const c = CATEGORIES[catKey];
  const o = c.owner;
  const msg = `Hi SSAG Partners, I'd like to ${o.title.join(' ').toLowerCase()}. Please get in touch.`;
  return `
    <div class="owner-cta">
      <div class="owner-cta__media"><img src="assets/img/${c.image}" alt="" loading="lazy"></div>
      <div class="owner-cta__body">
        <h3><strong>${escapeHtml(o.title[0])}</strong> <span>${escapeHtml(o.title[1])}</span></h3>
        <p>${escapeHtml(o.text)}</p>
        <ul class="ticks">${o.ticks.map((t) => `<li>${icon('check')}${escapeHtml(t)}</li>`).join('')}</ul>
        <div class="owner-cta__actions">
          <a class="btn btn--gold" href="${waLink(msg)}" target="_blank" rel="noopener">${icon('whatsapp')} List on WhatsApp</a>
          <button class="btn btn--outline-light" type="button" data-owner="${catKey}">Fill the enquiry form</button>
        </div>
      </div>
    </div>`;
}

function renderPanel(panel, mode) {
  const catKey = panel.dataset.category;
  const cat = CATEGORIES[catKey];
  mode = mode || cat.modes[0].key;
  panel.dataset.mode = mode;

  const seg = cat.modes.map((m) =>
    `<button type="button" data-mode="${m.key}" aria-pressed="${m.key === mode}">${escapeHtml(m.label)}</button>`).join('');

  let body;
  if (mode === 'owner') {
    body = ownerPanel(catKey);
  } else {
    const items = LISTINGS.filter((l) => l.category === catKey && l.deal === mode);
    body = items.length
      ? `<div class="listings">${items.map(listingCard).join('')}</div>
         <p class="listings-note">Can't find what you need? We have more properties than we list here. <a href="#contact" data-prefill="${escapeHtml(cat.service)}">Tell us your requirement</a>.</p>`
      : `<p class="listings-note">No listings right now. <a href="#contact" data-prefill="${escapeHtml(cat.service)}">Tell us what you need</a> and we'll find options for you.</p>`;
  }

  const modeLabel = cat.modes.find((m) => m.key === mode).label;
  panel.innerHTML = `
    <div class="panel-bar">
      <h3 class="panel-bar__title">${escapeHtml(cat.label)} <span>/ ${escapeHtml(modeLabel)}</span></h3>
      <div class="segmented" role="group" aria-label="${escapeHtml(cat.label)}: choose buy, rent or sell">${seg}</div>
    </div>
    <div class="panel-body">${body}</div>`;
}

function initListings() {
  $$('.tab-panel').forEach((p) => renderPanel(p));

  $('#properties').addEventListener('click', (e) => {
    const modeBtn = e.target.closest('button[data-mode]');
    if (modeBtn) {
      const panel = modeBtn.closest('.tab-panel');
      renderPanel(panel, modeBtn.dataset.mode);
      $(`button[data-mode="${modeBtn.dataset.mode}"]`, panel).focus();
      return;
    }
    const cb = e.target.closest('[data-callback]');
    if (cb) {
      const l = LISTINGS.find((x) => x.id === cb.dataset.callback);
      prefillForm({
        service: CATEGORIES[l.category].service,
        intent: l.deal === 'rent' ? 'Rent (as tenant)' : 'Buy',
        location: l.location.replace(/, Pune.*$/, ''),
        message: `Interested in ${l.title} (Ref ${l.id}), ${l.location}, ${l.price}${l.priceNote || ''}. Please call me back.`,
      });
      return;
    }
    const owner = e.target.closest('[data-owner]');
    if (owner) {
      const key = owner.dataset.owner;
      prefillForm({
        service: CATEGORIES[key].service,
        intent: 'Sell',
        message: `I'd like to ${CATEGORIES[key].owner.title.join(' ').toLowerCase()}.`,
      });
    }
  });
}

/* ---------- Tabs ---------- */
const tabs = $$('.tab');
function selectTab(key, { focus = false } = {}) {
  tabs.forEach((t) => {
    const on = t.dataset.tab === key;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    $('#' + t.getAttribute('aria-controls')).hidden = !on;
    if (on && focus) t.focus();
  });
  updateNavCurrent();
}
function initTabs() {
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); selectTab(tabs[n].dataset.tab, { focus: true }); }
    });
  });
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-tab-link]');
    if (link) selectTab(link.dataset.tabLink);
  });
  const fromHash = () => {
    const key = location.hash.slice(1);
    if (CATEGORIES[key]) selectTab(key);
  };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}

/* ---------- Enquiry form ---------- */
const PROPERTY_SERVICES = ['Flats', 'Plots & Land', 'Commercial Property'];
const form = $('#enquiry-form');

function syncIntent() {
  const checked = $$('input[name="services"]:checked', form).map((i) => i.value);
  const property = checked.filter((v) => PROPERTY_SERVICES.includes(v));
  const fs = $('#f-intent');
  fs.hidden = property.length === 0;
  // Plots can only be bought or sold, so turn off the rent options if plots is the only property type
  const onlyPlots = property.length === 1 && property[0] === 'Plots & Land';
  $$('[data-rentable] input', fs).forEach((r) => {
    r.disabled = onlyPlots;
    if (onlyPlots) r.checked = false;
  });
  if (fs.hidden) $$('input', fs).forEach((r) => (r.checked = false));
}

function prefillForm({ service, intent, location, message }) {
  if (service) {
    const box = $(`input[name="services"][value="${CSS.escape(service)}"]`, form);
    if (box) box.checked = true;
  }
  syncIntent();
  if (intent) {
    const r = $(`input[name="intent"][value="${CSS.escape(intent)}"]`, form);
    if (r && !r.disabled) r.checked = true;
  }
  if (location) $('#f-location').value = location;
  if (message) $('#f-message').value = message;
  clearError('services');
  $('#contact').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  setTimeout(() => $('#f-name').focus({ preventScroll: true }), prefersReducedMotion ? 0 : 600);
}

function setError(field, msg) {
  const map = { name: '#f-name', phone: '#f-phone', email: '#f-email', services: '#f-services' };
  const el = $(map[field]);
  el.setAttribute('aria-invalid', 'true');
  $(`#f-${field}-err`).textContent = msg;
}
function clearError(field) {
  const map = { name: '#f-name', phone: '#f-phone', email: '#f-email', services: '#f-services' };
  const el = $(map[field]);
  el.removeAttribute('aria-invalid');
  $(`#f-${field}-err`).textContent = '';
}

function normalisePhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d;
}

const validators = {
  name: () => {
    const v = $('#f-name').value.trim();
    if (!v) return 'Enter your full name.';
    if (v.length < 2) return 'Name should be at least 2 characters.';
    return '';
  },
  phone: () => {
    const raw = $('#f-phone').value.trim();
    if (!raw) return 'Enter your mobile number so we can reach you.';
    if (!/^[6-9]\d{9}$/.test(normalisePhone(raw))) return 'Enter a valid 10-digit Indian mobile number, e.g. 98765 43210.';
    return '';
  },
  email: () => {
    const v = $('#f-email').value.trim();
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email, e.g. name@example.com, or leave it blank.';
    return '';
  },
  services: () => ($$('input[name="services"]:checked', form).length ? '' : 'Select at least one service you are enquiring about.'),
};

function validateField(field) {
  const msg = validators[field]();
  msg ? setError(field, msg) : clearError(field);
  return msg;
}

function initForm() {
  $$('input[name="services"]', form).forEach((i) => i.addEventListener('change', () => {
    syncIntent();
    if ($('#f-services').hasAttribute('aria-invalid')) validateField('services');
  }));
  // Validate on blur; once a field is in error, re-check while typing so the error clears
  ['name', 'phone', 'email'].forEach((f) => {
    const el = $(`#f-${f}`);
    el.addEventListener('blur', () => { if (el.value.trim()) validateField(f); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validateField(f); });
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-prefill]');
    if (a) { e.preventDefault(); prefillForm({ service: a.dataset.prefill }); }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = $('#form-status');
    status.textContent = ''; status.className = 'form-status';

    const order = ['name', 'phone', 'email', 'services'];
    const errors = order.map((f) => [f, validateField(f)]).filter(([, m]) => m);
    const summary = $('#error-summary');

    if (errors.length) {
      const target = { name: 'f-name', phone: 'f-phone', email: 'f-email', services: 'f-services' };
      $('ul', summary).innerHTML = errors.map(([f, m]) => `<li><a href="#${target[f]}">${escapeHtml(m)}</a></li>`).join('');
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    const data = new FormData(form);
    const services = data.getAll('services');
    const lines = [
      'Hi SSAG Partners, I have an enquiry.',
      '',
      `*Name:* ${data.get('name').trim()}`,
      `*Mobile:* ${data.get('phone').trim()}`,
    ];
    if (data.get('email').trim()) lines.push(`*Email:* ${data.get('email').trim()}`);
    lines.push(`*Services:* ${services.join(', ')}`);
    if (data.get('intent')) lines.push(`*Looking to:* ${data.get('intent')}`);
    if (data.get('location').trim()) lines.push(`*Preferred area:* ${data.get('location').trim()}`);
    if (data.get('budget')) lines.push(`*Budget:* ${data.get('budget')}`);
    if (data.get('message').trim()) lines.push('', `*Details:* ${data.get('message').trim()}`);

    const url = openWhatsApp(lines.join('\n'));
    status.innerHTML = `${icon('check')} WhatsApp has opened with your enquiry. Tap <strong>Send</strong> to reach us. <a href="${url}" target="_blank" rel="noopener">Didn't open? Click here.</a>`;
    status.classList.add('is-success');
  });

  // Error-summary links: focus the field instead of just jumping
  $('#error-summary').addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const target = $(a.getAttribute('href'));
    const focusable = target.matches('fieldset') ? $('input', target) : target;
    target.scrollIntoView({ block: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    focusable.focus({ preventScroll: true });
  });
}

/* ---------- Hero quick bar ---------- */
function initQuickbar() {
  const qb = $('#quickbar');
  const svc = $('#qb-service');
  const intent = $('#qb-intent');
  const wrap = $('#qb-intent-wrap');
  const rentOpt = $$('option', intent).find((o) => o.value === 'Rent');

  const sync = () => {
    const isProperty = PROPERTY_SERVICES.includes(svc.value);
    wrap.hidden = !isProperty;
    rentOpt.disabled = svc.value === 'Plots & Land';
    if (rentOpt.disabled && intent.value === 'Rent') intent.value = 'Buy';
  };
  svc.addEventListener('change', sync);
  sync();

  qb.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = $('#qb-location').value.trim();
    const isProperty = PROPERTY_SERVICES.includes(svc.value);
    const what = isProperty ? `I'm looking to *${intent.value.toLowerCase()}* ${svc.selectedOptions[0].text.toLowerCase()}` : `I'm interested in *${svc.value}*`;
    openWhatsApp(`Hi SSAG Partners, ${what}${loc ? ` in *${loc}*` : ' in Pune'}. Please share details.`);
  });
}

/* ---------- Header & navigation ---------- */
function initNav() {
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('.nav__toggle');
  const links = $('#nav-links');
  const scrim = document.createElement('div');
  scrim.className = 'nav-scrim';
  document.body.appendChild(scrim);

  const setOpen = (open) => {
    links.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('use', toggle).setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('a', links).focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  scrim.addEventListener('click', () => setOpen(false));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', () => setOpen(false));
}

let currentSection = '';
function updateNavCurrent() {
  let key = currentSection;
  if (key === 'properties') key = $('.tab[aria-selected="true"]').dataset.tab;
  $$('.nav__links a').forEach((a) => {
    const on = key && a.getAttribute('href') === `#${key}`;
    on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
  });
}
function initScrollSpy() {
  const ids = ['architecture', 'interiors', 'properties', 'contact'];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) currentSection = en.target.id;
      else if (currentSection === en.target.id) currentSection = '';
    });
    updateNavCurrent();
  }, { rootMargin: '-45% 0px -50% 0px' });
  ids.forEach((id) => io.observe(document.getElementById(id)));
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = $$('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      // small stagger between siblings
      const sibs = $$('.reveal', en.target.parentElement);
      const idx = Math.max(0, sibs.indexOf(en.target));
      en.target.style.transitionDelay = `${Math.min(idx, 5) * 50}ms`;
      en.target.classList.add('is-visible');
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => io.observe(el));
}

/* ---------- Boot ---------- */
applyConfig();
initListings();
initTabs();
initForm();
initQuickbar();
initNav();
initScrollSpy();
initReveal();

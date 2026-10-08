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
  // On phones the form sits below the contact details, so scroll straight to the form
  const target = window.matchMedia('(max-width: 960px)').matches ? form : $('#contact');
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
    header.classList.toggle('menu-open', open);
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
  const key = currentSection;
  // Flats / Plots / Commercial also point at #contact (to pre-fill the form), so they're left out here
  $$('.nav__links a:not([data-prefill])').forEach((a) => {
    const on = key && a.getAttribute('href') === `#${key}`;
    on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
  });
}
function initScrollSpy() {
  const ids = ['architecture', 'interiors', 'contact'];
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
initForm();
initQuickbar();
initNav();
initScrollSpy();
initReveal();

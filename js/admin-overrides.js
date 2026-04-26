/**
 * LUXFLY Birthday Site — Admin Overrides
 * Fetches content overrides from Cloudflare Worker KV and applies them to the live page.
 *
 * Include on every page: <script src="js/admin-overrides.js"></script>
 */
(function () {
  'use strict';

  const WORKER_URL = localStorage.getItem('luxfly_worker_url') || 'https://luxfly-birthday-admin.zoozoomfast.workers.dev';

  // ── TEXT MAP ──────────────────────────────────────────────────────────────
  // Maps KV key → CSS selector(s). Text content is replaced when a KV override exists.
  const TEXT_MAP = {
    // Homepage
    'home_hero_title':    '.lf-home-hero-title',
    'home_hero_sub':      '.lf-home-hero-sub',
    'home_trust_1':       '.lf-trust-1',
    'home_trust_2':       '.lf-trust-2',
    'home_trust_3':       '.lf-trust-3',
    'home_trust_4':       '.lf-trust-4',

    // Kids Birthday
    'kids_hero_title':    '.lf-kids-hero-title',
    'kids_hero_sub':      '.lf-kids-hero-sub',
    'kids_includes_h2':   '.lf-kids-includes-h2',

    // Teens Birthday
    'teens_hero_title':   '.lf-teens-hero-title',
    'teens_hero_sub':     '.lf-teens-hero-sub',

    // HighFly
    'highfly_hero_title': '.lf-highfly-hero-title',
    'highfly_hero_sub':   '.lf-highfly-hero-sub',

    // Kids Camp
    'camp_hero_title':    '.lf-camp-hero-title',
    'camp_hero_sub':      '.lf-camp-hero-sub',
  };

  // ── PRICE MAP ─────────────────────────────────────────────────────────────
  // Maps KV price key → CSS selector(s) on the page
  const PRICE_MAP = {
    'pkg_kids_weekday':          '.lf-kids-price-weekday',
    'pkg_kids_weekend_first':    '.lf-kids-price-wknd-first',
    'pkg_kids_weekend_after':    '.lf-kids-price-wknd-after',
    'pkg_kids_min':              '.lf-kids-min-participants',
    'pkg_teens_weekday':         '.lf-teens-price-weekday',
    'pkg_teens_weekend_first':   '.lf-teens-price-wknd-first',
    'pkg_teens_weekend_after':   '.lf-teens-price-wknd-after',
    'pkg_teens_min':             '.lf-teens-min-participants',
    'pkg_highfly':               '.lf-highfly-price',
    'pkg_photo':                 '.lf-addon-photo-price',
    'pkg_magnet':                '.lf-addon-magnet-price',
    'pkg_drinks':                '.lf-addon-drinks-price',
  };

  // ── FETCH & APPLY ─────────────────────────────────────────────────────────
  fetch(WORKER_URL + '/content')
    .then(r => r.ok ? r.json() : {})
    .then(data => {
      if (!data || typeof data !== 'object') return;

      // Apply text overrides
      Object.entries(TEXT_MAP).forEach(([key, selector]) => {
        if (data[key] !== undefined) {
          document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = data[key];
          });
        }
        // Also handle page-specific overrides saved via WYSIWYG editor
        const pageKey = 'page_' + key;
        if (data[pageKey] !== undefined) {
          document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = data[pageKey];
          });
        }
      });

      // Apply price overrides
      Object.entries(PRICE_MAP).forEach(([key, selector]) => {
        if (data[key] !== undefined) {
          const val = data[key];
          document.querySelectorAll(selector).forEach(el => {
            el.textContent = val;
          });
        }
      });

      // Apply color overrides via CSS variables
      const root = document.documentElement;
      if (data.clr_primary) root.style.setProperty('--pink', data.clr_primary);
      if (data.clr_bg)      root.style.setProperty('--bg-main', data.clr_bg);
      if (data.clr_accent)  root.style.setProperty('--dark-accent', data.clr_accent);

      // Apply font overrides
      if (data.font_heading) {
        document.querySelectorAll('h1,h2,h3,h4,[class*="Montserrat"]').forEach(el => {
          el.style.fontFamily = data.font_heading + ', sans-serif';
        });
      }

      // WYSIWYG image overrides — apply with fade-in to prevent flash of old image
      const pg = (location.pathname.split('/').pop() || 'index.html').replace('.html','').replace(/-/g,'_');
      const wImgKey = '_wysiwyg_' + pg + '_imgs';
      if (data[wImgKey]) {
        try {
          const imgOverrides = JSON.parse(data[wImgKey]);
          Object.entries(imgOverrides).forEach(([sel, src]) => {
            try { document.querySelectorAll(sel).forEach(el => {
              el.style.opacity = '0';
              el.style.transition = 'opacity 0.15s ease';
              el.src = src;
              el.addEventListener('load', () => { el.style.opacity = '1'; }, { once: true });
            }); } catch(e) {}
          });
        } catch(e) {}
      }

    })
    .catch(() => { /* Silently fail — never break the live site */ });

})();

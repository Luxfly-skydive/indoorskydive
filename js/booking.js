// ================================================================
// LUXFLY Birthday Site — Public Booking Flow
// Fetches available slots from Supabase and powers the book-now page
// ================================================================
(function() {
  'use strict';

  const SB_URL  = window.SUPABASE_URL  || 'https://YOUR_PROJECT_REF.supabase.co';
  const SB_ANON = window.SUPABASE_ANON || 'YOUR_ANON_KEY';

  // Wait for Supabase to load
  function init() {
    if (typeof supabase === 'undefined') {
      setTimeout(init, 100);
      return;
    }
    window._sb = supabase.createClient(SB_URL, SB_ANON);
    if (document.getElementById('slot-picker')) {
      loadSlots();
    }
  }

  // ── SLOT LOADING ──────────────────────────────────────────────
  async function loadSlots() {
    const container = document.getElementById('slot-picker');
    if (!container) return;

    const packageFilter = container.dataset.package || null;
    const today = new Date().toISOString().slice(0, 10);

    let q = window._sb
      .from('slots')
      .select(`
        id, date, start_time, package, max_capacity,
        bookings(id, payment_status)
      `)
      .eq('is_active', true)
      .gte('date', today)
      .order('date')
      .order('start_time')
      .limit(60);

    if (packageFilter) {
      q = q.eq('package', packageFilter);
    }

    const { data: slots, error } = await q;

    if (error) {
      container.innerHTML = '<p style="color:#888;">Could not load available slots. Please contact us directly.</p>';
      return;
    }

    const available = (slots || []).filter(s => {
      const booked = s.bookings.filter(b => b.payment_status === 'paid').length;
      return booked < s.max_capacity;
    });

    if (!available.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px;color:#888;">
          <div style="font-size:36px;margin-bottom:12px;">📅</div>
          <div>No available slots right now. Please email <a href="mailto:hello@luxfly.eu" style="color:#FF4FA3;">hello@luxfly.eu</a> or WhatsApp <strong>+32 2 320 55 09</strong>.</div>
        </div>`;
      return;
    }

    // Group by month
    const byMonth = {};
    available.forEach(s => {
      const month = s.date.slice(0, 7);
      if (!byMonth[month]) byMonth[month] = [];
      byMonth[month].push(s);
    });

    container.innerHTML = Object.entries(byMonth).map(([month, slots]) => `
      <div class="slot-month">
        <div class="slot-month-label">${new Date(month + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
        <div class="slot-grid">
          ${slots.map(s => {
            const booked = s.bookings.filter(b => b.payment_status === 'paid').length;
            const remaining = s.max_capacity - booked;
            const pct = Math.round(booked / s.max_capacity * 100);
            const urgent = remaining <= 3;
            return `
              <div class="slot-card ${urgent ? 'urgent' : ''}" data-slot-id="${s.id}" data-date="${s.date}" data-time="${s.start_time}" data-package="${s.package}" data-remaining="${remaining}" onclick="selectSlot(this)">
                <div class="slot-date">${new Date(s.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                <div class="slot-time">${s.start_time.slice(0, 5)}</div>
                <div class="slot-remaining ${urgent ? 'urgent' : ''}">${urgent ? `⚡ ${remaining} left` : `${remaining} spots`}</div>
              </div>`;
          }).join('')}
        </div>
      </div>`).join('');
  }

  // ── SLOT SELECTION ────────────────────────────────────────────
  window.selectSlot = function(el) {
    document.querySelectorAll('.slot-card.selected').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    const slotId   = el.dataset.slotId;
    const date     = el.dataset.date;
    const time     = el.dataset.time;
    const pkg      = el.dataset.package;
    const left     = el.dataset.remaining;

    // Fill hidden fields in booking form
    ['slot_id','slot_date','slot_time','slot_package'].forEach(id => {
      const inp = document.getElementById(id);
      if (inp) {
        inp.value = id === 'slot_id' ? slotId
                  : id === 'slot_date' ? date
                  : id === 'slot_time' ? time
                  : pkg;
      }
    });

    // Show selection summary
    const summary = document.getElementById('selected-slot-summary');
    if (summary) {
      const labels = {kids_weekday:'Kids (4–13) Weekday',kids_weekend:'Kids (4–13) Weekend',teens_weekday:'Teen (14–17) Weekday',teens_weekend:'Teen (14–17) Weekend'};
      summary.style.display = 'block';
      summary.innerHTML = `
        <strong>Selected:</strong> ${new Date(date).toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'long',year:'numeric'})} at ${time.slice(0,5)}<br>
        <span style="color:#FF4FA3;">${labels[pkg]}</span> · ${left} spots remaining`;
    }

    // Scroll to booking form
    const form = document.getElementById('booking-form');
    if (form) form.scrollIntoView({behavior:'smooth', block:'start'});
  };

  // ── PRICE CALCULATION ─────────────────────────────────────────
  const PRICES = {
    kids_weekday:  { base: 3200  },   // €32/child
    kids_weekend:  { base: 6916, discountFrom: 7, discountPrice: 5900 },  // €69.16 → €59
    teens_weekday: { base: 4500  },   // €45/teen
    teens_weekend: { base: 7900, discountFrom: 7, discountPrice: 5900 },  // €79 → €59
  };
  const ADDON_PRICES = { highfly: 1500, photo: 1500, magnet: 350, drinks: 300 };

  window.calculateTotal = function() {
    const pkg  = document.getElementById('slot_package')?.value;
    const n    = parseInt(document.getElementById('num_participants')?.value || 0);
    const hf   = parseInt(document.getElementById('highfly_count')?.value || 0);
    const photo= document.getElementById('photo')?.checked ? 1 : 0;
    const mag  = parseInt(document.getElementById('magnet_qty')?.value || 0);
    const drk  = parseInt(document.getElementById('drinks_qty')?.value || 0);

    if (!pkg || n < 6) return;

    const p = PRICES[pkg];
    let base = 0;
    if (p.discountFrom) {
      const firstGroup = Math.min(n, p.discountFrom - 1);
      const discountGroup = Math.max(0, n - (p.discountFrom - 1));
      base = firstGroup * p.base + discountGroup * p.discountPrice;
    } else {
      base = n * p.base;
    }
    const addons = hf * ADDON_PRICES.highfly + photo * ADDON_PRICES.photo + mag * ADDON_PRICES.magnet + drk * ADDON_PRICES.drinks;
    const total = base + addons;

    const el = document.getElementById('price-total');
    if (el) el.textContent = '€' + (total / 100).toFixed(2).replace('.', ',');

    const hiddenTotal = document.getElementById('total_amount_cents');
    if (hiddenTotal) hiddenTotal.value = total;

    return total;
  };

  // Auto-fill magnet and drinks qty when participants count changes
  window.syncQty = function() {
    const n = parseInt(document.getElementById('num_participants')?.value || 0);
    const magEl = document.getElementById('magnet_qty');
    const drkEl = document.getElementById('drinks_qty');
    if (magEl && !magEl.dataset.manuallyEdited) magEl.value = n;
    if (drkEl && !drkEl.dataset.manuallyEdited) drkEl.value = n;
    calculateTotal();
  };

  document.addEventListener('DOMContentLoaded', init);
})();

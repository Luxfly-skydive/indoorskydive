(function () {
  'use strict';

  const WORKER_URL = 'https://luxfly-birthday-admin.zoozoomfast.workers.dev/chat';
  const LANG = 'fr';
  let chatHistory = [];

  function formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#FF4FA3">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  const css = `
    #lf-chat-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #FF4FA3; border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(255,79,163,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s; outline: none;
    }
    #lf-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(255,79,163,0.6); }
    #lf-chat-btn svg { pointer-events: none; }
    #lf-chat-badge {
      position: absolute; top: -4px; right: -4px; width: 18px; height: 18px;
      background: #fff; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 11px; font-weight: 700; color: #FF4FA3;
    }
    #lf-chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 360px; max-width: calc(100vw - 40px);
      height: 520px; max-height: calc(100vh - 130px);
      background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; display: flex; flex-direction: column;
      box-shadow: 0 16px 48px rgba(0,0,0,0.6); overflow: hidden;
      transform: scale(0.95) translateY(10px); opacity: 0; pointer-events: none;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s ease;
    }
    #lf-chat-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
    #lf-chat-header {
      background: #111; border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 14px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    }
    #lf-chat-header-avatar {
      width: 36px; height: 36px; border-radius: 50%; background: #FF4FA3;
      display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
    }
    #lf-chat-header-info { flex: 1; }
    #lf-chat-header-name {
      font-family: 'Montserrat','Inter',sans-serif; font-size: 13px;
      font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #fff;
    }
    #lf-chat-header-status { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 1px; }
    #lf-chat-close {
      background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.5);
      padding: 4px; border-radius: 6px; display: flex; align-items: center;
      justify-content: center; transition: color 0.2s;
    }
    #lf-chat-close:hover { color: #fff; }
    #lf-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
    }
    #lf-chat-messages::-webkit-scrollbar { width: 4px; }
    #lf-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #lf-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
    .lf-msg {
      max-width: 85%; padding: 10px 13px; border-radius: 12px;
      font-size: 13.5px; line-height: 1.55; font-family: 'Inter',sans-serif; word-break: break-word;
    }
    .lf-msg-bot {
      background: #1a1a1a; color: rgba(255,255,255,0.88);
      border-bottom-left-radius: 3px; align-self: flex-start; border: 1px solid rgba(255,255,255,0.07);
    }
    .lf-msg-bot p { margin: 0 0 6px; }
    .lf-msg-bot p:last-child { margin-bottom: 0; }
    .lf-msg-user { background: #FF4FA3; color: #fff; border-bottom-right-radius: 3px; align-self: flex-end; }
    .lf-msg-typing { display: flex; align-items: center; gap: 4px; padding: 12px 14px; }
    .lf-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: lf-bounce 1.2s infinite; }
    .lf-dot:nth-child(2) { animation-delay: 0.2s; }
    .lf-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes lf-bounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }
    #lf-chat-quick { padding: 8px 14px 4px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
    .lf-quick-btn {
      background: rgba(255,79,163,0.1); border: 1px solid rgba(255,79,163,0.3);
      border-radius: 20px; color: #FF4FA3; font-size: 12px; font-family: 'Inter',sans-serif;
      padding: 5px 11px; cursor: pointer; transition: background 0.2s; white-space: nowrap;
    }
    .lf-quick-btn:hover { background: rgba(255,79,163,0.2); }
    #lf-chat-form {
      padding: 10px 12px 12px; display: flex; gap: 8px;
      border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0;
    }
    #lf-chat-input {
      flex: 1; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; color: #fff; font-size: 16px; font-family: 'Inter',sans-serif; touch-action: manipulation;
      padding: 9px 13px; outline: none; resize: none; line-height: 1.4;
      max-height: 80px; transition: border-color 0.2s;
    }
    #lf-chat-input::placeholder { color: rgba(255,255,255,0.3); font-size: 14px; }
    #lf-chat-input:focus { border-color: rgba(255,79,163,0.5); }
    #lf-chat-send {
      width: 38px; height: 38px; border-radius: 10px; background: #FF4FA3; border: none;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; align-self: flex-end; transition: opacity 0.2s, transform 0.15s;
    }
    #lf-chat-send:hover { opacity: 0.85; transform: scale(1.05); }
    @media (hover: none) and (pointer: coarse) {
      #lf-chat-window { transform: translateY(24px); transition: transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.22s; }
      #lf-chat-window.open { transform: translateY(0); }
      #lf-chat-window, #lf-chat-btn { touch-action: pan-x pan-y; }
    }
    @media (max-width: 480px) {
      #lf-chat-window { right: 12px; bottom: 90px; width: calc(100vw - 24px); }
      #lf-chat-btn { bottom: 20px; right: 16px; }
    }
    #lf-chat-bubble {
      position: fixed; bottom: 96px; right: 16px; z-index: 9998;
      background: #FF4FA3; color: #fff;
      padding: 9px 15px; border-radius: 18px 18px 4px 18px;
      font-size: 13px; font-weight: 600; line-height: 1.3;
      font-family: 'Montserrat','Inter',sans-serif;
      box-shadow: 0 4px 20px rgba(255,79,163,0.45);
      white-space: nowrap; cursor: pointer;
      animation: lf-bubble-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    }
    #lf-chat-bubble::after {
      content: ''; position: absolute; bottom: -7px; right: 20px;
      width: 0; height: 0; border-left: 7px solid transparent;
      border-right: 4px solid transparent; border-top: 8px solid #FF4FA3;
    }
    @keyframes lf-bubble-in { from { opacity: 0; transform: translateY(14px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .lf-bubble-out { animation: lf-bubble-out 0.25s ease forwards !important; }
    @keyframes lf-bubble-out { to { opacity: 0; transform: translateY(8px) scale(0.92); } }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="lf-chat-btn" aria-label="Chat">
      <span id="lf-chat-badge" style="display:none">1</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.06 2 11c0 2.64 1.18 5.02 3.07 6.72L4 22l4.54-2.04A10.7 10.7 0 0012 20c5.52 0 10-4.06 10-9S17.52 2 12 2z" fill="white"/>
      </svg>
    </button>
    <div id="lf-chat-window" role="dialog" aria-label="Luxfly Chat">
      <div id="lf-chat-header">
        <div id="lf-chat-header-avatar">✈</div>
        <div id="lf-chat-header-info">
          <div id="lf-chat-header-name">Zoom</div>
          <div id="lf-chat-header-status">En ligne · Toujours là pour vous aider</div>
        </div>
        <button id="lf-chat-close" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div id="lf-chat-messages"></div>
      <div id="lf-chat-quick">
        <button class="lf-quick-btn" data-q="Quels sont vos prix ?">💰 Prix</button>
        <button class="lf-quick-btn" data-q="Quels sont vos horaires ?">🕐 Horaires</button>
        <button class="lf-quick-btn" data-q="C'est adapté aux enfants ?">👦 Enfants</button>
        <button class="lf-quick-btn" data-q="Comment réserver ?">🎟️ Réserver</button>
        <button class="lf-quick-btn" data-q="Où êtes-vous situés ?">📍 Localisation</button>
        <button class="lf-quick-btn" data-q="Quel forfait recommandez-vous ?">⭐ Recommander</button>
      </div>
      <form id="lf-chat-form" autocomplete="off">
        <textarea id="lf-chat-input" placeholder="Posez votre question…" rows="1"></textarea>
        <button type="submit" id="lf-chat-send" aria-label="Send">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  `);

  const btn      = document.getElementById('lf-chat-btn');
  const win      = document.getElementById('lf-chat-window');
  const closeBtn = document.getElementById('lf-chat-close');
  const msgs     = document.getElementById('lf-chat-messages');
  const form     = document.getElementById('lf-chat-form');
  const input    = document.getElementById('lf-chat-input');
  const qBtns    = document.querySelectorAll('.lf-quick-btn');
  let isOpen = false, greeted = false;

  function addMsg(html, role) {
    const el = document.createElement('div');
    el.className = 'lf-msg ' + (role === 'user' ? 'lf-msg-user' : 'lf-msg-bot');
    if (role === 'user') { el.textContent = html; }
    else { el.innerHTML = '<p>' + formatResponse(html) + '</p>'; }
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'lf-msg lf-msg-bot lf-msg-typing'; el.id = 'lf-typing';
    el.innerHTML = '<div class="lf-dot"></div><div class="lf-dot"></div><div class="lf-dot"></div>';
    msgs.appendChild(el); msgs.scrollTop = msgs.scrollHeight;
  }
  function removeTyping() { const el = document.getElementById('lf-typing'); if (el) el.remove(); }
  function toggleQuickBtns(show) { document.getElementById('lf-chat-quick').style.display = show ? 'flex' : 'none'; }

  // ─── Send (Gemini via Worker) ────────────────────────────────────────────────
  let sending = false;
  async function sendMessage(text) {
    if (sending) return;
    sending = true;
    setTimeout(() => { sending = false; }, 1500);
    text = text.trim();
    if (!text) return;
    toggleQuickBtns(false);
    addMsg(text, 'user');
    input.value = ''; input.style.height = 'auto';
    showTyping();
    chatHistory.push({ role: 'user', content: text });
    if (chatHistory.length > 20) chatHistory.splice(0, 2);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: LANG, history: chatHistory.slice(-10) }),
      });
      const data = await res.json();
      const reply = data.reply || 'Something went wrong. Email hello@luxfly.eu 📧';
      removeTyping(); addMsg(reply, 'bot');
      chatHistory.push({ role: 'assistant', content: reply });
    } catch {
      removeTyping();
      addMsg('Problème de connexion. Écrivez à **hello@luxfly.eu** ou WhatsApp **+32 2 320 55 09** 😊', 'bot');
    }
    input.focus();
  }

  // ─── Open / Close ─────────────────────────────────────────────────────────
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  let _lockedScrollY = 0;
  function lockBodyScroll() {
    _lockedScrollY = window.scrollY;
    document.body.style.cssText += ';position:fixed;top:-' + _lockedScrollY + 'px;width:100%;overflow-y:scroll';
  }
  function unlockBodyScroll() {
    document.body.style.position = ''; document.body.style.top = '';
    document.body.style.width = ''; document.body.style.overflowY = '';
    window.scrollTo(0, _lockedScrollY);
  }

  function openChat() {
    isOpen = true; dismissBubble(); win.classList.add('open');
    const badge = document.getElementById('lf-chat-badge');
    if (badge) badge.style.display = 'none';
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;
    if (!greeted) {
      greeted = true;
      setTimeout(() => { addMsg('Salut ! 👋 Je suis Zoom, l\'assistant anniversaire LUXFLY. Posez-moi des questions sur nos forfaits enfants et ados — prix, HighFly, réservation, localisation et plus encore !', 'bot'); }, 300);
    }
    if (isTouch) { lockBodyScroll(); } else { input.focus(); }
  }

  function closeChat() {
    isOpen = false; win.classList.remove('open');
    btn.innerHTML = `<span id="lf-chat-badge" style="display:none">1</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.06 2 11c0 2.64 1.18 5.02 3.07 6.72L4 22l4.54-2.04A10.7 10.7 0 0012 20c5.52 0 10-4.06 10-9S17.52 2 12 2z" fill="white"/></svg>`;
    if (isTouch) unlockBodyScroll();
  }

  btn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(input.value); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 80) + 'px'; });
  qBtns.forEach(b => b.addEventListener('click', () => sendMessage(b.dataset.q)));

  function dismissBubble() {
    const b = document.getElementById('lf-chat-bubble');
    if (!b) return; b.classList.add('lf-bubble-out');
    setTimeout(() => b && b.parentNode && b.parentNode.removeChild(b), 260);
  }
  const bubble = document.createElement('div');
  bubble.id = 'lf-chat-bubble'; bubble.textContent = 'Une question ? Demandez ici !';
  bubble.setAttribute('role','button'); document.body.appendChild(bubble);
  bubble.addEventListener('click', () => { dismissBubble(); openChat(); });
  setTimeout(() => dismissBubble(), 9000);

})();

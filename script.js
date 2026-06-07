/* ============================================================
   CAMORA IA — script.js
   ============================================================ */

/* ── CONFIG — editar aquí los datos de contacto ── */
const CONFIG = {
  whatsapp: "573006526432",           // número sin + ni espacios
  whatsappMsg: "Hola, quiero solicitar un diagnóstico gratuito con CAMORA IA.",
  email: "contacto@camoraia.com",
  instagram: "https://www.instagram.com/camora.ia.colombia",
};

/* ── MOBILE NAV ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger?.addEventListener('click', () => {
  const open = mobileNav.style.display === 'flex';
  mobileNav.style.display = open ? 'none' : 'flex';
});

// Cerrar al hacer click en enlace
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => { mobileNav.style.display = 'none'; });
});

/* ── SMOOTH SCROLL ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const offset = 72;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── SCROLL REVEAL ──────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── WHATSAPP FLOAT ─────────────────────────────── */
const waFloat = document.getElementById('wa-float');
if (waFloat) {
  waFloat.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`;
}

/* ── CTA BUTTONS → CONTACTO ─────────────────────── */
document.querySelectorAll('.cta-scroll').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById('contacto');
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  });
});

/* ── PLAN BUTTONS → WA ──────────────────────────── */
document.querySelectorAll('.btn-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.plan || 'un plan';
    const msg = `Hola, estoy interesado en el ${plan} de CAMORA IA. ¿Podemos agendar un diagnóstico?`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  });
});

/* ── FORMULARIO NETLIFY ──────────────────────────── */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });
    if (res.ok) {
      formSuccess.style.display = 'block';
      form.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    } else { throw new Error('Error'); }
  } catch {
    btn.textContent = 'Solicitar diagnóstico';
    btn.disabled = false;
    alert('Hubo un error. Por favor escríbenos directamente al WhatsApp.');
  }
  btn.textContent = 'Solicitar diagnóstico';
  btn.disabled = false;
});

/* ── HEADER SCROLL SHADOW ───────────────────────── */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── WA CHAT HERO ANIMATION ─────────────────────── */
const chatMsgs = [
  { type: 'in',  text: 'Hola, ¿cuánto cuesta el diseño de sonrisa?' },
  { type: 'bot', text: '¡Hola! Soy el asistente de la clínica. ¿Me confirmas tu nombre para agendarte una valoración gratuita?' },
  { type: 'in',  text: 'Claro, soy María Fernanda' },
  { type: 'bot', text: '✅ ¡Listo, María! Te agendé para el martes 10 de junio a las 4:30 PM. ¡Te esperamos!' },
];

let msgIdx = 0;
const chatBody = document.getElementById('hero-chat-body');

function addChatMsg() {
  if (!chatBody || msgIdx >= chatMsgs.length) { msgIdx = 0; return; }
  const m = chatMsgs[msgIdx];
  const div = document.createElement('div');
  div.className = `bubble ${m.type}`;
  if (m.type === 'bot') {
    const lbl = document.createElement('div');
    lbl.className = 'bubble bot-label';
    lbl.textContent = '🤖 Camora AI';
    div.appendChild(lbl);
  }
  const txt = document.createElement('span');
  txt.textContent = m.text;
  div.appendChild(txt);
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  msgIdx++;
  if (msgIdx < chatMsgs.length) setTimeout(addChatMsg, 1800);
  else setTimeout(() => { if(chatBody) chatBody.innerHTML = ''; msgIdx = 0; setTimeout(addChatMsg,2000); }, 4000);
}
setTimeout(addChatMsg, 1200);

console.log('%c CAMORA IA 🚀', 'color:#7B6FE8;font-size:20px;font-weight:bold');
console.log('%c camoraia.com — Automatización que convierte', 'color:#2EC98F;font-size:13px');

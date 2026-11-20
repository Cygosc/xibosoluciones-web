// Menú en el celular
const boton = document.querySelector('.top__menu');
const nav = document.querySelector('.top__nav');
boton.addEventListener('click', () => {
  const abierto = nav.classList.toggle('abierto');
  boton.setAttribute('aria-expanded', abierto);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('abierto');
  boton.setAttribute('aria-expanded', false);
}));

// Comentarios sobre las apps: abre WhatsApp con la app elegida y el texto escrito
const WHATSAPP = '5491164583428';
const form = document.getElementById('form-sug');
const app = form.querySelector('select');
const idea = form.querySelector('textarea');
const appErr = document.getElementById('app-err');
const err = document.getElementById('sug-err');
form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = idea.value.trim();
  appErr.hidden = !!app.value;
  err.hidden = !!texto;
  if (!app.value) { app.focus(); return; }
  if (!texto) { idea.focus(); return; }
  const msg = 'Hola Xibo Soluciones! Tengo un comentario sobre ' + app.value + ': ' + texto;
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
});
app.addEventListener('change', () => { appErr.hidden = true; });
idea.addEventListener('input', () => { err.hidden = true; });

// Cubo de la portada: sigue un poco al mouse
const cubo = document.querySelector('.hero__cubo');
const hero = document.querySelector('.hero');
if (cubo && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 14;
    const y = ((e.clientY - r.top) / r.height - .5) * 14;
    cubo.style.transform = `translate(${x}px, ${y}px)`;
  });
  hero.addEventListener('mouseleave', () => { cubo.style.transform = ''; });
}

// Año del pie
document.getElementById('anio').textContent = new Date().getFullYear();

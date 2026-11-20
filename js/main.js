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

// Sugerencias: abre WhatsApp con el texto escrito
const WHATSAPP = '5491164583428';
const form = document.getElementById('form-sug');
const err = document.getElementById('sug-err');
const idea = form.querySelector('textarea');
form.setAttribute('novalidate', '');
form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = idea.value.trim();
  if (!texto) { err.hidden = false; idea.focus(); return; }
  const msg = 'Hola Xibo Soluciones! Tengo una idea: ' + texto;
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
});
idea.addEventListener('input', () => { err.hidden = true; });

// Año del pie
document.getElementById('anio').textContent = new Date().getFullYear();

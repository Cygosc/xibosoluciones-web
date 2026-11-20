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

// Año del pie y años desde 2017 (se actualizan solos)
const hoy = new Date().getFullYear();
document.getElementById('anio').textContent = hoy;
document.getElementById('anios').textContent = (hoy - 2017) + ' años';

// Demo de PetroExcel: carga valores inventados y "genera" el certificado
const demo = document.getElementById('demo');
if (demo) {
  const campos = [...demo.querySelectorAll('.demo__form label span')];
  const celdas = [...demo.querySelectorAll('.demo__pdf td')];
  const btn = demo.querySelector('.demo__btn');
  const otra = demo.querySelector('.demo__otra');
  const espera = ms => new Promise(r => setTimeout(r, ms));
  let corriendo = false;

  const reiniciar = () => {
    campos.forEach(c => { c.textContent = ''; c.classList.remove('activo'); });
    celdas.forEach(c => { c.textContent = '—'; c.classList.remove('nuevo'); });
    demo.classList.remove('listo');
  };
  const final = () => {
    campos.forEach((c, i) => { c.textContent = c.dataset.v; celdas[i].textContent = c.dataset.v; });
    demo.classList.add('listo');
  };

  async function correr() {
    if (corriendo) return;
    corriendo = true; otra.hidden = true; reiniciar();
    await espera(500);
    for (const c of campos) {
      c.classList.add('activo');
      for (const letra of c.dataset.v) { c.textContent += letra; await espera(110); }
      await espera(200);
      c.classList.remove('activo');
    }
    btn.classList.add('click'); await espera(200); btn.classList.remove('click');
    demo.classList.add('listo');
    for (let i = 0; i < celdas.length; i++) {
      await espera(250);
      celdas[i].textContent = campos[i].dataset.v;
      celdas[i].classList.add('nuevo');
    }
    await espera(800);
    celdas.forEach(c => c.classList.remove('nuevo'));
    otra.hidden = false; corriendo = false;
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    final();
  } else {
    new IntersectionObserver((entradas, obs) => {
      if (entradas[0].isIntersecting) { correr(); obs.disconnect(); }
    }, { threshold: .5 }).observe(demo);
    otra.addEventListener('click', correr);
  }
}

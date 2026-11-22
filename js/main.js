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

// Botón "Compartir" de cada app: en el celular abre el menú de compartir (WhatsApp, Instagram...);
// en la PC, si no hay menú, abre WhatsApp con el link listo.
document.querySelectorAll('.compartir').forEach(b => b.addEventListener('click', async () => {
  const titulo = b.dataset.titulo, url = b.dataset.url;
  const texto = 'Mirá esta app, te puede servir: ' + titulo;
  if (navigator.share) {
    try { await navigator.share({ title: titulo, text: texto, url }); } catch (e) { /* cancelado */ }
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url), '_blank', 'noopener');
  }
}));

// Cubo de la portada: sigue un poco al mouse
const cubo = document.querySelector('.hero__cubo');
const hero = document.querySelector('.hero');
if (cubo && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 22;
    const y = ((e.clientY - r.top) / r.height - .5) * 22;
    cubo.style.transform = `translate(${x}px, ${y}px)`;
  });
  hero.addEventListener('mouseleave', () => { cubo.style.transform = ''; });
}

// Barra fija de descarga: aparece después de la portada y se esconde al llegar al cierre "Descargalas gratis"
const barra = document.getElementById('barra');
const cierre = document.querySelector('.cierre');
if (barra && 'IntersectionObserver' in window) {
  let pasoPortada = false, enCierre = false;
  const act = () => barra.classList.toggle('visible', pasoPortada && !enCierre);
  new IntersectionObserver(([e]) => { pasoPortada = !e.isIntersecting; act(); }).observe(document.querySelector('.hero'));
  if (cierre) new IntersectionObserver(([e]) => { enCierre = e.isIntersecting || e.boundingClientRect.top < 0; act(); }).observe(cierre);
}

// Año del pie (se actualiza solo)
document.getElementById('anio').textContent = new Date().getFullYear();

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

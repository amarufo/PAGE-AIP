/**
 * contenido.js
 * Sistema central de contenido: carga desde JSON y actualiza múltiples páginas.
 */

let todasLasEntradas = [];

async function cargarContenido() {
  try {
    const isInPages = window.location.pathname.includes('/pages/');
    const jsonPath  = isInPages ? '../data/contenido.json' : './data/contenido.json';
    window.isInPages = isInPages;

    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    todasLasEntradas = await response.json();

    const pagina = document.body.dataset.pagina;
    if      (pagina === 'articulos') renderizarArticulos();
    else if (pagina === 'proyectos') renderizarProyectos();
    else if (pagina === 'inicio')    renderizarUltimosEnInicio();
  } catch (err) {
    console.error('Error cargando contenido:', err);
  }
}

function ajustarRutaImagen(ruta) {
  return window.isInPages ? '../' + ruta : ruta;
}

function renderizarArticulos() {
  const contenedor = document.getElementById('articulos-contenedor');
  if (!contenedor) return;
  const articulos = todasLasEntradas.entradas
    .filter(e => e.paginas_destino.includes('articulos'))
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  contenedor.innerHTML = '';
  articulos.forEach(e => contenedor.appendChild(crearTarjeta(e)));
}

function renderizarProyectos() {
  const contenedor = document.getElementById('proyectos-contenedor');
  if (!contenedor) return;
  const proyectos = todasLasEntradas.entradas
    .filter(e => e.paginas_destino.includes('proyectos'))
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  contenedor.innerHTML = '';
  proyectos.forEach(e => contenedor.appendChild(crearTarjeta(e)));
}

function renderizarUltimosEnInicio() {
  const contenedor = document.getElementById('ultimas-entradas');
  if (!contenedor) return;
  const ultimas = todasLasEntradas.entradas
    .filter(e => e.paginas_destino && e.paginas_destino.includes('inicio'))
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion))
    .slice(0, 10);
  contenedor.innerHTML = '';
  ultimas.forEach(e => contenedor.appendChild(crearTarjeta(e)));
}

function crearTarjeta(entrada) {
  const panel = document.createElement('div');
  panel.className = 'panel animate-fade-in';
  panel.dataset.categoria = entrada.categoria;

  // Sticker
  const icono = document.createElement('img');
  icono.src = ajustarRutaImagen(entrada.icono);
  icono.alt = '';
  icono.className = 'panel-sticker';
  icono.setAttribute('aria-hidden', 'true');
  panel.appendChild(icono);

  // Imagen
  const img = document.createElement('img');
  img.src = ajustarRutaImagen(entrada.imagen);
  img.alt = entrada.titulo;
  img.className = 'panel-img';
  img.loading = 'lazy';
  panel.appendChild(img);

  // Contenido
  const contenido = document.createElement('div');
  contenido.className = 'panel-contenido';

  const badge = document.createElement('span');
  badge.className = 'badge-categoria';
  badge.textContent = obtenerLabelCategoria(entrada.categoria);
  contenido.appendChild(badge);

  const titulo = document.createElement('h3');
  titulo.textContent = entrada.titulo;
  contenido.appendChild(titulo);

  if (entrada.subtitulo) {
    const sub = document.createElement('p');
    sub.className = 'subtitulo-panel';
    sub.textContent = entrada.subtitulo;
    contenido.appendChild(sub);
  }

  const desc = document.createElement('p');
  desc.textContent = entrada.descripcion;
  contenido.appendChild(desc);

  if (entrada.precio) {
    const precio = document.createElement('p');
    precio.className = 'precio-panel';
    precio.textContent = entrada.precio;
    contenido.appendChild(precio);
  }

  const link = document.createElement('button');
  link.className = 'panel-link';
  link.textContent = 'Ver más';
  link.addEventListener('click', () => mostrarDetalle(entrada));
  contenido.appendChild(link);

  panel.appendChild(contenido);
  return panel;
}

function obtenerLabelCategoria(categoria) {
  const labels = {
    'base-datos':    '📊 Base de datos',
    'analisis':      '📈 Análisis',
    'app-escritorio':'💻 App Escritorio',
    'app-web':       '🌐 App Web',
    'script':        '⚙️ Script',
    'articulo':      '📰 Artículo',
    'especial':      '✨ Especial',
  };
  return labels[categoria] || categoria;
}

function mostrarDetalle(entrada) {
  // Cerrar modal anterior si existe
  const anterior = document.getElementById('modal-detalle-global');
  if (anterior) anterior.remove();

  const detalle = document.createElement('div');
  detalle.id = 'modal-detalle-global';
  detalle.className = 'modal-detalle';
  detalle.setAttribute('role', 'dialog');
  detalle.setAttribute('aria-modal', 'true');
  detalle.setAttribute('aria-labelledby', 'modal-titulo');

  let botonesCuerpo = '';

  if (entrada.descargas && entrada.descargas.length > 0) {
    botonesCuerpo += `
      <div class="descargas">
        <h3>Descargas</h3>
        ${entrada.descargas.map(d => `
          <a href="${d.url}" class="btn-descarga" download>${d.nombre}</a>
        `).join('')}
      </div>`;
  }

  if (entrada.url_web) {
    botonesCuerpo += `
      <div class="acceso-web">
        <a href="${entrada.url_web}" target="_blank" rel="noopener" class="btn-app">🚀 Abrir aplicación</a>
      </div>`;
  }

  detalle.innerHTML = `
    <div class="modal-contenido">
      <button class="cerrar" aria-label="Cerrar">&times;</button>
      <span class="badge-categoria-modal">${obtenerLabelCategoria(entrada.categoria)}</span>
      <h2 id="modal-titulo">${entrada.titulo}</h2>
      <p class="subtitulo">${entrada.subtitulo || ''}</p>
      <div class="modal-metadata">
        <small>Publicado: ${formatearFecha(entrada.fecha_publicacion)}</small>
        <small>Por: ${entrada.autor}</small>
      </div>
      <div class="modal-cuerpo">${entrada.contenido}</div>
      ${botonesCuerpo}
    </div>`;

  document.body.appendChild(detalle);

  // Cerrar al hacer click en overlay o en botón cerrar
  detalle.querySelector('.cerrar').addEventListener('click', () => detalle.remove());
  detalle.addEventListener('click', e => { if (e.target === detalle) detalle.remove(); });

  // Cerrar con Escape
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { detalle.remove(); document.removeEventListener('keydown', handler); }
  });
}

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', cargarContenido);

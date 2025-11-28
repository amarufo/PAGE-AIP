/**
 * contenido.js
 * Sistema central de contenido: carga desde JSON y actualiza múltiples páginas
 * Maneja: Apps, scripts, bases de datos, análisis, artículos
 */

let todasLasEntradas = [];

/**
 * Carga el JSON de contenido central
 */
async function cargarContenido() {
  try {
    const response = await fetch('../data/contenido.json');
    todasLasEntradas = await response.json();
    
    // Renderizar según la página actual
    const paginaActual = document.body.dataset.pagina;
    
    if (paginaActual === 'articulos') {
      renderizarArticulos();
    } else if (paginaActual === 'proyectos') {
      renderizarProyectos();
    } else if (paginaActual === 'inicio') {
      renderizarUltimosEnInicio();
    }
    
  } catch (error) {
    console.error('Error cargando contenido:', error);
  }
}

/**
 * Renderiza artículos, análisis y bases de datos
 */
function renderizarArticulos() {
  const contenedor = document.getElementById('articulos-contenedor');
  if (!contenedor) return;
  
  // Filtrar entradas que deben ir a articulos
  const articulos = todasLasEntradas.entradas.filter(e => 
    e.paginas_destino.includes('articulos')
  ).sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  
  contenedor.innerHTML = '';
  articulos.forEach(entrada => {
    contenedor.appendChild(crearTarjeta(entrada));
  });
}

/**
 * Renderiza apps y herramientas para descargar
 */
function renderizarProyectos() {
  const contenedor = document.getElementById('proyectos-contenedor');
  if (!contenedor) return;
  
  // Filtrar entradas que deben ir a proyectos
  const proyectos = todasLasEntradas.entradas.filter(e => 
    e.paginas_destino.includes('proyectos')
  ).sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  
  contenedor.innerHTML = '';
  proyectos.forEach(entrada => {
    contenedor.appendChild(crearTarjeta(entrada));
  });
}

/**
 * Renderiza últimas 3 entradas en inicio (index.html)
 */
function renderizarUltimosEnInicio() {
  const contenedor = document.getElementById('ultimas-entradas');
  if (!contenedor) return;
  
  // Ordenar por fecha, más recientes primero
  const ultimas = todasLasEntradas.entradas
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion))
    .slice(0, 3);
  
  contenedor.innerHTML = '';
  ultimas.forEach(entrada => {
    contenedor.appendChild(crearTarjeta(entrada));
  });
}

/**
 * Crea una tarjeta visual para una entrada
 */
function crearTarjeta(entrada) {
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.dataset.categoria = entrada.categoria;
  
  // Icono/sticker
  const icono = document.createElement('img');
  icono.src = entrada.icono;
  icono.alt = entrada.categoria;
  icono.className = 'panel-sticker';
  panel.appendChild(icono);
  
  // Imagen principal
  const img = document.createElement('img');
  img.src = entrada.imagen;
  img.alt = entrada.titulo;
  img.className = 'panel-img';
  panel.appendChild(img);
  
  // Contenido
  const contenido = document.createElement('div');
  contenido.className = 'panel-contenido';
  
  // Badge de categoría
  const badge = document.createElement('span');
  badge.className = 'badge-categoria';
  badge.textContent = obtenerLabelCategoria(entrada.categoria);
  contenido.appendChild(badge);
  
  // Título
  const titulo = document.createElement('h3');
  titulo.textContent = entrada.titulo;
  contenido.appendChild(titulo);
  
  // Subtítulo
  if (entrada.subtitulo) {
    const subtitulo = document.createElement('p');
    subtitulo.className = 'subtitulo-panel';
    subtitulo.textContent = entrada.subtitulo;
    contenido.appendChild(subtitulo);
  }
  
  // Descripción
  const desc = document.createElement('p');
  desc.textContent = entrada.descripcion;
  contenido.appendChild(desc);
  
  // Precio (si aplica)
  if (entrada.precio) {
    const precio = document.createElement('p');
    precio.className = 'precio-panel';
    precio.textContent = entrada.precio;
    contenido.appendChild(precio);
  }
  
  // Botón
  const link = document.createElement('a');
  link.href = '#entrada-' + entrada.id;
  link.className = 'panel-link';
  link.textContent = 'Ver más';
  link.onclick = (e) => {
    e.preventDefault();
    mostrarDetalle(entrada);
  };
  contenido.appendChild(link);
  
  panel.appendChild(contenido);
  
  return panel;
}

/**
 * Obtiene el label legible de una categoría
 */
function obtenerLabelCategoria(categoria) {
  const labels = {
    'base-datos': '📊 Base de datos',
    'analisis': '📈 Análisis',
    'app-escritorio': '💻 App Escritorio',
    'app-web': '🌐 App Web',
    'script': '⚙️ Script',
    'articulo': '📰 Artículo'
  };
  return labels[categoria] || categoria;
}

/**
 * Muestra detalle de una entrada en modal
 */
function mostrarDetalle(entrada) {
  const detalle = document.createElement('div');
  detalle.id = 'detalle-' + entrada.id;
  detalle.className = 'modal-detalle';
  
  let botonesCuerpo = '';
  
  // Botón de descarga
  if (entrada.descargas && entrada.descargas.length > 0) {
    botonesCuerpo += `
      <div class="descargas">
        <h3>Descargas</h3>
        ${entrada.descargas.map(d => `
          <a href="${d.url}" class="btn-descarga" download>${d.nombre}</a>
        `).join('')}
      </div>
    `;
  }
  
  // Botón de app web
  if (entrada.url_web) {
    botonesCuerpo += `
      <div class="acceso-web">
        <a href="${entrada.url_web}" target="_blank" class="btn-app">🚀 Abrir aplicación</a>
      </div>
    `;
  }
  
  detalle.innerHTML = `
    <div class="modal-contenido">
      <button class="cerrar" onclick="this.parentElement.parentElement.remove()">&times;</button>
      <span class="badge-categoria-modal">${obtenerLabelCategoria(entrada.categoria)}</span>
      <h2>${entrada.titulo}</h2>
      <p class="subtitulo">${entrada.subtitulo || ''}</p>
      <div class="modal-metadata">
        <small>Publicado: ${formatearFecha(entrada.fecha_publicacion)}</small>
        <small>Por: ${entrada.autor}</small>
      </div>
      <div class="modal-cuerpo">
        ${entrada.contenido}
      </div>
      ${botonesCuerpo}
    </div>
  `;
  
  document.body.appendChild(detalle);
}

/**
 * Formatea fecha al formato español
 */
function formatearFecha(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

/**
 * Ejecuta al cargar
 */
document.addEventListener('DOMContentLoaded', cargarContenido);

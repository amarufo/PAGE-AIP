/**
 * publicaciones.js
 * Carga publicaciones desde JSON y las renderiza como tarjetas
 */

async function cargarPublicaciones() {
  try {
    // Cargar JSON (ruta relativa para GitHub Pages)
    const response = await fetch('../data/publicaciones.json');
    const data = await response.json();
    
    // Obtener contenedor
    const contenedor = document.getElementById('publicaciones-contenedor');
    if (!contenedor) return;
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Renderizar cada publicación como tarjeta
    data.publicaciones.forEach(pub => {
      const tarjeta = crearTarjetaPublicacion(pub);
      contenedor.appendChild(tarjeta);
    });
    
  } catch (error) {
    console.error('Error cargando publicaciones:', error);
  }
}

function crearTarjetaPublicacion(pub) {
  const panel = document.createElement('div');
  panel.className = 'panel';
  
  // Icono/sticker
  const icono = document.createElement('img');
  icono.src = pub.icono;
  icono.alt = pub.tipo;
  icono.className = 'panel-sticker';
  panel.appendChild(icono);
  
  // Imagen principal
  const img = document.createElement('img');
  img.src = pub.imagen;
  img.alt = pub.titulo;
  img.className = 'panel-img';
  panel.appendChild(img);
  
  // Contenido
  const contenido = document.createElement('div');
  contenido.className = 'panel-contenido';
  
  // Título
  const titulo = document.createElement('h3');
  titulo.textContent = pub.titulo;
  contenido.appendChild(titulo);
  
  // Descripción
  const desc = document.createElement('p');
  desc.textContent = pub.descripcion;
  contenido.appendChild(desc);
  
  // Botón
  const link = document.createElement('a');
  link.href = `#pub-${pub.id}`;
  link.className = 'panel-link';
  link.textContent = 'Ver publicación';
  link.onclick = (e) => {
    e.preventDefault();
    mostrarDetalle(pub);
  };
  contenido.appendChild(link);
  
  panel.appendChild(contenido);
  
  return panel;
}

function mostrarDetalle(pub) {
  // Crear modal o ir a página de detalle
  const detalle = document.createElement('div');
  detalle.id = `detalle-${pub.id}`;
  detalle.className = 'modal-detalle';
  detalle.innerHTML = `
    <div class="modal-contenido">
      <button class="cerrar" onclick="this.parentElement.parentElement.remove()">&times;</button>
      <h2>${pub.titulo}</h2>
      <p class="subtitulo">${pub.subtitulo}</p>
      ${pub.contenido}
      ${pub.descargas.length > 0 ? `
        <div class="descargas">
          <h3>Descargas</h3>
          ${pub.descargas.map(d => `
            <a href="${d.url}" class="btn-descarga" download>${d.nombre}</a>
          `).join('')}
        </div>
      ` : ''}
      ${pub.url_web ? `
        <div class="acceso-web">
          <a href="${pub.url_web}" target="_blank" class="btn-app">Abrir aplicación</a>
        </div>
      ` : ''}
    </div>
  `;
  
  document.body.appendChild(detalle);
}

// Cargar al abrir la página
document.addEventListener('DOMContentLoaded', cargarPublicaciones);

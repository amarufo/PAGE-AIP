/**
 * sidebar.js
 * Componente compartido de barra lateral.
 * Inyecta el HTML del sidebar, gestiona el menú hamburguesa y marca el enlace activo.
 * Uso: añadir <div id="sidebar-root"></div> al inicio del .layout y cargar este script.
 */
(function () {
  'use strict';

  // Detecta si estamos dentro de /pages/ para ajustar rutas relativas
  const IN_PAGES = window.location.pathname.includes('/pages/');
  const ROOT = IN_PAGES ? '../' : './';

  // Definición de páginas de navegación
  const PAGES = [
    { href: ROOT + 'index.html',                label: 'Inicio',                    id: 'inicio'     },
    { href: ROOT + 'pages/sobre-mi.html',       label: 'Sobre mí',                  id: 'sobre-mi'   },
    { href: ROOT + 'pages/servicios.html',      label: 'Servicios',                 id: 'servicios'  },
    { href: ROOT + 'pages/proyectos.html',      label: 'Proyectos',                 id: 'proyectos'  },
    { href: ROOT + 'pages/articulos.html',      label: 'Artículos y bases de datos', id: 'articulos' },
    { href: ROOT + 'pages/guias-pip.html',      label: 'Guías PIP',                 id: 'guias-pip'  },
    { href: ROOT + 'pages/contacto.html',       label: 'Contacto',                  id: 'contacto'   },
  ];

  // Redes sociales
  const SOCIAL = [
    { href: 'mailto:amaruf9523@gmail.com',                          img: ROOT + 'images/mailito.png', alt: 'Email'     },
    { href: 'https://www.youtube.com/@amarufo_inversionpublica',    img: ROOT + 'images/yt.png',      alt: 'YouTube',   ext: true },
    { href: 'https://www.linkedin.com/in/amarufo/',                 img: ROOT + 'images/linkedin.png', alt: 'LinkedIn', ext: true },
    { href: 'https://github.com/amarufo',                           img: ROOT + 'images/gh.png',      alt: 'GitHub',    ext: true },
    { href: 'https://wa.me/51934657378',                            img: ROOT + 'images/wsp.png',     alt: 'WhatsApp',  ext: true },
  ];

  /**
   * Determina el id de la página actual basándose en la URL.
   */
  function getCurrentPageId() {
    const path = window.location.pathname;
    if (path === '/' || path.endsWith('/index.html') || path.endsWith('/')) return 'inicio';
    const m = path.match(/\/([^/]+)\.html$/);
    return m ? m[1] : '';
  }

  const currentId = getCurrentPageId();

  /**
   * Construye y devuelve el HTML completo del sidebar.
   */
  function buildSidebarHTML() {
    const navLinks = PAGES.map(p => {
      const active = (p.id === currentId);
      return `<a href="${p.href}"${active ? ' class="nav-active" aria-current="page"' : ''}>${p.label}</a>`;
    }).join('');

    const socialLinks = SOCIAL.map(s => {
      const ext = s.ext ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${s.href}"${ext} aria-label="${s.alt}">
        <img src="${s.img}" alt="${s.alt}" loading="lazy" width="32" height="32">
      </a>`;
    }).join('');

    return `
      <button class="hamburger" id="hamburger-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="sidebar-aside">
        <span></span><span></span><span></span>
      </button>
      <div class="sidebar-overlay" id="sidebar-overlay" aria-hidden="true"></div>
      <aside class="sidebar" id="sidebar-aside" role="complementary" aria-label="Navegación principal">
        <a href="${ROOT}index.html" aria-label="Ir a inicio" class="sidebar-logo-link">
          <img src="${ROOT}images/rino1.png" alt="Foto de perfil de Wilbert Amaru" class="profile-img" loading="eager">
        </a>
        <div class="sidebar-identity">
          <h1 class="sidebar-title">Academia de Inversión Pública</h1>
          <p class="sidebar-name">Econ. Wilbert Amaru Fernandez Olmedo</p>
          <p class="sidebar-tagline">Especialista en Ciencia de Datos aplicada a la Inversión Pública</p>
        </div>
        <nav class="sidebar-nav" aria-label="Menú principal">
          ${navLinks}
        </nav>
        <div class="sidebar-social">
          ${socialLinks}
        </div>
      </aside>`;
  }

  /**
   * Inicializa el sidebar en el elemento #sidebar-root
   */
  function init() {
    const root = document.getElementById('sidebar-root');
    if (!root) return;

    root.innerHTML = buildSidebarHTML();

    const btn     = document.getElementById('hamburger-btn');
    const aside   = document.getElementById('sidebar-aside');
    const overlay = document.getElementById('sidebar-overlay');

    function openMenu() {
      aside.classList.add('open');
      overlay.classList.add('visible');
      overlay.removeAttribute('aria-hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('is-active');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      aside.classList.remove('open');
      overlay.classList.remove('visible');
      overlay.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    }

    btn.addEventListener('click', () =>
      aside.classList.contains('open') ? closeMenu() : openMenu()
    );

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

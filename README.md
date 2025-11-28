# 🏛️ Academia de Inversión Pública

**Portal web especializado en ciencia de datos aplicada a inversión pública en el Perú.**

**Autor**: Econ. Wilbert Amaru Fernandez Olmedo  
**Sitio Web**: https://amarufo.github.io/  
**Licencia**: MIT

---

## 📋 Descripción

Academia de Inversión Pública es un portal que ofrece:

- 📊 **Bases de datos** de análisis demográfico, victimización y proyecciones
- 📚 **Guías técnicas** para formulación de Proyectos de Inversión Pública (PIP)
- 🔬 **Métodos cuantitativos** e herramientas de análisis
- 🎯 **Publicaciones** y recursos para especialistas
- 💼 **Servicios profesionales** de consultoría

---

## 🗂️ Estructura del Proyecto

```
.
├── index.html                      # Página principal
├── css/                            # Estilos
│   ├── styles.css                  # Estilos principales
│   ├── diagrama-interactivo.css    # Estilos de diagramas
│   └── sankey-diagram.css          # Estilos Sankey
├── js/                             # Scripts
│   ├── diagrama-cuantitativo.js
│   └── sankey-diagram.js
├── pages/                          # Páginas secundarias
│   ├── sobre-mi.html
│   ├── servicios.html
│   ├── proyectos.html
│   ├── articulos.html
│   ├── guias-pip.html
│   ├── metodos.html
│   ├── contacto.html
│   ├── galerias-metodos/           # Galerías de métodos
│   └── publicaciones/              # Publicaciones
├── docs/                           # Documentación y PDFs
│   ├── pdf/                        # Archivos PDF
│   └── plots/                      # Gráficos HTML
├── images/                         # Recursos gráficos
├── manifest.json                   # Configuración PWA
├── sitemap.xml                     # Mapa del sitio
├── robots.txt                      # Instrucciones para buscadores
└── README.md                       # Este archivo
```

---

## 🚀 Características

### ✨ Actuales
- ✅ Diseño responsive (mobile-first)
- ✅ Interfaz limpia y moderna
- ✅ Navegación intuitiva
- ✅ Contenido organizado por categorías
- ✅ Enlaces a redes sociales y contacto

### 🔄 Próximas Mejoras
- 📱 Instalable como PWA (Progressive Web App)
- 🔍 Optimización SEO mejorada
- ♿ Accesibilidad WCAG 2.1 AA
- 📊 Analytics integrado
- 🌙 Modo oscuro (opcional)

---

## 📝 Instrucciones para Desarrolladores

### Requisitos
- Un servidor HTTP simple (puede ser local)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalación Local

#### Con Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Con Node.js
```bash
npx http-server
```

#### Con PowerShell (Windows)
```powershell
# Usando VS Code
code --version
# O directamente
python -m http.server 8000
```

Luego accede a `http://localhost:8000`

### Estructura de Desarrollo

1. **HTML**: Páginas en raíz y carpeta `pages/`
2. **CSS**: Centralizado en `css/styles.css`
3. **JS**: Scripts específicos en `js/`
4. **Assets**: Imágenes en `images/`

### Agregar Nueva Página

1. Crear archivo `pages/nueva-pagina.html`
2. Copiar estructura base de `index.html`
3. Actualizar meta tags (title, description)
4. Agregar enlace en la barra de navegación
5. Actualizar `sitemap.xml`

---

## 🔧 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con Custom Properties
- **JavaScript** - Interactividad (Sankey, diagramas)
- **GitHub Pages** - Hosting

---

## 📱 Compatibilidad

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Móviles (iOS, Android)

---

## 🔐 SEO y Configuración

El sitio está optimizado para buscadores:
- `robots.txt` - Instrucciones para crawlers
- `sitemap.xml` - Mapa del sitio
- `manifest.json` - Configuración PWA
- Meta tags Open Graph
- Meta tags Twitter Card

---

## 📞 Contacto

- **Email**: amaruf9523@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/amarufo/
- **GitHub**: https://github.com/amarufo
- **YouTube**: https://www.youtube.com/@amarufo_inversionpublica
- **WhatsApp**: https://wa.me/51930123005

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0.0

# 🚀 Sistema de Contenido Centralizado

## ¿Qué cambió?

**Antes:** 5 archivos HTML separados + múltiples páginas desactualizadas

**Ahora:** UN único archivo JSON (`data/contenido.json`) que alimenta TODO:
- `pages/articulos.html` - Bases de datos, análisis, artículos
- `pages/proyectos.html` - Apps, herramientas, scripts
- `index.html` - Últimas 3 entradas automáticamente

## 📋 Cómo agregar contenido

### 1. Abre `data/contenido.json`

### 2. Copia este template:

```json
{
  "id": "tu-id-unico",
  "titulo": "Tu título aquí",
  "subtitulo": "Resumen en 1 línea",
  "descripcion": "Descripción que sale en la tarjeta (preview)",
  "categoria": "base-datos",
  "tipo": "base-datos",
  "imagen": "images/tu-imagen.png",
  "icono": "images/bd.png",
  "contenido": "<h2>Título</h2><p>Contenido HTML aquí...</p>",
  "descargas": [
    {
      "nombre": "Descargar",
      "url": "https://enlace.com/archivo",
      "tipo": "xlsx"
    }
  ],
  "fecha_publicacion": "2025-11-28",
  "autor": "Tu nombre",
  "paginas_destino": ["articulos"],
  "precio": "Gratuito"
}
```

### 3. Cambia estos valores:

| Campo | Ejemplo | Notas |
|-------|---------|-------|
| `id` | `mi-app-2025` | Único, sin espacios, con guiones |
| `titulo` | `Mi nueva app` | Máximo 60 caracteres |
| `subtitulo` | `Descripción breve` | Una línea, máximo 80 caracteres |
| `descripcion` | `Texto que... ` | Lo que sale en la tarjeta (150-200 caracteres) |
| `categoria` | Ver tabla abajo | Define el icono y badges |
| `imagen` | `images/foto.png` | Archivo en carpeta `images/` |
| `contenido` | `<h2>Título</h2>...` | HTML para el modal |
| `paginas_destino` | `["articulos"]` o `["proyectos"]` | Dónde aparecerá |
| `precio` | `Gratuito` o `$99/año` | Opcional |

## 🏷️ Categorías disponibles

```
"base-datos"      → 📊 Base de datos (para descargar)
"analisis"        → 📈 Análisis (ejemplo realizado)
"app-escritorio"  → 💻 App Escritorio (para descargar)
"app-web"         → 🌐 App Web (para usar online)
"script"          → ⚙️ Script (código reutilizable)
"articulo"        → 📰 Artículo (opinión/teoría)
```

## 📍 Dónde aparecerá

- **`paginas_destino: ["articulos"]`** → Solo en `pages/articulos.html`
- **`paginas_destino: ["proyectos"]`** → Solo en `pages/proyectos.html`
- **Las 3 más recientes** → Automáticamente en `index.html`

## ✅ Checklist antes de guardar

- ☑️ `id` es único (no existe otro igual)
- ☑️ Archivo JSON es válido (validar en jsonlint.com)
- ☑️ La imagen existe en `images/`
- ☑️ Las URLs de descarga son correctas
- ☑️ HTML en `contenido` es válido
- ☑️ Fecha está en formato `YYYY-MM-DD`

## 🔄 Flujo de actualización

```
1. Edita data/contenido.json
       ↓
2. git add data/contenido.json
       ↓
3. git commit -m "feat: nueva entrada"
       ↓
4. git push
       ↓
5. Espera 1-2 minutos (GitHub Pages)
       ↓
6. ¡Aparece automáticamente en 3 páginas! ✨
```

## 📱 Lo que sucede automáticamente

Cuando guardas el JSON:

```
┌─ data/contenido.json (FUENTE ÚNICA)
│
├─→ pages/articulos.html
│   Muestra: base-datos, analisis, articulos
│   Filtro: paginas_destino incluye "articulos"
│   Orden: Más recientes primero
│
├─→ pages/proyectos.html
│   Muestra: app-escritorio, app-web, scripts
│   Filtro: paginas_destino incluye "proyectos"
│   Orden: Más recientes primero
│
└─→ index.html
    Muestra: Las 3 últimas (cualquier categoría)
    Orden: Más recientes primero
```

## 💾 Almacenamiento

- Todo el contenido está en **UN único archivo**: `data/contenido.json`
- Sin HTML para mantener
- Sin duplicación
- Sin inconsistencias
- Fácil de respaldar

## 🚀 Próximas mejoras

- [ ] Filtros por categoría en articulos.html
- [ ] Búsqueda en tiempo real
- [ ] Tags/etiquetas
- [ ] Paginación
- [ ] Ordenar por fecha o popularidad

---

**Resumen:** Cambia el JSON, el sitio se actualiza automáticamente. 🎉


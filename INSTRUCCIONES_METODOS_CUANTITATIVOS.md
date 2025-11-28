# Instrucciones: Guía Dinámmica de Métodos Cuantitativos

## Cómo funciona el sistema

La página **`pages/servicios-analisis-cuantitativo.html`** funciona completamente desde el archivo JSON **`data/contenido.json`**. 

Esto significa que **NO necesitas editar HTML**, solo edita el JSON y los cambios se actualizan automáticamente en la página.

---

## Ubicación del JSON

📁 **Archivo:** `data/contenido.json`

En este archivo, busca la sección llamada `"metodos_cuantitativos"` (al final del archivo).

---

## Estructura de cada método

Cada método tiene esta estructura:

```json
{
  "id": "id-unico-del-metodo",
  "emoji": "📊",
  "nombre": "Nombre del Método",
  "pregunta": "Pregunta guía para identificar si este método es el adecuado...",
  "descripcion": "Breve descripción técnica del método",
  "pdf_drive": "https://drive.google.com/file/d/ID_DEL_PDF/view"
}
```

### Campos explicados:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **id** | Identificador único (sin espacios, con guiones) | `"correlacion-pearson"` |
| **emoji** | Emoji que representa el método | `"🔗"` |
| **nombre** | Nombre completo del método | `"Correlación de Pearson"` |
| **pregunta** | Pregunta guía para el usuario | `"¿Tienes dos variables numéricas...?"` |
| **descripcion** | Descripción técnica corta | `"Mide la fuerza de la relación lineal..."` |
| **pdf_drive** | Link directo al PDF en Google Drive | `"https://drive.google.com/file/d/..."` |

---

## Cómo obtener el link de PDF desde Google Drive

1. Sube tu PDF a Google Drive
2. Click derecho → **Obtener enlace**
3. Cambia permisos a "Cualquiera con el enlace puede ver"
4. Copia el link, por ejemplo: `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0/view`
5. Pega en el campo `"pdf_drive"`

---

## Cómo agregar un nuevo método

1. Abre `data/contenido.json`
2. Ve a la sección `"metodos_cuantitativos"` (busca cerca del final)
3. Busca el último método de la lista
4. Agrega una coma al final del último método
5. Agrega tu nuevo método:

```json
{
  "id": "nuevo-metodo",
  "emoji": "🎯",
  "nombre": "Nuevo Método",
  "pregunta": "¿Tu pregunta de investigación es...?",
  "descripcion": "Descripción del nuevo método",
  "pdf_drive": "https://drive.google.com/file/d/..."
}
```

6. **Guarda el archivo**
7. Recarga la página en el navegador (Ctrl+F5 para limpiar caché)

---

## Cómo editar un método existente

1. Abre `data/contenido.json`
2. Ve a la sección `"metodos_cuantitativos"`
3. Busca el método por su `"id"` o `"nombre"`
4. Edita los campos que necesites
5. **Guarda el archivo**
6. Recarga la página (Ctrl+F5)

---

## Cómo cambiar el PDF de un método

1. En `data/contenido.json`, busca el método
2. Actualiza el campo `"pdf_drive"` con el nuevo link:

```json
"pdf_drive": "https://drive.google.com/file/d/NUEVO_ID_PDF/view"
```

3. Guarda y recarga la página

---

## Estructura de categorías (automático)

Los métodos se organizan automáticamente en 6 categorías:

| Posiciones JSON | Categoría |
|-----------------|-----------|
| 0-3 | 📊 Relaciones entre variables (Correlación, Regresión) |
| 4-8 | 🔬 Comparación de grupos (T-Test, ANOVA, Chi-Cuadrado) |
| 9-11 | 🎯 Reducción de dimensionalidad (PCA, Factorial, Correspondencia) |
| 12-16 | 🤖 Predicción/Clasificación (Logit, Árboles, Random Forest, XGBoost, K-Means) |
| 17-19 | ⏰ Series Temporales (ARIMA, Descomposición, VAR) |
| 20+ | 🏢 Datos Panel (Panel Data) |

**Nota:** Si reordenas o agregas métodos, actualiza los números en el archivo `servicios-analisis-cuantitativo.html` en la sección `metodos.slice()`.

---

## Botones en cada tarjeta

Cada método tiene automáticamente 2 botones:

1. **📄 Ver ejemplo** → Abre el PDF en Google Drive en una pestaña nueva
2. **💬 Consultar** → Envía mensaje WhatsApp con el nombre del método

---

## Ejemplo de edición completa

### Antes:
```json
{
  "id": "correlacion-pearson",
  "emoji": "🔗",
  "nombre": "Correlación de Pearson",
  "pregunta": "¿Tienes dos variables numéricas?",
  "descripcion": "Mide la fuerza de la relación lineal entre dos variables.",
  "pdf_drive": "https://drive.google.com/file/d/OLD_ID/view"
}
```

### Después (con actualización):
```json
{
  "id": "correlacion-pearson",
  "emoji": "🔗",
  "nombre": "Correlación de Pearson (Actualizado 2025)",
  "pregunta": "¿Tienes dos variables numéricas y quieres saber si están relacionadas?",
  "descripcion": "Mide la fuerza y dirección de la relación lineal entre dos variables continuas.",
  "pdf_drive": "https://drive.google.com/file/d/NEW_ID_PDF_2025/view"
}
```

---

## Troubleshooting

### ❌ Los cambios no aparecen en la página

1. Verifica que el JSON sea válido (sin errores de sintaxis)
2. Limpia el caché: **Ctrl+Shift+R** (Windows) o **Cmd+Shift+R** (Mac)
3. Espera unos segundos para que la página cargue completamente
4. Abre la consola (F12) y revisa si hay errores

### ❌ Aparece mensaje "Error al cargar los métodos"

1. Abre `data/contenido.json` en un editor
2. Copia todo el contenido
3. Pégalo en [jsonlint.com](https://www.jsonlint.com/) para validar
4. Corrige los errores encontrados
5. Guarda y recarga

### ❌ Los botones no funcionan

- Verifica que los links de PDF sean válidos (accesibles en el navegador)
- Verifica que los PDFs en Google Drive tengan permisos públicos o compartidos

---

## Resumen rápido

✅ **Todo lo que necesitas:** Editar `data/contenido.json` en la sección `metodos_cuantitativos`

✅ **Agregar método:** Copia un método existente, cambia los valores, agrega coma

✅ **Eliminar método:** Elimina el bloque completo (cuidado con las comas)

✅ **Actualizar PDF:** Cambia solo el valor de `pdf_drive`

✅ **Después de editar:** Guarda JSON y recarga página (Ctrl+F5)

---

**¡Listo!** Ahora puedes mantener toda la sección de métodos cuantitativos solo editando JSON.

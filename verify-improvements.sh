#!/bin/bash
# Script de verificación de mejoras implementadas
# Academia de Inversión Pública
# Uso: bash verify-improvements.sh

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     VERIFICACIÓN DE MEJORAS IMPLEMENTADAS                 ║"
echo "║     Academia de Inversión Pública                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0
success=0

# Función para verificar
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 existe"
        ((success++))
    else
        echo -e "${RED}✗${NC} $1 FALTA"
        ((errors++))
    fi
}

check_contains() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 contiene: $2"
        ((success++))
    else
        echo -e "${RED}✗${NC} $1 NO contiene: $2"
        ((errors++))
    fi
}

# ===== VERIFICAR ARCHIVOS CREADOS =====
echo "📄 Verificando archivos creados..."
echo ""

check_file ".gitignore"
check_file "README.md"
check_file "manifest.json"
check_file "robots.txt"
check_file "sitemap.xml"
check_file "GUIA_TECNICA.md"
check_file "MEJORAS_IMPLEMENTADAS.md"
check_file "RESUMEN_MEJORAS.txt"

echo ""
echo "🔍 Verificando contenido de archivos..."
echo ""

# Verificar .gitignore
check_contains ".gitignore" "node_modules"
check_contains ".gitignore" ".vscode"

# Verificar README.md
check_contains "README.md" "Academia de Inversión Pública"
check_contains "README.md" "Wilbert Amaru"

# Verificar manifest.json
check_contains "manifest.json" "Academia de Inversión Pública"
check_contains "manifest.json" "#b91c1c"
check_contains "manifest.json" "icons"

# Verificar robots.txt
check_contains "robots.txt" "User-agent"
check_contains "robots.txt" "Sitemap"

# Verificar sitemap.xml
check_contains "sitemap.xml" "sitemap"
check_contains "sitemap.xml" "https://amarufo.github.io/"
check_contains "sitemap.xml" "changefreq"

echo ""
echo "🏷️  Verificando meta tags en HTML..."
echo ""

# Verificar index.html
check_contains "index.html" "og:title"
check_contains "index.html" "og:description"
check_contains "index.html" "og:image"
check_contains "index.html" "twitter:card"
check_contains "index.html" "manifest.json"

# Verificar otras páginas
check_contains "pages/sobre-mi.html" "og:title"
check_contains "pages/servicios.html" "meta name=\"description\""
check_contains "pages/contacto.html" "twitter:card"

echo ""
echo "🎨 Verificando CSS mejorado..."
echo ""

check_contains "css/styles.css" "--focus-color"
check_contains "css/styles.css" "--text-light"
check_contains "css/styles.css" "focus-visible"
check_contains "css/styles.css" "aria-label"

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "📊 RESUMEN:"
echo -e "${GREEN}✓ Éxitos: $success${NC}"
echo -e "${RED}✗ Errores: $errors${NC}"
echo -e "${YELLOW}⚠ Advertencias: $warnings${NC}"
echo ""

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ ¡TODAS LAS MEJORAS VERIFICADAS EXITOSAMENTE!${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. git add ."
    echo "2. git commit -m \"feat: mejoras SEO, PWA y accesibilidad\""
    echo "3. git push"
    echo "4. Verifica en GitHub Pages (espera 1-2 min)"
    exit 0
else
    echo -e "${RED}❌ Hay problemas que verificar${NC}"
    echo ""
    echo "Por favor, revisa los errores marcados arriba"
    exit 1
fi

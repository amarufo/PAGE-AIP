// Datos para el Sankey - ENFOQUE EN SERVICIOS POR TEMA DE TESIS
const sankeyData = {
    campos: [
        { 
            id: 'inv-pub', 
            nombre: 'Inversión Pública',
            resumen: 'Análisis de proyectos',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Ayudamos a analizar si tu proyecto de inversión funciona',
            descripcionSimple: 'Si tu tesis evalúa proyectos de infraestructura, educación, salud o servicios públicos, te mostraremos qué análisis matemáticos usar para demostrar el impacto.',
            tiposTesis: ['Maestría en Gestión de Inversión Pública', 'Especialidad en Proyectos (PIP)', 'Doctorado en Políticas Públicas'],
            temas: ['Análisis beneficio-costo', 'Evaluación de impacto', 'Viabilidad de proyectos', 'Retorno social'],
            baseDatos: ['SNIP (MEF Perú)', 'Banco de Proyectos', 'Encuestas a beneficiarios', 'INEI'],
            metodosRecomendados: ['Regresión Lineal (predecir demanda)', 'Análisis comparativo (ANOVA)', 'PCA (crear índice de impacto)'],
            ejemplosInvestigacion: ['¿Realmente funciona el proyecto?', 'Cobertura antes vs después', 'Satisfacción del beneficiario']
        },
        { 
            id: 'econ-pub', 
            nombre: 'Economía Pública',
            resumen: 'Análisis de datos económicos',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Entendemos los números de la economía',
            descripcionSimple: 'Si tu tesis analiza empleo, pobreza, desigualdad o indicadores económicos regionales, te enseñaremos los métodos estadísticos que usan los economistas peruanos.',
            tiposTesis: ['Maestría en Economía', 'Doctorado en Economía Aplicada', 'Especialidad en Análisis Económico'],
            temas: ['Determinantes del desempleo', 'Desigualdad y pobreza', 'Ciclos económicos regionales', 'Indicadores macroeconómicos'],
            baseDatos: ['INEI (Encuestas ENAHO)', 'BCRP (Estadísticas)', 'FRED (Datos históricos)', 'World Bank Data'],
            metodosRecomendados: ['Regresión múltiple (factores)', 'Series de tiempo (ARDL)', 'Correlación de Spearman'],
            ejemplosInvestigacion: ['¿Por qué crece/no crece el empleo?', 'Variables que explican pobreza', 'Ciclos regionales vs nacional']
        },
        { 
            id: 'gest-pub', 
            nombre: 'Gestión Pública',
            resumen: 'Mejora de servicios estatales',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Medimos si la administración funciona mejor',
            descripcionSimple: 'Si tu tesis evalúa programas de gobierno, digitalización, atención al público o eficiencia estatal, te mostraremos cómo demostrar científicamente que mejoraron.',
            tiposTesis: ['Maestría en Gestión Pública', 'Doctorado en Administración Pública', 'Especialidad en Modernización del Estado'],
            temas: ['Calidad de servicios', 'Eficiencia del gasto', 'Digitalización de trámites', 'Satisfacción ciudadana'],
            baseDatos: ['Encuestas de satisfacción', 'Registros administrativos', 'SERVIR', 'Datos de RENIFE'],
            metodosRecomendados: ['ANOVA (antes vs después)', 'Regresión logística (satisfacción)', 'PCA (índice de calidad)'],
            ejemplosInvestigacion: ['¿Mejoró la atención tras digitalizar?', 'Satisfacción por tramo de edad', 'Eficiencia antes y después']
        },
        { 
            id: 'eval-impacto', 
            nombre: 'Evaluación de Impacto',
            resumen: 'Medir cambio real',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Demostramos el verdadero impacto',
            descripcionSimple: 'Si tu tesis necesita probar que un programa causó cambio real (no solo coincidencia), te enseñamos métodos científicos rigurosos.',
            tiposTesis: ['Maestría en Desarrollo', 'Especialidad en Monitoreo y Evaluación', 'Doctorado en Políticas Públicas'],
            temas: ['Impacto de intervenciones', 'Relación causal', 'Comparabilidad de grupos', 'Reducción de sesgos'],
            baseDatos: ['Encuestas panel', 'Registros administrativos', 'Datos de beneficiarios', 'Seguimiento longitudinal'],
            metodosRecomendados: ['Regresión con DID', 'Propensity Score Matching', 'Variables Instrumentales (IV)'],
            ejemplosInvestigacion: ['¿El programa realmente causó cambio?', 'Diferencia con grupo sin programa', 'Grupos comparables']
        },
        { 
            id: 'gest-emp', 
            nombre: 'Gestión Empresarial',
            resumen: 'Negocios y organizaciones',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Analizamos organizaciones privadas',
            descripcionSimple: 'Si tu tesis estudia empresas, PYMES, desempeño organizacional o recursos humanos, tenemos métodos para analizar datos empresariales.',
            tiposTesis: ['MBA', 'Maestría en Administración', 'Especialidad en Dirección de Empresas'],
            temas: ['Desempeño organizacional', 'Liderazgo y productividad', 'Estrategia empresarial', 'Gestión del talento'],
            baseDatos: ['Encuestas a empresas', 'Datos financieros', 'Registros de SUNAT', 'Repositorios empresariales'],
            metodosRecomendados: ['Regresión múltiple (factores de éxito)', 'Análisis de correlación', 'ANOVA (por sector/tamaño)'],
            ejemplosInvestigacion: ['¿Qué hace exitosas a las empresas?', 'Impacto del liderazgo en ventas', 'Diferencias por sector']
        },
        { 
            id: 'cien-soc', 
            nombre: 'Ciencias Sociales',
            resumen: 'Educación, salud, sociedad',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Entendemos fenómenos sociales',
            descripcionSimple: 'Si tu tesis estudia educación, salud pública, comportamiento social o desarrollo humano, tenemos métodos científicos para tus datos.',
            tiposTesis: ['Maestría en Educación', 'Maestría en Salud Pública', 'Doctorado en Desarrollo Social'],
            temas: ['Rendimiento educativo', 'Acceso a servicios de salud', 'Comportamiento y actitudes', 'Inclusión social'],
            baseDatos: ['Encuestas educativas', 'Datos de salud pública', 'Censos demográficos', 'SISEDU, MINSA'],
            metodosRecomendados: ['Análisis factorial (constructos psicológicos)', 'Regresión logística (decisiones)', 'Modelos multivariantes'],
            ejemplosInvestigacion: ['¿Qué mejora el rendimiento?', 'Acceso equitativo a servicios', 'Factores de comportamiento']
        },
        { 
            id: 'asuntos-int', 
            nombre: 'Investigación Cuantitativa',
            resumen: 'Cualquier tema con datos',
            nivel: 0, 
            color: '#dc2626',
            servicio: 'Si tienes datos, podemos ayudarte',
            descripcionSimple: 'Sea cual sea tu tema de investigación, si planeas recolectar o analizar datos numéricos, tenemos herramientas estadísticas que funcionan.',
            tiposTesis: ['Cualquier postgrado con componente cuantitativo', 'Tesis de cualquier disciplina', 'Investigación con datos'],
            temas: ['Análisis de datos nuevos', 'Reanálisis de bases públicas', 'Encuestas propias', 'Datos administrativos'],
            baseDatos: ['Cualquier fuente de datos', 'Encuestas propias', 'Bases de datos públicas', 'Datos administrativos'],
            metodosRecomendados: ['Según tu pregunta de investigación', 'Según tu tipo de datos', 'Según tus hipótesis'],
            ejemplosInvestigacion: ['¿Cuál es la relación?', '¿Existen diferencias?', '¿Puedo predecir?']
        }
    ],
    datos: [
        { 
            id: 'param', 
            nombre: 'Paramétricos',
            resumen: 'Distribución Normal',
            nivel: 1, 
            color: '#d97706', 
            descripcion: 'Distribución Normal',
            caracteristicas: 'Datos que siguen una distribución normal (curva de Gauss)',
            requisitos: 'Prueba de normalidad requerida (Shapiro-Wilk, K-S)',
            tamaño: 'n ≥ 30 generalmente',
            ventajas: 'Mayor poder estadístico',
            limitaciones: 'Requiere supuesto de normalidad'
        },
        { 
            id: 'no-param', 
            nombre: 'No Paramétricos',
            resumen: 'Sin Normalidad',
            nivel: 1, 
            color: '#d97706', 
            descripcion: 'Sin Normalidad',
            caracteristicas: 'Datos ordinales, rangos, o que no cumplen normalidad',
            requisitos: 'No requiere supuesto de normalidad',
            tamaño: 'Funciona con cualquier n',
            ventajas: 'Más flexible y robusto',
            limitaciones: 'Menor poder estadístico'
        },
        { 
            id: 'mixto', 
            nombre: 'Mixto',
            resumen: 'Paramétrico + No Param.',
            nivel: 1, 
            color: '#d97706', 
            descripcion: 'Combinado',
            caracteristicas: 'Combinación de variables paramétricas y no paramétricas',
            requisitos: 'Estratificación por tipo de variable',
            tamaño: 'Flexible',
            ventajas: 'Mayor aplicabilidad real',
            limitaciones: 'Requiere cuidado en selección de métodos'
        }
    ],
    analisis: [
        { 
            id: 'corr', 
            nombre: 'Correlación',
            resumen: 'Mide relaciones',
            nivel: 2, 
            color: '#8b5cf6', 
            descripcion: 'Asociación entre variables',
            pregunta: '¿Qué variables están asociadas?',
            objetivos: 'Identificar relaciones entre dos o más variables',
            aplicaciones: 'Análisis exploratorio, identificación de factores relevantes',
            metodosAplicables: ['Pearson (paramétrico)', 'Spearman (no paramétrico)', 'Kendall (ranking)'],
            requisitos: 'Mínimo 2 variables cuantitativas'
        },
        { 
            id: 'reg', 
            nombre: 'Regresión',
            resumen: 'Predice comportamiento',
            nivel: 2, 
            color: '#8b5cf6', 
            descripcion: 'Predicción',
            pregunta: '¿Cómo predecir una variable?',
            objetivos: 'Modelar relación causal y hacer predicciones',
            aplicaciones: 'Forecast, análisis causal, control de calidad',
            metodosAplicables: ['Regresión Lineal (simple/múltiple)', 'Regresión Logística', 'Regresión Ordinal'],
            requisitos: '1 variable dependiente + 1+ independientes'
        },
        { 
            id: 'comp', 
            nombre: 'Comparación',
            resumen: 'Compara grupos',
            nivel: 2, 
            color: '#8b5cf6', 
            descripcion: 'Diferencias entre grupos',
            pregunta: '¿Existen diferencias significativas entre grupos?',
            objetivos: 'Detectar diferencias estadísticas entre condiciones',
            aplicaciones: 'Evaluación de impacto, pruebas A/B, análisis de eficacia',
            metodosAplicables: ['ANOVA (múltiples grupos)', 't-test (2 grupos)', 'Kruskal-Wallis (no param)'],
            requisitos: '2+ grupos a comparar en variable dependiente'
        },
        { 
            id: 'est', 
            nombre: 'Estructura',
            resumen: 'Explora patrones',
            nivel: 2, 
            color: '#8b5cf6', 
            descripcion: 'Patrones y componentes',
            pregunta: '¿Cuáles son los patrones subyacentes?',
            objetivos: 'Reducir dimensionalidad y encontrar patrones latentes',
            aplicaciones: 'Segmentación, simplificación de índices, análisis de factores',
            metodosAplicables: ['PCA (componentes)', 'Análisis de Factores', 'Clúster (K-means)'],
            requisitos: 'Múltiples variables correlacionadas'
        }
    ],
    metodos: [
        { 
            id: 'spearman', 
            nombre: "Spearman's rho",
            resumen: "Correlación no param.",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Correlación no paramétrica basada en rangos',
            ventajas: 'Robusta ante distribuciones no normales, maneja ordinales',
            aplicaciones: 'Datos ordinales, muestras pequeñas, outliers',
            frecuencia: '5 de 8 tesis (62.5%)',
            ejemplos: ['Relación presupuesto-impacto', 'Gobernanza y eficiencia', 'Rango de proyectos vs resultados'],
            baseDatos: ['Encuestas de satisfacción', 'Evaluaciones ordinal', 'Ranking de desempeño'],
            rango: 'ρ de -1 a +1',
            supuestos: 'Variables ordinales o continuas',
            // PDFs - Actualmente placeholders, reemplazar con PDFs reales
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-spearman.html'
        },
        { 
            id: 'shapiro', 
            nombre: 'Shapiro-Wilk', 
            resumen: "Prueba normalidad",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Prueba de normalidad multivariada',
            ventajas: 'Potente para muestras pequeñas (n<50)',
            aplicaciones: 'Validación de supuestos previo a tests paramétricos',
            frecuencia: '4 de 8 tesis (50%)',
            ejemplos: ['Verificar antes de ANOVA', 'Validar antes de regresión', 'Pre-análisis exploratorio'],
            baseDatos: ['Cualquier dataset numérico', 'Variables cuantitativas continuas'],
            rango: 'W de 0 a 1 (cercano a 1 = normal)',
            supuestos: 'n ≤ 5000 observaciones',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-shapiro.html'
        },
        { 
            id: 'pearson', 
            nombre: 'Correlación de Pearson', 
            resumen: "Correlación param.",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Correlación paramétrica lineal',
            ventajas: 'Rápida, interpretable, asume linealidad perfecta',
            aplicaciones: 'Variables continuas con distribución normal',
            frecuencia: '2 de 8 tesis (25%)',
            ejemplos: ['Relación horas-dedicación', 'Presupuesto-resultado proporcional', 'Variables linealmente relacionadas'],
            baseDatos: ['Datos financieros', 'Series continuas normales'],
            rango: 'r de -1 a +1',
            supuestos: 'Normalidad, linealidad, homogeneidad de varianza',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-pearson.html'
        },
        { 
            id: 'anova', 
            nombre: 'ANOVA', 
            resumen: "Comparación múltiple",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Análisis de Varianza para múltiples grupos',
            ventajas: 'Prueba 3+ grupos simultáneamente, eficiente',
            aplicaciones: 'Comparación de medias entre regiones, años, departamentos',
            frecuencia: '1 de 8 tesis (12.5%)',
            ejemplos: ['Diferencias de cobertura por región', 'Impacto por tipo de inversión', 'Desempeño por quintil de ingreso'],
            baseDatos: ['Datos agregados por grupo', 'Variables de estratificación'],
            rango: 'F (razón de varianzas)',
            supuestos: 'Normalidad, homogeneidad de varianzas, independencia',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-anova.html'
        },
        { 
            id: 'reglin', 
            nombre: 'Regresión Lineal Múltiple', 
            resumen: "Predicción multivariada",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Modelado de relación entre 1 DV y 2+ IVs',
            ventajas: 'Captura efectos simultáneos, interpretable, testeable',
            aplicaciones: 'Análisis de causalidad, pronósticos, control estadístico',
            frecuencia: '3 de 8 tesis (37.5%)',
            ejemplos: ['Presupuesto=f(población, cobertura, eficiencia)', 'Impacto=f(diseño, contexto, ejecución)', 'Demanda=f(precio, ingreso, sustitutos)'],
            baseDatos: ['Panel de datos', 'Datos longitudinales', 'Encuestas complejas'],
            rango: 'R², β (coeficientes)',
            supuestos: 'Linealidad, normalidad de residuos, no multicolinealidad',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-regresion.html'
        },
        { 
            id: 'reglog', 
            nombre: 'Regresión Logística Ordinal', 
            resumen: "Variable ord. categórica",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Predicción de variables ordinales categóricas',
            ventajas: 'Maneja categorías ordenadas (bajo-medio-alto)',
            aplicaciones: 'Evaluación de impacto (no/bajo/medio/alto), niveles de satisfacción',
            frecuencia: '1 de 8 tesis (12.5%)',
            ejemplos: ['Probabilidad de impacto (alto vs medio vs bajo)', 'Nivel de cobertura logrado', 'Satisfacción del beneficiario'],
            baseDatos: ['Evaluaciones en escala ordinal', 'Respuestas categóricas ordenadas'],
            rango: 'Probabilidades por categoría',
            supuestos: 'Proporcionalidad de odds, independencia',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-logistica.html'
        },
        { 
            id: 'pca', 
            nombre: 'PCA', 
            resumen: "Análisis Componentes",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Análisis de Componentes Principales',
            ventajas: 'Reduce dimensionalidad manteniendo varianza, descubre patrones',
            aplicaciones: 'Creación de índices sintéticos, simplificación de datos',
            frecuencia: '1 de 8 tesis (12.5%)',
            ejemplos: ['Índice de Desarrollo Municipal', 'Índice de Calidad de Vida', 'Score de Desempeño Integral'],
            baseDatos: ['Matrices de correlación multivariadas', 'Indicadores múltiples'],
            rango: 'Eigenvalores, varianza explicada %',
            supuestos: 'Correlación entre variables, normalidad multivariada',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-pca.html'
        },
        { 
            id: 'ks', 
            nombre: 'Kolmogorov-Smirnov', 
            resumen: "Bondad de ajuste",
            nivel: 3, 
            color: '#10b981',
            descripcion: 'Prueba no paramétrica de bondad de ajuste',
            ventajas: 'Alternativa robusta a Shapiro, para distribuciones continuas',
            aplicaciones: 'Verificar si datos siguen distribución teórica, detectar desviaciones',
            frecuencia: '2 de 8 tesis (25%)',
            ejemplos: ['¿Los datos siguen distribución uniforme?', '¿Hay desviación de normalidad?', 'Validación de supuestos'],
            baseDatos: ['Datos continuos sin agrupar', 'Series de tiempo'],
            rango: 'D (estadístico de máxima distancia)',
            supuestos: 'Variable continua, muestra aleatoria',
            pdfUrl: '../docs/pdf/placeholder.html',
            galeriaUrl: 'galerias-metodos/galeria-ks.html'
        }
    ],
    conexiones: [
        // Campos -> Datos
        { source: 'gest-emp', target: 'param', value: 2 },
        { source: 'gest-emp', target: 'no-param', value: 1 },
        { source: 'gest-pub', target: 'param', value: 1 },
        { source: 'gest-pub', target: 'no-param', value: 1 },
        { source: 'inv-pub', target: 'param', value: 1 },
        { source: 'inv-pub', target: 'no-param', value: 1 },
        { source: 'ger-pub', target: 'mixto', value: 1 },
        { source: 'cien-ec', target: 'no-param', value: 2 },
        { source: 'cien-ec', target: 'mixto', value: 1 },
        { source: 'proy-inv', target: 'no-param', value: 1 },
        { source: 'gest-neg', target: 'no-param', value: 1 },
        
        // Datos -> Análisis
        { source: 'param', target: 'corr', value: 1 },
        { source: 'param', target: 'reg', value: 1 },
        { source: 'param', target: 'est', value: 1 },
        { source: 'no-param', target: 'corr', value: 3 },
        { source: 'no-param', target: 'comp', value: 1 },
        { source: 'no-param', target: 'reg', value: 1 },
        { source: 'mixto', target: 'corr', value: 2 },
        
        // Análisis -> Métodos
        { source: 'corr', target: 'spearman', value: 5 },
        { source: 'corr', target: 'pearson', value: 2 },
        { source: 'corr', target: 'shapiro', value: 4 },
        { source: 'reg', target: 'reglin', value: 3 },
        { source: 'reg', target: 'reglog', value: 1 },
        { source: 'comp', target: 'anova', value: 1 },
        { source: 'comp', target: 'ks', value: 1 },
        { source: 'est', target: 'pca', value: 1 }
    ]
};

class SankeyDiagram {
    constructor() {
        this.svg = document.getElementById('sankey-svg');
        this.modal = document.getElementById('detail-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.querySelector('.modal-close');
        this.allNodes = [];
        this.init();
    }

    init() {
        this.createDiagram();
        this.setupEventListeners();
    }

    createDiagram() {
        const width = this.svg.parentElement.clientWidth - 40;
        const height = 600;
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Posicionar nodos en columnas
        const columnWidths = [width * 0.15, width * 0.30, width * 0.45, width * 0.65, width * 0.85];
        const nodesByLevel = [
            sankeyData.campos,
            sankeyData.datos,
            sankeyData.analisis,
            sankeyData.metodos
        ];

        // Calcular posiciones de nodos
        nodesByLevel.forEach((level, levelIndex) => {
            const x = columnWidths[levelIndex];
            const spacing = (height - 60) / (level.length + 1);
            level.forEach((node, index) => {
                node.x = x;
                node.y = 30 + (index + 1) * spacing;
                node.width = 120;
                node.height = 35;
                this.allNodes.push(node);
            });
        });

        // Dibujar enlaces primero
        this.drawLinks();

        // Dibujar nodos
        this.drawNodes();

        // Agregar títulos de columnas
        this.addColumnLabels(columnWidths);
    }

    drawLinks() {
        const linkGroup = this.svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        linkGroup.setAttribute('class', 'links');

        sankeyData.conexiones.forEach(conexion => {
            const source = this.allNodes.find(n => n.id === conexion.source);
            const target = this.allNodes.find(n => n.id === conexion.target);

            if (source && target) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const x1 = source.x + source.width / 2;
                const y1 = source.y + source.height / 2;
                const x2 = target.x - 20;
                const y2 = target.y + target.height / 2;

                // Curva Bezier
                const d = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                path.setAttribute('d', d);
                path.setAttribute('class', 'sankey-link');
                path.setAttribute('data-source', conexion.source);
                path.setAttribute('data-target', conexion.target);
                linkGroup.appendChild(path);
            }
        });
    }

    drawNodes() {
        const nodeGroup = this.svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        nodeGroup.setAttribute('class', 'nodes');

        this.allNodes.forEach((node, index) => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', `sankey-node level-${node.nivel + 1}`);
            g.setAttribute('data-id', node.id);

            // Rectángulo
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', node.x - node.width / 2);
            rect.setAttribute('y', node.y - node.height / 2);
            rect.setAttribute('width', node.width);
            rect.setAttribute('height', node.height);
            rect.setAttribute('fill', node.color);

            // Texto principal (resumen)
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y);
            text.setAttribute('dy', '0.3em');
            text.setAttribute('class', 'node-text-main');
            text.textContent = node.nombre;

            // Texto secundario (resumen en nodo)
            const textResumen = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textResumen.setAttribute('x', node.x);
            textResumen.setAttribute('y', node.y + 12);
            textResumen.setAttribute('dy', '0.3em');
            textResumen.setAttribute('class', 'node-text-secondary');
            textResumen.setAttribute('font-size', '10px');
            textResumen.setAttribute('fill', '#ffffff');
            textResumen.setAttribute('opacity', '0.8');
            if (node.resumen) {
                textResumen.textContent = node.resumen;
            }

            // Tooltip (title para SVG)
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = this.crearTooltip(node);

            g.appendChild(title);
            g.appendChild(rect);
            g.appendChild(text);
            if (node.resumen) {
                g.appendChild(textResumen);
            }
            nodeGroup.appendChild(g);

            // Event listeners
            g.addEventListener('click', () => this.showDetails(node));
            g.addEventListener('mouseenter', () => this.highlightPath(node));
            g.addEventListener('mouseleave', () => this.clearHighlight());
        });
    }

    crearTooltip(node) {
        let tooltip = `${node.nombre}\n`;
        
        if (node.nivel === 0) {
            // Campo
            tooltip += `\n📚 Tipos de Tesis:\n${node.tiposTesis.join('\n')}\n`;
            tooltip += `\n🎓 Temas:\n${node.temas.slice(0, 3).join(', ')}\n`;
            tooltip += `\n📊 Bases de Datos:\n${node.baseDatos.join(', ')}`;
        } else if (node.nivel === 1) {
            // Datos
            tooltip += `${node.caracteristicas}\n`;
            tooltip += `Requisitos: ${node.requisitos}\n`;
            tooltip += `Tamaño: ${node.tamaño}`;
        } else if (node.nivel === 2) {
            // Análisis
            tooltip += `${node.descripcion}\n`;
            tooltip += `Pregunta: ${node.pregunta}\n`;
            tooltip += `Métodos: ${node.metodosAplicables.join(', ')}`;
        } else if (node.nivel === 3) {
            // Métodos
            tooltip += `${node.descripcion}\n`;
            tooltip += `Frecuencia: ${node.frecuencia}\n`;
            tooltip += `Bases de datos: ${node.baseDatos.join(', ')}\n`;
            tooltip += `[CLICK para ver más detalles]`;
        }
        
        return tooltip;
    }

    highlightPath(node) {
        // Highlight nodos conectados
        const connectedIds = this.getConnectedNodes(node.id);
        connectedIds.add(node.id);

        this.svg.querySelectorAll('.sankey-node').forEach(n => {
            if (connectedIds.has(n.dataset.id)) {
                n.classList.add('pulse');
            }
        });

        // Highlight enlaces
        this.svg.querySelectorAll('.sankey-link').forEach(link => {
            if (link.dataset.source === node.id || link.dataset.target === node.id) {
                link.classList.add('active');
            }
        });
    }

    clearHighlight() {
        this.svg.querySelectorAll('.sankey-node').forEach(n => n.classList.remove('pulse'));
        this.svg.querySelectorAll('.sankey-link').forEach(link => link.classList.remove('active'));
    }

    getConnectedNodes(nodeId) {
        const connected = new Set();
        const addConnected = (id) => {
            sankeyData.conexiones.forEach(c => {
                if (c.source === id && !connected.has(c.target)) {
                    connected.add(c.target);
                    addConnected(c.target);
                }
                if (c.target === id && !connected.has(c.source)) {
                    connected.add(c.source);
                    addConnected(c.source);
                }
            });
        };
        addConnected(nodeId);
        return connected;
    }

    showDetails(node) {
        let html = `<h2>${node.nombre}</h2>`;

        if (node.nivel === 0) {
            // CAMPO - Tema de Tesis
            html += `<div class="detalles-box">`;
            html += `<p style="font-size:1rem; color:#1e293b; margin-bottom:1rem;"><strong>🎯 ${node.servicio}</strong></p>`;
            html += `<p style="color:#475569; margin-bottom:1.5rem;">${node.descripcionSimple}</p>`;
            
            html += `<h3>📚 Tipos de Tesis en este Campo</h3>`;
            html += `<ul class="detalles-list">`;
            node.tiposTesis.forEach(t => html += `<li>${t}</li>`);
            html += `</ul>`;
            
            html += `<h3>🎓 Temas de Estudio</h3>`;
            html += `<ul class="detalles-list">`;
            node.temas.forEach(t => html += `<li>${t}</li>`);
            html += `</ul>`;
            
            html += `<h3>📊 Bases de Datos Recomendadas</h3>`;
            html += `<ul class="detalles-list">`;
            node.baseDatos.forEach(bd => html += `<li>${bd}</li>`);
            html += `</ul>`;
            
            html += `<h3>🔬 Ejemplos de Investigaciones</h3>`;
            html += `<ul class="detalles-list">`;
            node.ejemplosInvestigacion.forEach(ei => html += `<li>${ei}</li>`);
            html += `</ul>`;
            html += `</div>`;
            
        } else if (node.nivel === 1) {
            // TIPO DE DATOS
            html += `<div class="detalles-box">`;
            html += `<p><strong>💡 ${node.servicio}</strong></p>`;
            html += `<p style="color:#475569; margin-bottom:1rem;">${node.descripcionSimple}</p>`;
            html += `<hr style="border:none; border-top:2px solid #fbbf24; margin:1rem 0;">`;
            html += `<p><strong>¿Qué significa?</strong> ${node.caracteristicas}</p>`;
            html += `<p><strong>¿Cómo verificar?</strong> ${node.requisitos}</p>`;
            html += `<p><strong>Tamaño de muestra:</strong> ${node.tamaño}</p>`;
            html += `<p><strong>✅ Ventajas:</strong> ${node.ventajas}</p>`;
            html += `<p><strong>⚠️ Limitaciones:</strong> ${node.limitaciones}</p>`;
            html += `</div>`;
            
        } else if (node.nivel === 2) {
            // ANÁLISIS
            html += `<div class="detalles-box">`;
            html += `<p><strong>🎯 Pregunta de Investigación:</strong></p>`;
            html += `<p style="font-size:1.05rem; color:#dc2626; margin-bottom:1rem;">"${node.pregunta}"</p>`;
            html += `<p><strong>📌 Objetivo:</strong> ${node.objetivos}</p>`;
            html += `<p><strong>💼 Aplicaciones Prácticas:</strong> ${node.aplicaciones}</p>`;
            html += `<h3>🔧 Métodos que Puedes Usar</h3>`;
            html += `<ul class="detalles-list">`;
            node.metodosAplicables.forEach(m => html += `<li>${m}</li>`);
            html += `</ul>`;
            html += `<p><strong>📊 Requisitos:</strong> ${node.requisitos}</p>`;
            html += `</div>`;
            
        } else if (node.nivel === 3) {
            // MÉTODO CUANTITATIVO
            html += `<div class="detalles-box">`;
            html += `<p style="font-size:0.95rem; color:#475569;"><strong>¿Qué es?</strong> ${node.descripcion}</p>`;
            
            html += `<p style="margin-top:1rem;"><strong>✅ Ventajas:</strong></p>`;
            html += `<ul class="detalles-list">`;
            html += `<li>${node.ventajas}</li>`;
            html += `</ul>`;
            
            html += `<p style="margin-top:1rem;"><strong>💼 Cuándo usarlo:</strong></p>`;
            html += `<ul class="detalles-list">`;
            html += `<li>${node.aplicaciones}</li>`;
            html += `</ul>`;
            
            html += `<p style="margin-top:1rem;"><strong>📊 Rango de valores:</strong> ${node.rango}</p>`;
            html += `<p><strong>⚙️ Supuestos:</strong> ${node.supuestos}</p>`;
            html += `<p><strong>📈 Frecuencia en tesis peruanas:</strong> <span style="color:#dc2626; font-weight:700;">${node.frecuencia}</span></p>`;
            
            html += `<h3 style="margin-top:1.5rem;">📚 Bases de Datos Típicas</h3>`;
            html += `<ul class="detalles-list">`;
            node.baseDatos.forEach(bd => html += `<li>${bd}</li>`);
            html += `</ul>`;
            
            html += `<h3>🔬 Ejemplos Reales de Uso</h3>`;
            html += `<ul class="detalles-list">`;
            node.ejemplos.forEach(ex => html += `<li>${ex}</li>`);
            html += `</ul>`;
            html += `</div>`;
            
            // RAMAS FINALES: PDF, GALERÍA Y CONSULTORÍA
            html += `<div class="metodo-branches">`;
            html += `<a href="${node.pdfUrl}" target="_blank" class="branch-link pdf-link" title="Ver informe PDF de ejemplo">
                        <span class="branch-icon">📄</span>
                        <span class="branch-text">Ejemplo PDF</span>
                    </a>`;
            html += `<a href="${node.galeriaUrl}" class="branch-link galeria-link" title="Ver galería de gráficos">
                        <span class="branch-icon">🖼️</span>
                        <span class="branch-text">Galería</span>
                    </a>`;
            html += `<button onclick="solicitarConsultoria('${node.nombre}')" class="branch-link consultor-link" title="Solicita ayuda de especialistas">
                        <span class="branch-icon">👨‍💼</span>
                        <span class="branch-text">Consultoría</span>
                    </button>`;
            html += `</div>`;
        }

        this.modalBody.innerHTML = html;
        this.modal.style.display = 'flex';
    }

    setupEventListeners() {
        this.modalClose.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modal.style.display = 'none';
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new SankeyDiagram();
});

// ═══════════════════════════════════════════════════════════════════════
// FUNCIÓN: Solicitar Consultoría
// ═══════════════════════════════════════════════════════════════════════

function solicitarConsultoria(nombreMetodo) {
    const asunto = `Consultoría: ${nombreMetodo}`;
    const mensaje = `Hola, necesito ayuda con el método estadístico: ${nombreMetodo}\n\nMi tema de tesis es:\n[Escribe aquí tu tema]\n\n¿Pueden ayudarme a:\n- Verificar si es el método correcto?\n- Aplicar el análisis?\n- Interpretar los resultados?`;
    
    // Simulación de formulario de contacto
    // En producción, esto sería un formulario real o enviado por correo
    alert(`
📧 SOLICITUD DE CONSULTORÍA

Método: ${nombreMetodo}

Para solicitar consultoría:
1. Prepara la siguiente información:
   - Tu nombre y email
   - Tema de tu tesis
   - Preguntas específicas

2. Envía un correo a: consultorias@academiainvpub.com
   Asunto: ${asunto}

3. Alguien te contactará en 24-48 horas

¡Estamos listos para ayudarte! 🚀
    `);
}


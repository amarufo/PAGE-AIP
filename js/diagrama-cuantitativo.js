// Base de datos de métodos cuantitativos según criterios
const metodosDatabase = {
    "Gestión Empresarial": {
        "paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Correlación de Pearson",
                        descripcion: "Mide la correlación lineal entre dos variables continuas",
                        ventajas: "Rápida, interpretable",
                        aplicaciones: "Relaciones entre variables cuantitativas"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Seguridad Energética en GLP",
                        descripcion: "Análisis de factores causales en cadenas de suministro (2000-2016)",
                        metodos: ["Correlación de Pearson", "PCA"],
                        pdf: "01_analisis_glp.pdf"
                    }
                ]
            },
            "regresión": {
                metodos: [
                    {
                        nombre: "Regresión Lineal Múltiple",
                        descripcion: "Predice una variable dependiente a partir de múltiples variables independientes",
                        ventajas: "Flexible, interpretable",
                        aplicaciones: "Predicción y análisis de causalidad"
                    }
                ],
                ejemplos: []
            },
            "estructura": {
                metodos: [
                    {
                        nombre: "PCA (Análisis de Componentes Principales)",
                        descripcion: "Reduce dimensionalidad preservando varianza",
                        ventajas: "Compresión de datos, eliminación de multicolinealidad",
                        aplicaciones: "Simplificación de múltiples variables"
                    },
                    {
                        nombre: "SEM (Modelado de Ecuaciones Estructurales)",
                        descripcion: "Modela relaciones complejas entre variables latentes y observadas",
                        ventajas: "Captura estructuras complejas",
                        aplicaciones: "Modelos teóricos complejos"
                    }
                ],
                ejemplos: []
            }
        },
        "no-paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Correlación de Spearman",
                        descripcion: "Mide correlación monotónica entre variables",
                        ventajas: "Robusta, no requiere normalidad",
                        aplicaciones: "Datos ordinales o no normales"
                    }
                ],
                ejemplos: []
            }
        }
    },
    "Gestión Pública": {
        "paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Correlación de Pearson",
                        descripcion: "Mide la correlación lineal entre variables de presupuesto y desempeño",
                        ventajas: "Clara interpretación, resultados directos",
                        aplicaciones: "Relación presupuesto-calidad de gasto"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Influencia en Calidad de Gasto Municipal",
                        descripcion: "Análisis de correlación con pruebas de normalidad (2015-2021)",
                        metodos: ["Correlación de Pearson", "Shapiro-Wilk"],
                        pdf: "02_gasto_municipal.pdf"
                    }
                ]
            }
        },
        "no-paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Correlación de Spearman",
                        descripcion: "Alternativa robusta para datos sin distribución normal",
                        ventajas: "Flexible, robusto ante outliers",
                        aplicaciones: "Datos ordinales o con valores atípicos"
                    }
                ],
                ejemplos: []
            }
        }
    },
    "Inversión Pública": {
        "paramétrico": {
            "regresión": {
                metodos: [
                    {
                        nombre: "Regresión Logística Ordinal",
                        descripcion: "Predice variables ordinales (categorías ordenadas)",
                        ventajas: "Apropiada para resultados categóricos ordenados",
                        aplicaciones: "Impacto en evaluación de proyectos (bajo-medio-alto)"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Impacto en Unidad Ejecutora del Ejército Peruano",
                        descripcion: "Ejecución presupuestal con regresión logística ordinal (2015-2021)",
                        metodos: ["Regresión Logística Ordinal", "Pseudo R² Nagelkerke"],
                        pdf: "03_ejecutora_ejercito.pdf"
                    }
                ]
            }
        },
        "no-paramétrico": {
            "comparación": {
                metodos: [
                    {
                        nombre: "Kruskal-Wallis",
                        descripcion: "Compara múltiples grupos sin asumir normalidad",
                        ventajas: "Robusto, flexible",
                        aplicaciones: "Comparar desempeño entre regiones"
                    }
                ],
                ejemplos: []
            }
        }
    },
    "Gerencia Pública": {
        "mixto": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Spearman's rho",
                        descripcion: "Correlación no paramétrica entre pobreza e inversión",
                        ventajas: "Robusta ante distribuciones mixtas",
                        aplicaciones: "Relación inversión-reducción pobreza"
                    },
                    {
                        nombre: "ANOVA",
                        descripcion: "Compara medias entre grupos",
                        ventajas: "Paramétrico, robusto",
                        aplicaciones: "Diferencias por zona geográfica"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Impacto de Inversiones en Equidad Social",
                        descripcion: "Correlación con reducción de pobreza en distrito rural (2005-2015)",
                        metodos: ["Spearman's rho", "ANOVA", "Regresión Lineal Múltiple"],
                        pdf: "04_equidad_social.pdf"
                    }
                ]
            }
        }
    },
    "Ciencias Económicas": {
        "no-paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Spearman's rho",
                        descripcion: "Correlación robusta para datos ordinales o no normales",
                        ventajas: "No requiere normalidad, resistente a outliers",
                        aplicaciones: "Gobernanza democrática y presupuesto participativo"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Gobernanza Democrática y Presupuesto Participativo",
                        descripcion: "Relación entre gobernanza y participación en distrito",
                        metodos: ["Spearman's rho"],
                        pdf: "05_gobernanza.pdf"
                    }
                ]
            }
        },
        "mixto": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Spearman's rho",
                        descripcion: "Para variables ordinales y continuas",
                        ventajas: "Flexible",
                        aplicaciones: "Simplificación administrativa"
                    },
                    {
                        nombre: "Shapiro-Wilk",
                        descripcion: "Prueba de normalidad preliminar",
                        ventajas: "Identifica el test apropiado",
                        aplicaciones: "Selección de método"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Eficiencia Burocrática en Gestión de Proyectos",
                        descripcion: "Simplificación administrativa (2021)",
                        metodos: ["Spearman's rho", "Shapiro-Wilk"],
                        pdf: "06_eficiencia_burocratica.pdf"
                    }
                ]
            }
        }
    },
    "Proyectos de Inversión": {
        "no-paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Spearman's rho",
                        descripcion: "Correlación entre plazo, costo y eficiencia",
                        ventajas: "Robusta ante outliers",
                        aplicaciones: "Análisis de desempeño en municipalidades"
                    },
                    {
                        nombre: "Kolmogorov-Smirnov",
                        descripcion: "Prueba de bondad de ajuste",
                        ventajas: "Detecta desviaciones de normalidad",
                        aplicaciones: "Validación de supuestos"
                    },
                    {
                        nombre: "Shapiro-Wilk",
                        descripcion: "Contrasta normalidad de datos",
                        ventajas: "Mayor potencia para muestras pequeñas",
                        aplicaciones: "Selección de prueba estadística"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Desempeño en Ejecución de Inversiones",
                        descripcion: "Eficiencia en plazo y costo en municipalidades provinciales (2016-2023)",
                        metodos: ["Spearman's rho", "Kolmogorov-Smirnov", "Shapiro-Wilk"],
                        pdf: "07_desempeno_ejecucion.pdf"
                    }
                ]
            }
        }
    },
    "Gestión y Negocios": {
        "no-paramétrico": {
            "correlación": {
                metodos: [
                    {
                        nombre: "Spearman's rho",
                        descripcion: "Correlación entre reformas y desempeño",
                        ventajas: "Robusta, flexible",
                        aplicaciones: "Análisis de impacto de políticas"
                    }
                ],
                ejemplos: [
                    {
                        titulo: "Reformas en Sistemas de Inversión: Invierte Perú",
                        descripcion: "Incidencia en elaboración y ejecución (2017)",
                        metodos: ["Spearman's rho"],
                        pdf: "08_invierte_peru.pdf"
                    }
                ]
            }
        }
    }
};

// Matriz de decisión para mostrar al final
const matrizDecision = [
    { metodo: "Spearman's rho", frecuencia: "5/8", complejidad: "Básica", uso: "Correlación no paramétrica" },
    { metodo: "Shapiro-Wilk", frecuencia: "4/8", complejidad: "Básica", uso: "Prueba de normalidad" },
    { metodo: "Regresión Lineal Múltiple", frecuencia: "3/8", complejidad: "Media", uso: "Predicción multivariada" },
    { metodo: "Kolmogorov-Smirnov", frecuencia: "2/8", complejidad: "Básica", uso: "Prueba de bondad de ajuste" },
    { metodo: "Regresión Logística Ordinal", frecuencia: "1/8", complejidad: "Alta", uso: "Variables ordinales" },
    { metodo: "PCA", frecuencia: "1/8", complejidad: "Alta", uso: "Reducción de dimensionalidad" },
    { metodo: "SEM", frecuencia: "1/8", complejidad: "Muy Alta", uso: "Modelos complejos" },
    { metodo: "ANOVA", frecuencia: "1/8", complejidad: "Media", uso: "Comparación de grupos" }
];

class DiagramaCuantitativo {
    constructor() {
        this.selecciones = {
            campo: null,
            datos: null,
            analisis: null
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botones de opciones
        document.querySelectorAll('.opcion-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleOpcionClick(btn));
        });

        // Botón reiniciar
        document.getElementById('btn-reiniciar').addEventListener('click', () => this.reiniciar());
    }

    handleOpcionClick(btn) {
        const nivel = btn.dataset.nivel;
        const valor = btn.dataset.valor;

        // Deseleccionar otros botones del mismo nivel
        document.querySelectorAll(`[data-nivel="${nivel}"]`).forEach(b => {
            b.classList.remove('activo');
        });

        // Seleccionar el nuevo
        btn.classList.add('activo');

        // Guardar selección
        if (nivel === "1") {
            this.selecciones.campo = valor;
            this.mostrarNivel(2);
            this.ocultarNiveles([3, 4, 5]);
        } else if (nivel === "2") {
            this.selecciones.datos = valor;
            this.mostrarNivel(3);
            this.ocultarNiveles([4, 5]);
        } else if (nivel === "3") {
            this.selecciones.analisis = valor;
            this.generarResultado();
            this.mostrarNivel(4);
            this.mostrarNivel(5);
        }

        this.mostrarBtnReiniciar();
    }

    mostrarNivel(num) {
        const nivel = document.querySelector(`.nivel-${num}`);
        if (nivel) {
            nivel.style.display = 'block';
            nivel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    ocultarNiveles(nums) {
        nums.forEach(num => {
            const nivel = document.querySelector(`.nivel-${num}`);
            if (nivel) nivel.style.display = 'none';
        });
    }

    generarResultado() {
        const { campo, datos, analisis } = this.selecciones;

        let metodosEncontrados = [];
        let ejemplos = [];

        if (metodosDatabase[campo] && metodosDatabase[campo][datos] && 
            metodosDatabase[campo][datos][analisis]) {
            metodosEncontrados = metodosDatabase[campo][datos][analisis].metodos;
            ejemplos = metodosDatabase[campo][datos][analisis].ejemplos;
        }

        this.renderResultado(metodosEncontrados, ejemplos);
    }

    renderResultado(metodos, ejemplos) {
        const contenedor = document.getElementById('resultado-metodo');
        let html = '<h3>✓ Métodos Recomendados</h3>';

        if (metodos.length > 0) {
            metodos.forEach(metodo => {
                html += `
                    <div class="metodo-card">
                        <h4>${metodo.nombre}</h4>
                        <p>${metodo.descripcion}</p>
                        <div class="metodo-detalles">
                            <p><strong>Ventajas:</strong> ${metodo.ventajas}</p>
                            <p><strong>Aplicaciones:</strong> ${metodo.aplicaciones}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            html += '<p style="color: #666;">No hay métodos específicos para esta combinación. Consulta con un especialista.</p>';
        }

        contenedor.innerHTML = html;

        // Renderizar ejemplos de servicios
        this.renderEjemplos(ejemplos);
    }

    renderEjemplos(ejemplos) {
        const contenedor = document.getElementById('ejemplos-servicios');
        let html = '';

        if (ejemplos.length > 0) {
            ejemplos.forEach(ejemplo => {
                const metodosStr = ejemplo.metodos.join(', ');
                html += `
                    <div class="ejemplo-servicio">
                        <h4>${ejemplo.titulo}</h4>
                        <p>${ejemplo.descripcion}</p>
                        <div class="tags">
                            ${ejemplo.metodos.map(m => `<span class="tag">${m}</span>`).join('')}
                        </div>
                        <a href="../docs/pdf/${ejemplo.pdf}" class="enlace-pdf" target="_blank">
                            📄 Ver Ejemplo (PDF)
                        </a>
                    </div>
                `;
            });
        } else {
            html = '<p style="color: #999; grid-column: 1/-1;">Ejemplos específicos disponibles próximamente.</p>';
        }

        contenedor.innerHTML = html;
    }

    mostrarBtnReiniciar() {
        const btn = document.getElementById('btn-reiniciar');
        btn.style.display = 'inline-block';
    }

    reiniciar() {
        // Reset de selecciones
        this.selecciones = { campo: null, datos: null, analisis: null };

        // Limpiar botones activos
        document.querySelectorAll('.opcion-btn.activo').forEach(btn => {
            btn.classList.remove('activo');
        });

        // Mostrar solo nivel 1
        this.mostrarNivel(1);
        this.ocultarNiveles([2, 3, 4, 5]);

        // Ocultar botón reiniciar
        document.getElementById('btn-reiniciar').style.display = 'none';

        // Scroll al inicio
        document.querySelector('.diagrama-wrapper').scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new DiagramaCuantitativo();

    // Mostrar matriz de decisión
    mostrarMatrizDecision();
});

function mostrarMatrizDecision() {
    const tablaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Método Cuantitativo</th>
                    <th>Frecuencia en Tesis</th>
                    <th>Complejidad</th>
                    <th>Uso Principal</th>
                </tr>
            </thead>
            <tbody>
                ${matrizDecision.map(fila => `
                    <tr>
                        <td><strong>${fila.metodo}</strong></td>
                        <td><span class="frecuencia">${fila.frecuencia}</span></td>
                        <td>${fila.complejidad}</td>
                        <td>${fila.uso}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('tabla-resumen').innerHTML = tablaHTML;
    document.getElementById('panel-resumen').style.display = 'block';
}

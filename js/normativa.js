/**
 * normativa.js — Explorador de Normativa de Inversión Pública
 * Carga todos los JSON del directorio data/json-normativa y construye
 * una interfaz de búsqueda, filtrado y estudio normativo.
 */
(function () {
    'use strict';

    /* ─── Configuración ─────────────────────────────────────── */
    const IN_PAGES = window.location.pathname.includes('/pages/');
    const ROOT = IN_PAGES ? '../' : './';
    const DATA_PATH = ROOT + 'data/json-normativa/';
    const DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1Dixj6fJwPQOOqqrkoPevJbxtECsBjjLh?usp=sharing';

    const TIPO_LABEL = {
        decreto_legislativo: 'Decreto Legislativo',
        decreto_supremo: 'Decreto Supremo',
        resolucion_directoral: 'Resolución Directoral',
    };

    const TIPO_BADGE = {
        decreto_legislativo: 'badge-dl',
        decreto_supremo: 'badge-ds',
        resolucion_directoral: 'badge-rd',
    };

    const ESTADO_LABEL = {
        vigente: 'Vigente',
        modificado: 'Modificado',
        parcialmente_modificado: 'Parcial. modificado',
        parcialmente_derogado: 'Parcial. derogado',
        derogado: 'Derogado',
    };

    const ESTADO_CLASS = {
        vigente: 'estado-vigente',
        modificado: 'estado-modificado',
        parcialmente_modificado: 'estado-parcial',
        parcialmente_derogado: 'estado-derogado',
        derogado: 'estado-derogado',
    };

    const FASE_LABEL = {
        programacion: 'Programación',
        formulacion_evaluacion: 'Formulación / Evaluación',
        ejecucion: 'Ejecución',
        funcionamiento: 'Funcionamiento',
        transversal: 'Transversal',
    };

    /* ─── Estado de la aplicación ───────────────────────────── */
    let allDocs = [];
    let filteredDocs = [];
    let activeDoc = null;
    let activeTab = 'resumen';
    let quizState = null;
    let filters = { tipo: '', estado: '', fase: '', q: '' };

    /* ─── Normalización de esquemas ─────────────────────────── */
    function normalizeDoc(raw, filename) {
        // Compatibilidad con esquema v1 (sin id, titulo_corto, etc.)
        const id = raw.id || filename.replace('.json', '');
        const titulo_corto = raw.titulo_corto || raw.titulo_oficial || raw.numero || id;

// Extraer fases válidas — soporta string, array o aliases del esquema v1
    const FASES_VALIDAS = new Set(['programacion', 'formulacion_evaluacion', 'ejecucion', 'funcionamiento', 'transversal']);
    const FASE_ALIAS = {
      'todas_las_fases':        ['programacion', 'formulacion_evaluacion', 'ejecucion', 'funcionamiento', 'transversal'],
      'transversal':             ['transversal'],
      'ejecucion':               ['ejecucion'],
      'programacion':            ['programacion'],
      'formulacion_evaluacion':  ['formulacion_evaluacion'],
      'funcionamiento':          ['funcionamiento'],
      'ejecucion_y_funcionamiento': ['ejecucion', 'funcionamiento'],
    };
    let fases_raw = raw.fase_ciclo_inversion;
    if (typeof fases_raw === 'string') {
      fases_raw = FASE_ALIAS[fases_raw] || (FASES_VALIDAS.has(fases_raw) ? [fases_raw] : []);
    } else if (!Array.isArray(fases_raw)) {
      fases_raw = [];
    }
        const fase_ciclo_inversion = fases_raw.filter(f => FASES_VALIDAS.has(f));

        // Resumen: v2 usa resumen_ejecutivo, v1 usa objeto
        const resumen_ejecutivo = raw.resumen_ejecutivo || raw.objeto || '';

        // Normas relacionadas: v2 tiene arrays separados, v1 usa campos distintos
        const normas_que_modifica = Array.isArray(raw.normas_que_modifica)
            ? raw.normas_que_modifica
            : (raw.norma_que_modifica ? [raw.norma_que_modifica.norma || raw.norma_que_modifica] : []);
        const normas_que_deroga = Array.isArray(raw.normas_que_deroga)
            ? raw.normas_que_deroga
            : (Array.isArray(raw.deroga) ? raw.deroga.map(x => (typeof x === 'string' ? x : (x.norma + (x.descripcion ? ' — ' + x.descripcion : '')))) : []);
        const normas_referenciadas = Array.isArray(raw.normas_referenciadas)
            ? raw.normas_referenciadas
            : (Array.isArray(raw.normas_relacionadas) ? raw.normas_relacionadas.map(x => (typeof x === 'string' ? x : (x.norma + (x.relacion ? ': ' + x.relacion : '')))) : []);

        // Conceptos clave: ambos esquemas usan la misma estructura
        const conceptos_clave = Array.isArray(raw.conceptos_clave)
            ? raw.conceptos_clave.map(c => (typeof c === 'string' ? { termino: c, definicion: '', articulo_fuente: '' } : c))
            : [];

        return {
            _filename: filename,
            id,
            tipo_norma: raw.tipo_norma || 'decreto_supremo',
            numero: raw.numero || '',
            titulo_oficial: raw.titulo_oficial || '',
            titulo_corto,
            fecha_publicacion: raw.fecha_publicacion || '',
            entidad_emisora: raw.entidad_emisora || raw.diario_oficial || 'MEF',
            estado: raw.estado || 'vigente',
            fase_ciclo_inversion,
            temas_clave: Array.isArray(raw.temas_clave) ? raw.temas_clave : [],
            resumen_ejecutivo,
            objetivo: raw.objetivo || raw.objeto || '',
            ambito_aplicacion: raw.ambito_aplicacion || raw.ambito || '',
            normas_que_modifica,
            normas_que_deroga,
            normas_referenciadas,
            estructura: Array.isArray(raw.estructura) ? raw.estructura : [],
            conceptos_clave,
            actores_institucionales: Array.isArray(raw.actores_institucionales) ? raw.actores_institucionales : [],
            plazos_importantes: Array.isArray(raw.plazos_importantes) ? raw.plazos_importantes : [],
            metadata_analisis: raw.metadata_analisis || null,
            // Para búsqueda
            _searchText: [
                titulo_corto, raw.titulo_oficial, raw.numero,
                resumen_ejecutivo,
                (raw.temas_clave || []).join(' '),
                (Array.isArray(raw.conceptos_clave) ? raw.conceptos_clave.map(c => c.termino || '').join(' ') : ''),
            ].join(' ').toLowerCase(),
        };
    }

    /* ─── Carga de datos ────────────────────────────────────── */
    async function loadAllDocs() {
        const idx = await fetch(DATA_PATH + 'index.json').then(r => r.json());
        const files = idx.archivos || [];

        const results = await Promise.allSettled(
            files.map(f => fetch(DATA_PATH + f).then(r => r.json()).then(raw => normalizeDoc(raw, f)))
        );

        allDocs = results
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value)
            .sort((a, b) => b.fecha_publicacion.localeCompare(a.fecha_publicacion));
    }

    /* ─── Filtrado ──────────────────────────────────────────── */
    function applyFilters() {
        filteredDocs = allDocs.filter(doc => {
            if (filters.tipo && doc.tipo_norma !== filters.tipo) return false;
            if (filters.estado && doc.estado !== filters.estado) return false;
            if (filters.fase && !doc.fase_ciclo_inversion.includes(filters.fase)) return false;
            if (filters.q) {
                const q = filters.q.toLowerCase();
                if (!doc._searchText.includes(q)) return false;
            }
            return true;
        });
        renderGrid();
        renderCounter();
    }

    /* ─── Formateo de fecha ────────────────────────────────── */
    function fmtFecha(str) {
        if (!str) return '—';
        return new Date(str).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    /* ─── Grilla de documentos ──────────────────────────────── */
    function renderGrid() {
        const grid = document.getElementById('norm-grid');
        if (!grid) return;
        if (filteredDocs.length === 0) {
            grid.innerHTML = '<p class="norm-empty">No se encontraron documentos con los filtros aplicados.</p>';
            return;
        }
        grid.innerHTML = filteredDocs.map(doc => cardHTML(doc)).join('');
        // event delegation
        grid.querySelectorAll('.norm-card').forEach(card => {
            card.addEventListener('click', () => openDoc(card.dataset.id));
            card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDoc(card.dataset.id); } });
        });
    }

    function cardHTML(doc) {
        const tipoBadge = TIPO_BADGE[doc.tipo_norma] || 'badge-ds';
        const tipoLabel = TIPO_LABEL[doc.tipo_norma] || doc.tipo_norma;
        const estadoClass = ESTADO_CLASS[doc.estado] || '';
        const estadoLabel = ESTADO_LABEL[doc.estado] || doc.estado;
        const fases = doc.fase_ciclo_inversion
            .map(f => `<span class="fase-chip">${FASE_LABEL[f] || f}</span>`).join('');
        const temas = doc.temas_clave.slice(0, 3)
            .map(t => `<span class="tema-chip">${t}</span>`).join('');

        return `
      <article class="norm-card animate-fade-in" data-id="${doc.id}" tabindex="0" role="button" aria-label="Ver ${doc.titulo_corto}">
        <div class="norm-card-header">
          <span class="norm-badge ${tipoBadge}">${tipoLabel}</span>
          <span class="norm-estado ${estadoClass}">${estadoLabel}</span>
        </div>
        <h3 class="norm-card-title">${doc.titulo_corto}</h3>
        <p class="norm-card-numero">${doc.numero}</p>
        <p class="norm-card-fecha">📅 ${fmtFecha(doc.fecha_publicacion)}</p>
        <div class="norm-fases">${fases}</div>
        <div class="norm-temas">${temas}</div>
        <div class="norm-card-footer">
          <span class="norm-card-stats">
            ${doc.conceptos_clave.length ? `📚 ${doc.conceptos_clave.length} conceptos` : ''}
            ${doc.plazos_importantes.length ? `⏱ ${doc.plazos_importantes.length} plazos` : ''}
          </span>
          <span class="norm-card-arrow">Ver detalle →</span>
        </div>
      </article>`;
    }

    function renderCounter() {
        const el = document.getElementById('norm-counter');
        if (el) el.textContent = `${filteredDocs.length} de ${allDocs.length} documentos`;
    }

    /* ─── Panel de detalle ──────────────────────────────────── */
    function openDoc(id) {
        activeDoc = allDocs.find(d => d.id === id);
        if (!activeDoc) return;
        activeTab = 'resumen';
        quizState = null;
        renderPanel();
        const panel = document.getElementById('norm-panel');
        panel.classList.add('open');
        document.body.classList.add('norm-panel-open');
        panel.querySelector('.norm-panel-inner').scrollTop = 0;
        // Trap focus
        panel.querySelector('.norm-panel-close').focus();
    }

    function closePanel() {
        const panel = document.getElementById('norm-panel');
        panel.classList.remove('open');
        document.body.classList.remove('norm-panel-open');
        activeDoc = null;
    }

    function renderPanel() {
        const panel = document.getElementById('norm-panel');
        const doc = activeDoc;
        const tipoBadge = TIPO_BADGE[doc.tipo_norma] || 'badge-ds';
        const tipoLabel = TIPO_LABEL[doc.tipo_norma] || doc.tipo_norma;
        const estadoClass = ESTADO_CLASS[doc.estado] || '';
        const estadoLabel = ESTADO_LABEL[doc.estado] || doc.estado;

        const tabs = [
            { id: 'resumen', label: '📋 Resumen' },
            { id: 'estructura', label: '🏗 Estructura' },
            { id: 'glosario', label: `📚 Glosario (${doc.conceptos_clave.length})` },
            { id: 'plazos', label: `⏱ Plazos (${doc.plazos_importantes.length})` },
            { id: 'actores', label: `🏛 Actores (${doc.actores_institucionales.length})` },
            { id: 'normas', label: '🔗 Normas relacionadas' },
        ];

        const tabsHTML = tabs.map(t =>
            `<button class="norm-tab${t.id === activeTab ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`
        ).join('');

        panel.innerHTML = `
      <div class="norm-panel-inner" role="document">
        <div class="norm-panel-head">
          <div class="norm-panel-badges">
            <span class="norm-badge ${tipoBadge}">${tipoLabel}</span>
            <span class="norm-estado ${estadoClass}">${estadoLabel}</span>
          </div>
          <h2 class="norm-panel-title">${doc.titulo_corto}</h2>
          <p class="norm-panel-numero">${doc.numero} · ${fmtFecha(doc.fecha_publicacion)}</p>
          <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener" class="norm-btn-drive" title="Ir a la carpeta de PDFs en Google Drive">
            📥 Descargar PDF
          </a>
          <button class="norm-panel-close" aria-label="Cerrar panel">&times;</button>
        </div>
        <nav class="norm-tabs" role="tablist" aria-label="Secciones del documento">
          ${tabsHTML}
        </nav>
        <div class="norm-tab-content" id="norm-tab-content">
          ${renderTab(activeTab)}
        </div>
      </div>`;

        // Eventos
        panel.querySelector('.norm-panel-close').addEventListener('click', closePanel);
        panel.querySelectorAll('.norm-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                quizState = null;
                // actualizar tab activa visualmente
                panel.querySelectorAll('.norm-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('norm-tab-content').innerHTML = renderTab(activeTab);
                attachTabEvents();
            });
        });
        attachTabEvents();
    }

    function renderTab(tab) {
        switch (tab) {
            case 'resumen': return tabResumen();
            case 'estructura': return tabEstructura();
            case 'glosario': return tabGlosario();
            case 'plazos': return tabPlazos();
            case 'actores': return tabActores();
            case 'normas': return tabNormas();
            default: return '';
        }
    }

    /* ── Tab: Resumen ── */
    function tabResumen() {
        const d = activeDoc;
        const fases = d.fase_ciclo_inversion.map(f => `<span class="fase-chip large">${FASE_LABEL[f] || f}</span>`).join('');
        const temas = d.temas_clave.map(t => `<span class="tema-chip">${t}</span>`).join('');

        return `
      <section class="tab-resumen">
        <div class="ficha-tecnica">
          <div class="ficha-row"><span class="ficha-label">N.° de norma</span><span class="ficha-val">${d.numero || '—'}</span></div>
          <div class="ficha-row"><span class="ficha-label">Fecha</span><span class="ficha-val">${fmtFecha(d.fecha_publicacion)}</span></div>
          <div class="ficha-row"><span class="ficha-label">Emisor</span><span class="ficha-val">${d.entidad_emisora || '—'}</span></div>
          <div class="ficha-row"><span class="ficha-label">Estado</span><span class="ficha-val">${ESTADO_LABEL[d.estado] || d.estado}</span></div>
          ${d.fase_ciclo_inversion.length ? `<div class="ficha-row"><span class="ficha-label">Fases</span><span class="ficha-val">${fases}</span></div>` : ''}
        </div>

        ${d.objetivo ? `<div class="resumen-block"><h4>🎯 Objetivo</h4><p>${d.objetivo}</p></div>` : ''}
        ${d.resumen_ejecutivo ? `<div class="resumen-block"><h4>📝 Resumen ejecutivo</h4><p>${d.resumen_ejecutivo}</p></div>` : ''}
        ${d.ambito_aplicacion ? `<div class="resumen-block"><h4>🗺 Ámbito de aplicación</h4><p>${d.ambito_aplicacion}</p></div>` : ''}
        ${temas ? `<div class="resumen-block"><h4>🏷 Temas clave</h4><div class="chip-group">${temas}</div></div>` : ''}
      </section>`;
    }

    /* ── Tab: Estructura ── */
    function tabEstructura() {
        const d = activeDoc;
        if (!d.estructura.length) {
            return '<p class="norm-empty">Este documento no tiene estructura detallada disponible.</p>';
        }
        return `
      <section class="tab-estructura">
        <p class="estructura-hint">Haz clic en un nodo para expandir / colapsar.</p>
        <div class="estructura-tree" id="estructura-tree">
          ${d.estructura.map(nodo => renderNodo(nodo, 0)).join('')}
        </div>
      </section>`;
    }

    function renderNodo(nodo, depth) {
        const tipo = nodo.tipo || '';
        const hasChildren = Array.isArray(nodo.hijos) && nodo.hijos.length > 0;
        const iconos = {
            capitulo: '📁', subcapitulo: '📂', seccion: '📑',
            articulo: '📄', disposicion_complementaria: '📌',
            disposicion_derogatoria: '🗑', disposicion_complementaria_final: '📌',
            disposiciones_complementarias_finales: '📌',
            disposiciones_complementarias_transitorias: '⏳',
            considerandos: '💬',
        };
        const icon = iconos[tipo] || '•';
        const num = nodo.numero ? `${nodo.numero}. ` : '';
        const titulo = `${num}${nodo.titulo || tipo}`;
        const resumen = nodo.contenido_resumen || '';

        return `
      <div class="nodo${hasChildren ? ' nodo-collapsible' : ''}" data-depth="${depth}">
        <div class="nodo-header" role="${hasChildren ? 'button' : 'none'}" tabindex="${hasChildren ? 0 : -1}"
          aria-expanded="${hasChildren ? 'false' : undefined}">
          <span class="nodo-icon">${icon}</span>
          <span class="nodo-title">${titulo}</span>
          ${hasChildren ? '<span class="nodo-toggle">▶</span>' : ''}
        </div>
        ${resumen ? `<p class="nodo-resumen">${resumen}</p>` : ''}
        ${hasChildren ? `<div class="nodo-hijos hidden">${nodo.hijos.map(h => renderNodo(h, depth + 1)).join('')}</div>` : ''}
      </div>`;
    }

    /* ── Tab: Glosario ── */
    function tabGlosario() {
        const d = activeDoc;
        if (!d.conceptos_clave.length) {
            return '<p class="norm-empty">No hay conceptos clave registrados para este documento.</p>';
        }
        return `
      <section class="tab-glosario">
        <div class="glosario-toolbar">
          <input type="text" class="glosario-search" placeholder="Buscar concepto…" aria-label="Buscar concepto">
          <button class="norm-btn-quiz" id="btn-quiz">🧠 Modo quiz</button>
        </div>
        <div class="glosario-lista" id="glosario-lista">
          ${d.conceptos_clave.map(c => `
            <div class="concepto-item" data-termino="${(c.termino || '').toLowerCase()}">
              <div class="concepto-termino">${c.termino || ''}</div>
              ${c.articulo_fuente ? `<span class="concepto-art">Art. ${c.articulo_fuente}</span>` : ''}
              <p class="concepto-def">${c.definicion || '—'}</p>
            </div>`).join('')}
        </div>
      </section>`;
    }

    /* ── Tab: Plazos ── */
    function tabPlazos() {
        const d = activeDoc;
        if (!d.plazos_importantes.length) {
            return '<p class="norm-empty">No se registraron plazos importantes para este documento.</p>';
        }
        return `
      <section class="tab-plazos">
        <div class="plazos-timeline">
          ${d.plazos_importantes.map((p, i) => {
            const desc = typeof p === 'string' ? p : '';
            const plazo = typeof p === 'object' ? p : {};
            return `
              <div class="plazo-item">
                <div class="plazo-dot"></div>
                <div class="plazo-content">
                  ${plazo.plazo || plazo.accion ? `<strong class="plazo-titulo">${plazo.plazo || plazo.accion || ''}</strong>` : (desc ? `<strong class="plazo-titulo">${desc}</strong>` : '')}
                  ${plazo.descripcion ? `<p class="plazo-desc">${plazo.descripcion}</p>` : ''}
                  ${plazo.articulo_fuente ? `<span class="concepto-art">Art. ${plazo.articulo_fuente}</span>` : ''}
                </div>
              </div>`;
        }).join('')}
        </div>
      </section>`;
    }

    /* ── Tab: Actores ── */
    function tabActores() {
        const d = activeDoc;
        if (!d.actores_institucionales.length) {
            return '<p class="norm-empty">No se registraron actores institucionales para este documento.</p>';
        }
        return `
      <section class="tab-actores">
        <div class="actores-grid">
          ${d.actores_institucionales.map(a => {
            const actor = typeof a === 'string' ? { nombre: a } : a;
            return `
              <div class="actor-card">
                <div class="actor-icon">🏛</div>
                <div class="actor-info">
                  <strong class="actor-nombre">${actor.nombre || actor.actor || '—'}</strong>
                  ${actor.tipo ? `<span class="actor-tipo">${actor.tipo}</span>` : ''}
                  ${actor.rol || actor.descripcion || actor.rol_en_norma ? `<p class="actor-rol">${actor.rol || actor.descripcion || actor.rol_en_norma}</p>` : ''}
                </div>
              </div>`;
        }).join('')}
        </div>
      </section>`;
    }

    /* ── Tab: Normas relacionadas ── */
    function tabNormas() {
        const d = activeDoc;
        const sections = [
            { titulo: '✏️ Normas que modifica', items: d.normas_que_modifica, cls: 'rel-modifica' },
            { titulo: '🗑 Normas que deroga', items: d.normas_que_deroga, cls: 'rel-deroga' },
            { titulo: '🔗 Normas referenciadas', items: d.normas_referenciadas, cls: 'rel-ref' },
        ];
        const any = sections.some(s => s.items.length > 0);
        if (!any) return '<p class="norm-empty">No hay relaciones normativas registradas.</p>';

        return `
      <section class="tab-normas">
        ${sections.map(s => s.items.length ? `
          <div class="normas-group">
            <h4>${s.titulo}</h4>
            <ul class="normas-list ${s.cls}">
              ${s.items.map(n => {
            const txt = typeof n === 'string' ? n : (n.norma || '') + (n.descripcion ? ' — ' + n.descripcion : (n.relacion ? ': ' + n.relacion : ''));
            return `<li>${txt}</li>`;
        }).join('')}
            </ul>
          </div>` : '').join('')}
      </section>`;
    }

    /* ─── Quiz / Flashcards ─────────────────────────────────── */
    function startQuiz() {
        const conceptos = [...activeDoc.conceptos_clave];
        // Mezclar
        for (let i = conceptos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [conceptos[i], conceptos[j]] = [conceptos[j], conceptos[i]];
        }
        quizState = { conceptos, current: 0, revealed: false, score: 0 };
        renderQuiz();
    }

    function renderQuiz() {
        const content = document.getElementById('norm-tab-content');
        if (!content || !quizState) return;
        const { conceptos, current, revealed, score } = quizState;
        if (current >= conceptos.length) {
            // Resultado final
            content.innerHTML = `
        <section class="quiz-container">
          <div class="quiz-result">
            <div class="quiz-result-icon">🎉</div>
            <h3>¡Quiz completado!</h3>
            <p class="quiz-score">Puntuación: <strong>${score} / ${conceptos.length}</strong></p>
            <div class="quiz-actions">
              <button class="norm-btn-primary" id="quiz-restart">🔄 Reiniciar</button>
              <button class="norm-btn-secondary" id="quiz-back">📚 Volver al glosario</button>
            </div>
          </div>
        </section>`;
            document.getElementById('quiz-restart').onclick = startQuiz;
            document.getElementById('quiz-back').onclick = () => {
                quizState = null; document.getElementById('norm-tab-content').innerHTML = renderTab('glosario'); attachTabEvents();
            };
            return;
        }

        const c = conceptos[current];
        content.innerHTML = `
      <section class="quiz-container">
        <div class="quiz-progress">
          <div class="quiz-bar" style="width:${(current / conceptos.length * 100).toFixed(0)}%"></div>
        </div>
        <p class="quiz-count">Pregunta ${current + 1} de ${conceptos.length} · ✅ ${score} correctas</p>
        <div class="quiz-card">
          <p class="quiz-label">Término</p>
          <h3 class="quiz-termino">${c.termino}</h3>
          ${c.articulo_fuente ? `<span class="concepto-art">Art. ${c.articulo_fuente}</span>` : ''}
          <div class="quiz-def-wrap ${revealed ? 'revealed' : 'hidden-def'}">
            <p class="quiz-definicion">${revealed ? c.definicion : '···'}</p>
          </div>
        </div>
        <div class="quiz-actions">
          ${revealed ? `
            <button class="norm-btn-wrong" id="quiz-wrong">❌ No lo sabía</button>
            <button class="norm-btn-right" id="quiz-right">✅ Lo sabía</button>
          ` : `
            <button class="norm-btn-primary" id="quiz-reveal">👁 Ver definición</button>
            <button class="norm-btn-secondary" id="quiz-skip">⏭ Saltar</button>
          `}
          <button class="norm-btn-ghost" id="quiz-exit">← Salir del quiz</button>
        </div>
      </section>`;

        if (document.getElementById('quiz-reveal')) {
            document.getElementById('quiz-reveal').onclick = () => { quizState.revealed = true; renderQuiz(); };
        }
        if (document.getElementById('quiz-skip')) {
            document.getElementById('quiz-skip').onclick = () => { quizState.current++; quizState.revealed = false; renderQuiz(); };
        }
        if (document.getElementById('quiz-right')) {
            document.getElementById('quiz-right').onclick = () => { quizState.score++; quizState.current++; quizState.revealed = false; renderQuiz(); };
        }
        if (document.getElementById('quiz-wrong')) {
            document.getElementById('quiz-wrong').onclick = () => { quizState.current++; quizState.revealed = false; renderQuiz(); };
        }
        if (document.getElementById('quiz-exit')) {
            document.getElementById('quiz-exit').onclick = () => { quizState = null; document.getElementById('norm-tab-content').innerHTML = renderTab('glosario'); attachTabEvents(); };
        }
    }

    /* ─── Eventos de tabs (post-render) ────────────────────── */
    function attachTabEvents() {
        // Estructura: colapsar/expandir nodos
        document.querySelectorAll('.nodo-collapsible .nodo-header').forEach(el => {
            el.addEventListener('click', toggleNodo);
            el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNodo.call(el); } });
        });

        // Glosario: búsqueda interna
        const gSearch = document.querySelector('.glosario-search');
        if (gSearch) {
            gSearch.addEventListener('input', () => {
                const q = gSearch.value.toLowerCase();
                document.querySelectorAll('.concepto-item').forEach(item => {
                    const vis = !q || item.dataset.termino.includes(q) || item.querySelector('.concepto-def')?.textContent.toLowerCase().includes(q);
                    item.style.display = vis ? '' : 'none';
                });
            });
        }

        // Quiz
        const btnQuiz = document.getElementById('btn-quiz');
        if (btnQuiz) btnQuiz.addEventListener('click', startQuiz);
    }

    function toggleNodo() {
        const nodo = this.parentElement;
        const hijos = nodo.querySelector('.nodo-hijos');
        const toggle = this.querySelector('.nodo-toggle');
        if (!hijos) return;
        const isHidden = hijos.classList.contains('hidden');
        hijos.classList.toggle('hidden', !isHidden);
        if (toggle) toggle.style.transform = isHidden ? 'rotate(90deg)' : '';
        this.setAttribute('aria-expanded', String(isHidden));
    }

    /* ─── Búsqueda global ───────────────────────────────────── */
    function initSearch() {
        const input = document.getElementById('norm-search');
        if (!input) return;
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                filters.q = input.value.trim();
                applyFilters();
            }, 220);
        });
    }

    /* ─── Filtros ───────────────────────────────────────────── */
    function initFilters() {
        const selTipo = document.getElementById('filter-tipo');
        const selEstado = document.getElementById('filter-estado');
        const selFase = document.getElementById('filter-fase');
        const btnClear = document.getElementById('filter-clear');

        if (selTipo) selTipo.addEventListener('change', () => { filters.tipo = selTipo.value; applyFilters(); });
        if (selEstado) selEstado.addEventListener('change', () => { filters.estado = selEstado.value; applyFilters(); });
        if (selFase) selFase.addEventListener('change', () => { filters.fase = selFase.value; applyFilters(); });
        if (btnClear) btnClear.addEventListener('click', () => {
            filters = { tipo: '', estado: '', fase: '', q: '' };
            if (selTipo) selTipo.value = '';
            if (selEstado) selEstado.value = '';
            if (selFase) selFase.value = '';
            const si = document.getElementById('norm-search');
            if (si) si.value = '';
            applyFilters();
        });
    }

    /* ─── Panel overlay ─────────────────────────────────────── */
    function initPanel() {
        const overlay = document.getElementById('norm-overlay');
        if (overlay) overlay.addEventListener('click', closePanel);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closePanel();
        });
    }

    /* ─── Inicialización ────────────────────────────────────── */
    async function init() {
        const loading = document.getElementById('norm-loading');
        const err = document.getElementById('norm-error');
        try {
            await loadAllDocs();
            if (loading) loading.style.display = 'none';
            filteredDocs = [...allDocs];
            renderGrid();
            renderCounter();
            initSearch();
            initFilters();
            initPanel();
        } catch (e) {
            if (loading) loading.style.display = 'none';
            if (err) { err.style.display = 'block'; err.textContent = 'Error al cargar los documentos: ' + e.message; }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

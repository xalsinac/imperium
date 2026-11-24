import { EMPIRES, GOVERNMENT_TYPES, COLLAPSE_REASONS, WIKI_SLUGS, CIVILIZATIONAL_CONTEXT } from './data/empires.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Enriquecemos los datos con métricas calculadas
const DATA = EMPIRES.map((e) => {
  const duration = Math.max(1, e.endYear - e.startYear);
  const goldenDuration = Math.max(1, e.peakEnd - e.peakStart);
  const peakStartPct = ((e.peakStart - e.startYear) / duration) * 100;
  const peakEndPct = ((e.peakEnd - e.startYear) / duration) * 100;
  return {
    ...e,
    duration,
    goldenDuration,
    peakStartPct: Math.max(0, Math.min(100, peakStartPct)),
    peakEndPct: Math.max(0, Math.min(100, peakEndPct))
  };
});

const state = {
  view: 'radial', // 'radial' | 'horizontal' | 'timeline'
  scale: 'normalized', // 'normalized' | 'years'
  sortBy: 'startYear',
  sortDir: 'asc',
  includeFiction: false,
  filterGov: null,
  filterCollapse: null,
  searchQuery: '',
  pinnedId: null,
  hoveredId: null
};

// DOM refs
const svg = document.getElementById('chart-svg');
const detailPanel = document.getElementById('detail-panel');
const chartGuide = document.getElementById('chart-guide');
const scaleControlGroup = document.getElementById('scale-control-group');
const sortSelect = document.getElementById('sort-select');
const sortDirBtn = document.getElementById('sort-dir-btn');
const fictionToggle = document.getElementById('fiction-toggle');
const resetBtn = document.getElementById('reset-btn');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchKbd = document.getElementById('search-kbd');
const govLegend = document.getElementById('gov-legend');
const collapseLegend = document.getElementById('collapse-legend');
const tooltip = document.getElementById('floating-tooltip');

const kpiCount = document.getElementById('kpi-count');
const kpiDuration = document.getElementById('kpi-duration');
const kpiPeak = document.getElementById('kpi-peak');
const kpiDecline = document.getElementById('kpi-decline');

function formatYear(year) {
  if (year < 0) return `${Math.abs(year)} a.C.`;
  if (year === 0) return '1 d.C.';
  return `${year} d.C.`;
}

function formatArea(area) {
  return area >= 1 ? `${area.toFixed(1)} M km²` : `${area.toFixed(2)} M km²`;
}

function el(tag, attrs = {}, textContent = null) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, v);
  }
  if (textContent !== null) node.textContent = textContent;
  return node;
}

function normalizeText(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getFilteredAndSorted() {
  const base = DATA.filter((d) => state.includeFiction || !d.isFiction);
  const matching = base.filter((d) => isMatch(d));

  const dir = state.sortDir === 'asc' ? 1 : -1;
  const sorted = [...base].sort((a, b) => (a[state.sortBy] - b[state.sortBy]) * dir);

  return { base: sorted, matching };
}

function isMatch(empire) {
  if (state.filterGov && empire.government !== state.filterGov) return false;
  if (state.filterCollapse && empire.collapse !== state.filterCollapse) return false;
  if (state.searchQuery) {
    const q = normalizeText(state.searchQuery.trim());
    if (q) {
      const hay = normalizeText(`${empire.name} ${empire.region} ${empire.capital}`);
      if (!hay.includes(q)) return false;
    }
  }
  return true;
}

function updateKPIs(matching) {
  if (matching.length === 0) {
    kpiCount.textContent = '0';
    kpiDuration.textContent = '—';
    kpiPeak.textContent = '—';
    kpiDecline.textContent = '—';
    return null;
  }

  const avgDuration = matching.reduce((s, d) => s + d.duration, 0) / matching.length;
  const avgPeak = matching.reduce((s, d) => s + d.peakStartPct, 0) / matching.length;
  const avgDecline = matching.reduce((s, d) => s + d.peakEndPct, 0) / matching.length;

  kpiCount.textContent = String(matching.length);
  kpiDuration.textContent = `${Math.round(avgDuration)} años`;
  kpiPeak.textContent = `${Math.round(avgPeak)}%`;
  kpiDecline.textContent = `${Math.round(avgDecline)}%`;

  return { avgDuration, avgPeak, avgDecline };
}

function updateGuide() {
  if (state.view === 'radial') {
    chartGuide.innerHTML =
      state.scale === 'normalized'
        ? '<span><strong>Modo Abanico (Normalizado 0–100%):</strong> Todos los imperios se escalan al 100% de su vida. El círculo junto al nombre indica su extensión territorial.</span><span>Haz clic en un imperio para fijar su ficha</span>'
        : '<span><strong>Modo Abanico (Duración real):</strong> Cada radio mide la duración histórica en años (escala acotada a 1.200 años para evitar colisiones).</span><span>Haz clic en un imperio para fijar su ficha</span>';
  } else if (state.view === 'horizontal') {
    chartGuide.innerHTML =
      state.scale === 'normalized'
        ? '<span><strong>Modo Horizontal (Normalizado 0–100%):</strong> Lectura lineal sin texto rotado. Compara fácilmente cuándo empieza la edad de oro (○) y el declive (●).</span><span>Haz clic para fijar ficha</span>'
        : '<span><strong>Modo Horizontal (Duración real):</strong> Compara directamente cuántos siglos duró cada imperio y cuándo vivió su apogeo.</span><span>Haz clic para fijar ficha</span>';
  } else {
    chartGuide.innerHTML =
      '<span><strong>Línea temporal real (Coexistencia):</strong> Eje horizontal cronológico real desde 2400 a.C. hasta 2000 d.C. Permite ver qué imperios convivieron en la historia.</span><span>Haz clic para fijar ficha</span>';
  }
}

function renderLegends() {
  govLegend.innerHTML = '';
  for (const [key, meta] of Object.entries(GOVERNMENT_TYPES)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'legend-pill';
    if (state.filterGov === key) btn.classList.add('active');
    else if (state.filterGov && state.filterGov !== key) btn.classList.add('dimmed');

    const swatch = document.createElement('span');
    swatch.className = 'legend-swatch';
    swatch.style.background = meta.color;
    btn.appendChild(swatch);
    btn.appendChild(document.createTextNode(meta.label));

    btn.addEventListener('click', () => {
      state.filterGov = state.filterGov === key ? null : key;
      render();
    });
    btn.addEventListener('mouseenter', (ev) => showTooltip(ev, meta.description));
    btn.addEventListener('mousemove', moveTooltip);
    btn.addEventListener('mouseleave', hideTooltip);
    govLegend.appendChild(btn);
  }

  collapseLegend.innerHTML = '';
  for (const [key, meta] of Object.entries(COLLAPSE_REASONS)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'legend-pill';
    if (state.filterCollapse === key) btn.classList.add('active');
    else if (state.filterCollapse && state.filterCollapse !== key) btn.classList.add('dimmed');

    btn.textContent = `${getCollapseGlyph(key)} ${meta.label}`;
    btn.addEventListener('click', () => {
      state.filterCollapse = state.filterCollapse === key ? null : key;
      render();
    });
    btn.addEventListener('mouseenter', (ev) => showTooltip(ev, meta.description));
    btn.addEventListener('mousemove', moveTooltip);
    btn.addEventListener('mouseleave', hideTooltip);
    collapseLegend.appendChild(btn);
  }
}

function getCollapseGlyph(key) {
  const glyphs = {
    external: '⚔',
    internal: '⚡',
    economics: '◉',
    leadership: '♛',
    overstretch: '↔',
    mixed: '❖'
  };
  return glyphs[key] || '•';
}

function showTooltip(ev, text) {
  tooltip.textContent = text;
  tooltip.hidden = false;
  moveTooltip(ev);
}

function moveTooltip(ev) {
  const pad = 12;
  tooltip.style.left = `${Math.min(window.innerWidth - 260, ev.clientX + pad)}px`;
  tooltip.style.top = `${Math.min(window.innerHeight - 80, ev.clientY + pad)}px`;
}

function hideTooltip() {
  tooltip.hidden = true;
}

function renderDetailPanel() {
  const targetId = state.pinnedId || state.hoveredId;
  const empire = DATA.find((d) => d.id === targetId);
  if (!empire) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        <p class="detail-empty-title">Explora un imperio</p>
        <p class="detail-empty-text">
          Pasa el cursor o haz clic sobre cualquier imperio en el gráfico para fijar su ficha histórica completa sin tapar la visualización.
        </p>
        <div class="mini-key">
          <div class="mini-key-row">
            <span class="key-dot key-dot-open"></span>
            <span>Inicio de la edad de oro (apogeo)</span>
          </div>
          <div class="mini-key-row">
            <span class="key-line-gold"></span>
            <span>Duración de la edad de oro</span>
          </div>
          <div class="mini-key-row">
            <span class="key-dot key-dot-solid"></span>
            <span>Inicio del declive</span>
          </div>
          <div class="mini-key-row">
            <span class="key-circle-area"></span>
            <span>Círculo proporcional a la extensión (M km²)</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const gov = GOVERNMENT_TYPES[empire.government];
  const col = COLLAPSE_REASONS[empire.collapse];
  const ctx = empire.broaderContext || CIVILIZATIONAL_CONTEXT[empire.id];
  const isPinned = state.pinnedId === empire.id;

  detailPanel.innerHTML = `
    <div class="detail-header">
      <h2 class="detail-title" style="color:${gov.color}">${empire.name}</h2>
      <span class="detail-pin-badge">${isPinned ? 'Fijado' : 'Vista previa'}</span>
    </div>
    <dl class="detail-meta">
      <dt>Periodo</dt>
      <dd>${formatYear(empire.startYear)} — ${formatYear(empire.endYear)} (${empire.duration} años)</dd>
      <dt>Edad de oro</dt>
      <dd class="detail-gold">${formatYear(empire.peakStart)} — ${formatYear(empire.peakEnd)} (${empire.goldenDuration} años)</dd>
      <dt>Extensión máx.</dt>
      <dd>${formatArea(empire.peakAreaKm2)}</dd>
      <dt>Gobierno</dt>
      <dd style="color:${gov.color}">${gov.label}</dd>
      <dt>Colapso</dt>
      <dd>${getCollapseGlyph(empire.collapse)} ${col.label}</dd>
      <dt>Capital</dt>
      <dd>${empire.capital}</dd>
      <dt>Región</dt>
      <dd>${empire.region}</dd>
    </dl>

    <div class="detail-lifecycle-bar">
      <div class="detail-lifecycle-label">
        <span>Ciclo vital (0%–100%)</span>
        <span>${Math.round(empire.peakStartPct)}% → ${Math.round(empire.peakEndPct)}%</span>
      </div>
      <div class="lifecycle-track">
        <div class="lifecycle-gold" style="left:${empire.peakStartPct}%; width:${Math.max(2, empire.peakEndPct - empire.peakStartPct)}%"></div>
      </div>
    </div>

    <p class="detail-summary">${empire.summary}</p>
    ${
      ctx
        ? `<div class="detail-context">
            <span class="detail-context-title">Contexto civilizatorio · ${ctx.span}</span>
            <p class="detail-context-note">${ctx.note}</p>
          </div>`
        : ''
    }
    <div class="detail-actions">
      <a class="detail-wiki-link" href="https://es.wikipedia.org/wiki/${empire.wiki || WIKI_SLUGS[empire.id] || encodeURIComponent(empire.name.replace(/ /g, '_'))}" target="_blank" rel="noopener noreferrer">
        Leer en Wikipedia ↗
      </a>
      ${isPinned ? '<button type="button" class="detail-unpin-btn" id="unpin-btn">Soltar ficha</button>' : ''}
    </div>
  `;

  const unpinBtn = document.getElementById('unpin-btn');
  if (unpinBtn) {
    unpinBtn.addEventListener('click', () => {
      state.pinnedId = null;
      render();
    });
  }
}

function attachEmpireEvents(group, empire) {
  group.addEventListener('mouseenter', (ev) => {
    state.hoveredId = empire.id;
    renderDetailPanel();
    showTooltip(
      ev,
      `${empire.name} · ${empire.duration} años · ${formatArea(empire.peakAreaKm2)}`
    );
  });
  group.addEventListener('mousemove', moveTooltip);
  group.addEventListener('mouseleave', () => {
    state.hoveredId = null;
    hideTooltip();
    renderDetailPanel();
  });
  group.addEventListener('click', () => {
    state.pinnedId = state.pinnedId === empire.id ? null : empire.id;
    render();
  });
}

function areaRadius(areaKm2) {
  return Math.max(2.5, Math.min(11, Math.sqrt(areaKm2) * 1.75));
}

function renderRadial(items, avgs) {
  const W = 1160;
  const H = 640;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const cx = W / 2;
  const cy = H - 56;
  const rInner = 80;
  const rOuter = 355;
  const maxYearsCap = 1200;

  // Arcos de referencia limpios (solo una escala a la vez)
  const ticks =
    state.scale === 'normalized'
      ? [
          { t: 0, label: '0%' },
          { t: 0.25, label: '25%' },
          { t: 0.5, label: '50%' },
          { t: 0.75, label: '75%' },
          { t: 1, label: '100%' }
        ]
      : [
          { t: 0, label: '0' },
          { t: 300 / maxYearsCap, label: '300 a.' },
          { t: 600 / maxYearsCap, label: '600 a.' },
          { t: 900 / maxYearsCap, label: '900 a.' },
          { t: 1, label: '1.200+' }
        ];

  ticks.forEach((tk) => {
    const r = rInner + tk.t * (rOuter - rInner);
    const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    svg.appendChild(
      el('path', {
        d,
        fill: 'none',
        stroke: tk.t === 1 ? '#b8ab92' : '#ded3bd',
        'stroke-width': tk.t === 1 ? '1.3' : '1',
        'stroke-dasharray': tk.t === 0 || tk.t === 1 ? 'none' : '3 4'
      })
    );
    svg.appendChild(
      el(
        'text',
        {
          x: cx - r,
          y: cy + 16,
          'text-anchor': 'middle',
          fill: '#756b5b',
          'font-size': '10.5'
        },
        tk.label
      )
    );
  });

  // Arcos de promedio (solo en modo normalizado)
  if (avgs && state.scale === 'normalized') {
    [
      { pct: avgs.avgPeak, color: '#d97a16', label: `Media apogeo (${Math.round(avgs.avgPeak)}%)` },
      { pct: avgs.avgDecline, color: '#443d34', label: `Media declive (${Math.round(avgs.avgDecline)}%)` }
    ].forEach((m) => {
      const r = rInner + (m.pct / 100) * (rOuter - rInner);
      const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
      svg.appendChild(
        el('path', {
          d,
          fill: 'none',
          stroke: m.color,
          'stroke-width': '1.2',
          'stroke-dasharray': '5 4',
          opacity: '0.65'
        })
      );
    });
  }

  const n = items.length;
  items.forEach((empire, idx) => {
    // De izquierda (-PI) a derecha (0)
    const angle = -Math.PI + (n === 1 ? 0.5 : idx / (n - 1)) * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const gov = GOVERNMENT_TYPES[empire.government];
    const matched = isMatch(empire);

    const g = el('g', {
      class: `empire-item${matched ? '' : ' dimmed'}${state.pinnedId === empire.id ? ' selected' : ''}`
    });

    const ratioEnd =
      state.scale === 'normalized'
        ? 1
        : Math.min(1, empire.duration / maxYearsCap);
    const isCapped = state.scale === 'years' && empire.duration > maxYearsCap;

    const rEnd = rInner + ratioEnd * (rOuter - rInner);
    const x0 = cx + rInner * cos;
    const y0 = cy + rInner * sin;
    const xEnd = cx + rEnd * cos;
    const yEnd = cy + rEnd * sin;

    // Línea base del ciclo vital
    g.appendChild(
      el('line', {
        x1: x0,
        y1: y0,
        x2: xEnd,
        y2: yEnd,
        stroke: '#bfb39a',
        'stroke-width': '1.5',
        'stroke-dasharray': state.scale === 'normalized' ? '2 2.5' : 'none'
      })
    );

    // Segmento de Edad de Oro
    const tStart =
      state.scale === 'normalized'
        ? empire.peakStartPct / 100
        : Math.min(1, (empire.peakStart - empire.startYear) / maxYearsCap);
    const tEnd =
      state.scale === 'normalized'
        ? empire.peakEndPct / 100
        : Math.min(1, (empire.peakEnd - empire.startYear) / maxYearsCap);

    const rGold1 = rInner + tStart * (rOuter - rInner);
    const rGold2 = rInner + tEnd * (rOuter - rInner);
    const gx1 = cx + rGold1 * cos;
    const gy1 = cy + rGold1 * sin;
    const gx2 = cx + rGold2 * cos;
    const gy2 = cy + rGold2 * sin;

    g.appendChild(
      el('line', {
        x1: gx1,
        y1: gy1,
        x2: gx2,
        y2: gy2,
        stroke: '#d97a16',
        'stroke-width': '3.2',
        'stroke-linecap': 'round'
      })
    );

    // Puntos de inicio apogeo (○) y declive (●)
    g.appendChild(
      el('circle', {
        cx: gx1,
        cy: gy1,
        r: '3.2',
        fill: '#fbf8f1',
        stroke: '#d97a16',
        'stroke-width': '1.6'
      })
    );
    g.appendChild(
      el('circle', {
        cx: gx2,
        cy: gy2,
        r: '3',
        fill: '#1f1d1a'
      })
    );

    // Anillo exterior fijo para burbuja de área, icono de colapso y etiqueta uniforme
    const rBubble = rOuter + 14;
    const rIcon = rOuter + 32;
    const rLabel = rOuter + 46;

    // Círculo proporcional a extensión territorial
    g.appendChild(
      el('circle', {
        cx: cx + rBubble * cos,
        cy: cy + rBubble * sin,
        r: areaRadius(empire.peakAreaKm2),
        fill: gov.color,
        opacity: '0.28',
        stroke: gov.color,
        'stroke-width': '1'
      })
    );

    // Indicador de outlier acotado en modo años
    if (isCapped) {
      g.appendChild(
        el(
          'text',
          {
            x: cx + (rOuter + 2) * cos,
            y: cy + (rOuter + 2) * sin,
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
            fill: '#a82c2c',
            'font-size': '10',
            'font-weight': '700'
          },
          '+'
        )
      );
    }

    // Glifo de causa de colapso
    g.appendChild(
      el(
        'text',
        {
          x: cx + rIcon * cos,
          y: cy + rIcon * sin,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          fill: '#5c5448',
          'font-size': '11'
        },
        getCollapseGlyph(empire.collapse)
      )
    );

    // Etiqueta con tamaño uniforme y legible (11.5px)
    const deg = (angle * 180) / Math.PI;
    const flip = deg < -90;
    const rotDeg = flip ? deg + 180 : deg;
    const lx = cx + rLabel * cos;
    const ly = cy + rLabel * sin;

    const label = el(
      'text',
      {
        class: 'empire-label',
        x: lx,
        y: ly,
        transform: `rotate(${rotDeg}, ${lx}, ${ly})`,
        'text-anchor': flip ? 'end' : 'start',
        'dominant-baseline': 'central',
        fill: gov.color,
        'font-size': '11.5',
        'font-weight': '600'
      },
      empire.name
    );
    g.appendChild(label);

    attachEmpireEvents(g, empire);
    svg.appendChild(g);
  });
}

function renderHorizontal(items, avgs) {
  const rowH = 26;
  const topPad = 36;
  const bottomPad = 24;
  const W = 980;
  const H = topPad + items.length * rowH + bottomPad;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const xName = 16;
  const xArea = 225;
  const xStart = 275;
  const xEnd = 820;
  const trackW = xEnd - xStart;
  const maxYearsCap = Math.max(1000, ...items.map((d) => Math.min(1400, d.duration)));

  const ticks =
    state.scale === 'normalized'
      ? [0, 25, 50, 75, 100].map((p) => ({ pos: p / 100, label: `${p}%` }))
      : [0, 250, 500, 750, 1000, 1250]
          .filter((y) => y <= maxYearsCap)
          .map((y) => ({ pos: y / maxYearsCap, label: `${y} a.` }));

  ticks.forEach((tk) => {
    const x = xStart + tk.pos * trackW;
    svg.appendChild(
      el('line', {
        x1: x,
        y1: topPad - 8,
        x2: x,
        y2: H - bottomPad,
        stroke: '#e0d6c2',
        'stroke-dasharray': tk.pos === 0 ? 'none' : '3 3'
      })
    );
    svg.appendChild(
      el(
        'text',
        {
          x,
          y: topPad - 14,
          'text-anchor': 'middle',
          fill: '#756b5b',
          'font-size': '10.5',
          'font-weight': '600'
        },
        tk.label
      )
    );
    svg.appendChild(
      el(
        'text',
        {
          x,
          y: H - 7,
          'text-anchor': 'middle',
          fill: '#756b5b',
          'font-size': '10.5',
          'font-weight': '600'
        },
        tk.label
      )
    );
  });

  if (avgs && state.scale === 'normalized') {
    [
      { pct: avgs.avgPeak, color: '#d97a16' },
      { pct: avgs.avgDecline, color: '#443d34' }
    ].forEach((m) => {
      const x = xStart + (m.pct / 100) * trackW;
      svg.appendChild(
        el('line', {
          x1: x,
          y1: topPad - 6,
          x2: x,
          y2: H - bottomPad,
          stroke: m.color,
          'stroke-width': '1.3',
          'stroke-dasharray': '5 4',
          opacity: '0.65'
        })
      );
    });
  }

  items.forEach((empire, idx) => {
    const y = topPad + idx * rowH + rowH / 2;
    const gov = GOVERNMENT_TYPES[empire.government];
    const col = COLLAPSE_REASONS[empire.collapse];
    const matched = isMatch(empire);

    const g = el('g', {
      class: `empire-item${matched ? '' : ' dimmed'}${state.pinnedId === empire.id ? ' selected' : ''}`
    });

    // Banda alterna sutil
    if (idx % 2 === 0) {
      g.appendChild(
        el('rect', {
          x: 8,
          y: y - rowH / 2,
          width: W - 16,
          height: rowH,
          rx: 4,
          fill: '#f5efe2'
        })
      );
    }

    // Nombre horizontal limpio
    g.appendChild(
      el(
        'text',
        {
          class: 'empire-label',
          x: xName,
          y,
          'dominant-baseline': 'central',
          fill: gov.color,
          'font-size': '12',
          'font-weight': '600'
        },
        empire.name
      )
    );

    // Círculo de extensión + valor
    g.appendChild(
      el('circle', {
        cx: xArea,
        cy: y,
        r: Math.min(9, areaRadius(empire.peakAreaKm2)),
        fill: gov.color,
        opacity: '0.28',
        stroke: gov.color,
        'stroke-width': '1'
      })
    );

    const endRatio =
      state.scale === 'normalized' ? 1 : Math.min(1, empire.duration / maxYearsCap);
    const barEnd = xStart + endRatio * trackW;

    g.appendChild(
      el('line', {
        x1: xStart,
        y1: y,
        x2: barEnd,
        y2: y,
        stroke: '#bfb39a',
        'stroke-width': '2'
      })
    );

    const g1 =
      state.scale === 'normalized'
        ? xStart + (empire.peakStartPct / 100) * trackW
        : xStart + Math.min(1, (empire.peakStart - empire.startYear) / maxYearsCap) * trackW;
    const g2 =
      state.scale === 'normalized'
        ? xStart + (empire.peakEndPct / 100) * trackW
        : xStart + Math.min(1, (empire.peakEnd - empire.startYear) / maxYearsCap) * trackW;

    g.appendChild(
      el('line', {
        x1: g1,
        y1: y,
        x2: g2,
        y2: y,
        stroke: '#d97a16',
        'stroke-width': '4.5',
        'stroke-linecap': 'round'
      })
    );

    g.appendChild(
      el('circle', {
        cx: g1,
        cy: y,
        r: '3.2',
        fill: '#fbf8f1',
        stroke: '#d97a16',
        'stroke-width': '1.6'
      })
    );
    g.appendChild(
      el('circle', {
        cx: g2,
        cy: y,
        r: '3.2',
        fill: '#1f1d1a'
      })
    );

    // Colapso y duración a la derecha
    g.appendChild(
      el(
        'text',
        {
          x: xEnd + 14,
          y,
          'dominant-baseline': 'central',
          fill: '#5c5448',
          'font-size': '11'
        },
        `${getCollapseGlyph(empire.collapse)} ${col.label}`
      )
    );

    attachEmpireEvents(g, empire);
    svg.appendChild(g);
  });
}

function renderTimeline(items) {
  const rowH = 25;
  const topPad = 36;
  const bottomPad = 24;
  const W = 980;
  const H = topPad + items.length * rowH + bottomPad;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const minYear = -2400;
  const maxYear = 2010;
  const xStart = 210;
  const xEnd = 955;
  const mapX = (yr) => xStart + ((yr - minYear) / (maxYear - minYear)) * (xEnd - xStart);

  [-2000, -1000, 0, 500, 1000, 1500, 2000].forEach((yr) => {
    const x = mapX(yr);
    svg.appendChild(
      el('line', {
        x1: x,
        y1: topPad - 8,
        x2: x,
        y2: H - bottomPad,
        stroke: yr === 0 ? '#b8ab92' : '#e0d6c2',
        'stroke-dasharray': yr === 0 ? 'none' : '3 3'
      })
    );
    const label = yr < 0 ? `${Math.abs(yr)} a.C.` : yr === 0 ? 'Año 0' : `${yr}`;
    svg.appendChild(
      el(
        'text',
        {
          x,
          y: topPad - 14,
          'text-anchor': 'middle',
          fill: '#756b5b',
          'font-size': '10.5',
          'font-weight': '600'
        },
        label
      )
    );
    svg.appendChild(
      el(
        'text',
        {
          x,
          y: H - 7,
          'text-anchor': 'middle',
          fill: '#756b5b',
          'font-size': '10.5',
          'font-weight': '600'
        },
        label
      )
    );
  });

  items.forEach((empire, idx) => {
    const y = topPad + idx * rowH + rowH / 2;
    const gov = GOVERNMENT_TYPES[empire.government];
    const matched = isMatch(empire);

    const g = el('g', {
      class: `empire-item${matched ? '' : ' dimmed'}${state.pinnedId === empire.id ? ' selected' : ''}`
    });

    if (idx % 2 === 0) {
      g.appendChild(
        el('rect', {
          x: 8,
          y: y - rowH / 2,
          width: W - 16,
          height: rowH,
          rx: 4,
          fill: '#f5efe2'
        })
      );
    }

    g.appendChild(
      el(
        'text',
        {
          class: 'empire-label',
          x: 16,
          y,
          'dominant-baseline': 'central',
          fill: gov.color,
          'font-size': '11.5',
          'font-weight': '600'
        },
        empire.name
      )
    );

    const x1 = mapX(empire.startYear);
    const x2 = Math.max(x1 + 4, mapX(empire.endYear));
    const gx1 = mapX(empire.peakStart);
    const gx2 = Math.max(gx1 + 3, mapX(empire.peakEnd));

    g.appendChild(
      el('line', {
        x1,
        y1: y,
        x2,
        y2: y,
        stroke: gov.color,
        'stroke-width': '3',
        opacity: '0.45',
        'stroke-linecap': 'round'
      })
    );

    g.appendChild(
      el('line', {
        x1: gx1,
        y1: y,
        x2: gx2,
        y2: y,
        stroke: '#d97a16',
        'stroke-width': '4.5',
        'stroke-linecap': 'round'
      })
    );

    attachEmpireEvents(g, empire);
    svg.appendChild(g);
  });
}

function render() {
  const { base, matching } = getFilteredAndSorted();
  const avgs = updateKPIs(matching);

  scaleControlGroup.classList.toggle('is-disabled', state.view === 'timeline');
  updateGuide();
  renderLegends();

  svg.innerHTML = '';
  if (state.view === 'radial') {
    renderRadial(base, avgs);
  } else if (state.view === 'horizontal') {
    renderHorizontal(base, avgs);
  } else {
    renderTimeline(base);
  }

  renderDetailPanel();
}

// Event bindings
document.querySelectorAll('[data-view]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    state.view = btn.dataset.view;
    render();
  });
});

document.querySelectorAll('[data-scale]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-scale]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.scale = btn.dataset.scale;
    render();
  });
});

sortSelect.addEventListener('change', () => {
  state.sortBy = sortSelect.value;
  render();
});

sortDirBtn.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
  sortDirBtn.textContent = state.sortDir === 'asc' ? '↑' : '↓';
  render();
});

fictionToggle.addEventListener('change', () => {
  state.includeFiction = fictionToggle.checked;
  if (!state.includeFiction && state.pinnedId === 'klingon') {
    state.pinnedId = null;
  }
  render();
});

function syncSearchUI() {
  const hasQuery = Boolean(state.searchQuery.trim());
  searchClear.hidden = !hasQuery;
  searchKbd.hidden = hasQuery;
}

searchInput.addEventListener('input', () => {
  state.searchQuery = searchInput.value;
  syncSearchUI();
  const { matching } = getFilteredAndSorted();
  if (state.searchQuery.trim() && matching.length === 1) {
    state.pinnedId = matching[0].id;
  }
  render();
});

searchInput.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter') {
    const { matching } = getFilteredAndSorted();
    if (matching.length > 0) {
      state.pinnedId = matching[0].id;
      render();
    }
  } else if (ev.key === 'Escape') {
    state.searchQuery = '';
    searchInput.value = '';
    syncSearchUI();
    searchInput.blur();
    render();
  }
});

searchClear.addEventListener('click', () => {
  state.searchQuery = '';
  searchInput.value = '';
  syncSearchUI();
  searchInput.focus();
  render();
});

document.addEventListener('keydown', (ev) => {
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});

resetBtn.addEventListener('click', () => {
  state.view = 'radial';
  state.scale = 'normalized';
  state.sortBy = 'startYear';
  state.sortDir = 'asc';
  state.includeFiction = false;
  state.filterGov = null;
  state.filterCollapse = null;
  state.searchQuery = '';
  state.pinnedId = null;

  searchInput.value = '';
  syncSearchUI();
  document.querySelectorAll('[data-view]').forEach((b) => {
    const active = b.dataset.view === 'radial';
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-scale]').forEach((b) => {
    b.classList.toggle('active', b.dataset.scale === 'normalized');
  });
  sortSelect.value = 'startYear';
  sortDirBtn.textContent = '↑';
  fictionToggle.checked = false;

  render();
});

render();

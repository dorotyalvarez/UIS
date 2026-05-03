// ============================================================
// render.js — Renderizado dinámico de tarjetas y kit
// ============================================================

/**
 * Construye el HTML de una tarjeta de tema.
 * @param {Object} topic - Objeto del tema desde data.js
 * @returns {string} HTML de la tarjeta
 */
function renderCard(topic) {
    const stepsHTML = topic.steps
        .map((step, index) => `
      <li class="steps-list__item">
        <span class="step-num"
              style="background:${topic.stepColor.bg}; color:${topic.stepColor.text};">
          ${index + 1}
        </span>
        <span>${step}</span>
      </li>
    `)
        .join('');

    return `
    <article class="card" id="card-${topic.id}" aria-label="${topic.title}">
      <div class="card__header">
        <div class="card__icon" style="background:${topic.iconBg};"
             aria-hidden="true">${topic.icon}</div>
        <div class="card__meta">
          <div class="card__title">${topic.title}</div>
          <div class="card__subtitle">${topic.subtitle}</div>
        </div>
        <span class="urgency urgency--${topic.urgency}"
              aria-label="Nivel de urgencia: ${topic.urgencyLabel}">
          ${topic.urgencyLabel}
        </span>
      </div>

      <div class="card__body">
        <p class="card__desc">${topic.desc}</p>
        <ol class="steps-list" aria-label="Pasos a seguir">
          ${stepsHTML}
        </ol>
      </div>

      <div class="card__footer">
        <span class="card__warning" role="note">${topic.warning}</span>
        <a href="${topic.id}.html" class="card__expand-btn">
         Más info ↗
          </a>
      </div>
    </article>
  `;
}

/**
 * Construye la tarjeta de búsqueda (última del grid).
 * @returns {string} HTML de la tarjeta de búsqueda
 */
function renderSearchCard() {
    return `
    <div class="card search-card" aria-label="Buscador de emergencias">
      <div class="card__header">
        <div class="card__icon" style="background:rgba(255,255,255,.1);"
             aria-hidden="true">🔍</div>
        <div class="card__meta">
          <div class="card__title">¿No encuentras tu emergencia?</div>
          <div class="card__subtitle">Búsqueda rápida</div>
        </div>
      </div>
      <div class="card__body">
        <p class="card__desc">Escribe el síntoma o la situación y te guiamos al protocolo correcto.</p>
        <div class="search-bar">
          <input
            id="searchInput"
            class="search-bar__input"
            type="text"
            placeholder="Ej: alergia, sangrado, caída..."
            aria-label="Buscar emergencia"
            autocomplete="off"
          />
          <button id="searchBtn" class="search-bar__btn" aria-label="Buscar">
            Buscar
          </button>
        </div>
        <div id="searchResult" class="search-result" role="status" aria-live="polite"></div>
      </div>
    </div>
  `;
}

/**
 * Construye el HTML de un item del kit.
 * @param {Object} item - {icon, label}
 * @returns {string} HTML del item
 */
function renderKitItem(item) {
    return `
    <div class="kit__item">
      <span class="kit__item-icon" aria-hidden="true">${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `;
}

/**
 * Renderiza todas las tarjetas en el grid.
 */
function renderTopics() {
    const grid = document.getElementById('topicsGrid');
    if (!grid) return;

    const cardsHTML = TOPICS.map(renderCard).join('');
    grid.innerHTML = cardsHTML + renderSearchCard();
}

/**
 * Renderiza todos los items del kit.
 */
function renderKit() {
    const kitGrid = document.getElementById('kitGrid');
    if (!kitGrid) return;

    kitGrid.innerHTML = KIT_ITEMS.map(renderKitItem).join('');
}
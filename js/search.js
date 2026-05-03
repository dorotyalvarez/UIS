// ============================================================
// search.js — Lógica del buscador de emergencias
// ============================================================

/**
 * Normaliza un string: minúsculas, sin tildes.
 * @param {string} str
 * @returns {string}
 */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca en SEARCH_KEYWORDS y retorna el mensaje correspondiente.
 * @param {string} query - Texto ingresado por el usuario
 * @returns {string} Mensaje de resultado o cadena vacía
 */
function findResult(query) {
  const normalized = normalize(query);
  if (!normalized || normalized.length < 2) return '';

  for (const [keyword, message] of Object.entries(SEARCH_KEYWORDS)) {
    if (normalized.includes(normalize(keyword))) {
      return message;
    }
  }

  return '🔍 No encontramos ese término. Prueba con: sangrado, quemadura, desmayo, fractura…';
}

/**
 * Inicializa los event listeners del buscador.
 * Debe llamarse después de que el DOM esté listo.
 */
function initSearch() {
  const input  = document.getElementById('searchInput');
  const btn    = document.getElementById('searchBtn');
  const result = document.getElementById('searchResult');

  if (!input || !btn || !result) return;

  const runSearch = () => {
    result.textContent = findResult(input.value);
  };

  btn.addEventListener('click', runSearch);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });
}

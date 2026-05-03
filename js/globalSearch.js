// js/globalSearch.js
const PAGES = [
    { icon: '❤️', name: 'RCP y paro cardíaco', desc: 'Reanimación Cardiopulmonar', url: 'rcp.html', keywords: ['rcp', 'corazon', 'paro', 'compresiones'] },
    { icon: '🩸', name: 'Heridas y hemorragias', desc: 'Control de sangrado', url: 'heridas.html', keywords: ['herida', 'sangre', 'hemorragia', 'corte'] },
    { icon: '🔥', name: 'Quemaduras', desc: 'Primeros pasos ante el calor', url: 'quemaduras.html', keywords: ['quemadura', 'fuego', 'calor', 'ampolla'] },
    { icon: '🦴', name: 'Fracturas y esguinces', desc: 'Inmovilización y soporte', url: 'fracturas.html', keywords: ['fractura', 'hueso', 'esguince', 'torcedura'] },
    { icon: '🫁', name: 'Atragantamiento', desc: 'Maniobra de Heimlich', url: 'atragantamiento.html', keywords: ['atragant', 'heimlich', 'asfixia', 'atorar'] },
    { icon: '😵', name: 'Desmayos y convulsiones', desc: 'Pérdida de consciencia', url: 'desmayos.html', keywords: ['desmayo', 'convulsion', 'inconsciente'] },
    { icon: '🐝', name: 'Picaduras y mordeduras', desc: 'Reacciones e infecciones', url: 'picaduras.html', keywords: ['picadura', 'mordedura', 'alergia', 'insecto'] },
    { icon: '🎒', name: 'Kit básico de emergencias', desc: 'Elementos esenciales', url: 'kit.html', keywords: ['kit', 'botuquin', 'elementos', 'guantes'] },
    { icon: '📖', name: 'Guía completa', desc: 'Valoración primaria y AVDI', url: 'guia.html', keywords: ['guia', 'avdi', 'valoracion', 'primaria'] },
];

function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function initGlobalSearch() {
    const input = document.getElementById('globalSearch');
    const results = document.getElementById('globalResults');
    if (!input || !results) return;

    input.addEventListener('input', () => {
        const q = normalize(input.value.trim());
        if (q.length < 2) { results.classList.remove('visible'); return; }

        const matches = PAGES.filter(p =>
            normalize(p.name).includes(q) ||
            normalize(p.desc).includes(q) ||
            p.keywords.some(k => normalize(k).includes(q) || q.includes(k))
        );

        if (matches.length === 0) {
            results.innerHTML = `<div class="nav__search-result-item"><span>🔍</span><div><strong>Sin resultados</strong><small>Intenta con otra palabra</small></div></div>`;
        } else {
            results.innerHTML = matches.map(p => `
                <a href="${p.url}" class="nav__search-result-item">
                    <span>${p.icon}</span>
                    <div><strong>${p.name}</strong><small>${p.desc}</small></div>
                </a>
            `).join('');
        }

        results.classList.add('visible');
    });

    // Cerrar al hacer clic afuera
    document.addEventListener('click', e => {
        if (!input.contains(e.target) && !results.contains(e.target)) {
            results.classList.remove('visible');
        }
    });

    // Navegar con Enter al primer resultado
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const first = results.querySelector('a');
            if (first) window.location.href = first.href;
        }
    });
}
initGlobalSearch();

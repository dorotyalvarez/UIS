// ============================================================
// main.js — Punto de entrada. Inicializa la aplicación.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderizar contenido dinámico
    renderTopics();
    renderKit();

    // 2. Inicializar buscador (después de renderizar el DOM)
    initSearch();

    console.log('✚ PrimAux inicializado correctamente.');
});


// cerrar al hacer click en un link (móvil)
document.querySelectorAll(".nav__links a").forEach(link => {
    link.addEventListener("click", () => {
        links.classList.remove("active");
    });
});

const toggle = document.querySelector(".nav__toggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("emergency-bar__close")) {
        document.querySelector(".emergency-bar").style.display = "none";
    }
});

let time = 0;
let interval;

function startTimer() {
    if (interval) return;
    interval = setInterval(() => {
        time++;
        let min = String(Math.floor(time / 60)).padStart(2, '0');
        let sec = String(time % 60).padStart(2, '0');
        document.getElementById("timer").textContent = `${min}:${sec}`;

        // 🚨 alerta a los 5 min
        if (time === 300) {
            alert("🚨 ¡Más de 5 minutos! Llama al 123");
        }

    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    time = 0;
    document.getElementById("timer").textContent = "00:00";
}

function checkAnswer(btn, correct) {
    const buttons = document.querySelectorAll(".quiz-options button");
    const result = document.getElementById("quizResult");

    // Reset botones
    buttons.forEach(b => {
        b.classList.remove("correct", "wrong");
    });

    if (correct) {
        btn.classList.add("correct");
        result.textContent = "✅ Correcto — protege la cabeza";
    } else {
        btn.classList.add("wrong");
        result.textContent = "❌ Incorrecto";
    }
}

function checkAnswer(button, isWrong) {
    const result = document.getElementById("quizResult");

    // Reset estilos
    document.querySelectorAll(".quiz-options button").forEach(btn => {
        btn.style.background = "#eee";
        btn.style.color = "#000";
    });

    if (isWrong) {
        button.style.background = "#e74c3c";
        button.style.color = "#fff";
        result.textContent = "❌ Incorrecto. Nunca debes succionar el veneno.";
        result.style.color = "#e74c3c";
    } else {
        button.style.background = "#27ae60";
        button.style.color = "#fff";
        result.textContent = "✅ Correcto. Bien hecho.";
        result.style.color = "#27ae60";
    }
}
/**
 * 🚀 intro.js — ejecuta la animación UNA SOLA VEZ y revela el contenido
 * ✅ Sin setInterval, sin bucles → una sola ejecución
 */

document.addEventListener('DOMContentLoaded', () => {
  const introLoader = document.getElementById('intro-loader');
  const shuttle = document.getElementById('shuttle');
  const mainContent = document.getElementById('main-content');

  if (!introLoader || !shuttle || !mainContent) return;

  // 1️⃣ Iniciar animación del shuttle (izq → der)
  shuttle.style.transition = 'left 5s linear';
  shuttle.style.left = 'calc(100% + 200px)';

  // 2️⃣ Tras 5.3s, ocultar intro y mostrar contenido
  setTimeout(() => {
    introLoader.style.opacity = '0';
    
    setTimeout(() => {
      introLoader.style.display = 'none';
      mainContent.classList.remove('hidden');
      // ✅ ¡Listo! Ya no hay más animaciones → sitio está activo.
    }, 800);
  }, 5300); // 5s animación + 300ms margen
});
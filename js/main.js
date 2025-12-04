/**
 * 🌠 main.js — lógica del sitio principal (hero, interacciones, etc.)
 * Se ejecuta SOLO después de que la intro termina.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ✅ Solo genera estrellas si estamos en el hero
  if (document.getElementById('hero-stars')) {
    generateStars('hero-stars', 80); // 80 estrellas para más densidad
  }
});

function generateStars(containerId, count = 50) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = Math.random() * 2 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(star);
  }
}
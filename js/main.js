/**
 * 🌌 Generar estrellas dinámicas (efecto espacial)
 */
document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;

  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.boxShadow = '0 0 8px #fff, 0 0 20px var(--neon-blue)';
    star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite alternate`;
    starsContainer.appendChild(star);
  }

  // Agregar animación de parpadeo a las estrellas
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0% { opacity: 0.2; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Iniciar flip cards
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });

  // Iniciar carousel de contenido
  const track = document.getElementById('carouselTrack');
  const cards = track.querySelectorAll('.card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.getElementById('carouselDots');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 24; // ancho + gap

  // Generar dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  updateDots();

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll('.carousel-dots button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Swipe básico (opcional, mejora UX móvil)
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1); // swipe izq → sig
      else goToSlide(currentIndex - 1);          // swipe der → ant
    }
  });
});

//SIPNOSIS
// ===== ANIMACIÓN DE APARICIÓN CON INTERSECTION OBSERVER =====
document.addEventListener('DOMContentLoaded', () => {
  // Solo si IntersectionObserver está disponible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Opcional: dejar de observar después de animar
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    });

    const poster = document.getElementById('posterCard');
    const content = document.getElementById('contentCard');

    if (poster) observer.observe(poster);
    if (content) observer.observe(content);
  } else {
    // Fallback para navegadores antiguos
    document.querySelectorAll('.poster-card, .content-card').forEach(el => {
      el.classList.add('visible');
    });
  }
});

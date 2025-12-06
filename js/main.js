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

/**
 * 🤝 Slider de aliados — pausa en hover + mejora de accesibilidad
 */
document.addEventListener('DOMContentLoaded', () => {
  const sliderTrack = document.getElementById('aliados-slider');
  
  if (!sliderTrack) return;

  // ✅ Pausar/reanudar con hover (ya cubierto por CSS, pero refuerzo con JS para accesibilidad)
  sliderTrack.parentElement.addEventListener('mouseenter', () => {
    sliderTrack.style.animationPlayState = 'paused';
  });

  sliderTrack.parentElement.addEventListener('mouseleave', () => {
    sliderTrack.style.animationPlayState = 'running';
  });

  // ✅ Soporte para touch (móviles): pausa al tocar
  let touchStartX = 0;
  sliderTrack.parentElement.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    sliderTrack.style.animationPlayState = 'paused';
  });

  sliderTrack.parentElement.addEventListener('touchend', () => {
    setTimeout(() => {
      sliderTrack.style.animationPlayState = 'running';
    }, 2000); // Reanuda tras 2s
  });
});

/**
 * 📣 Sección de Divulgadores — Tarjetas flip + scroll con arrastre
 */
document.addEventListener('DOMContentLoaded', () => {
  // Flip al hacer clic
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });

  // Scroll con arrastre (opcional)
  const carousel = document.getElementById('divulgadores-carousel');
  if (carousel) {
    let isDown = false, startX, scrollLeft;

    carousel.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});

// POST
document.addEventListener('DOMContentLoaded', () => {
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

    // ✨ Estrellas animadas
    document.addEventListener('DOMContentLoaded', () => {
      const stars = document.getElementById('stars');
      for (let i = 0; i < 100; i++) {
        const s = document.createElement('div');
        s.style.cssText = `
          position: absolute;
          width: ${Math.random() * 2 + 1}px;
          height: ${Math.random() * 2 + 1}px;
          background: white;
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.8 + 0.2};
          box-shadow: 0 0 ${8 + Math.random() * 10}px var(--neon-blue);
          animation: twinkle ${3 + Math.random() * 4}s infinite alternate;
        `;
        stars.appendChild(s);
      }
      document.head.insertAdjacentHTML('beforeend', `
        <style>@keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 1; } }</style>
      `);

      // 🔍 Monitoreo: si iframe no carga en 3s, muestra fallback
      document.querySelectorAll('.trailer-iframe').forEach((iframe, idx) => {
        let loaded = false;
        iframe.onload = () => { loaded = true; };
        setTimeout(() => {
          if (!loaded) {
            iframe.parentElement.querySelector('.fallback').style.display = 'flex';
          }
        }, 3000);
      });
    });

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particle-container');
    const colors = ['#e89bd3', '#41b3e8', '#ffeb3b']; // Roz, Albastru, Galben
    const particleCount = 50; // Numărul total de floricele

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Alege o culoare aleatorie
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = randomColor;

        // Dimensiune și poziție aleatorie
        const size = Math.random() * 8 + 6; // Dimensiuni între 6px și 14px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const startX = Math.random() * 100; // Poziție orizontală (0-100%)
        particle.style.left = `${startX}vw`;

        const startY = -Math.random() * 100; // Poziție verticală (începe de sus, în afara ecranului)
        particle.style.top = `${startY}px`;

        // Durată și întârziere aleatorie pentru animație
        const duration = Math.random() * 15 + 10; // Durată între 10s și 25s
        const delay = Math.random() * 5; // Întârziere între 0s și 5s

        particle.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        
        // Când particula termină animația (ajunge jos), o repornim (opțional, dar mai eficient)
        particle.addEventListener('animationend', () => {
             // Această logică este preluată de 'infinite' în CSS.
             // Dacă nu am fi folosit 'infinite', am fi repornit particula aici.
        });

        container.appendChild(particle);
    }

    // Generează floricelele inițiale
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
});
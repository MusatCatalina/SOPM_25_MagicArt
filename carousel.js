document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentIndex = 0;
    const itemWidth = carouselItems[0].clientWidth; // Lățimea unui element, inclusiv padding-ul lateral

    // Funcție pentru a actualiza poziția caruselului
    function updateCarousel() {
        // Calculează lățimea totală a unui element (cu tot cu padding-ul lateral)
        const itemFullWidth = carouselItems[0].offsetWidth; 
        carouselTrack.style.transform = `translateX(${-currentIndex * itemFullWidth}px)`;
    }

    // Navigare la imaginea anterioară
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    // Navigare la imaginea următoare
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Ajustează caruselul la redimensionarea ferestrei (pentru a recalculada lățimea)
    window.addEventListener('resize', updateCarousel);

    // Inițializează caruselul la încărcarea paginii
    updateCarousel();
});
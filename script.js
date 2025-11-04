// Așteaptă ca tot conținutul HTML să se încarce complet înainte de a rula codul JS
document.addEventListener('DOMContentLoaded', function() {

    // Selectează elementele dropdown pentru filtrare
    const filterTechnique = document.getElementById('filter-technique'); // Filtru pentru tehnică (acuarelă, ulei etc.)
    const filterSize = document.getElementById('filter-size'); // Filtru pentru dimensiune
    const paintingCards = document.querySelectorAll('.painting-card'); // Toate cardurile cu tablouri
    
    // =============================================
    // ANIMAȚIE: aplică un delay treptat fiecărui card
    // pentru efectul de apariție în cascadă
    // =============================================
    paintingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`; // întârziere progresivă (0.1s, 0.2s, 0.3s, etc.)
    });
    
    // =============================================
    // FUNCȚIA DE FILTRARE A TABLOURILOR
    // =============================================
    function filterPaintings() {
        // Preia valorile selectate din dropdown-uri
        const techniqueValue = filterTechnique.value;
        const sizeValue = filterSize.value;
        
        // Parcurge fiecare card și decide dacă îl ascunde sau afișează
        paintingCards.forEach(card => {
            const cardTechnique = card.dataset.technique; // Tehnica din atributul "data-technique"
            const cardSize = card.dataset.size; // Dimensiunea din atributul "data-size"
            
            // Verifică potrivirea cu filtrele curente
            const techniqueMatch = techniqueValue === 'all' || cardTechnique === techniqueValue;
            const sizeMatch = sizeValue === 'all' || cardSize === sizeValue;
            
            // Dacă se potrivesc ambele criterii, afișează cardul
            if (techniqueMatch && sizeMatch) {
                card.classList.remove('hidden'); 
            } else {
                card.classList.add('hidden'); // Altfel, îl ascunde
            }
        });
    }
    
    // =============================================
    // EVENIMENTE PENTRU FILTRE
    // (se actualizează lista când utilizatorul schimbă opțiunile)
    // =============================================
    filterTechnique.addEventListener('change', filterPaintings);
    filterSize.addEventListener('change', filterPaintings);
    
    // =============================================
    // BUTOANE "INTERESAT" — efect vizual temporar + log în consolă
    // =============================================
    const purchaseBtns = document.querySelectorAll('.purchase-btn');
    
    purchaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const paintingCard = this.closest('.painting-card'); // Găsește cardul părinte
            const paintingTitle = paintingCard.querySelector('h3').textContent; // Numele tabloului
            
            if (this.disabled) return; // Evită apăsări multiple
            
            const originalText = this.textContent; // Salvează textul inițial
            
            this.textContent = 'Solicitare Trimisă! ✔️'; // Text temporar de confirmare
            this.disabled = true; // Dezactivează butonul
            
            // După 3 secunde revine la starea inițială
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 3000); 

            // Afișează în consolă numele tabloului pentru care s-a manifestat interes
            console.log(`Interes manifestat pentru: ${paintingTitle}`);
        });
    });

    // =========================================
    // SECȚIUNE: LIGHTBOX / MODAL IMAGE VIEWER
    // =========================================
    const imageModal = document.getElementById('image-modal'); // Containerul pentru fereastra modală
    const modalImg = document.getElementById('modal-img'); // Imaginea din modal
    const captionText = document.getElementById('caption'); // Textul descriptiv sub imagine
    const closeButton = document.querySelector('.close-button'); // Butonul „X” pentru închidere

    // Deschide imaginea în fereastra modală la click
    document.querySelectorAll('.painting-image img').forEach(image => {
        image.addEventListener('click', function() {
            imageModal.style.display = 'block'; // Afișează modalul
            modalImg.src = this.src; // Setează imaginea selectată
            captionText.innerHTML = this.alt; // Afișează textul din atributul „alt”
        });
    });

    // Închide modalul la click pe butonul „X”
    closeButton.addEventListener('click', function() {
        imageModal.style.display = 'none'; 
    });

    // Închide modalul dacă se apasă în afara imaginii (pe fundalul întunecat)
    imageModal.addEventListener('click', function(event) {
        if (event.target === imageModal) { 
            imageModal.style.display = 'none';
        }
    });

    // Închide modalul și cu tasta ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
        }
    });
    
    // Aplică filtrarea implicită la încărcare (afișează toate)
    filterPaintings();

}); // Închidere bloc pentru DOMContentLoaded


// =========================================================
// SECȚIUNE GOOGLE MAPS API — RULATĂ SEPARAT
// =========================================================
function initMap() {
    // Setează coordonatele locației galeriei
    const galleryLocation = { lat: 45.6570, lng: 25.6012 }; // Ex: Brașov, Piața Sfatului

    // Opțiunile de configurare pentru hartă
    const mapOptions = {
        zoom: 15, // Nivelul de zoom
        center: galleryLocation, // Centrează harta pe galerie
        mapTypeId: 'roadmap' // Tip de hartă (drumuri)
    };

    // Creează instanța hărții și o afișează în div-ul #map
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adaugă un marker pe locația galeriei
    const marker = new google.maps.Marker({
        position: galleryLocation,
        map: map,
        title: 'Galerie de Artă (Numele Tău)' // Text care apare la hover
    });

    // Fereastră informativă (pop-up la click pe marker)
    const infoWindow = new google.maps.InfoWindow({
        content: '<h3>Galeria Ta</h3><p>Adresa ta completă aici.</p>'
    });

    // Deschide fereastra informativă la click pe marker
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

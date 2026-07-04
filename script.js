document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    const promoCards = document.querySelectorAll('.promo-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    promoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const searchBtn = document.querySelector('.map-sidebar .btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (map) {
                map.locate({ setView: true, maxZoom: 12 });
            }
        });
    }

    const mapCanvas = document.getElementById('map-canvas');
    if (mapCanvas) {
        const map = L.map('map-canvas').setView([46.3498, 48.0408], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const fuelIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width:24px;height:24px;background:#F5A623;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const stations = [
            { lat: 46.3520, lng: 48.0350, name: 'АЗС МоторПлюс №1', address: 'ул. Красная Набережная, 1' },
            { lat: 46.3480, lng: 48.0450, name: 'АЗС МоторПлюс №2', address: 'ул. Набережная 1 Мая, 15' },
            { lat: 46.3450, lng: 48.0380, name: 'АЗС МоторПлюс №3', address: 'Бакинская ул., 22' },
            { lat: 46.3510, lng: 48.0520, name: 'АЗС МоторПлюс №4', address: 'ул. Софьи Перовской, 8' },
            { lat: 46.3420, lng: 48.0480, name: 'АЗС МоторПлюс №5', address: 'ул. Николая Островского, 30' },
            { lat: 46.3550, lng: 48.0420, name: 'АЗС МоторПлюс №6', address: 'ул. Красная, 45' }
        ];

        stations.forEach(station => {
            const marker = L.marker([station.lat, station.lng], { icon: fuelIcon }).addTo(map);
            marker.bindPopup(`
                <div style="text-align:center;padding:8px;">
                    <strong style="font-size:14px;">${station.name}</strong><br>
                    <span style="color:#666;font-size:12px;">${station.address}</span>
                </div>
            `);
        });
    }
});

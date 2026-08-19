/* ==========================================================================
   Marvex International - Interactive JavaScript Engine
   ========================================================================== */

// FULL PRODUCT CATALOG DATA
const productsData = [
    // GROUND SPICES
    {
        id: 1,
        title: "Turmeric Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        description: "Golden yellow turmeric powder milled from premium curcuma longa roots. High curcumin content for vibrant natural color and rich culinary flavor.",
        packaging: "25kg / 50kg PP Bags",
        origin: "Erode & Sangli, India",
        specs: "Curcumin > 3.0%, Moisture < 10%, Pure",
        tag: "Best Seller"
    },
    {
        id: 2,
        title: "Red Chilli Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        description: "Vibrant spicy red chilli powder ground from selected Guntur chillies. Delivers authentic deep red color and fiery hot flavor.",
        packaging: "25kg Kraft Bags / Drums",
        origin: "Guntur, Andhra Pradesh, India",
        specs: "ASTA Color 80-120, Pungency 25,000-40,000 SHU",
        tag: "Hot"
    },
    {
        id: 3,
        title: "Cumin Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        description: "Freshly ground cumin seed powder containing rich essential oils. Adds warm, earthy, and aromatic notes to commercial food formulations.",
        packaging: "25kg PP Bags",
        origin: "Gujarat & Rajasthan, India",
        specs: "Volatile Oil > 1.5%, Purity 99.5%",
        tag: ""
    },
    {
        id: 4,
        title: "Black Pepper Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=600&q=80",
        description: "Pungent black pepper powder milled from whole Malabar peppercorns. Rich in piperine for sharp heat and penetrating aroma.",
        packaging: "25kg Bags / Vacuum Pack",
        origin: "Kerala & Karnataka, India",
        specs: "Piperine > 4.0%, Mesh 30-60",
        tag: ""
    },
    {
        id: 5,
        title: "Garlic Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        description: "Dehydrated pure garlic powder delivering robust pungent garlic flavor without moisture. Ideal for dry seasoning mixes and marinades.",
        packaging: "20kg Carton Box with Liner",
        origin: "Gujarat, India",
        specs: "Moisture < 6%, Purity 100%",
        tag: ""
    },
    {
        id: 6,
        title: "Ginger Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        description: "Dried ginger powder (Sonth) milled from clean ginger rhizomes. Delivers zesty warmth and pungent aroma.",
        packaging: "25kg Kraft Paper Bags",
        origin: "Kerala & Assam, India",
        specs: "Pungency High, Crude Fiber < 4%",
        tag: ""
    },
    {
        id: 7,
        title: "Fenugreek Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=600&q=80",
        description: "Fine ground fenugreek powder with distinct bittersweet taste. Used widely in spice blends, pickles, and traditional remedies.",
        packaging: "25kg PP Bags",
        origin: "Rajasthan, India",
        specs: "Purity 99.0%, Protein > 25%",
        tag: ""
    },
    {
        id: 8,
        title: "Fennel Powder",
        category: "Ground Spices",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80",
        description: "Pure sweet fennel powder milled from selected green fennel seeds. Delivers sweet anise-like aroma and digestive properties.",
        packaging: "25kg Bags",
        origin: "Gujarat, India",
        specs: "Volatile Oil > 1.2%, Moisture < 8%",
        tag: ""
    },

    // WHOLE SPICES
    {
        id: 9,
        title: "Cumin Seeds (Jeera)",
        category: "Whole Spices",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        description: "Machine cleaned & color sorted Singapore quality whole cumin seeds. High aroma, low moisture, export ready.",
        packaging: "25kg / 50kg PP Bags",
        origin: "Unjha, Gujarat, India",
        specs: "Purity 99.5%, Foreign Matter < 0.5%",
        tag: "Popular"
    },
    {
        id: 10,
        title: "Fennel Seeds (Saunf)",
        category: "Whole Spices",
        image: "https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=600&q=80",
        description: "Selected whole green fennel seeds with rich sweet taste. Perfectly dried to retain natural green tint and essential oils.",
        packaging: "25kg Bags",
        origin: "Rajasthan, India",
        specs: "Purity 99.0%, Green Quality",
        tag: ""
    },
    {
        id: 11,
        title: "Coriander Seeds (Dhana)",
        category: "Whole Spices",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80",
        description: "Whole round golden coriander seeds. Known for mild citrusy fragrance and clean machine-sorted quality.",
        packaging: "25kg / 40kg Jute Bags",
        origin: "Kota, Rajasthan, India",
        specs: "Split Seeds < 5%, Purity 99.5%",
        tag: ""
    },
    {
        id: 12,
        title: "Bay Leaves (Tejpatta)",
        category: "Whole Spices",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        description: "Aromatic dried whole bay leaves with herbal woodsy flavor. Hand-sorted for size and whole leaf retention.",
        packaging: "10kg Bales / Cartons",
        origin: "Assam & Uttarakhand, India",
        specs: "Whole Leaf > 90%, Moisture < 10%",
        tag: ""
    },
    {
        id: 13,
        title: "Ajwain Seeds (Carom)",
        category: "Whole Spices",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        description: "High essential oil carom (ajwain) seeds. Strong thyme-like aroma and warm sharp taste for savory snacks and digestion.",
        packaging: "25kg PP Bags",
        origin: "Gujarat, India",
        specs: "Thymol Content High, Purity 99%",
        tag: ""
    },

    // HERBAL POWDERS
    {
        id: 14,
        title: "Moringa Leaf Powder",
        category: "Herbal Powders",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        description: "100% Organic shade-dried Moringa oleifera leaf powder. Rich in vitamins, amino acids, and vital minerals.",
        packaging: "20kg Fiber Drums / Vacuum Bags",
        origin: "Tamil Nadu, India",
        specs: "Purity 99.9%, Moisture < 8%",
        tag: "Organic"
    },
    {
        id: 15,
        title: "Ashwagandha Powder",
        category: "Herbal Powders",
        image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
        description: "Pure Indian Ashwagandha (Withania somnifera) root powder. Renowned adaptogen for vitality, immunity, and wellness.",
        packaging: "25kg Drums",
        origin: "Madhya Pradesh, India",
        specs: "Withanolides > 2.5%, Purity 100%",
        tag: "Herbal"
    },
    {
        id: 16,
        title: "Natural Henna Powder",
        category: "Herbal Powders",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        description: "Triple-sifted Lawsonia inermis (Henna) leaf powder. Chemical-free natural hair dye and body art henna.",
        packaging: "25kg Bags / Vacuum Pouches",
        origin: "Sojat, Rajasthan, India",
        specs: "Lawsone Content > 2.0%, Mesh 100",
        tag: "Hair Care"
    },
    {
        id: 17,
        title: "Neem Leaf Powder",
        category: "Herbal Powders",
        image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
        description: "Pure Azadirachta indica leaf powder. Powerful natural antibacterial herb for cosmetics, skincare, and organic farming.",
        packaging: "20kg Bags",
        origin: "Gujarat, India",
        specs: "Purity 100%, Fine Mesh",
        tag: ""
    },
    {
        id: 18,
        title: "Amla Powder (Gooseberry)",
        category: "Herbal Powders",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        description: "Vitamin C rich Indian Gooseberry (Amla) fruit powder. Supports immune system health and hair conditioning.",
        packaging: "25kg Fiber Drums",
        origin: "Uttar Pradesh, India",
        specs: "Vitamin C > 5.0%, Pure Fruit Powder",
        tag: ""
    },

    // SEEDS & AGRO
    {
        id: 19,
        title: "Flax Seeds (Linseed)",
        category: "Seeds",
        image: "https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=600&q=80",
        description: "Nutrient-rich brown flax seeds loaded with Omega-3 fatty acids and dietary fiber. Machine cleaned for food grade use.",
        packaging: "25kg / 50kg Bags",
        origin: "Madhya Pradesh, India",
        specs: "Purity 99.5%, Moisture < 7%",
        tag: "Superfood"
    },
    {
        id: 20,
        title: "Black Sesame Seeds",
        category: "Seeds",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        description: "Natural black sesame seeds with rich nutty flavor and high oil content. Sortex cleaned for export grade bakery use.",
        packaging: "25kg PP Bags",
        origin: "Gujarat, India",
        specs: "Purity 99.9%, Oil Content > 48%",
        tag: ""
    },
    {
        id: 21,
        title: "Sunflower Seeds",
        category: "Seeds",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80",
        description: "Crunchy premium sunflower seeds carefully cleaned and dried. Perfect for oil extraction and edible snacking.",
        packaging: "25kg / 50kg Bags",
        origin: "Karnataka, India",
        specs: "Purity 99.0%, Moisture < 8%",
        tag: ""
    }
];

let currentFilter = 'all';
let currentSearch = '';
let currentHeroSlide = 0;
let heroTimer = null;
let currentModalProductTitle = '';

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileDrawer();
    initScrollSpy();
    renderCatalog();
});

/* ==========================================================================
   Catalog Rendering & Filtering
   ========================================================================== */
function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;

    const filtered = productsData.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                              item.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                              item.category.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => openProductModal(item.title, item.category, item.image, item.description, item.packaging, item.origin, item.specs);

            card.innerHTML = `
                <div class="card-image-wrap">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    ${item.tag ? `<span class="card-tag ${item.category === 'Herbal Powders' ? 'green' : ''}">${item.tag}</span>` : ''}
                </div>
                <div class="card-body">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="card-footer">
                        <span class="quick-view-btn">Quick View &rarr;</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function setFilter(category) {
    currentFilter = category;
    
    // Update active pill button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderCatalog();
}

function filterCatalog() {
    const input = document.getElementById('searchInput');
    if (input) {
        currentSearch = input.value;
        renderCatalog();
    }
}

/* ==========================================================================
   Hero Slider Logic
   ========================================================================== */
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    const prevBtn = document.getElementById('prevHeroBtn');
    const nextBtn = document.getElementById('nextHeroBtn');

    if (!slides.length) return;

    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });

    if (prevBtn) prevBtn.onclick = () => prevSlide();
    if (nextBtn) nextBtn.onclick = () => nextSlide();

    // Auto Play
    startHeroTimer();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentHeroSlide = (index + slides.length) % slides.length;

    slides[currentHeroSlide].classList.add('active');
    if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.add('active');

    resetHeroTimer();
}

function nextSlide() {
    goToSlide(currentHeroSlide + 1);
}

function prevSlide() {
    goToSlide(currentHeroSlide - 1);
}

function startHeroTimer() {
    heroTimer = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetHeroTimer() {
    clearInterval(heroTimer);
    startHeroTimer();
}

/* ==========================================================================
   Mobile Drawer Toggle
   ========================================================================== */
function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('drawerClose');
    const links = document.querySelectorAll('.drawer-link');

    if (toggleBtn && drawer && overlay) {
        toggleBtn.onclick = () => openDrawer();
        overlay.onclick = () => closeDrawer();
        if (closeBtn) closeBtn.onclick = () => closeDrawer();
        links.forEach(l => l.onclick = () => closeDrawer());
    }
}

function openDrawer() {
    document.getElementById('mobileDrawer').classList.add('active');
    document.getElementById('drawerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    document.getElementById('mobileDrawer').classList.remove('active');
    document.getElementById('drawerOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   Modals (Product Quick View & Bulk Quote Request)
   ========================================================================== */
function openProductModal(title, category, image, desc, packaging, origin, specs) {
    currentModalProductTitle = title;
    
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = category;
    document.getElementById('modalImg').src = image;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('modalPackaging').innerText = packaging || '25kg PP Bags';
    document.getElementById('modalOrigin').innerText = origin || 'India';
    document.getElementById('modalSpecs').innerText = specs || 'Purity 99.5%';

    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openQuoteModal() {
    document.getElementById('quoteModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    document.getElementById('quoteModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openQuoteForCurrentProduct() {
    closeProductModal();
    const productInput = document.getElementById('mq_product');
    if (productInput && currentModalProductTitle) {
        productInput.value = `Bulk order inquiry for ${currentModalProductTitle}`;
    }
    openQuoteModal();
}

/* ==========================================================================
   Form Handling & Toast Feedback
   ========================================================================== */
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('full_name').value;
    const company = document.getElementById('company_name').value;
    
    showToast(`Thank you, ${name}! Your inquiry for ${company} has been sent successfully. Our export desk will reply within 24h.`);
    document.getElementById('contactForm').reset();
}

function handleModalQuoteSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('mq_name').value;
    
    showToast(`Thank you, ${name}! Your bulk quote request has been submitted to Marvex International.`);
    closeQuoteModal();
    document.getElementById('modalQuoteForm').reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    showToast('Thank you for subscribing! You will now receive Marvex spice market updates.');
    e.target.reset();
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   ScrollSpy & Active Navigation
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

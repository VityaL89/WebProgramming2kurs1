const roomsCatalog = [
    {
        id: 1,
        name: "Luxury Suite",
        category: "Luxury",
        price: 120,
        rating: 4.9,
        description: "Spacious luxury suite with ocean view, king-size bed, and private balcony.",
        imageUrl: "img/LuxRoom.svg",
        amenities: ["Ocean View", "King Bed", "Balcony", "Jacuzzi"],
        size: "65 m²"
    },
    {
        id: 2,
        name: "Executive Suite",
        category: "Luxury",
        price: 95,
        rating: 4.8,
        description: "Elegant executive suite with workspace, city view, and premium amenities.",
        imageUrl: "img/room1.jpg",
        amenities: ["City View", "Queen Bed", "Work Desk", "Mini Bar"],
        size: "50 m²"
    },
    {
        id: 3,
        name: "Deluxe Double",
        category: "Deluxe",
        price: 80,
        rating: 4.7,
        description: "Comfortable deluxe double room with modern furnishings and garden view.",
        imageUrl: "img/room3.jpg",
        amenities: ["Garden View", "Double Bed", "TV", "Coffee Maker"],
        size: "40 m²"
    },
    {
        id: 4,
        name: "Standard Twin",
        category: "Standard",
        price: 60,
        rating: 4.5,
        description: "Cozy twin room with two single beds, perfect for friends or colleagues.",
        imageUrl: "img/MiniRoom.svg",
        amenities: ["City View", "Twin Beds", "TV", "Work Desk"],
        size: "32 m²"
    },
    {
        id: 5,
        name: "Family Room",
        category: "Family",
        price: 110,
        rating: 4.9,
        description: "Large family room with extra space, perfect for 4 guests.",
        imageUrl: "img/room4.jpg",
        amenities: ["Family Size", "2 Queen Beds", "Kitchenette", "Play Area"],
        size: "70 m²"
    },
    {
        id: 6,
        name: "Single Economy",
        category: "Economy",
        price: 45,
        rating: 4.3,
        description: "Budget-friendly single room with essential amenities for solo travelers.",
        imageUrl: "img/room2.jpg",
        amenities: ["Single Bed", "TV", "Basic Amenities"],
        size: "20 m²"
    },
    {
        id: 7,
        name: "Premium Suite",
        category: "Luxury",
        price: 150,
        rating: 5.0,
        description: "Ultimate luxury suite with panoramic views, private terrace, and butler service.",
        imageUrl: "img/room5.jpg",
        amenities: ["Panoramic View", "King Bed", "Terrace", "Butler Service", "Pool Access"],
        size: "85 m²"
    },
    {
        id: 8,
        name: "Business Class",
        category: "Deluxe",
        price: 85,
        rating: 4.6,
        description: "Designed for business travelers with ergonomic workspace and high-speed WiFi.",
        imageUrl: "img/room6.jpg",
        amenities: ["Work Desk", "Fast WiFi", "Queen Bed", "Meeting Access"],
        size: "38 m²"
    },
    {
        id: 9,
        name: "Honeymoon Suite",
        category: "Luxury",
        price: 140,
        rating: 4.9,
        description: "Romantic suite with special decorations, king bed, and couple's spa access.",
        imageUrl: "img/room7.jpg",
        amenities: ["Romantic Setup", "King Bed", "Spa Access", "Champagne"],
        size: "60 m²"
    },
    {
        id: 10,
        name: "Garden View Room",
        category: "Standard",
        price: 70,
        rating: 4.5,
        description: "Peaceful room overlooking our beautiful gardens with private patio.",
        imageUrl: "img/room8.jpg",
        amenities: ["Garden View", "Queen Bed", "Patio", "TV"],
        size: "35 m²"
    },
    {
        id: 11,
        name: "Pool Access Suite",
        category: "Deluxe",
        price: 130,
        rating: 4.8,
        description: "Suite with direct access to the swimming pool and private sun loungers.",
        imageUrl: "img/EliteRoom.svg",
        amenities: ["Pool Access", "King Bed", "Sun Loungers", "Mini Bar"],
        size: "55 m²"
    },
    {
        id: 12,
        name: "Penthouse",
        category: "Luxury",
        price: 200,
        rating: 5.0,
        description: "Top-floor penthouse with 360° views, private elevator, and exclusive amenities.",
        imageUrl: "img/LuxRoom.svg",
        amenities: ["360° View", "King Bed", "Private Elevator", "Exclusive Lounge", "Jacuzzi"],
        size: "120 m²"
    },
    {
        id: 13,
        name: "Accessible Room",
        category: "Standard",
        price: 65,
        rating: 4.7,
        description: "Specially designed room for guests with disabilities, wheelchair accessible.",
        imageUrl: "img/SingleRoom.svg",
        amenities: ["Wheelchair Access", "Queen Bed", "Emergency Call", "Wide Doors"],
        size: "40 m²"
    },
    {
        id: 14,
        name: "Pet Friendly Suite",
        category: "Family",
        price: 100,
        rating: 4.6,
        description: "Suite designed for guests traveling with pets, includes pet bed and bowls.",
        imageUrl: "img/StandeRoom.svg",
        amenities: ["Pet Bed", "Food Bowls", "Queen Bed", "Garden Access"],
        size: "45 m²"
    },
    {
        id: 15,
        name: "Long Stay Studio",
        category: "Economy",
        price: 75,
        rating: 4.4,
        description: "Studio apartment with kitchenette, ideal for extended stays.",
        imageUrl: "img/MiniRoom.svg",
        amenities: ["Kitchenette", "Queen Bed", "Living Area", "Laundry Service"],
        size: "50 m²"
    }
];

let originalRooms = [...roomsCatalog];
let currentRooms = [...roomsCatalog];

let currentSearchTerm = '';
let currentCategory = 'all';
let currentSort = 'default';

function displayRooms(rooms) {
    const container = document.getElementById('catalog-container');
    
    if (!container) return;
    
    if (!rooms || rooms.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No rooms found</h3>
                <p>Please try different search criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="room-card">
            <img src="${room.imageUrl}" class="room-card_image" alt="${room.name}" onerror="this.src='img/LuxRoom.svg'">
            <div class="room-card_overlay">
                <div class="room-card_top">
                    <h3>${escapeHtml(room.name)}</h3>
                    <div class="room-price">$${room.price} <span>/night</span></div>
                </div>
                <div class="room-meta">
                    <span class="room-category">${room.category}</span>
                    <span class="room-rating">★ ${room.rating}</span>
                </div>
                <p class="room-description">${escapeHtml(room.description)}</p>
                <div class="room-amenities">
                    ${room.amenities.slice(0, 3).map(amenity => `<span class="amenity-tag">${escapeHtml(amenity)}</span>`).join('')}
                    ${room.amenities.length > 3 ? `<span class="amenity-tag">+${room.amenities.length - 3} more</span>` : ''}
                </div>
                <button class="book-btn" data-id="${room.id}">Book now</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const roomId = parseInt(btn.getAttribute('data-id'));
            const room = rooms.find(r => r.id === roomId);
            if (room) {
                alert(`Thank you for your interest in ${room.name}!\nPrice: $${room.price}/night\nWe'll contact you shortly.`);
            }
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function updateInfo(message, isError = false) {
    const badge = document.getElementById('info-badge');
    if (badge) {
        badge.innerHTML = message;
        badge.style.background = isError ? '#ffe8e8' : '#e8f0fe';
        badge.style.color = isError ? '#d32f2f' : '#1B75BB';
        setTimeout(() => {
            if (badge.innerHTML === message) {
                badge.innerHTML = 'Click any button to apply array method';
                badge.style.background = '#e8f0fe';
                badge.style.color = '#1B75BB';
            }
        }, 3000);
    }
}

function applyFilters() {
    let filteredRooms = [...originalRooms];
    
    if (currentCategory !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.category === currentCategory);
    }
    
    if (currentSearchTerm.trim() !== '') {
        const searchLower = currentSearchTerm.toLowerCase();
        filteredRooms = filteredRooms.filter(room => 
            room.name.toLowerCase().includes(searchLower) ||
            room.description.toLowerCase().includes(searchLower)
        );
    }
    
    if (currentSort === 'price-asc') {
        filteredRooms.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filteredRooms.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating-desc') {
        filteredRooms.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'name-asc') {
        filteredRooms.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    currentRooms = filteredRooms;
    displayRooms(currentRooms);
    
    if (filteredRooms.length === 0) {
        updateInfo(' No rooms found matching your criteria', true);
    } else {
        let message = `Found ${filteredRooms.length} room${filteredRooms.length !== 1 ? 's' : ''}`;
        if (currentCategory !== 'all') message += ` in ${currentCategory}`;
        if (currentSearchTerm) message += ` matching "${currentSearchTerm}"`;
        updateInfo(message);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            applyFilters();
        });
    }
}

function setupSort() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFilters();
        });
    }
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            applyFilters();
        });
    });
}

function resetFilters() {
    currentSearchTerm = '';
    currentCategory = 'all';
    currentSort = 'default';
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'default';
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    currentRooms = [...originalRooms];
    displayRooms(currentRooms);
    updateInfo(' All filters reset');
}

function applyMap() {
    const discountedRooms = currentRooms.map(room => ({
        ...room,
        price: Math.round(room.price * 0.9),
        name: `${room.name} `
    }));
    displayRooms(discountedRooms);
    updateInfo(' MAP: 10% discount applied to all rooms!');
}

function applyFilter() {
    const filteredRooms = currentRooms.filter(room => room.price > 80);
    displayRooms(filteredRooms);
    updateInfo(`FILTER: Showing ${filteredRooms.length} rooms with price > $80`);
}

function sortByPrice() {
    const sortedRooms = [...currentRooms].sort((a, b) => a.price - b.price);
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted by price (lowest to highest)');
}

function sortByRating() {
    const sortedRooms = [...currentRooms].sort((a, b) => b.rating - a.rating);
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted by rating (highest first)');
}

function sortByName() {
    const sortedRooms = [...currentRooms].sort((a, b) => a.name.localeCompare(b.name));
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted alphabetically by name');
}

function applyForEach() {
    console.log('forEach: List of all room names:');
    currentRooms.forEach((room, index) => {
        console.log(`  ${index + 1}. ${room.name} - $${room.price}/night`);
    });
    updateInfo('forEach: Check console for list of all room names!');
    displayRooms(currentRooms);
}

function applyFind() {
    const foundRoom = currentRooms.find(room => room.name.includes("Luxury Suite"));
    if (foundRoom) {
        displayRooms([foundRoom]);
        updateInfo(`FIND: Found "${foundRoom.name}" - $${foundRoom.price}/night`);
    } else {
        updateInfo('FIND: Luxury Suite not found in current results', true);
        displayRooms(currentRooms);
    }
}

function applySome() {
    const hasPerfectRating = currentRooms.some(room => room.rating === 5.0);
    updateInfo(`SOME: ${hasPerfectRating ? 'YES, there is a room with 5.0 rating!' : 'NO rooms with 5.0 rating found'}`);
    displayRooms(currentRooms);
}

function applyEvery() {
    const allAbove40 = currentRooms.every(room => room.price > 40);
    updateInfo(`EVERY: ${allAbove40 ? 'YES, all rooms cost more than $40!' : 'NO, some rooms cost $40 or less'}`);
    displayRooms(currentRooms);
}

function applyReduce() {
    const totalPrice = currentRooms.reduce((sum, room) => sum + room.price, 0);
    const averagePrice = (totalPrice / currentRooms.length).toFixed(2);
    updateInfo(`REDUCE: Total value: $${totalPrice} | Average: $${averagePrice}`);
    displayRooms(currentRooms);
}

function resetCatalog() {
    currentRooms = [...originalRooms];
    displayRooms(currentRooms);
    updateInfo('RESET: Catalog restored to original state');
}

function applySlice() {
    const top3Rooms = currentRooms.slice(0, 3);
    
    displayRooms(top3Rooms);
    updateInfo(`SLICE: Showing first 3 rooms (${top3Rooms.length} of ${currentRooms.length})`);
}

function applyConcat() {
    const luxuryDeals = currentRooms.filter(room => room.category === "Luxury" && room.price < 130);
    const familyDeals = currentRooms.filter(room => room.category === "Family" && room.price < 115);
    
    const bestDeals = luxuryDeals.concat(familyDeals);
    
    if (bestDeals.length > 0) {
        displayRooms(bestDeals);
        updateInfo(`CONCAT: Combined Luxury & Family deals - ${bestDeals.length} rooms found!`);
    } else {
        updateInfo('CONCAT: No special deals found in current results', true);
        displayRooms(currentRooms);
    }
}

function setupMethodButtons() {
    const buttons = document.querySelectorAll('.method-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.getAttribute('data-method');
            
            switch(method) {
                case 'map': applyMap(); break;
                case 'filter': applyFilter(); break;
                case 'sortPrice': sortByPrice(); break;
                case 'sortRating': sortByRating(); break;
                case 'sortName': sortByName(); break;
                case 'forEach': applyForEach(); break;
                case 'find': applyFind(); break;
                case 'some': applySome(); break;
                case 'every': applyEvery(); break;
                case 'reduce': applyReduce(); break;
                case 'slice': applySlice(); break;     
                case 'concat': applyConcat(); break;
                case 'reset': resetCatalog(); break;
                default: break;
            }
        });
    });
}

function fixMobileHeader() {
    if (window.innerWidth <= 360) {
        const logoText = document.querySelector('.logo-text');
        const btn = document.querySelector('header a.btn');
        const burgerMenu = document.querySelector('.burger-menu');
        
        if (logoText) logoText.style.marginLeft = '-35px';
        if (btn) btn.style.marginTop = '-20px';
        if (burgerMenu) burgerMenu.style.marginTop = '-15px';
    } else {
        const logoText = document.querySelector('.logo-text');
        const btn = document.querySelector('header a.btn');
        
        if (logoText) logoText.style.marginLeft = '';
        if (btn) btn.style.marginTop = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayRooms(roomsCatalog);
    setupMethodButtons();
    setupSearch();
    setupSort();
    setupCategoryFilters();
    
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    fixMobileHeader();
    window.addEventListener('resize', fixMobileHeader);
});
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

// Сохраняем оригинальный массив
let originalRooms = [...roomsCatalog];
let currentRooms = [...roomsCatalog];

function displayRooms(rooms) {
    const container = document.getElementById('catalog-container');
    
    if (!rooms || rooms.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3 style="font-family: 'Gelasio', serif; font-size: 24px; color: #081F32; margin-bottom: 15px;">No rooms found</h3>
                <p style="font-size: 16px; color: #6E7A8A;">Please try different search criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="room-card">
            <img src="${room.imageUrl}" class="room-card_image" alt="${room.name}">
            <div class="room-card_overlay">
                <div class="room-card_top">
                    <h3>${room.name}</h3>
                    <div class="room-price">$${room.price} <span>/night</span></div>
                </div>
                <div class="room-meta">
                    <span class="room-category">${room.category}</span>
                    <span class="room-rating">★ ${room.rating}</span>
                </div>
                <p class="room-description">${room.description}</p>
                <div class="room-amenities">
                    ${room.amenities.slice(0, 3).map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
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

// Обновление информации
function updateInfo(message) {
    const badge = document.getElementById('info-badge');
    if (badge) {
        badge.innerHTML = message;
        setTimeout(() => {
            if (badge.innerHTML === message) {
                badge.innerHTML = 'Click any button to apply array method';
            }
        }, 3000);
    }
}

// 1. MAP - Применяет скидку 10%
function applyMap() {
    const discountedRooms = currentRooms.map(room => ({
        ...room,
        price: Math.round(room.price * 0.9),
        name: `${room.name} 🔥`
    }));
    displayRooms(discountedRooms);
    updateInfo('MAP: 10% discount applied to all rooms!');
}

// 2. FILTER - Показывает комнаты дороже $80
function applyFilter() {
    const filteredRooms = currentRooms.filter(room => room.price > 80);
    displayRooms(filteredRooms);
    updateInfo(`FILTER: Showing ${filteredRooms.length} rooms with price > $80`);
}

// 3. SORT - Сортировка по цене
function sortByPrice() {
    const sortedRooms = [...currentRooms].sort((a, b) => a.price - b.price);
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted by price (lowest to highest)');
}

// 4. SORT - Сортировка по рейтингу
function sortByRating() {
    const sortedRooms = [...currentRooms].sort((a, b) => b.rating - a.rating);
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted by rating (highest first)');
}

// 5. SORT - Сортировка по имени
function sortByName() {
    const sortedRooms = [...currentRooms].sort((a, b) => a.name.localeCompare(b.name));
    displayRooms(sortedRooms);
    updateInfo('SORT: Rooms sorted alphabetically by name');
}

// 6. forEach - Вывод в консоль
function applyForEach() {
    console.log('forEach: List of all room names:');
    currentRooms.forEach((room, index) => {
        console.log(`  ${index + 1}. ${room.name} - $${room.price}/night`);
    });
    updateInfo('forEach: Check console for list of all room names!');
    displayRooms(currentRooms);
}

// 7. FIND - Поиск Luxury Suite (показывает результат в виде карточки, но с сохранением сетки)
function applyFind() {
    const foundRoom = currentRooms.find(room => room.name.includes("Luxury Suite"));
    if (foundRoom) {
        displayRooms([foundRoom]);
        updateInfo(`FIND: Found "${foundRoom.name}" - $${foundRoom.price}/night`);
    } else {
        updateInfo('FIND: Luxury Suite not found in current results');
        displayRooms(currentRooms);
    }
}

// 8. SOME - Проверка на рейтинг 5.0
function applySome() {
    const hasPerfectRating = currentRooms.some(room => room.rating === 5.0);
    updateInfo(`SOME: ${hasPerfectRating ? 'YES, there is a room with 5.0 rating!' : 'NO rooms with 5.0 rating found'}`);
    displayRooms(currentRooms);
}

// 9. EVERY - Проверка цены > $40
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
                case 'reset': resetCatalog(); break;
                default: break;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayRooms(roomsCatalog);
    setupMethodButtons();
});
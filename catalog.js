
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

function displayRooms(rooms) {
    const container = document.getElementById('catalog-container');
    
    if (!rooms || rooms.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3 style="font-family: 'Gelasio', serif; font-size: 24px; color: #081F32; margin-bottom: 15px;">No rooms found</h3>
                <p style="font-size: 16px; color: #6E7A8A;">Please try different search criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="room-card" style="position: relative; width: 100%; border-radius: 10px; overflow: hidden; margin: 0;">
            <img src="${room.imageUrl}" class="room-card_image" style="width: 100%; height: 250px; object-fit: cover;" alt="${room.name}">
            <div class="room-card_overlay" style="position: relative; bottom: 0; left: 0; background: #fff; padding: 20px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 10px 10px; width: 100%; height: auto;">
                <div class="room-card_top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h3 style="font-family: 'Gelasio', serif; font-size: 20px; color: #081F32; margin: 0;">${room.name}</h3>
                    <p style="font-size: 16px; color: #1B75BB; font-weight: 600; margin: 0;">$${room.price} <span style="font-size: 12px; color: #6E7A8A;">/night</span></p>
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="display: inline-block; padding: 4px 12px; background: #e8f0fe; color: #1B75BB; font-size: 12px; font-weight: 500; border-radius: 20px;">${room.category}</span>
                    <span style="display: inline-block; margin-left: 10px; color: #FFB800;">★ ${room.rating}</span>
                </div>
                <p style="font-size: 14px; color: #6E7A8A; line-height: 1.5; margin-bottom: 15px;">${room.description}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
                    ${room.amenities.slice(0, 3).map(amenity => `<span style="font-size: 11px; color: #6E7A8A; background: #f5f5f5; padding: 4px 8px; border-radius: 4px;">${amenity}</span>`).join('')}
                    ${room.amenities.length > 3 ? `<span style="font-size: 11px; color: #6E7A8A;">+${room.amenities.length - 3} more</span>` : ''}
                </div>
                <button class="book-btn" data-id="${room.id}" style="background: #1B75BB; color: white; padding: 12px 20px; border: none; border-radius: 5px; font-size: 14px; font-weight: 500; cursor: pointer; width: 100%; transition: background 0.3s;">Book now</button>
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

document.addEventListener('DOMContentLoaded', () => {
    displayRooms(roomsCatalog);
});
const API_URL = 'http://localhost:3000/rooms';

async function loadFavorites() {
    const container = document.getElementById('favorites-container');
    const storedFavs = localStorage.getItem('favorites');
    console.log('Raw favorites from storage:', storedFavs);

    let favoriteIds = [];
    try {
        favoriteIds = JSON.parse(storedFavs || '[]').map(id => Number(id));
    } catch (e) {
        console.error('Error parsing favorites:', e);
        favoriteIds = [];
    }

    console.log('Parsed favorite IDs:', favoriteIds);
    updateHeaderCounts();

    if (favoriteIds.length === 0) {
        container.innerHTML = `
             <div class="empty-message">
                 <h3>No favorites yet</h3>
                 <p>Browse our catalog and add rooms to your favorites!</p>
                 <a href="catalog.html" class="book-btn" style="display:inline-block; margin-top:20px;">Browse Catalog</a>
             </div>`;
        return;
    }

    try {
        console.log('Fetching rooms from:', API_URL);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const allRooms = await response.json();
        console.log('All rooms loaded:', allRooms.length);
        
        const favoriteRooms = allRooms.filter(room => favoriteIds.includes(Number(room.id)));
        console.log('Filtered favorite rooms:', favoriteRooms);
        
        if (favoriteRooms.length === 0) {
            container.innerHTML = `
        <div class="empty-message">
                     <h3>No favorites found</h3>
                     <p>The rooms you saved might have been removed or changed.</p>
                     <button onclick="clearBrokenFavorites()" class="book-btn" style="margin-top:10px;">Clear Invalid Favorites</button>
                 </div>`;
            return;
        }
        
        displayFavorites(favoriteRooms);
        
    } catch (error) {
        console.error('Error loading favorites:', error);
        container.innerHTML = `
            <div class="empty-message">
                 <h3>Error loading data</h3>
                 <p>${error.message}</p>
                 <p>Make sure JSON Server is running on port 3000.</p>
                 <button onclick="loadFavorites()" class="book-btn" style="margin-top:10px;">Try Again</button>
             </div>`;
    }
}

function displayFavorites(rooms) {
    const container = document.getElementById('favorites-container');
    
    if (rooms.length === 0) {
        container.innerHTML = `
             <div class="empty-message">
                 <h3>No favorites found</h3>
                 <p>The rooms you saved might have been removed or changed.</p>
                 <button onclick="clearBrokenFavorites()" class="book-btn" style="margin-top:10px;">Clear Invalid Favorites</button>
             </div>`;
        return;
    }

    container.innerHTML = rooms.map(room => `
        <div class="room-card">
            <img src="${room.imageUrl}" class="room-card__image" alt="${room.name}" onerror="this.src='img/LuxRoom.svg'">
            <div class="room-card__body">
                <div class="room-card__header">
                    <h3>${escapeHtml(room.name)}</h3>
                    <div class="room-card__price">$${room.price}<span>/night</span></div>
                </div>
                
                <div class="room-card__meta">
                    <span class="room-card__category">${room.category}</span>
                    <span class="room-card__rating">★ ${room.rating}</span>
                </div>
                
                <p class="room-card__description">${escapeHtml(room.description)}</p>
                
                <div class="room-card__amenities">
                   ${room.amenities?.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join('') || ''}
                </div>
                
                <div class="room-card__buttons">
                    <!-- Кнопка Избранное активна (красная), так как мы на странице избранного -->
                    <button class="btn-fav active" data-id="${room.id}" title="Remove from favorites">
                       ❤️
                    </button>
                    <button class="btn-cart" data-id="${room.id}" title="Add to cart">🛒 Cart</button>
                    <button class="btn-book" data-id="${room.id}">Book now</button>
                </div>
            </div>
        </div>
    `).join('');

   
    setupButtonListeners(rooms);
}

function setupButtonListeners(rooms) {
    
    document.querySelectorAll('.btn-fav.active').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const roomId = parseInt(btn.dataset.id);
            removeFromFavorites(roomId);
        });
    });

    
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });

    
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', () => {
            const room = rooms.find(r => r.id === parseInt(btn.dataset.id));
            if (room) alert(`Thank you for booking ${room.name}! Price: $${room.price}/night`);
        });
    });
}

function removeFromFavorites(roomId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== roomId);
    saveFavorites(favorites);
    showNotification('Removed from favorites', 'info');
    loadFavorites(); // Перезагружаем список
    updateHeaderCounts();
}

function addToCart(roomId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(roomId)) {
        cart.push(roomId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Added to cart', 'success');
    } else {
        showNotification('Already in cart', 'info');
    }
}

function getFavorites() {
    try {
        const stored = localStorage.getItem('favorites');
        const favorites = stored ? JSON.parse(stored) : [];
        return favorites.map(id => Number(id));
    } catch (e) {
        console.error('Error parsing favorites:', e);
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavCount();
}

function updateFavCount() {
    const count = getFavorites().length;
    const favSpan = document.getElementById('fav-count');
    if (favSpan) favSpan.textContent = `(${count})`;
}

function updateCartCount() {
    const count = JSON.parse(localStorage.getItem('cart') || '[]').length;
    const cartSpan = document.getElementById('cart-count');
    if (cartSpan) cartSpan.textContent = `(${count})`;
}

function updateHeaderCounts() {
    updateFavCount();
    updateCartCount();
}

function clearBrokenFavorites() {
    localStorage.setItem('favorites', '[]');
    location.reload();
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    
    
    const container = document.querySelector('.container');
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    
    let rightPosition = 20;
    if (container) {
        const containerRect = container.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        rightPosition = windowWidth - containerRect.right + 20;
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: ${rightPosition}px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        font-size: 14px;
        z-index: 10000;
        background: ${type === 'success' ? '#4CAF50' : '#1B75BB'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `@keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }`;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', loadFavorites);
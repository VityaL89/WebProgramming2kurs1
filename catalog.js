const API_URL = 'http://localhost:3000/rooms';
let currentRooms = [];
let originalRooms = [];

async function loadRoomsFromServer() {
    const container = document.getElementById('catalog-container');
    container.innerHTML = '<div class="loading">Loading rooms...</div>';
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('HTTP error: ' + response.status);
        const rooms = await response.json();
        originalRooms = [...rooms];
        currentRooms = [...rooms];
        displayRooms(currentRooms);
        updateInfo(`Loaded ${rooms.length} rooms`);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
             <div class="no-results">
                 <h3>❌ Cannot connect to server</h3>
                 <p>Make sure JSON Server is running: <strong>npm run server</strong></p>
                 <button onclick="loadRoomsFromServer()" class="book-btn" style="margin-top:20px">Try Again</button>
             </div>`;
    }
}

function displayRooms(rooms) {
    const container = document.getElementById('catalog-container');
    const favorites = getFavorites();
    
    if (!rooms || rooms.length === 0) {
        container.innerHTML = '<div class="no-results"><h3>No rooms found</h3></div>';
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
                    <button class="btn-fav ${favorites.includes(room.id) ? 'active' : ''}" data-id="${room.id}" title="Add to favorites">
                       ${favorites.includes(room.id) ? '❤️' : '🤍'}
                    </button>
                    <button class="btn-cart" data-id="${room.id}" title="Add to cart">🛒 Cart</button>
                </div>
            </div>
        </div>
    `).join('');

    setupButtonListeners(rooms);
}


function setupButtonListeners(rooms) {
   
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const roomId = parseInt(btn.dataset.id);
            toggleFavorite(roomId, btn);
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

function toggleFavorite(roomId, btnElement) {
    let favorites = getFavorites();
    const isFavorited = favorites.includes(roomId);
    if (isFavorited) {
        favorites = favorites.filter(id => id !== roomId);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(roomId);
        showNotification('Added to favorites', 'success');
    }

    saveFavorites(favorites);

    if (btnElement) {
        if (favorites.includes(roomId)) {
            btnElement.classList.add('active');
            btnElement.innerHTML = '❤️';
        } else {
            btnElement.classList.remove('active');
            btnElement.innerHTML = '🤍';
        }
    }
}

function updateFavCount() {
    const count = getFavorites().length;
    const favSpan = document.getElementById('fav-count');
    if (favSpan) favSpan.textContent = `(${count})`;
}

function addToCart(roomId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(roomId)) {
        cart.push(roomId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Added to cart', 'success');
    }
}
function updateCartCount() {
    const count = JSON.parse(localStorage.getItem('cart') || '[]').length;
    const cartSpan = document.getElementById('cart-count');
    if (cartSpan) cartSpan.textContent = `(${count})`;
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


function setupSearch() {
    const input = document.getElementById('search-input');
    let timer;
    input?.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const term = e.target.value.toLowerCase().trim();
            currentRooms = originalRooms.filter(r =>
                r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term)
            );
            displayRooms(currentRooms);
            updateInfo(`Found ${currentRooms.length} rooms`);
        }, 300);
    });
}

function setupSort() {
    document.getElementById('sort-select')?.addEventListener('change', (e) => {
        let sorted = [...currentRooms];
        switch(e.target.value) {
            case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
            case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
            case 'rating-desc': sorted.sort((a, b) => b.rating - a.rating); break;
            case 'name-asc': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        displayRooms(sorted);
    });
}

function setupCategoryFilters() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            currentRooms = cat === 'all' ? [...originalRooms] : originalRooms.filter(r => r.category === cat);
            displayRooms(currentRooms);
        });
    });
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'default';
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.category-btn[data-category="all"]')?.classList.add('active');
    currentRooms = [...originalRooms];
    displayRooms(currentRooms);
}


function applyMap() { displayRooms(currentRooms.map(r => ({ ...r, price: Math.round(r.price * 0.9) }))); updateInfo('MAP: 10% discount'); }
function applyFilter() { displayRooms(currentRooms.filter(r => r.price > 80)); updateInfo('FILTER: price > $80'); }
function sortByPrice() { displayRooms([...currentRooms].sort((a, b) => a.price - b.price)); updateInfo('SORT: price'); }
function sortByRating() { displayRooms([...currentRooms].sort((a, b) => b.rating - a.rating)); updateInfo('SORT: rating'); }
function sortByName() { displayRooms([...currentRooms].sort((a, b) => a.name.localeCompare(b.name))); updateInfo('SORT: name'); }
function applyForEach() { currentRooms.forEach((r, i) => console.log(`${i+1}. ${r.name} - $${r.price}`)); updateInfo('forEach: check console'); displayRooms(currentRooms); }
function applyFind() { const f = currentRooms.find(r => r.name.includes('Luxury Suite')); if (f) { displayRooms([f]); updateInfo(`FIND: ${f.name}`); } else { displayRooms(currentRooms); updateInfo('FIND: not found', true); } }
function applySome() { updateInfo(`SOME: ${currentRooms.some(r => r.rating === 5) ? 'YES' : 'NO'} 5.0 rating`); displayRooms(currentRooms); }
function applyEvery() { updateInfo(`EVERY: ${currentRooms.every(r => r.price > 40) ? 'YES' : 'NO'} > $40`); displayRooms(currentRooms); }
function applyReduce() { const t = currentRooms.reduce((s, r) => s + r.price, 0); updateInfo(`REDUCE: total $${t}, avg $${(t/currentRooms.length).toFixed(2)}`); displayRooms(currentRooms); }
function applySlice() { displayRooms(currentRooms.slice(0, 3)); updateInfo('SLICE: first 3'); }
function applyConcat() { const l = currentRooms.filter(r => r.category === 'Luxury' && r.price < 130); const f = currentRooms.filter(r => r.category === 'Family' && r.price < 115); displayRooms([...l, ...f]); updateInfo(`CONCAT: ${l.length}+${f.length}`); }
function resetCatalog() { loadRoomsFromServer(); updateInfo('RESET'); }

function setupMethodButtons() {
    const methods = {
        map: applyMap, filter: applyFilter, sortPrice: sortByPrice,
        sortRating: sortByRating, sortName: sortByName, forEach: applyForEach,
        find: applyFind, some: applySome, every: applyEvery,
        reduce: applyReduce, slice: applySlice, concat: applyConcat, reset: resetCatalog
    };
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (methods[btn.dataset.method]) methods[btn.dataset.method]();
        });
    });
}

function updateInfo(msg, isError = false) {
    const badge = document.getElementById('info-badge');
    if (badge) {
        badge.textContent = msg;
        badge.style.background = isError ? '#ffe8e8' : '#e8f0fe';
        badge.style.color = isError ? '#d32f2f' : '#1B75BB';
        setTimeout(() => {
            badge.textContent = 'Click any button to apply array method';
            badge.style.background = '#e8f0fe';
            badge.style.color = '#1B75BB';
        }, 3000);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


document.addEventListener('DOMContentLoaded', () => {
    loadRoomsFromServer();
    setupMethodButtons();
    setupSearch();
    setupSort();
    setupCategoryFilters();
    document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
    updateFavCount();
    updateCartCount();
});
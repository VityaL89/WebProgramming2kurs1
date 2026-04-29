const API_BASE = 'http://localhost:3000';

async function getFavorites() {
    try {
        const response = await fetch(`${API_BASE}/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const data = await response.json();
        return Array.isArray(data) ? data.map(id => Number(id)) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
}

async function addToFavorites(roomId) {
    try {
        const favorites = await getFavorites();
        if (!favorites.includes(roomId)) {
            favorites.push(roomId);
            const response = await fetch(`${API_BASE}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(favorites)
            });
            if (!response.ok) throw new Error('Failed to save favorites');
        }
        return true;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return false;
    }
}

async function removeFromFavorites(roomId) {
    try {
        let favorites = await getFavorites();
        favorites = favorites.filter(id => id !== roomId);
        const response = await fetch(`${API_BASE}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favorites)
        });
        if (!response.ok) throw new Error('Failed to save favorites');
        return true;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return false;
    }
}

async function clearFavorites() {
    try {
        const response = await fetch(`${API_BASE}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
        });
        if (!response.ok) throw new Error('Failed to clear favorites');
        return true;
    } catch (error) {
        console.error('Error clearing favorites:', error);
        return false;
    }
}

async function getCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        return Array.isArray(data) ? data.map(id => Number(id)) : [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

async function addToCart(roomId) {
    try {
        const cart = await getCart();
        if (!cart.includes(roomId)) {
            cart.push(roomId);
            const response = await fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            });
            if (!response.ok) throw new Error('Failed to save cart');
        }
        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return false;
    }
}

async function removeFromCart(roomId) {
    try {
        let cart = await getCart();
        cart = cart.filter(id => id !== roomId);
        const response = await fetch(`${API_BASE}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        if (!response.ok) throw new Error('Failed to save cart');
        return true;
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
}

async function clearCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
        });
        if (!response.ok) throw new Error('Failed to clear cart');
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
}
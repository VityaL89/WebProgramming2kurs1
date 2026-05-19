const mealsGrid = document.getElementById('mealsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const categoryFiltersDiv = document.getElementById('categoryFilters');
const areaFiltersDiv = document.getElementById('areaFilters');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModalBtn');

let currentMeals = [];           
let favoriteIds = new Set();      
let activeCategory = '';
let activeArea = '';
let currentSearchQuery = '';


function loadFavorites() {
    const stored = localStorage.getItem('favoriteMeals');
    if (stored) {
        favoriteIds = new Set(JSON.parse(stored));
    }
}

function saveFavorites() {
    localStorage.setItem('favoriteMeals', JSON.stringify([...favoriteIds]));
}

function isFavorite(mealId) {
    return favoriteIds.has(mealId);
}

function toggleFavorite(mealId, event) {
    event.stopPropagation();
    if (favoriteIds.has(mealId)) {
        favoriteIds.delete(mealId);
    } else {
        favoriteIds.add(mealId);
    }
    saveFavorites();
    renderMealCards(currentMeals);
}

// --- Получение данных из API ---
async function fetchMealsBySearch(query) {
    if (!query.trim()) return [];
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.meals || [];
}

async function fetchMealsByIngredient(ingredient) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.meals) return [];
    const fullMeals = await Promise.all(data.meals.map(async (meal) => {
        const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
        const detailRes = await fetch(detailUrl);
        const detailData = await detailRes.json();
        return detailData.meals ? detailData.meals[0] : null;
    }));
    return fullMeals.filter(m => m !== null);
}

async function fetchPopularMeals() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let mealsMap = new Map();
    for (let letter of letters) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.meals) {
            data.meals.forEach(meal => {
                if (!mealsMap.has(meal.idMeal)) mealsMap.set(meal.idMeal, meal);
            });
        }
        if (mealsMap.size >= 20) break;
    }
    return Array.from(mealsMap.values()).slice(0, 12);
}

async function loadMeals() {
    let meals = [];
    if (currentSearchQuery.trim() !== '') {

        let byName = await fetchMealsBySearch(currentSearchQuery);
        if (byName.length > 0) {
            meals = byName;
        } else {
            meals = await fetchMealsByIngredient(currentSearchQuery);
        }
    } else {
        meals = await fetchPopularMeals();
    }

    let filtered = meals;
    if (activeCategory) {
        filtered = filtered.filter(meal => meal.strCategory === activeCategory);
    }
    if (activeArea) {
        filtered = filtered.filter(meal => meal.strArea === activeArea);
    }
    currentMeals = filtered;
    renderMealCards(currentMeals);
    await loadFiltersOptions(meals);
}

async function loadFiltersOptions(meals) {
    const categoriesSet = new Set();
    const areasSet = new Set();
    meals.forEach(meal => {
        if (meal.strCategory) categoriesSet.add(meal.strCategory);
        if (meal.strArea) areasSet.add(meal.strArea);
    });

    if (categoriesSet.size === 0) {
        ['Seafood', 'Dessert', 'Chicken', 'Beef', 'Vegetarian'].forEach(c => categoriesSet.add(c));
    }
    if (areasSet.size === 0) {
        ['Italian', 'Chinese', 'Mexican', 'American', 'British'].forEach(c => areasSet.add(c));
    }

    renderFilterButtons(categoryFiltersDiv, [...categoriesSet].sort(), activeCategory, 'category');
    renderFilterButtons(areaFiltersDiv, [...areasSet].sort(), activeArea, 'area');
}

function renderFilterButtons(container, items, activeValue, type) {
    const span = container.querySelector('span');
    container.innerHTML = '';
    if (span) container.appendChild(span);
    else {
        const labelSpan = document.createElement('span');
        labelSpan.style.alignSelf = 'center';
        labelSpan.style.fontWeight = '500';
        labelSpan.innerText = type === 'category' ? '🍲 Категория:' : '🌍 Регион:';
        container.appendChild(labelSpan);
    }
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        if (activeValue === item) btn.classList.add('active');
        btn.innerText = item;
        btn.addEventListener('click', () => {
            if (type === 'category') {
                activeCategory = activeCategory === item ? '' : item;
            } else {
                activeArea = activeArea === item ? '' : item;
            }
            loadMeals();
        });
        container.appendChild(btn);
    });
}

function renderMealCards(meals) {
    if (!meals.length) {
        mealsGrid.innerHTML = `<div class="not-found-message">😔 К сожалению, рецептов по вашему запросу не найдено. Попробуйте другой поиск или сбросьте фильтры.</div>`;
        return;
    }
    mealsGrid.innerHTML = meals.map(meal => `
        <div class="meal-card" data-id="${meal.idMeal}">
            <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${meal.strMeal}</h3>
                <div class="card-meta">
                    <span>🍽️ ${meal.strCategory || '—'}</span>
                    <span>📍 ${meal.strArea || '—'}</span>
                </div>
                <p class="card-desc">${meal.strInstructions ? meal.strInstructions.substring(0, 100) + '…' : 'Вкуснейшее блюдо мировой кухни.'}</p>
                <button class="fav-btn-card ${isFavorite(meal.idMeal) ? 'active-fav' : ''}" data-id="${meal.idMeal}">${isFavorite(meal.idMeal) ? '❤️' : '🤍'}</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.meal-card').forEach(card => {
        const id = card.dataset.id;
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('fav-btn-card')) return;
            const meal = currentMeals.find(m => m.idMeal === id);
            if (meal) openModal(meal);
        });
        const favBtn = card.querySelector('.fav-btn-card');
        if (favBtn) {
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(id, e);
            });
        }
    });
}

function openModal(meal) {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredientsList.push(`<li><strong>${measure || ''}</strong> ${ingredient}</li>`);
        } else break;
    }
    const videoHtml = meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="video-link">📺 Смотреть видео-рецепт</a>` : '';
    modalBody.innerHTML = `
        <h2>🍽️ ${meal.strMeal}</h2>
        <p><strong>Категория:</strong> ${meal.strCategory || '—'} &nbsp;|&nbsp; <strong>Регион:</strong> ${meal.strArea || '—'}</p>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-height:320px; object-fit:cover; border-radius:28px; margin: 16px 0;">
        <h3>📋 Ингредиенты:</h3>
        <ul class="modal-ingredients">${ingredientsList.join('')}</ul>
        <h3>👩‍🍳 Пошаговые инструкции:</h3>
        <div class="instructions">${meal.strInstructions ? meal.strInstructions.replace(/\n/g, '<br>') : 'Инструкция отсутствует.'}</div>
        ${videoHtml}
    `;
    modal.style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    currentSearchQuery = searchInput.value.trim();
    activeCategory = '';
    activeArea = '';
    loadMeals();
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchQuery = '';
    activeCategory = '';
    activeArea = '';
    loadMeals();
    searchInput.focus();
});

resetFiltersBtn.addEventListener('click', () => {
    activeCategory = '';
    activeArea = '';
    currentSearchQuery = '';
    searchInput.value = '';
    loadMeals();
    searchInput.focus();
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

async function init() {
    loadFavorites();
    await loadMeals();
}

init();
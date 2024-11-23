// URL для авторизации Telegram
const authPageUrl = 'https://legurren.github.io/auth.html';
const profilePageUrl = 'https://legurren.github.io/profile.html';

// Проверка авторизации пользователя
function checkAuthorization() {
    try {
        return JSON.parse(localStorage.getItem('telegramUser'));
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initializeLoginButton();
    initializeGameTiles();
    initializeCategoryButtons(); // Добавлена функция для переключения категорий
    initializeBackButton(); // Добавлена логика для кнопки "Назад" в Telegram Web App
    const user = checkAuthorization();
    if (user) {
        displayUserData(user);
    } else {
        console.log("User not authorized.");
    }
});

// Обработчик для кнопки логина
function initializeLoginButton() {
    const loginButton = document.querySelector('.login-button');
    if (!loginButton) return;

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        const user = checkAuthorization();

        if (user) {
            window.location.href = profilePageUrl;
        } else if (window.Telegram?.WebApp) {
            console.log("Running inside Telegram Web App, no separate login needed.");
        } else {
            window.location.href = authPageUrl;
        }
    });
}

// Обработчик кликов по плиткам игр
function initializeGameTiles() {
    const gameTiles = document.querySelectorAll('.game-tile');
    if (gameTiles.length === 0) {
        console.warn("No game tiles found on the page.");
        return;
    }

    gameTiles.forEach(tile => {
        tile.addEventListener('click', (event) => {
            event.preventDefault();
            const gameId = tile.getAttribute('href')?.substring(1);
            if (gameId) {
                window.location.href = `${gameId}.html`; // Переход на страницу игры
            } else {
                console.error("Game ID not found.");
            }
        });
    });
}

// Обработчик переключения категорий товаров
function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryButtons.length === 0 || productCards.length === 0) {
        console.warn("No category buttons or product cards found on the page.");
        return;
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Сброс активной кнопки
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Фильтрация товаров по категории
            const category = button.getAttribute('data-category');
            productCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Логика для кнопки "Назад" в Telegram Web App
function initializeBackButton() {
    if (window.Telegram?.WebApp) {
        Telegram.WebApp.BackButton.show(); // Показать кнопку "Назад"
        Telegram.WebApp.BackButton.onClick(() => {
            // Действие при нажатии кнопки "Назад"
            window.location.href = 'index.html'; // Возврат на главную страницу
        });
    }
}

// Отображение данных пользователя на странице
function displayUserData(data) {
    const userNameElement = document.getElementById('user-name');
    const userUsernameElement = document.getElementById('user-username');
    const userPhotoElement = document.getElementById('user-photo');

    if (!userNameElement || !userUsernameElement || !userPhotoElement) {
        console.warn("User data elements not found on the page.");
        return;
    }

    userNameElement.textContent = data.first_name || 'Гость';
    userUsernameElement.textContent = `@${data.username || 'username'}`;
    userPhotoElement.src = data.photo_url || 'images_old/profile-avatar.png';
}

// Получение данных пользователя и сохранение в localStorage
function fetchUserData() {
    fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
            'Authorization': `tma ${window.Telegram?.WebApp?.initData || ''}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Authorization failed: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("User data received:", data);
        localStorage.setItem('telegramUser', JSON.stringify(data));
        displayUserData(data);
    })
    .catch(error => {
        console.error('Authorization error:', error);
        localStorage.removeItem('telegramUser');
    });
}

// Вызов функции для получения данных пользователя
fetchUserData();

// Переключение темы на основе времени суток
window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 18 || currentHour < 6;
    document.body.classList.toggle('dark-theme', isNightTime);
});

// Анимация плиток игр
const style = document.createElement('style');
style.textContent = `
    .game-tile {
        transition: transform 0.3s ease;
    }
    .game-tile:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

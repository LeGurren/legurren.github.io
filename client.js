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

// Обработчик для кнопки логина
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');

    if (loginButton) {
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

    // Отображение данных пользователя, если он авторизован
    const user = checkAuthorization();
    if (user) {
        displayUserData(user);
    } else {
        console.log("User not authorized.");
    }

    // Обработчик кликов по плиткам игр
    const gameTiles = document.querySelectorAll('.game-tile');
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
});

// Отображение данных пользователя на странице
function displayUserData(data) {
    const userNameElement = document.getElementById('user-name');
    const userUsernameElement = document.getElementById('user-username');
    const userPhotoElement = document.getElementById('user-photo');

    if (userNameElement && userUsernameElement && userPhotoElement) {
        userNameElement.textContent = data.first_name || 'Гость';
        userUsernameElement.textContent = `@${data.username || 'username'}`;
        userPhotoElement.src = data.photo_url || 'images_old/profile-avatar.png';
    } else {
        console.warn("User data elements not found on the page.");
    }
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

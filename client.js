// URL для авторизации через Telegram
const authPageUrl = 'https://legurren.github.io/auth.html';
const profilePageUrl = 'https://legurren.github.io/profile.html';

// Функция для проверки авторизации пользователя
function checkAuthorization() {
    return JSON.parse(localStorage.getItem('telegramUser'));
}

// Функция для обработки клика на кнопку "Логин" в браузерной версии
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            const user = checkAuthorization(); // Проверка авторизации при каждом клике

            if (user) {
                // Если пользователь уже авторизован, перенаправляем на profile.html без приветственного окна
                window.location.href = profilePageUrl;
            } else if (window.Telegram && window.Telegram.WebApp) {
                // Веб-приложение Telegram не требует отдельной авторизации
                console.log("Запущено внутри Telegram Web App, авторизация не требуется.");
            } else {
                // Перенаправляем на страницу авторизации в браузере
                window.location.href = authPageUrl;
            }
        });
    }

    // Если пользователь уже авторизован, отображаем его данные на странице
    const user = checkAuthorization();
    if (user) {
        displayUserData(user);
    }
});

// Функция для отображения данных пользователя на странице
function displayUserData(data) {
    const userNameElement = document.getElementById('user-name');
    const userUsernameElement = document.getElementById('user-username');
    const userPhotoElement = document.getElementById('user-photo');

    if (userNameElement && userUsernameElement && userPhotoElement) {
        userNameElement.textContent = data.first_name || '';
        userUsernameElement.textContent = `@${data.username || ''}`;
        userPhotoElement.src = data.photo_url || 'images_old/profile-avatar.png';
    }
}

// Запрос к серверу для получения данных пользователя и их сохранение
function fetchUserData() {
    fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
            'Authorization': `tma ${window.Telegram.WebApp ? window.Telegram.WebApp.initData : ''}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Unauthorized");
        }
        return response.json();
    })
    .then(data => {
        console.log("Полученные данные пользователя:", data);
        // Сохранение данных в localStorage для дальнейшего использования
        localStorage.setItem('telegramUser', JSON.stringify(data));
        displayUserData(data); // Вызов функции для отображения данных
    })
    .catch(error => {
        console.error('Ошибка авторизации:', error);
        localStorage.removeItem('telegramUser'); // Удаление данных из localStorage, если авторизация не удалась
    });
}

// Вызов функции для получения данных пользователя при загрузке страницы
fetchUserData();

// Данные для товаров для каждой игры
const products = {
    brawlstars: [
        {
            name: 'Бравл Пасс',
            price: '1050 руб',
            image: 'images/brawl_pass.jpg',
            discount: '10%',
        },
        {
            name: 'Улучшение БП',
            price: '620 руб',
            image: 'images/brawl_upgrade.jpg',
        }
    ],
    pubg: [
        {
            name: 'PUBG UC Pack',
            price: '500 руб',
            image: 'images/pubg_uc.jpg',
        }
    ],
    roblox: [
        {
            name: 'Robux Pack',
            price: '800 руб',
            image: 'images/robux.jpg',
        }
    ],
};

// Обработка клика по плитке игры
document.querySelectorAll('.game-tile').forEach(tile => {
    tile.addEventListener('click', (event) => {
        event.preventDefault();
        const gameId = tile.getAttribute('href').substring(1);
        showProducts(gameId);
    });
});

function showProducts(gameId) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Очистить предыдущие товары
    const selectedProducts = products[gameId] || [];

    selectedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = product.price;

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Купить';
        buyButton.classList.add('buy-button');
        buyButton.addEventListener('click', () => {
            alert(`Покупка оформлена для ${product.name}`);
        });

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(buyButton);

        productsGrid.appendChild(productCard);
    });

    // Показать секцию товаров
    document.querySelector('.products-section').classList.remove('hidden');
    document.querySelector('.products-section').style.display = 'block';
}

// Смена темы в зависимости от времени суток
window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

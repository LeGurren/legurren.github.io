// URL для авторизации через Telegram
const telegramAuthLink = 'https://oauth.telegram.org/auth?bot_id=7900966430&origin=https://legurren.github.io/&embed=1&request_access=write';

// Функция для обработки клика на кнопку "Логин" в браузерной версии
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (window.Telegram && window.Telegram.WebApp) {
                // Веб-приложение Telegram не требует отдельной авторизации
                console.log("Запущено внутри Telegram Web App, авторизация не требуется.");
            } else {
                // Перенаправляем на ссылку для авторизации в браузере
                window.location.href = telegramAuthLink;
            }
        });
    }
});

// Функция для отображения данных пользователя на странице
function displayUserData(data) {
    document.getElementById('user-name').textContent = data.first_name || '';
    document.getElementById('user-username').textContent = `@${data.username || ''}`;
    document.getElementById('user-photo').src = data.photo_url || 'images_old/profile-avatar.png';
}

// Запрос к серверу для получения данных пользователя
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
    displayUserData(data); // Вызов функции для отображения данных
})
.catch(error => {
    console.error('Ошибка авторизации:', error);
});

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

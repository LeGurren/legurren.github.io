// Создаем элемент для отображения логов на странице
const logContainer = document.createElement('div');
logContainer.id = 'log-container';
logContainer.style.border = '1px solid red';
logContainer.style.padding = '10px';
logContainer.style.margin = '10px';
logContainer.style.maxHeight = '150px';
logContainer.style.overflowY = 'scroll';
document.body.appendChild(logContainer);

// Функция для добавления сообщения в лог
function addLog(message) {
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logContainer.appendChild(logMessage);
}

// Проверка и загрузка данных из Telegram Web App SDK
let username, firstName, lastName;

// Убедимся, что Telegram SDK доступен
if (typeof Telegram !== 'undefined' && typeof Telegram.WebApp !== 'undefined') {
    addLog("Telegram SDK доступен. Попытка инициализации...");
    Telegram.WebApp.onEvent('init', () => {
        const initData = Telegram.WebApp.initDataUnsafe;

        // Логирование для проверки initData
        addLog(`initDataUnsafe: ${JSON.stringify(initData)}`);

        if (initData.user) {
            username = initData.user.username;
            firstName = initData.user.first_name;
            lastName = initData.user.last_name;

            // Логирование для проверки данных пользователя
            addLog(`Данные из Telegram SDK: Username: ${username}, First Name: ${firstName}, Last Name: ${lastName}`);
        } else {
            addLog("Данные пользователя не получены через Telegram SDK.");
        }

        // Отображение данных на странице
        displayUserData();
    });
} else {
    addLog("Telegram SDK недоступен. Попытка загрузить данные из URL...");
    // Получение данных пользователя из URL в случае, если SDK недоступен
    const urlParams = new URLSearchParams(window.location.search);
    username = urlParams.get('username');
    firstName = urlParams.get('first_name');
    lastName = urlParams.get('last_name');

    // Логирование для проверки данных из URL
    addLog(`Данные из URL: Username: ${username}, First Name: ${firstName}, Last Name: ${lastName}`);

    // Отображение данных на странице
    displayUserData();
}

// Функция для отображения данных на странице
function displayUserData() {
    // Если данных нет, выводим '(параметр не получен)'
    document.getElementById('user-name').textContent = `${firstName || '(параметр не получен)'} ${lastName || '(параметр не получен)'}`.trim();
    document.getElementById('user-username').textContent = username ? `@${username}` : '@username';

    // Если пользовательское фото доступно, оно будет отображаться, иначе - стандартное
    const userPhoto = document.getElementById('user-photo');
    userPhoto.onerror = () => {
        userPhoto.src = 'images_old/profile-avatar.png'; // Показ стандартного аватара при ошибке загрузки
    };
}

// Отображение полного URL страницы для отладки
document.getElementById('full-url').textContent = window.location.href;

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

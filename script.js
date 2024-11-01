// Проверка и загрузка данных из Telegram Web App SDK
let username, firstName, lastName;

// Функция для извлечения данных пользователя из URL
function extractUserData() {
    // Если параметры идут после `?`, используем URLSearchParams для поиска в строке запроса
    let urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("username")) {
        // Если параметры идут после `#`, используем `window.location.hash`
        urlParams = new URLSearchParams(window.location.hash.substring(1));
    }
    
    username = urlParams.get('username');
    firstName = urlParams.get('first_name');
    lastName = urlParams.get('last_name');

    // Логирование для проверки
    console.log("Loaded from URL:");
    console.log("Username:", username);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);

    displayUserData();
}

// Функция для отображения данных на странице
function displayUserData() {
    document.getElementById('user-name').textContent = `${firstName || ''} ${lastName || ''}`.trim();
    document.getElementById('user-username').textContent = username ? `@${username}` : '@username';

    // Если пользовательское фото доступно, оно будет отображаться, иначе - стандартное
    const userPhoto = document.getElementById('user-photo');
    userPhoto.onerror = () => {
        userPhoto.src = 'images_old/profile-avatar.png'; // Показ стандартного аватара при ошибке загрузки
    };
}

// Проверка, что Telegram SDK доступен
if (typeof Telegram !== 'undefined' && typeof Telegram.WebApp !== 'undefined') {
    Telegram.WebApp.onEvent('init', () => {
        const initData = Telegram.WebApp.initDataUnsafe;
        
        if (initData.user) {
            username = initData.user.username;
            firstName = initData.user.first_name;
            lastName = initData.user.last_name;

            console.log("Loaded from Telegram SDK:");
            console.log("Username:", username);
            console.log("First Name:", firstName);
            console.log("Last Name:", lastName);

            displayUserData();
        } else {
            console.log("Данные пользователя не получены через Telegram SDK.");
            extractUserData();
        }
    });
} else {
    extractUserData();
}

// Отображение полного URL страницы для отладки
document.getElementById('full-url').textContent = window.location.href;

// Остальной код (работа с товарами и темами)
const products = { /* your product data */ };

document.querySelectorAll('.game-tile').forEach(tile => {
    tile.addEventListener('click', (event) => {
        event.preventDefault();
        const gameId = tile.getAttribute('href').substring(1);
        showProducts(gameId);
    });
});

function showProducts(gameId) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
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

    document.querySelector('.products-section').classList.remove('hidden');
    document.querySelector('.products-section').style.display = 'block';
}

window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

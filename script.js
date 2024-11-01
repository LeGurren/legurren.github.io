// Проверка на наличие Telegram Web App SDK и инициализация данных пользователя
let username, firstName, lastName;

if (typeof Telegram !== 'undefined' && typeof Telegram.WebApp !== 'undefined') {
    // Используем SDK Telegram для получения данных пользователя
    const initData = Telegram.WebApp.initDataUnsafe;
    if (initData.user) {
        username = initData.user.username;
        firstName = initData.user.first_name;
        lastName = initData.user.last_name;
    } else {
        console.log("Данные пользователя не были получены из Telegram SDK.");
    }
} else {
    // Получение данных пользователя из URL в случае, если SDK недоступен
    const urlParams = new URLSearchParams(window.location.search);
    username = urlParams.get('username');
    firstName = urlParams.get('first_name');
    lastName = urlParams.get('last_name');
}

// Проверка, что параметры загружены корректно
console.log("Username:", username);
console.log("First Name:", firstName);
console.log("Last Name:", lastName);

// Отображение данных на странице
document.getElementById('user-name').textContent = `${firstName || ''} ${lastName || ''}`.trim();
document.getElementById('user-username').textContent = username ? `@${username}` : '@username';

// Если пользовательское фото доступно, оно будет отображаться, иначе - стандартное
const userPhoto = document.getElementById('user-photo');
userPhoto.onerror = () => {
    userPhoto.src = 'images_old/profile-avatar.png'; // Показ стандартного аватара при ошибке загрузки
};

// Product data for each game
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

// Handle game tile click to show products
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

    // Show the products section
    document.querySelector('.products-section').classList.remove('hidden');
    document.querySelector('.products-section').style.display = 'block';
}

// Change theme based on time of day
window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

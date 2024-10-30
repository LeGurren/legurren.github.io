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
    // Добавьте другие игры и товары по мере необходимости
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

// Функция для автоматической смены темы в зависимости от времени суток
document.addEventListener('DOMContentLoaded', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 19 || currentHour < 7) {
        setTheme('dark-theme');
    } else {
        setTheme('light-theme');
    }
});

function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    document.querySelector('.header').classList.remove('light-theme', 'dark-theme');
    document.querySelector('.header').classList.add(theme);
    document.querySelector('.products-section').classList.remove('light-theme', 'dark-theme');
    document.querySelector('.products-section').classList.add(theme);
}

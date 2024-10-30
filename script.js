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
        console.log(`Game tile clicked: ${gameId}`); // Debug log
        showProducts(gameId);
    });
});

function showProducts(gameId) {
    console.log(`Showing products for game: ${gameId}`); // Debug log
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Очистить предыдущие товары
    const selectedProducts = products[gameId] || [];

    selectedProducts.forEach(product => {
        console.log(`Adding product: ${product.name}`); // Debug log
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
            console.log(`Buy button clicked for product: ${product.name}`); // Debug log
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
    console.log(`Current hour: ${currentHour}`); // Debug log
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
        console.log('Dark theme applied'); // Debug log
    } else {
        document.body.classList.remove('dark-theme');
        console.log('Light theme applied'); // Debug log
    }
});

// Переменные для данных пользователя
let username = null;
let firstName = null;
let lastName = null;

// Функция для извлечения данных пользователя из URL и хеша
function extractUserData() {
    let urlParams = new URLSearchParams(window.location.search);

    // Если параметры не найдены в поисковой строке, ищем в хеше
    if (!urlParams.has("username")) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const tgDataParam = hashParams.get("tgWebAppData");

        if (tgDataParam) {
            try {
                // Попытка декодировать и распарсить tgWebAppData
                const decodedData = decodeURIComponent(tgDataParam);
                const jsonData = JSON.parse(decodedData);

                if (jsonData.user) {
                    username = jsonData.user.username;
                    firstName = jsonData.user.first_name;
                    lastName = jsonData.user.last_name || "";

                    // Вывод отладочной информации на страницу
                    document.getElementById("debug-info").innerHTML += `
                        <p style="color: green;">Данные загружены из tgWebAppData:</p>
                        <p>Username: ${username}</p>
                        <p>First Name: ${firstName}</p>
                        <p>Last Name: ${lastName}</p>
                    `;
                }
            } catch (error) {
                document.getElementById("debug-info").innerHTML += `
                    <p style="color: red;">Ошибка при разборе tgWebAppData: ${error.message}</p>
                `;
            }
        } else {
            document.getElementById("debug-info").innerHTML += `
                <p style="color: red;">tgWebAppData отсутствует в хеше.</p>
            `;
        }
    } else {
        // Если параметры найдены в URL, извлекаем их
        username = urlParams.get('username');
        firstName = urlParams.get('first_name');
        lastName = urlParams.get('last_name');

        // Вывод отладочной информации на страницу
        document.getElementById("debug-info").innerHTML += `
            <p style="color: green;">Данные загружены из URL:</p>
            <p>Username: ${username}</p>
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
        `;
    }

    displayUserData();
}

// Функция для отображения данных на странице
function displayUserData() {
    document.getElementById('user-name').textContent = `${firstName || ''} ${lastName || ''}`.trim();
    document.getElementById('user-username').textContent = username ? `@${username}` : '@username';

    // Показ стандартного аватара, если загрузка фото пользователя не удалась
    const userPhoto = document.getElementById('user-photo');
    userPhoto.onerror = () => {
        userPhoto.src = 'images_old/profile-avatar.png';
    };
}

// Вызов функции для извлечения данных пользователя
extractUserData();

// Отображение полного URL для отладки
document.getElementById('full-url').textContent = window.location.href;

// Остальной код (работа с товарами и темами)
const products = { /* данные товаров */ };

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

// Смена темы в зависимости от времени суток
window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Добавление функциональности входа через Telegram
document.getElementById('loginBtn').addEventListener('click', () => {
    Telegram.WebApp.init();
    // Добавить обработку событий при авторизации через Telegram
    Telegram.WebApp.onEvent('auth', (user) => {
        alert(`Добро пожаловать, ${user.first_name}!`);
        document.getElementById('loginBtn').innerText = `Здравствуйте, ${user.first_name}`;
    });
});

// Пример логики для покупки
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Спасибо за покупку! Мы обработаем ваш заказ.');
    });
});

// Telegram WebApp integration
window.addEventListener('load', function () {
    // Telegram Web App Widgets
    const loginButton = document.getElementById('loginBtn');

    // Telegram логин через виджет
    loginButton.addEventListener('click', function() {
        window.TelegramLoginWidget = new Telegram.WebApp();
        Telegram.WebApp.init();

        Telegram.WebApp.onEvent('auth', (data) => {
            console.log('Logged in as:', data.username);
            loginButton.textContent = `Добро пожаловать, ${data.first_name}`;
        });
    });
});

// Переменные для данных пользователя
let username = null;
let firstName = null;
let lastName = null;

// Функция для извлечения данных пользователя из URL и хеша
function extractUserData() {
    const urlParams = new URLSearchParams(window.location.search);

    // Попытка извлечь данные из tgWebAppData, если они есть в хеше
    if (!urlParams.has("username") && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const tgDataParam = hashParams.get("tgWebAppData");

        if (tgDataParam) {
            try {
                const decodedData = decodeURIComponent(tgDataParam);
                const jsonData = JSON.parse(decodedData);

                if (jsonData.user) {
                    username = jsonData.user.username;
                    firstName = jsonData.user.first_name;
                    lastName = jsonData.user.last_name || "";

                    // Вывод отладочной информации на страницу
                    document.getElementById("debug-info").innerHTML += `
                        <p style="color: green;">Данные успешно загружены из tgWebAppData:</p>
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
    }

    // Если данные не были получены из tgWebAppData, используем данные из URL
    if (!username) {
        username = urlParams.get('username');
        firstName = urlParams.get('first_name');
        lastName = urlParams.get('last_name');

        document.getElementById("debug-info").innerHTML += `
            <p style="color: green;">Данные загружены из URL:</p>
            <p>Username: ${username || '(параметр не получен)'}</p>
            <p>First Name: ${firstName || '(параметр не получен)'}</p>
            <p>Last Name: ${lastName || '(параметр не получен)'}</p>
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

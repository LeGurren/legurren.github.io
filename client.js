// URL for Telegram Authorization
const authPageUrl = 'https://legurren.github.io/auth.html';
const profilePageUrl = 'https://legurren.github.io/profile.html';

// Function to Check User Authorization
function checkAuthorization() {
    return JSON.parse(localStorage.getItem('telegramUser'));
}

// Event Listener for Login Button
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            const user = checkAuthorization();

            if (user) {
                window.location.href = profilePageUrl;
            } else if (window.Telegram && window.Telegram.WebApp) {
                console.log("Running inside Telegram Web App, no separate login needed.");
            } else {
                window.location.href = authPageUrl;
            }
        });
    }

    // Display User Data if Authorized
    const user = checkAuthorization();
    if (user) {
        displayUserData(user);
    }

    // Event Listener for Game Tile Clicks to Redirect to Game Page
    const gameTiles = document.querySelectorAll('.game-tile');
    gameTiles.forEach(tile => {
        tile.addEventListener('click', (event) => {
            event.preventDefault();
            const gameId = tile.getAttribute('href').substring(1);
            window.location.href = `${gameId}.html`; // Redirects to a game-specific page
        });
    });
});

// Function to Display User Data on the Page
function displayUserData(data) {
    const userNameElement = document.getElementById('user-name');
    const userUsernameElement = document.getElementById('user-username');
    const userPhotoElement = document.getElementById('user-photo');

    if (userNameElement && userUsernameElement && userPhotoElement) {
        userNameElement.textContent = data.first_name || '';
        userUsernameElement.textContent = `@${data.username || ''}`;
        userPhotoElement.src = data.photo_url || 'images_old/profile-avatar.png';
    }
}

// Fetch User Data and Save to LocalStorage
function fetchUserData() {
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
        console.log("User data received:", data);
        localStorage.setItem('telegramUser', JSON.stringify(data));
        displayUserData(data);
    })
    .catch(error => {
        console.error('Authorization error:', error);
        localStorage.removeItem('telegramUser');
    });
}

// Call Fetch User Data on Page Load
fetchUserData();

// Theme Switching Based on Time of Day
window.addEventListener('load', () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// CSS for Game Tile Animation
const style = document.createElement('style');
style.textContent = `
    .game-tile {
        transition: transform 0.3s ease;
    }
    .game-tile:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

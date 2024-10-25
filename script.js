// Открытие модального окна для оформления заказа
function openModal(gameName, price) {
    var modal = document.getElementById("modal");
    var gameInfo = document.getElementById("game-info");
    gameInfo.innerHTML = "Игра: " + gameName + "<br>Цена: " + price;
    modal.style.display = "block";
}

// Закрытие модального окна
function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Закрытие модального окна при нажатии на любое место вне окна
window.onclick = function(event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

-- Создание базы данных
CREATE DATABASE store;

-- Использование базы данных
USE store;

-- Таблица для товаров
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255),
    category VARCHAR(100)
);

-- Таблица для отзывов
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    username VARCHAR(100),
    content TEXT,
    rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Вставка данных в таблицу товаров
INSERT INTO products (name, description, price, image_url, category) VALUES
('Бравл Пасс', 'Игровой пропуск с уникальными наградами', 1050.00, 'images_old/brawl_pass.jpg', 'passes'),
('30 Гемов', 'Валюта для внутриигровых покупок', 300.00, 'images_old/gems_30.jpg', 'gems');

-- Вставка данных в таблицу отзывов
INSERT INTO reviews (product_id, username, content, rating) VALUES
(1, 'Иван', 'Очень хороший пропуск!', 5),
(2, 'Анна', 'Гемы пришли быстро, спасибо!', 4);

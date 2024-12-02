import { validate, parse } from '@telegram-apps/init-data-node';
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

const app = express();
const token = process.env.TELEGRAM_TOKEN; // Токен из переменной окружения

// Настройка подключения к MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword', // Лучше использовать переменные окружения
    database: 'store'
});

// Middleware для авторизации
app.use((req, res, next) => {
    const [authType, authData = ''] = (req.header('authorization') || '').split(' ');

    if (authType === 'tma') {
        try {
            validate(authData, token, { expiresIn: 3600 });
            res.locals.initData = parse(authData);
            return next();
        } catch (e) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
});

// Маршрут для извлечения данных о пользователе и сохранения в базу данных
app.get('/', (req, res) => {
    const initData = res.locals.initData;
    if (initData) {
        const user = {
            first_name: initData.user.first_name,
            username: initData.user.username,
            photo_url: initData.user.photo_url
        };

        // Пример сохранения данных пользователя в базе данных
        const query = 'INSERT INTO users (first_name, username, photo_url) VALUES (?, ?, ?)';
        connection.execute(query, [user.first_name, user.username, user.photo_url], (err, result) => {
            if (err) {
                console.error('Error saving user data to DB:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(user);
        });
    } else {
        res.status(400).json({ error: 'No user data found' });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

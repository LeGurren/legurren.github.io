import { validate, parse, type InitDataParsed } from '@telegram-apps/init-data-node';
import express from 'express';

const token = '7900966430:AAGmeN079e0NqMuHpWfYP6F3cnVuXBLW9FY';
const app = express();

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

app.get('/', (req, res) => {
    const initData = res.locals.initData;
    if (initData) {
        res.json({
            first_name: initData.user.first_name,
            username: initData.user.username,
            photo_url: initData.user.photo_url
        });
    } else {
        res.status(400).json({ error: 'No user data found' });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

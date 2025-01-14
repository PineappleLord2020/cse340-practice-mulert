import express from 'express';

        const app = express();

        const name = process.env.NAME; // <-- NEW

        app.get('/', (req, res) => {
            res.send(`Hello, ${name}!`); // <-- UPDATED
        });

        app.get('/new-route', (req, res) => {
            res.send('This is a new route!');
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

// Add these imports to your existing imports
import { fileURLToPath } from 'url';
import path from 'path';

// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

        const app = express();

        const name = process.env.NAME; // <-- NEW

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        // Serve static files from the public directory
        app.use(express.static(path.join(__dirname, 'public')));

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/home.html'));
        });

        app.get('/page1', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/page1.html'));
        });

        app.get('/page2', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/page2.html'));
        });

        

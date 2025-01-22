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

        // Define important variables
        const port = process.env.PORT || 3000;

        const mode = process.env.MODE || 'production';

        // Place before all other calls to app
        app.set('view engine', 'ejs');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        // Serve static files from the public directory
        app.use(express.static(path.join(__dirname, 'public')));

        // Place after your existing app.use(express.static(...)) call
        app.set('views', path.join(__dirname, 'views'));

        // Example of the home route using the layout
        app.get('/', (req, res) => {
            const title = 'Home Page';
            const content = '<h1>Welcome to the Home Page</h1>';
            res.render('index', { title, content, mode, port });
        });

        app.get('/about', (req, res) => {
            const title = 'About';
            const content = '<h1>About</h1>';
            res.sendFile('index', { title, content, mode, port });
        });

        app.get('/contact', (req, res) => {
            const title = 'Contact';
            const content = '<h1>Contact</h1>';
            res.sendFile('index', { title, content, mode, port });
        });

        if (mode.includes('dev')) {
            const ws = await import('ws');
            try {
                const wsPort = parseInt(port) + 1;
                const wsServer = new ws.WebSocketServer({ port: wsPort });
                wsServer.on('listening', () => {
                    console.log(`WebSocket server is running on port ${wsPort}`);
                });
                wsServer.on('error', (error) => {
                    console.error('WebSocket server error:', error);
                });
            } catch (error) {
                console.error('Failed to start WebSocket server:', error);
            }
        }

        

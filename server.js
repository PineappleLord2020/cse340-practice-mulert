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
        const mode = process.env.MODE || 'production';

        const port = process.env.PORT || 3000;


        // Place before all other calls to app
        app.set('view engine', 'ejs');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        // Serve static files from the public directory
        app.use(express.static(path.join(__dirname, 'public')));


        app.use((req, res, next) => {
            req.timestamp = new Date().toISOString();
            next();
        })

        app.use((req, res, next) => {
            console.log(req);
            next();
        })

        // Place after your existing app.use(express.static(...)) call
        app.set('views', path.join(__dirname, 'views'));

        // Example of the home route using the layout
        app.get('/', (req, res) => {
            const timestamp = req.timestamp;
            const title = 'Home Page';
            const content = '<h1>Welcome to the Home Page</h1>'
            '<p>You requested this page at: ${timestamp}</p>';
            res.render('index', { title, content, mode, port });
        });

        app.get('/about', (req, res) => {
            const title = 'About';
            const content = '<h1>About</h1>';
            res.render('index', { title, content, mode, port });
        });

        app.get('/contact', (req, res) => {
            const title = 'Contact Page';
            const content = '<h1>Welcome to the Contact page</h1>';
            res.render('index', { title, content, mode, port });
        });

        app.get('/explore/:name/:age/:id', (req, res) => {
            const name = req.params.name;
            const age = req.params.age;
            const id = req.params.id;
            const title = 'Contact Page';
            const content = `
            <h1 Hello! ${name}!`;
            console.log(req.params); // Log only the route parameters
            res.send('Check your computers console for the details!');
            res.render('index', {port, mode, title, name, age, id, content});
        });

        app.get('/account/:name/:id', (req, res) => {
            const title = "Account Page";
            const { name, id } = req.params;
            const content = `<h1>Welcome, ${name}!</h1><p>Your account ID is ${id}.</p>`;
            res.render('index', { title, content, mode, port });
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
        };

    app.use((req, res) => {
        const title = 'Page Not Found';
        res.status(404);
        res.render('404', {title, mode, port});
    });

    app.use((err, req, res, next) => {
        const title = 'Page Not Fount';
        const error = err.message;
        res.status(500);
        res.render('500', {title, mode, port, error});

    });

        

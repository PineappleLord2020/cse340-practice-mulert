// Import required modules using ESM import syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
 
// Import all other required modules: Route handlers, Middleware, etc.
import baseRoute from './src/routes/index.js';
import layouts from './src/middleware/layouts.js';
import staticPaths from './src/middleware/static-paths.js';
import { notFoundHandler, globalErrorHandler } from './src/middleware/error-handler.js';
import configNodeEnv from './src/middleware/node-env.js';
import categoryRoute from './src/routes/category/index.js';
import { setupDatabase } from './src/database/index.js';
import fileUploads from './src/middleware/file-upload.js';
import gameRoute from './src/routes/game/index.js';
 
// Handle all request for a category of games

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = process.env.MODE || 'production';
const port = process.env.PORT || 3000;
 
// Create an instance of an Express application
const app = express();

// Serve static files from the public directory
staticPaths(app);
app.use(configNodeEnv);
 
// Set EJS as the view engine and record the location of the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
 
// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set('layout default', 'default');
app.set('layouts', path.join(__dirname, 'src/views/layouts'));
app.use(layouts);

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse URL-encoded form data (like from a standard HTML form)
app.use(express.urlencoded({ extended: true }));
 
// Use the home route for the root URL
app.use('/', baseRoute);
app.use('/category', categoryRoute);
app.use('/game', gameRoute);

// Apply error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.use(fileUploads);

//app.use(styles);
//app.use(scripts);

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

// Start the server on the specified port
app.listen(port, async () => { 
    await setupDatabase();
    console.log(`Server running on http://127.0.0.1:${port}`);
});
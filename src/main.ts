require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/routes';
import cors from 'cors';
import pool from './db/db';
import path from 'path';
import methodOverride from 'method-override';

const app = express();

app.use(cors());
app.use(express.json()); // Allows JSON data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(methodOverride('_method'));

const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

app.use(loggingMiddleware);

app.use("/", routes);

app.use((req: Request, res: Response): void => {
    res.status(404).json({ error: '404 Page Not Found' });
});

// Start Server
const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
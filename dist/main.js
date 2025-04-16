"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Allows JSON data parsing
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
const loggingMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};
app.use(loggingMiddleware);
// app.get('/', (req: Request, res: Response): void => {
//     res.sendFile(path.join(__dirname, './public/html/index.html'));
// });
app.use("/", routes_1.default);
app.use((req, res) => {
    res.status(404).json({ error: '404 Page Not Found' });
});
// Start Server
const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

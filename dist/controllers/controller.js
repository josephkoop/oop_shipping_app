"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const path_1 = __importDefault(require("path"));
const index = async (req, res) => {
    try {
        //const orders = await indexDB();
        res.sendFile(path_1.default.join(__dirname, './public/html/index.html'));
    }
    catch (error) {
        //console.error('Error fetching packages:', error);
        res.status(500).json({ error: 'Could not load file.' });
    }
};
exports.index = index;

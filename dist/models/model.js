"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDB = void 0;
const db_1 = require("../db/db");
const indexDB = async () => {
    try {
        const result = await (0, db_1.query)('SELECT * FROM orders');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
};
exports.indexDB = indexDB;

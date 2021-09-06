"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require('mssql');
const fs = require('fs');
const filePath = './external_config/db-config.json';
const parseConfiguration = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
};
exports.default = parseConfiguration;
//# sourceMappingURL=utils.js.map
const sql   = require('mssql');
const fs    = require('fs');

const filePath = './external_config/db-config.json';

const parseConfiguration = (path : string) => {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

export default parseConfiguration;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../main/utils"));
const sql = require('mssql');
class DataBase {
    constructor() {
        this.DBConfig = {
            user: "sa",
            password: "4485",
            server: "DESKTOP-SI8VLN6",
            database: "mssql_practice",
            options: {
                encrypt: false,
                trustServerCertificate: true //change to true for local dev / self-signed certs
            }
        };
        this.filePath = './external_config/db-config.json';
    }
    connect() {
        let pool = new sql.ConnectionPool(this.DBConfig);
        let poolConnection = pool.connect();
        return poolConnection;
    }
    connectAndExecuteQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let poolConnection = yield this.connect();
            try {
                const request = poolConnection.request();
                const result = yield request.query(query);
                poolConnection.close();
                return result.recordset;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    connectAndSelectUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (0, utils_1.default)(this.filePath)["selectUserById"];
            let poolConnection = yield this.connect();
            try {
                const user = poolConnection.request()
                    .input('USER_ID', sql.VarChar, userId)
                    .query(query);
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    insertUserInDB(userName, userLastName, userPlasticNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (0, utils_1.default)(this.filePath)["insertUser"];
            let poolConnection = yield this.connect();
            try {
                const insert = poolConnection.request();
                insert.input('USER_NAME', sql.VarChar(100), userName);
                insert.input('USER_LAST_NAME', sql.VarChar(100), userLastName);
                insert.input('USER_PLASTIC_NUMBER', sql.VarChar(100), userPlasticNumber);
                insert.query(query);
                return insert;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = DataBase;
//# sourceMappingURL=database.js.map
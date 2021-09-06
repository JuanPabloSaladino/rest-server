"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUsersInDBFromCSV = exports.writeUserInCSV = exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = __importDefault(require("../main/utils"));
const csv_1 = __importDefault(require("../models/csv"));
const DB = new database_1.default();
const filePath = './external_config/db-config.json';
const getUsers = (req, res) => {
    const query = (0, utils_1.default)(filePath)["selectAllUsers"];
    DB.connectAndExecuteQuery(query)
        .then(users => {
        res.status(200).json({
            msg: 'getUsers',
            users
        });
    });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const { id } = req.params;
    DB.connectAndSelectUserById(id)
        .then(user => {
        res.status(200).json({
            msg: 'getUsers',
            id,
            user: user.recordset
        });
    });
};
exports.getUser = getUser;
const postUser = (req, res) => {
    const { userName, userLastName, userPlasticNumber } = req.body;
    DB.insertUserInDB(userName, userLastName, userPlasticNumber)
        .then(result => {
        res.status(201).json({
            msg: 'postUser',
            userName,
            userLastName,
            userPlasticNumber,
            result
        });
    });
};
exports.postUser = postUser;
const putUser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'putUser',
        body,
        id
    });
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUser',
        id
    });
};
exports.deleteUser = deleteUser;
const writeUserInCSV = (req, res) => {
    const { userName, userLastName, userPlasticNumber } = req.body;
    const csv = new csv_1.default();
    csv.writeUserInCSV(userName, userLastName, userPlasticNumber)
        .then((result) => {
        res.status(200).json({
            msg: 'for-each-user',
            status: 'done',
            userName,
            userLastName,
            userPlasticNumber,
            result
        });
    });
};
exports.writeUserInCSV = writeUserInCSV;
const insertUsersInDBFromCSV = (req, res) => {
    const { userName, userLastName, userPlasticNumber } = req.body;
    const csv = new csv_1.default();
    csv.readCSV()
        .then(users => {
        users.forEach(user => {
            const userName = user.NOMBRE;
            const userLastName = user.APELLIDO;
            const userPlasticNumber = user.NUMERODEPLASTICO;
            console.log(`${user.NOMBRE}, ${user.APELLIDO}, ${user.NUMERODEPLASTICO}`);
            DB.insertUserInDB(userName, userLastName, userPlasticNumber);
        });
        res.status(200).json({
            msg: 'insert-user-in-db-from-csv',
            status: 'done',
            users
        });
    });
};
exports.insertUsersInDBFromCSV = insertUsersInDBFromCSV;
//# sourceMappingURL=user.js.map
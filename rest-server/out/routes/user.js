"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/insert-user-in-db-from-csv', user_1.insertUsersInDBFromCSV);
router.post('/write-user-in-csv', user_1.writeUserInCSV);
router.get('/', user_1.getUsers);
router.get('/:id', user_1.getUser);
router.post('/', user_1.postUser);
router.put('/:id', user_1.putUser);
router.delete('/:id', user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map
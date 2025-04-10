const express = require('express');
const router = express.Router();
const controller = require('../../controller/viewCotroller');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(controller.getEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), controller.addEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), controller.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), controller.deleteEmployee);

router.route('/:id')
    .get(controller.getEmployeeById);
    
module.exports = router;
const express = require('express')
import userController from '../../controllers/user.controller';

const router = express.Router()

// http://localhost:3001/api/v1/user/hello
router.route('/hello').get(userController.greeting)
// http://localhost:3001/api/v1/user/
router.route('/').post(userController.addUser)
router.route('/:userid').get(userController.getUser)
router.route('/:userid').put(userController.updateUser)
router.route('/:userid').delete(userController.deleteUser)

module.exports = router
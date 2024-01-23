const express = require('express')
import userController from '../../controllers/user.controller';

const router = express.Router()

// http://localhost:3001/api/v1/user/hello
router.route('/hello').get(userController.greeting)
// http://localhost:3001/api/v1/user/
router.route('/').post(userController.addUser)

module.exports = router
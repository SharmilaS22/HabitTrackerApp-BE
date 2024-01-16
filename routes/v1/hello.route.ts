const express = require('express')
import helloWorldController from '../../controllers/hello.controller';

const router = express.Router()

// http://localhost:3001/api/v1/hello
router.route('/hello').get(helloWorldController.greeting)
// http://localhost:3001/api/v1/user
router.route('/user').post(helloWorldController.addUser)

module.exports = router
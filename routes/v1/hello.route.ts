const express = require('express')
import helloWorldController from '../../controllers/hello.controller';

const router = express.Router()

// http://localhost:3001/api/v1/hello
router.route('/hello').get(helloWorldController.greeting)

module.exports = router
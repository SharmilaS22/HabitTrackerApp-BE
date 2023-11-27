const express = require('express')
const helloWorldRoute = require('./hello.route')

const router = express.Router()


// router.use('/health', healthRoute)
router.use('/', helloWorldRoute)

module.exports = router
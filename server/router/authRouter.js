const express = require('express')
const { route } = require('../../../../../../web-mobile-development/web-mobile-programming/EATWELL/projectapi/router/authRouter')
const { authController } = require('../controller')

const router = express.Router()

router.get('/login', authController.login)

module.exports = router
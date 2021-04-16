const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller')

router.post('/', homeController.getHome)

module.exports = router
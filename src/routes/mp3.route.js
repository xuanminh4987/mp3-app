const express = require('express')
const router = express.Router()
const mp3Controller = require('../controllers/mp3.controller')

router.get('/:id', mp3Controller.getMP3FullInfo)

router.post('/', mp3Controller.getMP3sInfo)

module.exports = router
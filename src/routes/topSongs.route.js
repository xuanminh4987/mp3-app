const express = require('express')
const router = express.Router()
const topController = require('../controllers/topSongs.controller')

router.post('/', topController.getTopSongs)

module.exports = router
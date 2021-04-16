const express = require('express')
const router = express.Router()
const playListController = require('../controllers/playList.controller')

router.get('/', playListController.getTop100)

router.get('/:id', playListController.getPlayList)

module.exports = router
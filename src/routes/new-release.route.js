const express = require('express')
const router = express.Router()
const newReleaseController = require('../controllers/new-release.controller')

router.get('/', newReleaseController.getNewRelease)

module.exports = router
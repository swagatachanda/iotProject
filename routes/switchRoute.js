// library imports
const express = require('express')
const { switchOn, switchOff } = require('../controller/switchController')

// controller imports

// globals
const router = express.Router()

// routes
router.get('/on', switchOn)
router.get('/off', switchOff)

module.exports = router

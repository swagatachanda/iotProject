const express = require('express')
const router = express.Router()

const dataRoute = require('./dataRoute')
const switchRoute = require('./switchRoute')

router.use(express.json())

router.use('/data', dataRoute)
router.use('/switch', switchRoute)

module.exports = router

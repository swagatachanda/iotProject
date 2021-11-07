const express = require('express')
const router = express.Router()

const dataController = require('../controller/dataController')
router.use(express.json())

router.post('/', dataController.addData)
router.get('/', dataController.getData)

module.exports = router

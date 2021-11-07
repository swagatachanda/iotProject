const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
require('dotenv/config')

const apiRoute = require('./routes/apiRoute')

app.use('/api', apiRoute)

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) throw err
    console.log('Connected to MongoDB')
})

app.listen(process.env.PORT || 3000)

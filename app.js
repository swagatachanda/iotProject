const express = require('express')
const mongoose = require('mongoose')
const mqtt = require('mqtt')
const cors = require('cors')
require('dotenv/config')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: {} })

app.use(express.json())
app.use(cors())

const client = mqtt.connect({ host: '139.59.31.125', port: 1880 })
client.on('connect', () => {
    console.log(
        `MQTT[${client.options.host}:${client.options.port}] : connected`
    )
    client.subscribe('room/ldrval')
    client.subscribe('room/switch')
})

io.on('connection', (socket) => {
    console.log(`WebSocket [${socket.id}] : connected`)
    client.on('message', (topic, payload) => {
        console.log(
            `TOPIC [${topic}] (${new Date().toLocaleString()}): ${payload.toString()}`
        )
        if (topic === 'room/switch') {
            socket.emit('get-switch', {
                timestamp: new Date(),
                data: payload.toString(),
            })
        } else if (topic === 'room/ldrval') {
            socket.emit('get-ldrval', {
                timestamp: new Date(),
                data: payload.toString(),
            })
        }
    })
})
//=====================================================================================
//debug-purpose
/* client.on('message', (topic, payload) => {
    console.log(
        `TOPIC [${topic}] (${new Date().toLocaleDateString()}): ${payload.toString()}`
    )
    if (topic === 'room/switch') {
    }
}) */
//====================================================================================

app.set('mqtt-client', client)
const apiRoute = require('./routes/apiRoute')

app.use('/api', apiRoute)

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) throw err
    console.log('Connected to MongoDB')
})

server.listen(process.env.PORT || 3000)

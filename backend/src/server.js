const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

mongoose.connect('mongodb+srv://Omni2:omni2@cluster0-0miec.mongodb.net/Omni2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
})


app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)


app.listen(3334)
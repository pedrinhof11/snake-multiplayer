import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import network from './network/socket'
import game from './logical/game'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const gameInstance = game()

network(io, gameInstance)


app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

server.listen('3000');
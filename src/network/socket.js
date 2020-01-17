import Player from "../models/Player"

export default (io, game) => {

    io.on('connection', (socket) => {
        const playerId = socket.id

        game.subscribe( 
            socket.id,
            (command) => {
                socket.emit(command.type, command)
            }
        )

        socket.on('startGame', (params) => {
            const player = new Player(params)
            player.makeBody();
            game.addPlayer(player)

        })

        socket.on('change-direction', ({playerId, direction}) => {
            const player = game.state.players[playerId]
            player.direction = direction
        })

        socket.on('disconnect', () => {
            game.removePlayer({ playerId: playerId })
        })

        
    })

    setInterval(() => {
        game.moveAll()
        io.emit('newState', game.state)
        //console.log('-> Emit New State')
    }, 1000 / 10)



}

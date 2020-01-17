export default function renderScreen(screen, state, currentPlayerId) {
    if(state) {
        const context = screen.getContext('2d')
        const currentPlayer = state.players[currentPlayerId]

        crearScreen({
            context: context, 
            screen: state.setting.screen
        })

        paintAllPlayers({
            context: context, 
            players: state.players,
            color: '#CCCCCC'
        })

        paintAllFruits({
            context: context, 
            fruits: state.fruits,
            color: 'green'  
        })

        
        paintCurrentPlayer({
            context: context, 
            currentPlayer: currentPlayer,
            color: '#c1c30d'
        })
        
    }
}

function crearScreen({context, screen}) {
    context.globalAlpha = 1
    context.fillStyle = 'white'
    context.clearRect(0, 0, screen.width, screen.height)
}


function paintAllPlayers({context, players, color}) {
    for (const playerId in players) {
        context.globalAlpha = 1
        context.fillStyle = color
        for (const bodyPart of players[playerId]._body) {
            context.fillRect(bodyPart.x, bodyPart.y, 1, 1)
        }
    }
}

function paintAllFruits({context, fruits, color}) {
    for (const fruitId in fruits) {
        const fruit = fruits[fruitId]
        context.globalAlpha = 1
        context.fillStyle = color
        context.fillRect(fruit._x, fruit._y, 1, 1)
    }
}

function paintCurrentPlayer({context, currentPlayer, color}){
    if(currentPlayer) {
        context.globalAlpha = 1
      
        for (const bodyPart of currentPlayer._body) {
            context.fillStyle = color
            context.fillRect(bodyPart.x, bodyPart.y, 1, 1)
        }
        
    }
}
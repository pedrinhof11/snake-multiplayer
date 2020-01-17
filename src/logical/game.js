import setting from "../settings/config"
import Fruit from "../models/Fruit"

export default () => {
    
    const _observers = {}

    function subscribe(socketId, observerFn) {
        _observers[socketId] =  observerFn
    }

    function notifyAll(command) {
        for (const socketId in _observers) {
            emit(socketId, command)
        }
    }

    function notify(socketId, command) {
        const observerFn = _observers[socketId]
        observerFn(command)
    }
    
    const state = {
        players: {},
        fruits: {},
        setting
    }

    function start() {
        addFruit();
    }

    function setState() {
        Object.assign(state, newState)
    }

    function removePlayer({playerId}) {
        delete state.players[playerId]
    }


    function addPlayer(player) {
        if(!state.players.hasOwnProperty(player.id)){
            state.players[player.id] = player
        }
    }

    function addFruit() {
        const fruitX = Math.floor(Math.random() * setting.screen.width)
        const fruitY =  Math.floor(Math.random() * setting.screen.height)

        const fruit = new Fruit(fruitX, fruitY)

        state.fruits[fruit.id] = fruit
    }

    function moveAll() {
        for (const playerId in state.players) {
            const player = state.players[playerId]
            player.move()

            checkColissions(player)
        }
    }


    function checkColissions(player) {
        checkBlockColission(player)
        checkFruitsColission(player)
    }

    function checkFruitsColission (player) {
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            if (player.body[0].x === fruit.x && player.body[0].y === fruit.y) {
                fruitColission(fruit, player)
            }
        }
    }

    function fruitColission(fruit, player) {
        removeFruit({ fruitId: fruit.id, player: player})
        player.increment()
        addFruit()
    }

    function removeFruit({fruitId, player}) {
        delete state.fruits[fruitId]
        const multipleOf100Remainder = player.score % 100
        
        if (multipleOf100Remainder === 0 && player.score !== 0) {
            notify(player.id, {
                type: 'exec-100collect-fruit',
            })
        } else {
            notify(player.id, {
                type: 'exec-collect-fruit',
            })
        }

    }

    function checkBlockColission (player) {
        if (player.body[0].x < 0 || player.body[0].x >= setting.screen.width
            || player.body[0].y < 0 || player.body[0].y >= setting.screen.height
        ) {
            player.kill() 
        }
    }
    
    start()

    return {
        state,
        removePlayer,
        addPlayer,
        subscribe,
        setState,
        moveAll,
        addFruit
    }
}
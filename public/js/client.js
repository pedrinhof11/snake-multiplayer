import renderScreen from './render-screen.js'

const screen = document.getElementById('screen')
const btnInit = document.getElementById('initGame')
const playerNameInput = document.getElementById('playerName')
const mainMenu = document.getElementById('mainMenu')

const collectFruitAudio = new Audio('./audio/collect.wav')
const collect100FruitAudio = new Audio('./audio/collect_many.wav')

let connected = false
let state

btnInit.addEventListener('click', init)

function init() {
    const socket = io()

    const playerName = playerNameInput.value


    mainMenu.classList.add('is-hidden')
    screen.classList.remove('is-hidden')

    openFullscreen()

    socket.on('connect', function () {
        connected = true
        const playerId = socket.id
        socket.emit('startGame', {playerId: playerId, playerName: playerName})

    })

    socket.on('newState', function (newState) {
        state = newState

        renderScreen(screen, state, socket.id)
    })

    socket.on('exec-collect-fruit', function(command){
        execAudioCollect(command)
    })

    socket.on('exec-100collect-fruit', function(command){
        execAudio100Collect(command)
    })

    keyboardEventListiner(socket)
    touchEventListiner(socket)
}

function openFullscreen() {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
}

function execAudioCollect(command) {
    collectFruitAudio.pause()
    collectFruitAudio.currentTime = 0
    collectFruitAudio.play()
}

function execAudio100Collect(command) {
    collect100FruitAudio.pause()
    collect100FruitAudio.currentTime = 0
    collect100FruitAudio.play()
}

function touchEventListiner(socket) {
    let touch = {}
    let offset = {}
    screen.addEventListener('touchstart', handleTouchstart, false)
    screen.addEventListener("touchmove", handleMove, false);
    screen.addEventListener("touchend", handleEnd, false);

    function handleTouchstart(event) {
        event.preventDefault()
        const currentTouch = event.touches[0]
        touch['x'] = currentTouch.pageX
        touch['y'] = currentTouch.pageY
        
    }

    function handleMove(event) {
        event.preventDefault()
        const currentTouch = event.touches[0]

        offset['x'] = currentTouch.pageX - touch.x
        offset['y'] = currentTouch.pageY - touch.y
        
    }

    function handleEnd(event) {
        event.preventDefault()
        let direction
        // eixo x
        if(Math.abs(offset.x) > Math.abs(offset.y)) {
            const moveX = offset.x / Math.abs(offset.x)
            direction = moveX === 1 ? 'right' : 'left'    
        }
        
        // eixo y
        if(Math.abs(offset.y) > Math.abs(offset.x)) {
            const moveY = offset.y / Math.abs(offset.y)
            direction = moveY === 1 ? 'down' : 'up'      
        }

        socket.emit('change-direction', {
            playerId: socket.id,
            direction: direction
        })

    }
}

function keyboardEventListiner(socket) {
    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        let direction = null
        const acceptedMoves = {
            ArrowUp() {
               direction = 'up'
            },
            ArrowRight() {
                direction = 'right'
            },
            ArrowDown() {
                direction = 'down'
            },
            ArrowLeft() {
                direction = 'left'
            }
        }
        const keyPressed = event.key
        const moveFunction = acceptedMoves[keyPressed]

        if(moveFunction) {
            moveFunction()
            
            socket.emit('change-direction', {
                playerId: socket.id,
                direction: direction
            })
        }
    }
}


function PlayLaber() {
    this.text
    this.color = "#5d8357"

    this.messages = {
        portrait: "Rotacione a tela para jogar"
    }

    this.paint = function () {

    }
}
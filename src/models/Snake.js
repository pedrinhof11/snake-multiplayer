import settings from '../settings/config'
import directions from '../settings/directions';

export default class Snake {
    constructor() {
        this._body = []
        this._direction = null
    }

    makeBody() {
        if(this._body.length === 0)
            this._body.push({
                x: Math.floor(Math.random() * settings.screen.width),
                y: Math.floor(Math.random() * settings.screen.height)
            })
        
        for(let i = 0; i < settings.initLengthBody - 1; i++) {
            this._body.push({
                x: this._body[i].x,
                y: this._body[i].y + 1,
            })
        }
    }

    move() {
        if(this._direction) {
            const dir = directions[this._direction]
            const head = this.body[0]
            const nextPos = {
                x: head.x + dir.x,
                y: head.y + dir.y,
            }
            this.body.pop()
            this.body.splice(0, 0, nextPos)

        }
    }

    get body() {
        return this._body
    }

    set direction(value) {
        this._direction = value
    }

    

   
}
import Snake from "./Snake"

export default class Player extends Snake {
    
    constructor({playerId, playerName}) {
        super()
        this._id = playerId
        this._name = playerName
        this._score = 0
    }

    get id(){
        return this._id
    }

    get name() {
        return this._name
    }

    get score() {
        return this._score
    }

    kill() {
        this._body = []
        this._score = 0
        this.makeBody()
    }


    increment() {
        this._body.push({
            x: this._body[this._body.length - 1].x,
            y: this._body[this._body.length - 1].y
        });
        
        this._score++
    }

    
}
export default class Fruit {
    constructor(x, y) {
        this._id = Math.floor(Math.random() * 10000000)
        this._x = x
        this._y = y
    }

    get id() {
        return this._id
    }

    get x () {
        return this._x
    }

    get y () {
        return this._y
    }
}
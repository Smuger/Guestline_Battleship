class Ship {
    constructor(orientation, type, size) {
        this._orientation = orientation;
        this._type = type;
        this._size = size;
        this._position = new Array();
        this._shipFragmentsLeft = size;
    }
    get type() {
        return this._type;
    }
    get size() {
        return this._size;
    }
    get orientation() {
        return this._orientation;
    }
    get shipFragmentsLeft() {
        return this._shipFragmentsLeft;
    }
    set shipFragmentsLeft(updateFragmentsLeft) {
        this._shipFragmentsLeft = updateFragmentsLeft;
    }
    set position(setPosition) {
        this._position = setPosition;
    }
    get position() {
        return this._position;
    }
}
export default Ship;

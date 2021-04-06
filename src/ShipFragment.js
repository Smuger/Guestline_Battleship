class ShipFragment {
    constructor(type, ship) {
        this._ship = ship;
        this._type = type;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
}
export default ShipFragment;

class Cell {
    constructor(column, row) {
        this._column = column;
        this._row = row;
    }
    get column() {
        return this._column;
    }
    get row() {
        return this._row;
    }
}
export default Cell;

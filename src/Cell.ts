interface ICell {
  column: number;
  row: number;
}

class Cell {
  private _column: number;
  private _row: number;

  constructor(column: number, row: number) {
    this._column = column;
    this._row = row;
  }

  public get column(): number {
    return this._column;
  }

  public get row(): number {
    return this._row;
  }
}

export default Cell;

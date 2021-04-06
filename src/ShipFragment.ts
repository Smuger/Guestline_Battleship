import Ship from "./Ship.js";
import CellType from "../const/CellType.js";

interface IShipFragment {
  type: CellType;
}

class ShipFragment implements IShipFragment {
  private _type: CellType;
  private _ship?: Ship;

  constructor(type: CellType, ship?: Ship) {
    this._ship = ship;
    this._type = type;
  }

  public get type() {
    return this._type;
  }

  public set type(type: CellType) {
    this._type = type;
  }
}

export default ShipFragment;

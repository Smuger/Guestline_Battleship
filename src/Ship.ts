import ShipType from "../const/ShipType.js";
import ShipOrientation from "../const/ShipOrientation.js";

interface IShip {
  type: ShipType;
  size: number;
  orientation: number;
  shipFragmentsLeft: number;
  position: Array<string>;
}

class Ship implements IShip {
  private _position: Array<string>;
  private _type: ShipType;
  private _size: number;
  private _orientation: number;
  private _shipFragmentsLeft: number;

  constructor(orientation: ShipOrientation, type: ShipType, size: number) {
    this._orientation = orientation;
    this._type = type;
    this._size = size;
    this._position = new Array<string>();
    this._shipFragmentsLeft = size;
  }

  public get type() {
    return this._type;
  }

  public get size() {
    return this._size;
  }

  public get orientation() {
    return this._orientation;
  }

  public get shipFragmentsLeft() {
    return this._shipFragmentsLeft;
  }

  public set shipFragmentsLeft(updateFragmentsLeft: number) {
    this._shipFragmentsLeft = updateFragmentsLeft;
  }

  public set position(setPosition: Array<string>) {
    this._position = setPosition;
  }

  public get position() {
    return this._position;
  }
}

export default Ship;

import Ship from "../src/Ship.js";
import Cell from "../src/Cell.js";
import ShipOrientation from "../const/ShipOrientation.js";
import ShipType from "../const/ShipType.js";
import { expect } from "chai";
import "babel-polyfill";
describe("Ship", () => {
    it("Create new ship", () => {
        let ship = new Ship(ShipOrientation.horizontal, ShipType.battleship, 5);
        expect(ship.type).equal(0);
        expect(ship.size).equal(5);
        expect(ship.orientation).equal(1);
        expect(ship.shipFragmentsLeft).equal(5);
    });
    it("Add position", () => {
        let ship = new Ship(ShipOrientation.horizontal, ShipType.battleship, 5);
        ship.position = [JSON.stringify(new Cell(0, 0))];
        expect(ship.position.length).above(0);
    });
});

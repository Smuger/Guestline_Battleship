import ShipFragment from "../src/ShipFragment";
import CellType from "../const/CellType.js";
import { expect } from "chai";
import "babel-polyfill";

describe("ShipFragment", () => {
  it("Create new ShipFragment", () => {
    let fragment = new ShipFragment(CellType.hidden);
    expect(fragment.type).equal(0);
  });
});

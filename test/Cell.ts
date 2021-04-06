import Cell from "../src/Cell.js";
import { expect } from "chai";
import "babel-polyfill";

describe("Cell", () => {
  it("Create new cell", () => {
    let cell = new Cell(3, 5);
    expect(cell.column).equal(3);
    expect(cell.row).equal(5);
  });
});

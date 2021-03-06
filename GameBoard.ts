#!/usr/bin/env node
import process from "process";
import readline from "readline";
import Cell from "./src/Cell.js";
import Ship from "./src/Ship.js";
import ShipFragment from "./src/ShipFragment.js";
import ShipOrientation from "./const/ShipOrientation.js";
import ShipType from "./const/ShipType.js";
import CellType from "./const/CellType.js";

class GameBoard {
  public static gameRecord = new Map<string, ShipFragment>();
  public static gameLoop = true;
  public static readonly size = 10;
  public static readonly alphabet = "ABCDEFGHIJ".split("");
  public static readonly hiddenField = "\u2B1C";
  public static readonly missedField = "\u2B1B";
  public static readonly hitField = "\u274C";
  public static readonly hiddenHit = "\u26AA";
  public static allShips = new Array<Ship>();
  public static rl: any;

  constructor() {
    this.init();
    this.spawnEnemies();
    this.draw();
    GameBoard.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.startUserInput();
  }

  private describeEnemies(): void {
    // Spawn one battleship with random vertical or horizontal orientation
    GameBoard.allShips.push(
      new Ship(
        Math.round(Math.random())
          ? ShipOrientation.horizontal
          : ShipOrientation.vertical,
        ShipType.battleship,
        5
      )
    );

    // Spawn one destroyer with random vertical or horizontal orientation
    GameBoard.allShips.push(
      new Ship(
        Math.round(Math.random())
          ? ShipOrientation.horizontal
          : ShipOrientation.vertical,
        ShipType.destroyer,
        4
      )
    );

    // Spawn one destroyer with random vertical or horizontal orientation
    GameBoard.allShips.push(
      new Ship(
        Math.round(Math.random())
          ? ShipOrientation.horizontal
          : ShipOrientation.vertical,
        ShipType.destroyer,
        4
      )
    );
  }

  private populatePosition(
    cell: Cell,
    size: number,
    orientation: number
  ): Array<string> {
    let position = new Array<string>();
    for (let i = 0; i < size; i++) {
      if (orientation) {
        position.unshift(JSON.stringify(new Cell(cell.column + i, cell.row)));
      } else {
        position.unshift(JSON.stringify(new Cell(cell.column, cell.row + i)));
      }
    }
    return position;
  }

  private chooseSectionsOfGameBoardToSpawnEnemies(
    shipsBowRow: number,
    shipsBowColumn: number,
    ship: Ship
  ) {
    // Choose ships bow
    ship.position = this.populatePosition(
      new Cell(shipsBowRow, shipsBowColumn),
      ship.size,
      ship.orientation
    );
  }

  private spawnEnemies(): void {
    this.describeEnemies();
    for (let i = 0; i < GameBoard.allShips.length; i++) {
      // Split gameboard into 3 areas
      switch (i) {
        case 0:
          if (GameBoard.allShips[i].orientation) {
            // Horizontal

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              0,
              Math.round(Math.random() * 4),
              GameBoard.allShips[i]
            );
          } else {
            // Vertical

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              Math.round(Math.random() * 4),
              0,
              GameBoard.allShips[i]
            );
          }
          break;
        case 1:
          if (GameBoard.allShips[i].orientation) {
            // Horizontal

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              5,
              Math.round(Math.random() * 4),
              GameBoard.allShips[i]
            );
          } else {
            // Vertical

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              Math.round(Math.random() * 4) + 5,
              0,
              GameBoard.allShips[i]
            );
          }
          break;
        case 2:
          if (GameBoard.allShips[i].orientation) {
            // Horizontal

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              Math.round(Math.random() * 4),
              Math.round(Math.random() * 4) + 5,
              GameBoard.allShips[i]
            );
          } else {
            // Vertical

            this.chooseSectionsOfGameBoardToSpawnEnemies(
              Math.round(Math.random() * 9),
              5,
              GameBoard.allShips[i]
            );
          }
          break;
      }
    }
  }

  private init(): void {
    for (let row = 0; row < GameBoard.size; row++) {
      for (let column = 0; column < GameBoard.size; column++) {
        GameBoard.gameRecord.set(
          JSON.stringify(new Cell(column, row)),
          new ShipFragment(CellType.hidden)
        );
      }
    }
  }

  private draw(): void {
    if (GameBoard.gameLoop) {
      let singleRow: string = "";
      for (let row = 0; row < GameBoard.size; row++) {
        // Making sure that game board columns are straight
        if (row < 9) {
          singleRow = (row + 1).toString() + " ";
        } else {
          singleRow = (row + 1).toString();
        }

        // Draw first row
        if (row === 0) {
          let numberRow: string = "  ";
          for (let column = 0; column < GameBoard.size; column++) {
            numberRow += " " + GameBoard.alphabet[column];
          }
          console.log(`${numberRow}`);
        }

        // Draw rest
        for (let column = 0; column < GameBoard.size; column++) {
          switch (
            GameBoard.gameRecord.get(JSON.stringify(new Cell(column, row)))
              ?.type
          ) {
            case CellType.hit:
              singleRow += GameBoard.hitField;
              break;
            case CellType.missed:
              singleRow += GameBoard.missedField;
              break;
            case CellType.hidden:
              singleRow += GameBoard.hiddenField;
              break;
          }
        }
        console.log(singleRow);
      }

      console.log("______________________");
    } else {
      GameBoard.rl.close();
      console.clear();
      console.log("---------------------------------");
      console.log("            GAME OVER            ");
      console.log("---------------------------------");
    }
  }

  private sanitizeString(str: string): string {
    str = str
      .replace(/[^a-z0-9?????????????? \.,_-\s]/gim, "")
      .trim()
      .toUpperCase()
      .split("")
      .sort()
      .join("");
    return str.trim();
  }

  private findGivenField(coordinates: string): Cell {
    let cell: Cell;

    if (coordinates.length === 2) {
      cell = new Cell(
        GameBoard.alphabet.indexOf(coordinates.charAt(1)),
        parseInt(coordinates.charAt(0)) - 1
      );
    }
    // Can only handle 10, needs to be improved for bigger game boards.
    else {
      cell = new Cell(GameBoard.alphabet.indexOf(coordinates.charAt(2)), 9);
    }

    return cell;
  }

  private findShipAndRemoveOneFragment(filedNumber: Cell) {
    for (let i = 0; i < GameBoard.allShips.length; i++) {
      if (
        GameBoard.allShips[i].position.includes(JSON.stringify(filedNumber))
      ) {
        if (GameBoard.allShips[i].shipFragmentsLeft === 1) {
          console.log(
            `${
              GameBoard.allShips[i].type ? "Destroyer" : "Battleship"
            } was sunk.`
          );
        }
        GameBoard.allShips[i].shipFragmentsLeft > 0
          ? GameBoard.allShips[i].shipFragmentsLeft--
          : (GameBoard.allShips[i].shipFragmentsLeft = 0);
      }
    }
  }

  private gameStillRunning(): boolean {
    let fragmentsOfShipsStillFloating = 0;

    GameBoard.allShips.map(
      (ship) => (fragmentsOfShipsStillFloating += ship.shipFragmentsLeft)
    );

    if (fragmentsOfShipsStillFloating > 0) {
      return true;
    } else {
      return false;
    }
  }

  private fire(coordinates: string): void {
    let coordinate = this.findGivenField(coordinates);
    let value = GameBoard.gameRecord.get(JSON.stringify(coordinate));
    let wasHit = this.shipWasHit(coordinate);
    console.clear();

    // HIT
    if (wasHit && value !== undefined) {
      console.log("HIT!");
      value.type = CellType.hit;
      this.findShipAndRemoveOneFragment(coordinate);
      GameBoard.gameRecord.set(JSON.stringify(coordinate), value);
    }
    // MISS
    else if (!wasHit && value !== undefined) {
      console.log("Missed");
      value.type = CellType.missed;
      GameBoard.gameRecord.set(JSON.stringify(coordinate), value);
    }

    GameBoard.gameLoop = this.gameStillRunning();
    this.draw();
  }

  private shipWasHit(filedNumber: Cell): boolean {
    let hit = false;

    for (let i = 0; i < GameBoard.allShips.length; i++) {
      if (
        GameBoard.allShips[i].position.includes(JSON.stringify(filedNumber))
      ) {
        hit = true;
        break;
      } else {
        hit = false;
      }
    }
    return hit;
  }

  private startUserInput(): void {
    GameBoard.rl.question("Please select coordinates: ", (answer) => {
      if (answer === "exit" || answer === "end" || answer === "close") {
        GameBoard.rl.close();
      }
      this.fire(this.sanitizeString(answer));
      this.startUserInput();
    });
  }
}

let newGame = new GameBoard();

export default GameBoard;

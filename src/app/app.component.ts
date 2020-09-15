import { Component, ViewContainerRef, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

// run the plugin to work with version 4 of bootstrap
//bootstrap4Mode();

import { Point } from './point'
import { Cell, State } from './cell';

import { Utils } from './utils';
import { MineButtonComponent } from "./mineButton.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  private NB_MINES: number = 10;
  private NB_ROWS: number = 9;
  private grille: Cell[][];
  private mines: number[];
  private numberMarkedMines: number = 0;
  private numberClicked: number = 0;

  public verifEndGame(): void {
    if (this.NB_MINES == this.NB_ROWS * this.NB_ROWS - ++this.numberClicked)
      this.successCurrentGame();
  }

  public markMine(): void {
    ++this.numberMarkedMines;

    if (this.numberMarkedMines == this.NB_MINES)
      this.successCurrentGame();
  }

  public unmarkMine(): void {
    --this.numberMarkedMines;
  }

  @ViewChildren('mb')
  public mb: QueryList<MineButtonComponent>;

  constructor(private Util: Utils, public modal: Modal) {
    this.newGame();
  }

  public finishCurrentGame(): void {
    const dialogRef = this.modal.alert()
      .size('lg')
      .title('Mineweeper')
      .isBlocking(true)
      .showClose(false)
      .body('GameOver<br />Start new game ?')
      .open();

    dialogRef
      .then(res => {
        res.result.then(result => this.newGame());
      }).catch(err => { });
  }

  public successCurrentGame(): void {
    const dialogRef = this.modal.alert()
      .size('lg')
      .title('Mineweeper')
      .isBlocking(true)
      .showClose(false)
      .body('Congratulation<br />Start new game ?')
      .open();

    dialogRef
      .then(res => {
        res.result.then(result => this.newGame());
      }).catch(err => { });
  }

  private newGame(): void {
    this.numberMarkedMines = 0;
    this.numberClicked = 0;

    console.log('new game');

    this.calculMines();
    console.log(this.mines);

    for (let i = 0; i < this.mines.length; i++) {
      console.log(this.Util.convertToPoint(this.mines[i], this.NB_ROWS));
    }

    this.grille = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < this.grille.length; i++) {
      let currentRow = this.grille[i];
      currentRow.length = this.NB_ROWS;
      for (let j = 0; j < currentRow.length; j++) {
        let tempCell: Cell = new Cell();
        tempCell.position = new Point();
        tempCell.position.x = i;
        tempCell.position.y = j;
        tempCell.isMine = this.isMine(i, j);
        tempCell.state = State.Init;
        this.grille[i][j] = tempCell;
      }
    }

    console.log(this.grille);
  }

  isMarked(x: number, y: number): boolean {
    let lst: Array<MineButtonComponent> = this.mb.toArray();

    if ((x >= 0 && x < this.NB_ROWS) && (y >= 0 && y < this.NB_ROWS)) {
      let pos1dim = x * this.NB_ROWS + y;

      return lst[pos1dim].cel.state == State.Marked;
    }

    return false;
  }

  isMine(x: number, y: number): boolean {
    let indexMine: number = this.mines.findIndex(
      z => {
        let pt = this.Util.convertToPoint(z, this.NB_ROWS);
        return pt.x == x && pt.y == y
      }
    );

    return indexMine != -1;
  }

  private calculMines(): void {
    this.mines = [];
    this.mines.length = this.NB_MINES;

    let positionTemp: number;

    let i = 0;

    while (i < this.mines.length) {
      positionTemp = this.Util.getRandomInt(0, this.NB_ROWS * this.NB_ROWS - 1);

      if (this.mines.find(x => x == positionTemp) == null)
        this.mines[i++] = positionTemp;
    }
  }

  search(x: number, y: number): void {
    let lst: Array<MineButtonComponent> = this.mb.toArray();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i != 0 || j != 0) {
          if ((x + i >= 0 && x + i < this.NB_ROWS) && (y + j >= 0 && y + j < this.NB_ROWS)) {
            let pos1dim = (x + i) * this.NB_ROWS + y + j;
            setTimeout(function () {
              if ((lst[pos1dim] != undefined) && (lst[pos1dim].cel.state != State.clicked) && (lst[pos1dim].cel.state != State.Marked)) {
                lst[pos1dim].isThereAMine(undefined);
              }
            }, 0);
          }
        }
      }
    }
  }
}
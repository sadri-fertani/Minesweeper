import { Component, OnInit, Input, Inject } from '@angular/core';
import { Cell, State } from './cell'
import { AppComponent } from './app.component';
@Component({
  selector: 'mineButton',
  templateUrl: './mineButton.component.html'
})

export class MineButtonComponent implements OnInit {

  @Input()
  public cel: Cell;

  constructor(private app: AppComponent) {

  }

  ngOnInit() {
    //console.log('mineButton : ', this.cel);
  }

  markMine(event: MouseEvent): boolean {
    switch (this.cel.state) {
      case State.Init:
        this.cel.state = State.Marked;

        if (this.cel.isMine)
          this.app.markMine();
        break;
      case State.Marked:
        this.cel.state = State.Indeterminate;

        if (this.cel.isMine)
          this.app.unmarkMine();
        break;
      case State.Indeterminate:
        this.cel.state = State.Init;
        break;
    }

    return false;
  }

  isThereAMine(event: MouseEvent): void {
    this.cel.state = State.clicked;

    if (this.cel.isMine)
      this.app.finishCurrentGame();
    else {
      this.app.verifEndGame();
      if (event != undefined && event.which == 3) {
        console.log('-----');
      } else {

        this.cel.neerestMines = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
              this.cel.neerestMines += this.app.isMine(this.cel.position.x + i, this.cel.position.y + j) ? 1 : 0;
            }
          }
        }

        if (this.cel.neerestMines == 0) {
          this.app.search(this.cel.position.x, this.cel.position.y);
        }
      }
    }
  }

  clearAround(event: MouseEvent): void {
    // Voisinage marked
    let markedMines = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i != 0 || j != 0) {
          markedMines += this.app.isMarked(this.cel.position.x + i, this.cel.position.y + j) ? 1 : 0;
        }
      }
    }

    if (markedMines == this.cel.neerestMines) {
      this.app.search(this.cel.position.x, this.cel.position.y);
    }
  }
}
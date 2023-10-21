import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { startWith } from "rxjs/operators";
import { coloresBasicos } from 'src/app/app.module';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.page.html',
  styleUrls: ['./tictactoe.page.scss'],
})
export class TictactoePage {
  primario = coloresBasicos.primario;
  title = "Tic Tac Toe";
  status = "A"; 
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  start = true;
  isCircle = this.start;
  startWith: FormControl;

  ngOnInit() {
    this.startWith = new FormControl(this.start);
    this.startWith.valueChanges.pipe(startWith(this.start)).subscribe(value => {
      this.clear();
    });
  }

  onclick(x: number, y: number) {
    console.log("Clicked", x, y);
    if (this.board[x][y] === "") {
      if (this.isCircle) {
        this.board[x][y] = "O";
        this.isCircle = false;
      } else {
        this.board[x][y] = "X";
        this.isCircle = true;
      }
    }
  }

  reset() {
    this.clear();
  }

  clear() {
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
    this.isCircle = this.startWith.value;
  }

  undo() {}
}

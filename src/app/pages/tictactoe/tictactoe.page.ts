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
  secundario = coloresBasicos.secundario;
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
    console.log('Clicked', x, y);
    if (this.board[x][y] === '') {
      if (this.isCircle) {
        this.board[x][y] = 'O';
      } else {
        this.board[x][y] = 'X';
      }

      if (this.checkForWinner()) {
        this.status = this.isCircle ? 'O wins!' : 'X wins!';
        setTimeout(() => {
          this.clear();
        }, 1000);
      } else if (this.isBoardFull()) {
        this.status = "It's a tie!";
        setTimeout(() => {
          this.clear();
        }, 1000);
      } else {
        this.isCircle = !this.isCircle;
      }

    }
  }

  checkForWinner() {
    // Filas
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ''
      ) {
        return true;
      }
    }

    // Columnas
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ''
      ) {
        return true;
      }
    }

    // diagonales
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ''
    ) {
      return true; // Diagonal principal
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ''
    ) {
      return true; //
    }

    return false; // No hay ganador
  }

  isBoardFull() {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === '') {
          return false;
        }
      }
    }
    return true;
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

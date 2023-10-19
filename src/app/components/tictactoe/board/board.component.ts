import { Component, NgModule, OnInit } from '@angular/core';
import { TictactoePageModule } from 'src/app/pages/tictactoe/tictactoe.module';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  
})

export class BoardComponent  implements OnInit {

  cells = Array(9).fill(null);
  currentPlayer = 'X';
  winner: string | null = null;

  constructor(tictac:TictactoePageModule) { }
  
  ngOnInit() {}

  makeMove(index: number) {
    if (!this.cells[index] && !this.winner) {
      this.cells[index] = this.currentPlayer;
      this.checkWinner();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }
  checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
  
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        this.winner = this.cells[a];
        return;
      }
    }
  
    // Check for a draw
    if (!this.cells.includes(null)) {
      this.winner = 'Draw';
    }
  

}
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from 'src/app/components/tictactoe/board/board.component';
import { CellComponent } from 'src/app/components/tictactoe/cell/cell.component';
import { GameComponent } from 'src/app/components/tictactoe/game/game.component';



@NgModule({
  declarations: [
    BoardComponent,
    CellComponent,
    GameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent,
    CellComponent,
    GameComponent
  ]
})
export class TictactoeModule { }

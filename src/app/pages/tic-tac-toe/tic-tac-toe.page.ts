import { Component, OnInit } from '@angular/core';
import { GameComponent } from 'src/app/components/game/game.component';
@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.page.html',
  styleUrls: ['./tic-tac-toe.page.scss'],
})
export class TicTacToePage implements OnInit {

  constructor(public game: GameComponent) { }

  ngOnInit() {
  }

}

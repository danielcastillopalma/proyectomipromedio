import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent  implements OnInit {

  constructor(public board: BoardComponent) { }

  ngOnInit() {}

}

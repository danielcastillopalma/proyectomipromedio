import { Component, OnInit } from '@angular/core';
import { coloresBasicos } from 'src/app/app.module';
import { SudokuService } from 'src/app/services/gameservices/sudoku.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.page.html',
  styleUrls: ['./sudoku.page.scss'],
})

export class SudokuPage implements OnInit {
  board:any=[]
  primario = coloresBasicos.primario;
  secundario = coloresBasicos.secundario;
  constructor(private sudoservice:SudokuService) { 
    
  }
 
  ngOnInit() {
    this.levantarJuego();  
  }
 
  async levantarJuego(){
    
    console.log("entra")
    var data= await this.sudoservice.generateBoard().then((res)=>data=res,(err)=>console.log(err));
    this.board=data.newboard.grids[0].value;
    console.log(this.board)
    console.log("sale")
    
  }
}

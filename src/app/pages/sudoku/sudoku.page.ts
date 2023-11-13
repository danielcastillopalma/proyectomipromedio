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
  boardSolution:any[][]
  primario = coloresBasicos.primario;
  secundario = coloresBasicos.secundario;
  constructor(private sudoservice:SudokuService) { 
    
  }
 
  

  ngOnInit() {
    this.levantarJuego();  
  }
  celdaLlena(x:number,y:number,value:any){
    if(value.target.value==this.boardSolution[x][y]){
      
      value.target.style.color="blue"
    }else{
      value.target.style.color="red"
    }
    
  }
  
  async levantarJuego(){
    
    console.log("entra")
    var data= await this.sudoservice.generateBoard().then((res)=>data=res,(err)=>console.log(err));
    this.board=data.newboard.grids[0].value;
    this.boardSolution=data.newboard.grids[0].solution;
    console.log(data.newboard.grids[0].solution)
    console.log(this.board)
   
  }
}

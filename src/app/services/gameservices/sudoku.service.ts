import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  constructor() { }

  async generateBoard(){
    const data= await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}");
    return data.json();
  }
}

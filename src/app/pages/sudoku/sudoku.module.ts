import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SudokuPageRoutingModule } from './sudoku-routing.module';

import { SudokuPage } from './sudoku.page';
import { MenuModule } from 'src/app/modules/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SudokuPageRoutingModule,
    MenuModule
  ],
  declarations: [SudokuPage]
})
export class SudokuPageModule {}

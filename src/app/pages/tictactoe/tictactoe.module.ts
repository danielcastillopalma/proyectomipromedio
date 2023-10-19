import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TictactoePageRoutingModule } from './tictactoe-routing.module';

import { TictactoePage } from './tictactoe.page';
import { TictactoeModule } from 'src/app/modules/tictactoe/tictactoe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TictactoePageRoutingModule,
    TictactoeModule
  ],
  declarations: [TictactoePage]
})
export class TictactoePageModule {}

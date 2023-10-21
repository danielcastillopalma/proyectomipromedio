import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< Updated upstream

import { IonicModule } from '@ionic/angular';
=======
>>>>>>> Stashed changes

import { IonicModule } from '@ionic/angular';
import { MenuModule } from 'src/app/modules/menu/menu.module';
import { TictactoePageRoutingModule } from './tictactoe-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TictactoePage } from './tictactoe.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TictactoePageRoutingModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [TictactoePage],
 
 
})
export class TictactoePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockDeNotasPageRoutingModule } from './block-de-notas-routing.module';

import { BlockDeNotasPage } from './block-de-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockDeNotasPageRoutingModule
  ],
  declarations: [BlockDeNotasPage]
})
export class BlockDeNotasPageModule {}

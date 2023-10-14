import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
//import { NotaService } from 'src/app/notas/nota.service';

import { BlockDeNotasPageRoutingModule } from './block-de-notas-routing.module';

import { BlockDeNotasPage } from './block-de-notas.page';
import { NotasComponent } from 'src/app/notas/notas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockDeNotasPageRoutingModule
  ],
  declarations: [BlockDeNotasPage, NotasComponent,]
})
export class BlockDeNotasPageModule {}

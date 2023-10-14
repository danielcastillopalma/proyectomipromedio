import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteblockPageRoutingModule } from './noteblock-routing.module';

import { NoteblockPage } from './noteblock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteblockPageRoutingModule
  ],
  declarations: [NoteblockPage]
})
export class NoteblockPageModule {}

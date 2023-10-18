import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteblockPageRoutingModule } from './noteblock-routing.module';

import { NoteblockPage } from './noteblock.page';
import { MenuModule } from 'src/app/modules/menu/menu.module';
import { NotesComponent } from 'src/app/components/notes/notes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteblockPageRoutingModule,
    MenuModule
  ],
  declarations: [NoteblockPage,NotesComponent]
})
export class NoteblockPageModule {}

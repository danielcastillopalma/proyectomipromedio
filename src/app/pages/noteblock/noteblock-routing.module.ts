import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteblockPage } from './noteblock.page';

const routes: Routes = [
  {
    path: '',
    component: NoteblockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteblockPageRoutingModule {}

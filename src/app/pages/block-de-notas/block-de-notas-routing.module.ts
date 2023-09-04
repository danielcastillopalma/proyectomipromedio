import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockDeNotasPage } from './block-de-notas.page';

const routes: Routes = [
  {
    path: '',
    component: BlockDeNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockDeNotasPageRoutingModule {}

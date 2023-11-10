import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasatiemposPage } from './pasatiempos.page';

const routes: Routes = [
  {
    path: '',
    component: PasatiemposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasatiemposPageRoutingModule {}

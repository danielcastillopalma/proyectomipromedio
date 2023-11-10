import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasatiemposPageRoutingModule } from './pasatiempos-routing.module';

import { PasatiemposPage } from './pasatiempos.page';
import { MenuModule } from 'src/app/modules/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasatiemposPageRoutingModule,
    MenuModule
  ],
  declarations: [PasatiemposPage]
})
export class PasatiemposPageModule {}

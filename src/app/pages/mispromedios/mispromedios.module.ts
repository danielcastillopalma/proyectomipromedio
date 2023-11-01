import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MispromediosPageRoutingModule } from './mispromedios-routing.module';

import { MispromediosPage } from './mispromedios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MispromediosPageRoutingModule
  ],
  declarations: [MispromediosPage]
})
export class MispromediosPageModule {}

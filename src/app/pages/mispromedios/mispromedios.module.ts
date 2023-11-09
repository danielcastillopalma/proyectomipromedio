import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MispromediosPageRoutingModule } from './mispromedios-routing.module';

import { MispromediosPage } from './mispromedios.page';
import { MenuModule } from 'src/app/modules/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MispromediosPageRoutingModule,
    MenuModule
  ],
  declarations: [MispromediosPage]
})
export class MispromediosPageModule {}

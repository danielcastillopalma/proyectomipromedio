import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MenuModule } from 'src/app/modules/menu/menu.module';


@NgModule({
  imports: [
    IonicStorageModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MenuModule
  ],
  declarations: [HomePage,]
})
export class HomePageModule {

}

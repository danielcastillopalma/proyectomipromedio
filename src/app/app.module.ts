import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatProgressBarModule, IonicStorageModule.forRoot(), FormsModule, HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite,Calendar,EmailComposer],

  bootstrap: [AppComponent],
})
export class AppModule { }
export const coloresBasicos = {
  primario: 'primarioBasico',
  secundario: 'secundarioBasico',
  terciario: 'terciarioBasico',
  cuarto: 'cuartoBasico '
}
export const coloresDuoc = {
  primario: 'pduoc',
  secundario: 'sduoc',
  terciario: 'tduoc',
  cuarto: 'cduoc'
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatProgressBarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
export const coloresBasicos={
  primario:'primarioBasico',
  secundario:'secundarioBasico',
  terciario:'terciarioBasico',
  cuarto:'cuartoBasico '
}
export const coloresDuoc={
  primario:'pduoc',
  secundario:'sduoc',
  terciario:'tduoc',
  cuarto:'cduoc'
}
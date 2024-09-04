import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatProgressBarModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AppComponent,
    SQLite,
    Calendar,
    EmailComposer,


    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }

export const coloresBasicos = {
  primario: 'primarioBasico',
  secundario: 'secundarioBasico',
  terciario: 'terciarioBasico',
  cuarto: 'cuartoBasico '
};

export const coloresDuoc = {
  primario: 'pduoc',
  secundario: 'sduoc',
  terciario: 'tduoc',
  cuarto: 'cduoc'
};

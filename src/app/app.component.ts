import { Component } from '@angular/core';
import { AdsService } from './services/ads/ads.service';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { isPlatform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  objApp = initializeApp(environment.firebaseConfig!);
  constructor(private anu: AdsService

  ) {
    this.anu.initialize();
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

}


import { Component } from '@angular/core';
import { AdsService } from './services/ads/ads.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private anu: AdsService

  ) {
    this.anu.initialize();


  }

}


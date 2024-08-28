import { Injectable } from '@angular/core';
import { AdMob, AdMobBannerSize, AdOptions, BannerAdOptions, BannerAdPluginEvents, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor() { }


  /**
   * CONFIGURACIÓN DE ANUNCIOS
   * 
   */
  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      console.log("Display information before ads load first time.")
    }

    AdMob.initialize({
      testingDevices: ['YOURTESTDEVICECODE'],
      initializeForTesting: false,
    })
  }

  async showBanner() {

    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });

    const options: BannerAdOptions = {
      adId: 'ca-app-pub-7710902676549668/4363997515',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // isTesting: true
      // npa: true
    };
    AdMob.showBanner(options);


  }
  async dismissBanner() {
    AdMob.hideBanner();
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: '',
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();

  }
  /**
   * FIN CONFIGURACIÓN DE ANUNCIOS
   * 
   */

}

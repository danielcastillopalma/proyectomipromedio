import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnersService {

  // CARGA DE LOGIN
  loading = false;


  constructor(private loadingCtrl: LoadingController) { }

  async spinner(oMessage: string, oSpinner: any, time: number) {

    const loading = await this.loadingCtrl.create({
      message: oMessage,
      spinner: oSpinner, // cambiar el tipo de spinner
    });
    await loading.present();
    await this.timeout(time);
    loading.dismiss();
  }

  async timeout(time) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time); // tiempo para iniciar la sesion
    });
  }


}

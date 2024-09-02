import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl:ToastController) { }

  async presentToast(message: string, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, // la duracion toast 
      position: 'top', // en donde va el toast
      color: color, // 
    });
    toast.present();
  }
}

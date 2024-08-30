import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';

@Component({
  selector: 'app-mispromedios',
  templateUrl: './mispromedios.page.html',
  styleUrls: ['./mispromedios.page.scss'],
})
export class MispromediosPage implements OnInit {

  token = "";


  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  userData: any = ""
  userDataEmail: any = ""

  constructor(
    private storage: Storage,
    private router: Router,
    private loadingCtrl: LoadingController,
    private calendar: Calendar,
    private toastCtrl: ToastController,
  ) {

    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    this.userDataEmail = JSON.parse(localStorage.getItem('email')!);


  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;

  promArit:any=[];
  promPonde:any=[];
  async ngOnInit() {
   
  }


  //reloadbutton
  refresh() {
    window.location.reload();
  }
 

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, // la duracion toast 
      position: 'bottom', // en donde va el toast
      color: 'warning', // 
    });
    toast.present();
  }


}



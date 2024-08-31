import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { ToastController } from '@ionic/angular';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-mispromedios',
  templateUrl: './mispromedios.page.html',
  styleUrls: ['./mispromedios.page.scss'],
})
export class MispromediosPage implements OnInit {

  aritmetico: any = []
  ponderado: any = []
  data: any;
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  userData: any = ""
  userDataEmail: any = ""

  constructor(
    private toastCtrl: ToastController,
    private auth: AuthenticationService,
    private db: DatabaseService
  ) {

    this.db.obtenerPromedios();
    this.ordenarPromedios();
  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;

  promArit: any = [];
  promPonde: any = [];
  async ngOnInit() {
    onAuthStateChanged(this.auth.objAuth, (user) => {
      if (user) {
        this.userData = user;
        this.userDataEmail = user.email || '';
      } else {
        this.userData = null;
        this.userDataEmail = '';
      }
    });

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

  async ordenarPromedios() {
    this.aritmetico = this.db.aritmetico;
    this.ponderado=this.db.ponderado;

  }


}



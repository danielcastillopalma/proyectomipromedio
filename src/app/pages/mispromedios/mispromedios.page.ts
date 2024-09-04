import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { ToastController } from '@ionic/angular';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Promedio } from 'src/app/classes/promedio';

@Component({
  selector: 'app-mispromedios',
  templateUrl: './mispromedios.page.html',
  styleUrls: ['./mispromedios.page.scss'],
})
export class MispromediosPage implements OnInit {
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
    this.db.obtenerPromedios().subscribe(res => {
      this.data = res;
      this.ordenarPromedios();
    });
   


  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;

  promArit: any = [];
  promPonde: any = [];
  async ngOnInit() {
    this.data = localStorage.getItem(this.auth.storageKey);
    if (this.data) {
      this.userData = JSON.parse(this.data);
      this.userDataEmail = this.userData.email;
    } else {
      this.userData = null;
      this.userDataEmail = '';
    }

  }


  //reloadbutton
  refresh() {
    window.location.reload();
  }




  ordenarPromedios() {
    for(let prome in this.data){
     if(this.data[prome].type=='ponde'){
      this.promPonde.push(this.data[prome]);
     }else{
      this.promArit.push(this.data[prome]);
     }

    }

    console.log("PONDE: "+this.promPonde);
    console.log("ARIt: "+this)
  }


}



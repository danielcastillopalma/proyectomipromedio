import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications, LocalNotificationsPlugin, ScheduleOptions } from '@capacitor/local-notifications'
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { DatabaseService } from 'src/app/services/database.service';

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
    private db: DatabaseService,
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
    this.obtenerPromArit();
    this.obtenerPromPonde();
   
  }


  //reloadbutton
  refresh() {
    window.location.reload();
  }
  async obtenerPromArit() {
    await this.db.getNotasAritmeticas().then((res)=>this.promArit=res);
    console.log(this.promArit);
  }
  async obtenerPromPonde() {
    await this.db.getNotasPonderadas().then((res)=>this.promPonde=res);
    console.log(this.promArit);
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



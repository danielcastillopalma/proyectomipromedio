import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications, LocalNotificationsPlugin, ScheduleOptions } from '@capacitor/local-notifications'
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { DatabaseService } from 'src/app/services/database.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { title } from 'process';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})


export class HomePage {
  nombrePromArit: any = "";
  token = "";
  tipoPromedio: any[] = [
    { prom: 1, tipo: "Aritmético" },
    { prom: 2, tipo: "Ponderado" },
    { prom: 3, tipo: "Otro" },
  ]
  data: any;
  tipos: any = {
    tipo: ""
  }
  promArit: any[] = [
    { pos: 1, notArit: '' },
    { pos: 2, notArit: '' },
    { pos: 3, notArit: '' },

  ]
  promPonde: any[] = [
    { pos: 1, notPond: '', porcPond: '' },
    { pos: 2, notPond: '', porcPond: '' },
    { pos: 3, notPond: '', porcPond: '' },
  ]

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
    private emailComposer: EmailComposer,
  ) {

    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    this.userDataEmail = JSON.parse(localStorage.getItem('email')!);



  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;
  async ngOnInit() {
    await this.storage.create();
    LocalNotifications.checkPermissions();
    LocalNotifications.requestPermissions();
    //this.actualizacion()
    /** 
    setInterval(()=>{
      this.actualizacion();
    },1000)
*/

  }

  //reloadbutton
  refresh() {
    window.location.reload();
  }

  async actualizacion() {
    const today = new Date();
    console.log(today);
    console.log(today.getHours())
    if (today.getHours() == 10 && today.getMinutes() == 30) {
      console.log("Funciona")
      let options: ScheduleOptions = {
        notifications: [
          {
            id: 1,
            title: "¿Estás aburrido?",
            body: "Prueba alguno de nuestros minijuegos",
            largeBody: "Puedes jugar una partida de sudoku, o quizás un tictactoe",
            summaryText: "Texto bait"
          }
        ]
      }
      try {
        await LocalNotifications.schedule(options)
      } catch (ex) {
        alert(JSON.stringify(ex));
      }
    }

  }


  //notificaciones
  async scheduleNotification(nota: string) {
    this.calendar.createEventInteractively(
      'Nota ' + nota,
      'Ubicacion',
      undefined,
      new Date(),
      undefined
    )

  }

  loginForSave() {
    this.presentToast("Inicia sesión para guardar tus promedios")

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
  /**
   * 
   * PROMEDIO ARITMETICO
   * 
   */
  sumarPromArit = 0;
  totalPromArit = 0;
  promedioAritmetico = 0;
  cantDelArit = 0;
  calcularPromArit() {
    let cant = Object.keys(this.promArit).length;
    for (let nota of this.promArit) {
      if (nota.notArit == '') {
        this.sumarPromArit = this.sumarPromArit + 0
        this.totalPromArit = this.sumarPromArit / cant
      } else {
        this.sumarPromArit = this.sumarPromArit + parseInt(nota.notArit)

        this.totalPromArit = this.sumarPromArit / cant
      }
    }
    this.promedioAritmetico = this.totalPromArit
    console.log(this.totalPromArit)
    console.log(this.sumarPromArit)

    this.sumarPromArit = 0;

  }
  agregarNotaArit() {
    if (this.cantDelArit > 0) {
      let cant = Object.keys(this.promArit).length;
      this.promArit.push({ pos: cant + 1 + this.cantDelArit, notArit: '' });
    }
    else {
      let cant = Object.keys(this.promArit).length;
      this.promArit.push({ pos: cant + 1, notArit: '' });
    }
  }
  guardarNota() {
    if (this.tipos.tipo == "Aritmético") {
      this.guardarNotaArit();
    } else
    if (this.tipos.tipo=="Ponderado") {
      this.guardarNotaPonde();
    }
  }
  guardarNotaArit() {
    let notas: string = "";
    for (let nota of this.promArit) {
      if (nota.notArit != '') {
        notas = notas + nota.notArit + "/"
      }
    }
    try { this.db.guardarNotaArit(this.nombrePromArit, notas, this.userData.user.email); } catch {
      console.log("nofunciona")
    }

  }
  guardarNotaPonde() {
    let notas: string = "";
    let pondes: string = "";
    let total: string = "";
    for (let nota of this.promPonde) {
      if (nota.notPond != '') {
        notas = notas + nota.notPond + "/"
        pondes = pondes + nota.porcPond + "/"
        total = "[" + notas + "]" + "{" + pondes + "}"

      }
    }
    try { this.db.guardarNotaPonde(this.nombrePromArit, total, this.userData.user.email); } catch {
      console.log("nofunciona")
    }

  }

  borrarNotaArit(numero) {
    //Aqui busco la posición en el array del objeto a eliminar segun su variable "pos"
    let index: number = this.promArit.indexOf(this.promArit.find(x => x.pos == numero));

    this.promArit.splice(index, 1);
    this.cantDelArit = this.cantDelArit + 1;
    this.calcularPromArit();
  }
  /**
   * 
   * PROMEDIO PONDERADO
   * 
   */
  sumarPromPonde = 0;
  cant = 0;
  totalPromPonde = 0;
  promedioPonderado = 0;
  sumaPorc = 0;
  errorPorcMax = "";
  calcularPromPonde() {
    let cant = Object.keys(this.promPonde).length;
    for (let nota of this.promPonde) {

      if (nota.notPond == '') {
        this.sumarPromPonde = this.sumarPromPonde + 0
      } else {
        this.sumaPorc = this.sumaPorc + parseInt(nota.porcPond);
        this.sumarPromPonde = this.sumarPromPonde + (parseInt(nota.notPond) * (parseInt(nota.porcPond) / 100));
        console.log("if correcto", this.sumarPromPonde)
        console.log("id:", nota.pos, " cant:", cant)
        if (nota.pos == cant && this.sumaPorc < 100) {
          this.errorPorcMax = "La ponderación suma menos de 100%"
          this.presentToast("Los porcentajes no suman 100%")
        } else if (this.sumaPorc > 100) {
          this.errorPorcMax = "La ponderación suma más de 100%"
          this.presentToast("Los porcentajes suman más de 100%")

        } else {
          this.errorPorcMax = ""
        }
      }
      console.log("Suma Porcentaje: ", this.sumaPorc)



    }

    this.promedioPonderado = this.sumarPromPonde;
    console.log(this.totalPromPonde)
    console.log(this.sumarPromPonde)
    this.sumaPorc = 0;
    this.sumarPromPonde = 0;

  }
  agregarNotaPonde() {
    let cant = Object.keys(this.promPonde).length;
    this.promPonde.push({ pos: cant + 1, notPonde: 0 });
  }
  borrarNotaPonde(numero) {
    //Aqui busco la posición en el array del objeto a eliminar segun su variable "pos"
    let index: number = this.promPonde.indexOf(this.promPonde.find(x => x.pos == numero));

    this.promPonde.splice(index, 1);
  }




  async logIn() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...', // Mensaje anim
      spinner: 'crescent',
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/login']);


      this.data = "";
      console.log(this.data);
    }, 1000); // Tiempo del Spinner
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  tipoPromedioSelect() {

    const promBas = this.promedioBasico.nativeElement;
    const promPorc = this.promedioPorcentual.nativeElement;

    if (this.tipos.tipo != "") {
      if (this.tipos.tipo == "Aritmético") {
        promBas.removeAttribute("hidden");
        promPorc.setAttribute("hidden", "");


      } else if (this.tipos.tipo == "Ponderado") {
        promPorc.removeAttribute("hidden");
        promBas.setAttribute("hidden", "");
      } else if (this.tipos.tipo == "Otro") {
        promBas.setAttribute("hidden", "");
        promPorc.setAttribute("hidden", "");
      }
    }

  }
}




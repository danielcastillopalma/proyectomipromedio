import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications'
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Promedio } from 'src/app/classes/promedio';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AppComponent } from 'src/app/app.component';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastService } from 'src/app/services/util/toast.service';
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
  //prueba
  prueba = new Promedio

  //prueba
  constructor(
    private storage: Storage,
    private router: Router,
    private loadingCtrl: LoadingController,
    private calendar: Calendar,
    public toast: ToastService,
    private auth: AuthenticationService,
    private anu: AdsService,
    private db: DatabaseService,
  ) {
    this.anu.showBanner();
    this.userData=localStorage.getItem(this.auth.storageKey);
    this.userDataEmail = JSON.parse(this.userData).email
    

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

  ocultarBanner() {
    this.anu.dismissBanner();
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
    this.toast.presentToast("Inicia sesión para guardar tus promedios", 'warning')

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
      if (this.tipos.tipo == "Ponderado") {
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
    let prom = new Promedio;
    prom.content = notas;
    prom.email = this.userData.email;
    prom.title = this.nombrePromArit;
    prom.type = 'arit'

    this.db.guardarPromedio(prom)

    this.toast.presentToast("Tu promedio se ha guardado con éxito!", 'success');
    setTimeout(() => {
      this.refresh();
    }, 1500);



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
    let prom = new Promedio;
    prom.content = total;
    prom.email = this.auth.objAuth.currentUser?.email!;
    prom.title = this.nombrePromArit;
    prom.type = 'ponde'

    this.db.guardarPromedio(prom)

    this.toast.presentToast("Tu promedio se ha guardado con éxito!", 'success');
    setTimeout(() => {
      this.refresh();
    }, 1500);


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

    //Esta linea obtiene cuantas notas vamos a calcular.
    let cant = Object.keys(this.promPonde).length;
    //Se recorre el array de notas de promedio ponderado.    
    for (let nota of this.promPonde) {
      console.log("POS: " + nota.pos)
      //Si la nota está vacia, se suma 0
      if (nota.notPond == '') {
        this.sumarPromPonde = this.sumarPromPonde + 0
      } else {
        //Si el porcentaje es vacio, se suma 0
        if (nota.porcPond == '') {
          this.sumaPorc = this.sumaPorc + 0;
        } else {
          //si el porcentaje no es vacio, se suma el valor obtenido
          this.sumaPorc = this.sumaPorc + parseInt(nota.porcPond);
          //se suma el resultado del calculo de la nota por el porcentaje.
          console.log("")
          this.sumarPromPonde = this.sumarPromPonde + (parseInt(nota.notPond) * (parseInt(nota.porcPond) / 100));

          if (nota.pos == cant && this.sumaPorc < 100) {
            console.log("1: " + nota.pos + " 2:" + this.sumaPorc)
            this.errorPorcMax = "La ponderación suma menos de 100%"
            this.toast.presentToast("Los porcentajes no suman 100%", 'warning')
          } else if (this.sumaPorc > 100) {
            this.errorPorcMax = "La ponderación suma más de 100%"
            this.toast.presentToast("Los porcentajes suman más de 100%", 'warning')

          } else {
            this.errorPorcMax = ""
          }
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




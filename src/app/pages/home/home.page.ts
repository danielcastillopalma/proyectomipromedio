import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})


export class HomePage {
  token=""
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
  userData:any=""
  constructor(
    private db:DatabaseService,
    private storage: Storage,
    private element: ElementRef,
    private router: Router, 
    private activateRoute: ActivatedRoute, 
    private loadingCtrl: LoadingController,
    private auth: AuthenticationService,
    private storages: StorageService) {
      
      this.userData=JSON.parse(localStorage.getItem('usuario')!);
    
      
   
  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;
  async ngOnInit() {
    await this.storage.create();
  }

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
  borrarNotaArit(numero) {
    //Aqui busco la posición en el array del objeto a eliminar segun su variable "pos"
    let index: number = this.promArit.indexOf(this.promArit.find(x => x.pos == numero));

    this.promArit.splice(index, 1);
    this.cantDelArit = this.cantDelArit + 1;
    this.calcularPromArit();
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




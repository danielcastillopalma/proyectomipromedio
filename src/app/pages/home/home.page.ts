import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coloresBasicos } from '../../app.module'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})


export class HomePage {
  tipoPromedio: any[] = [
    { prom: 1, tipo: "Aritmético" },
    { prom: 2, tipo: "Ponderado" },
    { prom: 3, tipo: "Otro" },
  ]
  data: any;
  tipos: any = {
    tipo: ""
  }

  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  constructor(private element: ElementRef, private router: Router, private activateRoute: ActivatedRoute, private loadingCtrl: LoadingController) {


    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      } else {
        this.data = ["Mi Promedio"]
      }
    });
  }
  @ViewChild('promedioBasico') promedioBasico: ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual: ElementRef;
  ngOnInit() {
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




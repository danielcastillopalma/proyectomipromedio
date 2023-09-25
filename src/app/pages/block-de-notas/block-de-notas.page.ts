import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coloresBasicos,coloresDuoc } from '../../app.module'
import { LoadingController, ModalController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NotaService } from 'src/app/notas/nota.service';



@Component({
  selector: 'app-block-de-notas',
  templateUrl: './block-de-notas.page.html',
  styleUrls: ['./block-de-notas.page.scss'],
})
export class BlockDeNotasPage {

  mostrarComponente = false;
  notas: string[] = [];

  constructor(private element: ElementRef, private router: Router, private activateRoute: ActivatedRoute, private loadingCtrl: LoadingController,
     private ModalController: ModalController, private navCtrl: NavController, private storage: Storage, notaService: NotaService) {


    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      } else {
        this.data = ["Mi Promedio"]
      }
    });
  }
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  data:any;

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
  goToProfile(){
    this.router.navigate(['/profile']);
  }
  retroceso() {
    this.router.navigate(['/home']);
  }

  mostrarBlockDeNotas() {
    this.mostrarComponente = !this.mostrarComponente;
    this.notas = this.notaService.obtenerNotas(); // obtener las notas al mostrar el componente BUG
  }
}
